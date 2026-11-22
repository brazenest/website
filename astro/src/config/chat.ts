/**
 * Public chat config. The endpoint is a public URL gated server-side (origin allow-list,
 * per-IP rate limit, length caps); the Anthropic key lives only as a Worker secret.
 *
 * Dev points at `wrangler dev` in chat-worker/ (mock mode unless a key is in .dev.vars).
 */
export const CHAT_ENDPOINT = import.meta.env.DEV
  ? 'http://127.0.0.1:8787/chat'
  : 'https://aldengillespy-chat.radiantllc.workers.dev/chat'

/** Must match LIMITS in chat-worker/src/chat.ts. */
export const CHAT_LIMITS = { maxMessages: 24, maxUserChars: 1500 } as const
