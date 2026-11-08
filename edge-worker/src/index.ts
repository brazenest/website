/**
 * First-party relay for PostHog (see wrangler.jsonc for why it exists).
 *
 * Follows PostHog's reference Cloudflare proxy:
 *   - /static/* and /array/* are the SDK's lazy-loaded bundles (session recorder,
 *     surveys, remote config). Immutable per URL, so they're served from the edge cache.
 *   - Everything else (event ingestion, /flags, /s/ recordings) is forwarded as-is.
 *
 * The visitor's IP is passed on as X-Forwarded-For so PostHog's GeoIP still resolves
 * country/city; without it every visitor would geolocate to a Cloudflare data centre.
 * Cookies for aldengillespy.com are stripped — PostHog never needs them.
 */

interface Env {
  API_HOST: string
  ASSET_HOST: string
}

export default {
  async fetch(request: Request, env: Env, ctx: ExecutionContext): Promise<Response> {
    const url = new URL(request.url)
    const path = url.pathname + url.search
    if (url.pathname.startsWith('/static/')) {
      return retrieveAsset(request, `https://${env.ASSET_HOST}${path}`, ctx)
    }
    // /array/<token>/config(.js) is the project's REMOTE CONFIG (replay on/off, heatmaps…),
    // and its CORS header echoes the requesting Origin. Never edge-cache it: a cached copy
    // carries whichever Origin (or none) first filled the cache, and settings changes in
    // PostHog would lag behind. PostHog's own CDN already caches it correctly.
    if (url.pathname.startsWith('/array/')) {
      return forward(request, `https://${env.ASSET_HOST}${path}`)
    }
    return forward(request, `https://${env.API_HOST}${path}`)
  },
} satisfies ExportedHandler<Env>

/** /static/<version>/… bundles are immutable per URL, so the edge cache is safe. They're
 *  public scripts, so the cached copy gets a wildcard CORS header — never an echoed Origin. */
async function retrieveAsset(request: Request, target: string, ctx: ExecutionContext): Promise<Response> {
  const cache = caches.default
  const key = new Request(request.url) // URL-only key: no Origin/cookie variance
  let response = await cache.match(key)
  if (!response) {
    const upstream = await fetch(target)
    response = new Response(upstream.body, upstream)
    response.headers.set('Access-Control-Allow-Origin', '*')
    response.headers.delete('Access-Control-Allow-Credentials')
    response.headers.delete('Vary')
    if (response.ok) ctx.waitUntil(cache.put(key, response.clone()))
  }
  return response
}

async function forward(request: Request, target: string): Promise<Response> {
  const headers = new Headers(request.headers)
  headers.delete('cookie')
  // PostHog is itself behind Cloudflare. Forwarding our edge's own cf-* / host / cdn-loop
  // headers into another Cloudflare zone makes that edge reject the request (error 1104),
  // so only the visitor's real headers go upstream.
  for (const name of [...headers.keys()]) {
    if (name.startsWith('cf-') || name === 'host' || name === 'cdn-loop' || name === 'x-real-ip') headers.delete(name)
  }
  // Only PostHog's own key formats may pass through as credentials.
  const auth = headers.get('authorization')
  if (auth && !/^Bearer ph[csx]_/.test(auth)) headers.delete('authorization')
  const ip = request.headers.get('CF-Connecting-IP')
  if (ip) headers.set('X-Forwarded-For', ip)

  const hasBody = request.method !== 'GET' && request.method !== 'HEAD'
  return fetch(target, {
    method: request.method,
    headers,
    body: hasBody ? await request.arrayBuffer() : null,
    redirect: request.redirect,
  })
}
