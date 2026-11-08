/**
 * PostHog analytics config (loaded by src/scripts/analytics.ts).
 *
 * The project token is a PUBLIC client key (phc_…) — it ships to every browser by design,
 * so it lives here rather than in an env var. Empty token → analytics never loads.
 */
export const POSTHOG_TOKEN = 'phc_D4cBEL6n4zRNQbnWaFFZGxGUmYWRK3QCxcR5cQXKZCqq'

/** First-party relay (edge-worker/). Requests here pass ad blockers that drop *.posthog.com. */
export const POSTHOG_API_HOST = 'https://e.aldengillespy.com'

/** Where "open in PostHog" links point. US: us.posthog.com — EU: eu.posthog.com.
 *  Must match the region set in edge-worker/wrangler.jsonc. */
export const POSTHOG_UI_HOST = 'https://us.posthog.com'

/** Only these hosts report. Keeps localhost, `astro preview` and *.pages.dev preview
 *  deploys out of the production numbers. */
export const ANALYTICS_HOSTS = ['aldengillespy.com', 'www.aldengillespy.com']
