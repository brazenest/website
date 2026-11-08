/**
 * Analytics (PostHog), loaded LAST and LAZILY.
 *
 * The SDK is ~60KB gzipped and the reveal gate is sensitive to main-thread work on a
 * throttled CPU (see Base.astro's script ordering). So nothing here runs until the page has
 * loaded and the browser is idle; posthog-js is then dynamic-imported as its own chunk from
 * our own origin. The pageview is still recorded — it's just sent a beat later.
 *
 * What gets collected:
 *   - $pageview / $pageleave (time on page, scroll depth), referrer, UTMs, device, GeoIP
 *   - autocapture: every click, with the element and its text
 *   - heatmaps + rageclicks, Core Web Vitals
 *   - session replay — all form inputs are masked, so contact-form contents are never recorded
 *   - named events (below) for the actions that matter on a portfolio site
 *
 * Storage: localStorage only — no cookies are set. Excluding yourself: visit any page with
 * ?notrack once in each browser you use (?track undoes it).
 */
import { POSTHOG_TOKEN, POSTHOG_API_HOST, POSTHOG_UI_HOST, ANALYTICS_HOSTS } from '../config/analytics'

const OPT_OUT_KEY = 'ag-notrack'

type Capture = (event: string, props?: Record<string, unknown>) => void

export function initAnalytics(): void {
  if (!POSTHOG_TOKEN || !ANALYTICS_HOSTS.includes(location.hostname)) return
  if (applyOptOutParam()) return

  const start = () => {
    import('posthog-js')
      .then(({ default: posthog }) => {
        posthog.init(POSTHOG_TOKEN, {
          api_host: POSTHOG_API_HOST,
          ui_host: POSTHOG_UI_HOST,
          defaults: '2026-08-30',
          persistence: 'localStorage',
          person_profiles: 'identified_only',
          capture_pageview: true,
          capture_pageleave: true,
          capture_performance: { web_vitals: true },
          enable_heatmaps: true,
          session_recording: {
            maskAllInputs: true,
            // The project's remote config turns on network payload capture (bodies + headers).
            // On this site that would put the contact form's POST — name, email, message — into
            // every replay that sends it. Timings and URLs are kept for debugging; payloads never.
            maskCapturedNetworkRequestFn: (req) => ({
              ...req,
              requestBody: null,
              responseBody: null,
              requestHeaders: {},
              responseHeaders: {},
            }),
          },
        })
        wireEvents((event, props) => posthog.capture(event, props))
      })
      .catch(() => {}) // a blocked or failed chunk must never surface to the visitor
  }

  const idle = (cb: () => void) =>
    'requestIdleCallback' in window ? requestIdleCallback(cb, { timeout: 4000 }) : setTimeout(cb, 1500)
  if (document.readyState === 'complete') idle(start)
  else addEventListener('load', () => idle(start), { once: true })
}

/** ?notrack / ?track toggle a per-browser opt-out. Returns true when this browser is opted out. */
function applyOptOutParam(): boolean {
  try {
    const params = new URLSearchParams(location.search)
    if (params.has('notrack')) localStorage.setItem(OPT_OUT_KEY, '1')
    if (params.has('track')) localStorage.removeItem(OPT_OUT_KEY)
    return localStorage.getItem(OPT_OUT_KEY) === '1'
  } catch {
    return false
  }
}

/**
 * Named events. Autocapture already records these clicks, but as generic $autocapture
 * rows you'd have to filter by selector; named events make funnels and dashboards one click.
 */
function wireEvents(capture: Capture): void {
  // Capture phase, so a handler that stops propagation (the contact modal opener) can't hide it.
  document.addEventListener(
    'click',
    (e) => {
      const a = (e.target as Element | null)?.closest?.('a')
      if (!a) return
      const href = a.getAttribute('href') || ''
      const text = (a.textContent || a.getAttribute('aria-label') || '').trim().slice(0, 80)

      if (a.hasAttribute('data-contact-open')) {
        capture('contact_opened', { from_path: location.pathname, cta: text })
        return
      }
      if (/\.pdf($|\?)/i.test(href)) {
        capture('resume_downloaded', { from_path: location.pathname, href })
        return
      }
      let url: URL
      try {
        url = new URL(href, location.href)
      } catch {
        return
      }
      if (/^https?:$/.test(url.protocol) && url.hostname !== location.hostname) {
        capture('outbound_click', { destination: url.href, destination_host: url.hostname, link_text: text })
      } else if (url.protocol === 'mailto:') {
        capture('email_link_clicked', { from_path: location.pathname })
      }
    },
    { capture: true },
  )

  // Fired by ContactForm on a confirmed send (after Turnstile + the Worker accept it).
  // Only the category is recorded — never the name, email or message.
  document.addEventListener('contact:success', (e) => {
    const category = (e as CustomEvent<{ category?: string }>).detail?.category
    capture('contact_submitted', { from_path: location.pathname, category })
  })
}
