/**
 * Chat Worker for aldengillespy.com (v7).
 *
 * POST /chat  { messages: [{ role: 'user' | 'assistant', content: string }, ...] }
 *   → text/event-stream of   data: {"t":"<text delta>"}
 *                           data: {"done":true}            (end of answer)
 *                           data: {"error":"<code>"}       (failure, then the stream closes)
 *
 * Gates, in order, before any paid call is made:
 *   1. Origin is on the host allow-list (CORS + a cheap CSRF gate, as in contact-worker).
 *   2. Per-IP rate limit (Workers Rate Limiting binding).
 *   3. The conversation validates (shape, turn count, length caps — see LIMITS).
 *
 * Without ANTHROPIC_API_KEY the Worker answers in MOCK mode (a canned streamed reply), so the
 * UI can be developed and tested locally with no key and no spend.
 */
import Anthropic from '@anthropic-ai/sdk'
import { SYSTEM_PROMPT, validateMessages, type ChatTurn } from './chat.ts'

interface Env {
  ANTHROPIC_API_KEY?: string
  ALLOWED_HOSTS: string
  MODEL: string
  EFFORT: 'low' | 'medium' | 'high'
  MAX_TOKENS: string
  CHAT_LIMITER?: { limit(opts: { key: string }): Promise<{ success: boolean }> }
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
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

    let body: { messages?: unknown }
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

    const run = env.ANTHROPIC_API_KEY ? streamClaude(env, v.messages, send, request.signal) : streamMock(v.messages, send)
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

async function streamClaude(env: Env, messages: ChatTurn[], send: (o: object) => Promise<void>, signal: AbortSignal) {
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
      await send({ t: event.delta.text })
    }
  }
  const final = await stream.finalMessage()
  if (final.stop_reason === 'refusal') {
    await send({ t: "\n\nI can't help with that one. Ask me about Alden's work, or reach him through [the contact form](/contact)." })
  }
  // One line per answer in Workers observability: what each conversation actually costs.
  console.log(
    JSON.stringify({
      ev: 'chat_usage',
      model: final.model,
      turns: messages.length,
      stop: final.stop_reason,
      in: final.usage.input_tokens,
      cache_read: final.usage.cache_read_input_tokens,
      cache_write: final.usage.cache_creation_input_tokens,
      out: final.usage.output_tokens,
    }),
  )
  await send({ done: true })
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
