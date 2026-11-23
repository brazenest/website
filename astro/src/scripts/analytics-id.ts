/**
 * The visitor's anonymous PostHog id, shared between analytics.ts (which sets it once
 * PostHog has loaded) and the chat (which passes it to the chat Worker so its server-side
 * `chat_classified` events join the same visitor). Null when analytics isn't running:
 * localhost and preview hosts, ?notrack, or a blocked SDK — and then the Worker reports nothing.
 *
 * Kept on globalThis so it is one value however the page's scripts get bundled.
 */
const KEY = '__agAnalyticsId'
type G = typeof globalThis & { [KEY]?: string }

export function setAnalyticsId(id: string | undefined): void {
  if (id) (globalThis as G)[KEY] = id
}
export function getAnalyticsId(): string | null {
  return (globalThis as G)[KEY] ?? null
}
