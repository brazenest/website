/**
 * Chat Worker for aldengillespy.com (v7).
 *
 * POST /chat  { messages: [{ role: 'user' | 'assistant', content: string }, ...], ph?: string }
 *   → text/event-stream of   data: {"id":"<answer id>"}       (first: names this answer)
 *                           data: {"t":"<text delta>"}
 *                           data: {"done":true}            (end of answer)
 *                           data: {"error":"<code>"}       (failure, then the stream closes)
 *
 * Gates, in order, before any paid call is made:
 *   1. Origin is on the host allow-list (CORS + a cheap CSRF gate, as in contact-worker).
 *   2. Per-IP rate limit (Workers Rate Limiting binding).
 *   3. The conversation validates (shape, turn count, length caps — see LIMITS).
 *
 * Analytics: `ph` is the visitor's anonymous PostHog id, sent only by pages where analytics
 * runs (production, not opted out). With it, the finished exchange is labelled by a small
 * model (src/classify.ts) and ONLY the labels go to PostHog — never the text.
 *
 * Without ANTHROPIC_API_KEY the Worker answers in MOCK mode (a canned streamed reply), so the
 * UI can be developed and tested locally with no key and no spend.
 */
import Anthropic from '@anthropic-ai/sdk'
import { SYSTEM_PROMPT, validateMessages, type ChatTurn } from './chat.ts'
import { capture, classify } from './classify.ts'

interface Env {
  ANTHROPIC_API_KEY?: string
  ALLOWED_HOSTS: string
  MODEL: string
  EFFORT: 'low' | 'medium' | 'high'
  MAX_TOKENS: string
  CHAT_LIMITER?: { limit(opts: { key: string }): Promise<{ success: boolean }> }
  CLASSIFY_MODEL: string
  POSTHOG_TOKEN?: string
  POSTHOG_HOST: string
}

type Answer = {
  text: string
  model: string
  stop: string | null
  firstTokenMs: number | null
  totalMs: number
  usage: { in: number; cache_read: number; cache_write: number; out: number }
}

/** posthog-js anonymous ids are UUIDv7s; accept only a plain token so nothing else rides along. */
const PH_ID = /^[A-Za-z0-9._:-]{8,100}$/

export default {
  async fetch(request: Request, env: Env, ctx: ExecutionContext): Promise<Response> {
    const url = new URL(request.url)
    const hosts = env.ALLOWED_HOSTS.split(',').map((s) => s.trim()).filter(Boolean)
    const origin = request.headers.get('Origin') ?? ''
    const originOk = isAllowedOrigin(origin, hosts)
    const cors = corsHeaders(originOk ? origin : '')

    if (request.method === 'OPTIONS') return new Response(null, { status: 204, headers: cors })
    if (url.pathname !== '/chat') return json({ error: 'not_found' }, 404, cors)
    if (request.method !== 'POST') return json({ error: 'method_not_allowed' }, 405, cors)
    if (!originOk) return json({ error: 'forbidden_origin' }, 403, cors)

    const ip = request.headers.get('CF-Connecting-IP') ?? 'local'
    if (env.CHAT_LIMITER) {
      const { success } = await env.CHAT_LIMITER.limit({ key: ip })
      if (!success) return json({ error: 'rate_limited' }, 429, cors)
    }

    let body: { messages?: unknown; ph?: unknown }
    try {
      body = await request.json()
    } catch {
      return json({ error: 'invalid_json' }, 400, cors)
    }
    const v = validateMessages(body.messages)
    if (!v.ok) return json({ error: v.error }, 400, cors)

    const { readable, writable } = new TransformStream<Uint8Array, Uint8Array>()
    const writer = writable.getWriter()
    const enc = new TextEncoder()
    const send = (obj: object) => writer.write(enc.encode(`data: ${JSON.stringify(obj)}\n\n`))
    const answerId = crypto.randomUUID()
    const ph = typeof body.ph === 'string' && PH_ID.test(body.ph) ? body.ph : null
    const messages = v.messages

    const run = (async () => {
      await send({ id: answerId })
      if (!env.ANTHROPIC_API_KEY) return streamMock(messages, send)
      const answer = await streamClaude(env, messages, send, request.signal)
      // After the visitor has the answer; never delays or breaks it.
      if (ph && env.POSTHOG_TOKEN) ctx.waitUntil(report(env, ph, answerId, messages, answer).catch((e) => console.error('chat report failed', (e as Error)?.message)))
    })()
    // Not awaited: the Response (and its stream) must go back first so deltas flow as they arrive.
    run
      .catch((err) => {
        console.error('chat failed', errorCode(err), (err as Error)?.message)
        return send({ error: errorCode(err) })
      })
      .finally(() => writer.close().catch(() => {}))

    return new Response(readable, {
      headers: {
        ...cors,
        'Content-Type': 'text/event-stream; charset=utf-8',
        'Cache-Control': 'no-store',
        'X-Content-Type-Options': 'nosniff',
      },
    })
  },
}

async function streamClaude(env: Env, messages: ChatTurn[], send: (o: object) => Promise<void>, signal: AbortSignal): Promise<Answer> {
  const started = Date.now()
  let firstTokenMs: number | null = null
  let text = ''
  const client = new Anthropic({ apiKey: env.ANTHROPIC_API_KEY, maxRetries: 1 })
  const stream = client.beta.messages.stream(
    {
      model: env.MODEL,
      max_tokens: Number(env.MAX_TOKENS) || 4096,
      // Opus 5.5 always thinks adaptively; effort is the only dial. Chat answers from a
      // fixed reference don't need depth, and low effort keeps first-token latency down.
      output_config: { effort: env.EFFORT },
      // The ~27K-token reference is identical on every request: cache it explicitly, and let
      // top-level auto-caching cover the growing conversation on later turns.
      system: [{ type: 'text', text: SYSTEM_PROMPT, cache_control: { type: 'ephemeral', ttl: '1h' } }],
      cache_control: { type: 'ephemeral' },
      messages,
      // If a safety classifier declines, Anthropic re-runs the request on its recommended
      // fallback model inside the same call instead of returning a refusal.
      betas: ['server-side-fallback-2026-07-01'],
      fallbacks: 'default',
    },
    { signal },
  )

  for await (const event of stream) {
    if (event.type === 'content_block_delta' && event.delta.type === 'text_delta') {
      firstTokenMs ??= Date.now() - started
      text += event.delta.text
      await send({ t: event.delta.text })
    }
  }
  const final = await stream.finalMessage()
  if (final.stop_reason === 'refusal') {
    const note = "\n\nI can't help with that one. Ask me about Alden's work, or reach him through [the contact form](/contact)."
    text += note
    await send({ t: note })
  }
  const usage = {
    in: final.usage.input_tokens,
    cache_read: final.usage.cache_read_input_tokens ?? 0,
    cache_write: final.usage.cache_creation_input_tokens ?? 0,
    out: final.usage.output_tokens,
  }
  // One line per answer in Workers observability: what each conversation actually costs.
  console.log(JSON.stringify({ ev: 'chat_usage', model: final.model, turns: messages.length, stop: final.stop_reason, ...usage }))
  await send({ done: true })
  return { text, model: final.model, stop: final.stop_reason, firstTokenMs, totalMs: Date.now() - started, usage }
}

/** Label the exchange and send the labels (no text) to PostHog as `chat_classified`. */
async function report(env: Env, ph: string, answerId: string, messages: ChatTurn[], a: Answer) {
  const c = await classify(env.ANTHROPIC_API_KEY!, env.CLASSIFY_MODEL, messages, a.text)
  const props = {
    answer_id: answerId,
    turn: messages.filter((m) => m.role === 'user').length,
    ...(c ? c.labels : { coverage: 'unlabelled' }),
    refused: a.stop === 'refusal',
    answer_model: a.model,
    first_token_ms: a.firstTokenMs,
    answer_ms: a.totalMs,
    answer_tokens_in: a.usage.in,
    answer_tokens_cache_read: a.usage.cache_read,
    answer_tokens_cache_write: a.usage.cache_write,
    answer_tokens_out: a.usage.out,
    classify_tokens_in: c?.usage.in,
    classify_tokens_out: c?.usage.out,
  }
  console.log(JSON.stringify({ ev: 'chat_labels', ...props }))
  await capture(env.POSTHOG_HOST, env.POSTHOG_TOKEN!, ph, 'chat_classified', props)
}

/** Canned, streamed reply for local development without an API key. */
async function streamMock(messages: ChatTurn[], send: (o: object) => Promise<void>) {
  const q = messages[messages.length - 1].content
  const reply =
    `**Mock mode** (no ANTHROPIC_API_KEY on this Worker). You asked: "${q.slice(0, 80)}". ` +
    `A real answer would link pages like [the Rotavox case study](/engineering/rotavox) or [the résumé](/resume). ` +
    `Links the site doesn't have, like [this one](/made-up-page), are shown as plain text.\n\n- One list item\n- Another, about [Memrey](/engineering/memrey)`
  for (const word of reply.split(/(?<= )/)) {
    await send({ t: word })
    await new Promise((r) => setTimeout(r, 18))
  }
  await send({ done: true })
}

function errorCode(err: unknown): string {
  if (err instanceof Anthropic.RateLimitError) return 'busy'
  if (err instanceof Anthropic.APIUserAbortError) return 'aborted'
  if (err instanceof Anthropic.APIError) return 'upstream'
  return 'internal'
}

function isAllowedOrigin(origin: string, hosts: string[]): boolean {
  if (!origin) return false
  let url: URL
  try {
    url = new URL(origin)
  } catch {
    return false
  }
  const isLocal = url.hostname === 'localhost' || url.hostname === '127.0.0.1'
  if (url.protocol !== 'https:' && !isLocal) return false
  return hosts.some((h) => url.hostname === h || url.hostname.endsWith(`.${h}`))
}

function corsHeaders(origin: string): Record<string, string> {
  const h: Record<string, string> = {
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Max-Age': '86400',
    Vary: 'Origin',
  }
  if (origin) h['Access-Control-Allow-Origin'] = origin
  return h
}

function json(data: unknown, status: number, headers: Record<string, string>): Response {
  return new Response(JSON.stringify(data), { status, headers: { ...headers, 'Content-Type': 'application/json' } })
}
