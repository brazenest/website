/**
 * Custom-event analytics wire-point.
 *
 * Site traffic is measured by Cloudflare Web Analytics (automatic, cookieless,
 * configured in root.tsx). Cloudflare has no custom-event JS API, so these calls
 * are currently no-ops unless a provider that exposes `window.plausible` (or a
 * compatible shim) is loaded. This is the single place to wire product analytics
 * (e.g. PostHog or Plausible) when one is added.
 */

export const trackEvent = (eventName: string, props?: Record<string, string | number>) => {
  if (typeof window === 'undefined') {
    return
  }

  // No custom-event provider loaded yet — no-op (keeps call sites stable).
  const provider = (window as any).plausible
  if (!provider) {
    if (import.meta.env.DEV) {
      console.debug(`Analytics event (no provider): ${eventName}`)
    }
    return
  }

  provider(eventName, { props })
}

/**
 * Track package tier view
 */
export const trackPackageView = (tierName: string) => {
  trackEvent('view_package', { tier: tierName })
}

/**
 * Track contact form submission
 */
export const trackContactSubmission = (intent: string) => {
  trackEvent('contact_submission', { intent })
}

/**
 * Track teardown request submission
 */
export const trackTeardownRequest = (intent: string) => {
  trackEvent('teardown_request', { intent })
}

/**
 * Track niche page visit
 */
export const trackNichePageView = (nichePath: string) => {
  trackEvent('niche_page_view', { page: nichePath })
}
