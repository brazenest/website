/**
 * Contact-form Worker for aldengillespy.com (v6).
 *
 * POST /contact with a JSON body:
 *   { name, email, category, message, company (honeypot), token (Turnstile) }
 *
 * Security model — every inquiry must clear all of these server-side before an
 * email is ever sent:
 *   1. Origin is on the host allow-list (CORS + a cheap CSRF gate).
 *   2. Honeypot field ("company") is empty (kills naive bots for free).
 *   3. Fields validate (present, sane lengths, real-looking email).
 *   4. The Turnstile token verifies against Cloudflare siteverify. The token is
 *      NEVER trusted client-side — the browser cannot fake success here.
 * Only then does the send_email binding deliver the message.
 */

// Keep in sync with the CATEGORIES map in the Astro ContactForm component.
const CATEGORY_LABELS: Record<string, string> = {
  engineering: 'Engineering / product work',
  film: 'Film & photography commission',
  hiring: 'Full-time role / hiring',
  general: 'Collaboration, press, or general',
};

interface Env {
  EMAIL: { send: (message: EmailSend) => Promise<{ messageId?: string }> };
  TURNSTILE_SECRET_KEY: string;
  ALLOWED_HOSTS: string;
  TO_ADDRESS: string;
  TO_NAME: string;
  FROM_ADDRESS: string;
  FROM_NAME: string;
}

interface EmailSend {
  to: string | string[];
  from: { email: string; name?: string };
  replyTo?: string;
  subject: string;
  text: string;
  html: string;
}

const MAX = { name: 200, email: 320, message: 5000 } as const;

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const allowedHosts = env.ALLOWED_HOSTS.split(',').map((s) => s.trim()).filter(Boolean);
    const origin = request.headers.get('Origin') ?? '';
    const originOk = isAllowedOrigin(origin, allowedHosts);
    const cors = corsHeaders(originOk ? origin : '');

    if (request.method === 'OPTIONS') {
      return new Response(null, { status: 204, headers: cors });
    }
    if (request.method !== 'POST') {
      return json({ ok: false, error: 'method_not_allowed' }, 405, cors);
    }
    // A browser fetch always sends Origin; reject anything off-list. (Turnstile is
    // the real gate, but this stops the endpoint being trivially driven from elsewhere.)
    if (origin && !originOk) {
      return json({ ok: false, error: 'forbidden_origin' }, 403, cors);
    }

    let body: Record<string, unknown>;
    try {
      body = (await request.json()) as Record<string, unknown>;
    } catch {
      return json({ ok: false, error: 'invalid_json' }, 400, cors);
    }

    // Honeypot: a real, hidden field no human ever fills.
    if (typeof body.company === 'string' && body.company.trim() !== '') {
      // Pretend success so bots don't learn they were caught.
      return json({ ok: true }, 200, cors);
    }

    const name = str(body.name);
    const email = str(body.email);
    const message = str(body.message);
    const category = str(body.category);
    const token = str(body.token);

    const errors: Record<string, string> = {};
    if (!name) errors.name = 'required';
    else if (name.length > MAX.name) errors.name = 'too_long';
    if (!email) errors.email = 'required';
    else if (email.length > MAX.email || !isEmail(email)) errors.email = 'invalid';
    if (!message) errors.message = 'required';
    else if (message.length > MAX.message) errors.message = 'too_long';
    if (!CATEGORY_LABELS[category]) errors.category = 'invalid';
    if (!token) errors.token = 'required';
    if (Object.keys(errors).length > 0) {
      return json({ ok: false, error: 'validation', fields: errors }, 400, cors);
    }

    // Verify Turnstile server-side.
    const ip = request.headers.get('CF-Connecting-IP') ?? undefined;
    const verified = await verifyTurnstile(env.TURNSTILE_SECRET_KEY, token, ip);
    if (!verified) {
      return json({ ok: false, error: 'turnstile_failed' }, 400, cors);
    }

    const label = CATEGORY_LABELS[category];
    const sentAt = new Date().toISOString();
    try {
      await env.EMAIL.send({
        to: env.TO_ADDRESS,
        from: { email: env.FROM_ADDRESS, name: env.FROM_NAME },
        replyTo: email, // reply in your mail client goes straight to the sender
        subject: `[${label}] ${name}`,
        text: textBody({ name, email, label, message, ip, sentAt }),
        html: htmlBody({ name, email, label, message, ip, sentAt }),
      });
    } catch (err) {
      const code = (err as { code?: string })?.code ?? 'unknown';
      console.error('send failed', code, (err as Error)?.message);
      return json({ ok: false, error: 'send_failed', code }, 502, cors);
    }

    return json({ ok: true }, 200, cors);
  },
};

function isAllowedOrigin(origin: string, hosts: string[]): boolean {
  if (!origin) return false;
  let url: URL;
  try {
    url = new URL(origin);
  } catch {
    return false;
  }
  const isLocal = url.hostname === 'localhost' || url.hostname === '127.0.0.1';
  if (url.protocol !== 'https:' && !isLocal) return false;
  return hosts.some((h) => url.hostname === h || url.hostname.endsWith(`.${h}`));
}

function corsHeaders(origin: string): Record<string, string> {
  const h: Record<string, string> = {
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Max-Age': '86400',
    Vary: 'Origin',
  };
  // Only echo an Origin we actually trust; never wildcard.
  if (origin) h['Access-Control-Allow-Origin'] = origin;
  return h;
}

async function verifyTurnstile(secret: string, token: string, ip?: string): Promise<boolean> {
  const form = new FormData();
  form.append('secret', secret);
  form.append('response', token);
  if (ip) form.append('remoteip', ip);
  try {
    const res = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
      method: 'POST',
      body: form,
    });
    const data = (await res.json()) as { success?: boolean };
    return data.success === true;
  } catch {
    return false;
  }
}

interface Inquiry {
  name: string;
  email: string;
  label: string;
  message: string;
  ip?: string;
  sentAt: string;
}

function textBody(i: Inquiry): string {
  return [
    `New inquiry via aldengillespy.com`,
    ``,
    `Category: ${i.label}`,
    `Name:     ${i.name}`,
    `Email:    ${i.email}`,
    `Sent:     ${i.sentAt}`,
    i.ip ? `IP:       ${i.ip}` : ``,
    ``,
    `Message:`,
    i.message,
    ``,
    `— Reply directly to this email to respond to ${i.name}.`,
  ]
    .filter((l) => l !== undefined)
    .join('\n');
}

function htmlBody(i: Inquiry): string {
  const esc = (s: string) =>
    s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  return `<!doctype html><html><body style="font-family:system-ui,sans-serif;color:#0B0E13;line-height:1.6">
  <div style="max-width:620px;margin:0 auto;padding:24px">
    <p style="font-size:12px;letter-spacing:.08em;text-transform:uppercase;color:#6A7688;margin:0 0 4px">New inquiry · aldengillespy.com</p>
    <h1 style="font-size:20px;margin:0 0 16px">${esc(i.label)}</h1>
    <table style="border-collapse:collapse;font-size:14px;margin-bottom:16px">
      <tr><td style="padding:2px 16px 2px 0;color:#6A7688">Name</td><td>${esc(i.name)}</td></tr>
      <tr><td style="padding:2px 16px 2px 0;color:#6A7688">Email</td><td><a href="mailto:${esc(i.email)}">${esc(i.email)}</a></td></tr>
      <tr><td style="padding:2px 16px 2px 0;color:#6A7688">Sent</td><td>${esc(i.sentAt)}</td></tr>
      ${i.ip ? `<tr><td style="padding:2px 16px 2px 0;color:#6A7688">IP</td><td>${esc(i.ip)}</td></tr>` : ''}
    </table>
    <div style="border-left:3px solid #E2A03C;padding:4px 0 4px 16px;white-space:pre-wrap;font-size:15px">${esc(i.message)}</div>
    <p style="font-size:12px;color:#6A7688;margin-top:24px">Reply directly to this email to respond to ${esc(i.name)}.</p>
  </div></body></html>`;
}

function str(v: unknown): string {
  return typeof v === 'string' ? v.trim() : '';
}

function isEmail(v: string): boolean {
  // Deliberately permissive — the definitive check is that the reply lands.
  return /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(v);
}

function json(data: unknown, status: number, headers: Record<string, string>): Response {
  return new Response(JSON.stringify(data), {
    status,
    headers: { 'Content-Type': 'application/json', ...headers },
  });
}
