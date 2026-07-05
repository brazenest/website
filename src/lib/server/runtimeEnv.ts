/**
 * Runtime environment access that works on both Node.js (Fastify) and the
 * Cloudflare Workers runtime.
 *
 * WHY THIS EXISTS
 * ---------------
 * On Cloudflare, bindings and secrets are delivered per-request on
 * `requestEvent.platform.env` — NOT on `process.env`. We cannot simply copy them
 * onto `process.env` in middleware, because on the Workers runtime each bundled
 * chunk gets its OWN `process` object: a write made in a middleware chunk is not
 * visible to a route-handler chunk (verified empirically). `globalThis`, by
 * contrast, IS shared across all chunks.
 *
 * So middleware calls `bridgePlatformEnv(platform)` (see src/routes/plugin@env.ts)
 * to copy the platform bindings onto a `globalThis`-backed store, and server code
 * reads values with `getRuntimeEnv(key)`. The stored values are constant for the
 * lifetime of the deployment (bindings + the Hyperdrive connection string), so
 * writing them to a shared global from concurrent requests is safe.
 *
 * On Node.js there are no platform bindings, the store stays empty, and
 * `getRuntimeEnv` transparently falls back to `process.env`.
 */

const RUNTIME_ENV_STORE_KEY = '__RUNTIME_ENV__'

/**
 * Every non-binding env var / secret this app reads at runtime. Bridged by
 * direct property access so non-enumerable Cloudflare secrets are not missed.
 */
const KNOWN_ENV_KEYS = [
  'ORIGIN',
  'DATABASE_URL',
  'PGSSLMODE',
  'PGSSLREJECTUNAUTHORIZED',
  'RESEND_API_KEY',
  'CONTACT_FORM_FROM_EMAIL',
  'CONTACT_FORM_TO_EMAIL',
  'CONTACT_FORM_SUBJECT_PREFIX',
  'ADMIN_BASIC_AUTH_USERNAME',
  'ADMIN_BASIC_AUTH_PASSWORD',
] as const

interface HyperdriveBinding {
  connectionString?: string
}

interface CloudflarePlatform {
  env?: Record<string, unknown> & { HYPERDRIVE?: HyperdriveBinding }
}

function getStore(): Record<string, string> {
  const globalObject = globalThis as unknown as Record<string, Record<string, string> | undefined>

  let store = globalObject[RUNTIME_ENV_STORE_KEY]
  if (!store) {
    store = {}
    globalObject[RUNTIME_ENV_STORE_KEY] = store
  }

  return store
}

/**
 * Copies Cloudflare `platform.env` bindings/secrets into the shared runtime env
 * store. No-op on Node.js (where `platform.env` is absent). Idempotent.
 */
export function bridgePlatformEnv(platform: unknown): void {
  const env = (platform as CloudflarePlatform | undefined)?.env

  if (!env || typeof env !== 'object') {
    return
  }

  const store = getStore()
  const source = env as Record<string, unknown>

  // Copy every string binding this app reads. We do this by DIRECT property
  // access (not Object.entries), because Cloudflare Pages secrets can be exposed
  // as non-enumerable bindings — Object.entries/keys silently skips them, which
  // left ADMIN_BASIC_AUTH_* / RESEND_API_KEY / CONTACT_FORM_* unresolved in
  // production even when set. Direct access works whether or not they enumerate.
  for (const key of KNOWN_ENV_KEYS) {
    const value = source[key]
    if (typeof value === 'string') {
      store[key] = value
    }
  }

  // Belt-and-suspenders: also copy any other enumerable string vars.
  for (const [key, value] of Object.entries(env)) {
    if (typeof value === 'string') {
      store[key] = value
    }
  }

  // Hyperdrive exposes a pooled connection string that `pg` should use — apply
  // last so it wins over any plain DATABASE_URL binding.
  const hyperdrive = env.HYPERDRIVE
  if (hyperdrive && typeof hyperdrive.connectionString === 'string') {
    store.DATABASE_URL = hyperdrive.connectionString
  }
}

/**
 * Reads a runtime environment value. Prefers the bridged Cloudflare store, then
 * falls back to `process.env` (Node.js / Fastify).
 */
export function getRuntimeEnv(key: string): string | undefined {
  const fromStore = getStore()[key]
  if (fromStore !== undefined) {
    return fromStore
  }

  return process.env[key]
}
