/**
 * Analytics utility for tracking events via Plausible
 * Lightweight, privacy-focused analytics
 */

export const trackEvent = (eventName: string, props?: Record<string, string | number>) => {
  if (typeof window === 'undefined') {
    return
  }

  // Check if Plausible is available
  const plausible = (window as any).plausible
  if (!plausible) {
    console.debug(`Analytics not ready: ${eventName}`)
    return
  }

  plausible(eventName, { props })
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
