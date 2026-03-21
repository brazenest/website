import { component$, useSignal, useTask$ } from '@builder.io/qwik'
import { Container } from '~/components/ui/Container'
import { MobileMenu } from '~/components/nav/MobileMenu'

/**
 * Header component with responsive navigation
 *
 * Hydration boundary: MobileMenu is conditionally rendered only on mobile viewports
 * to prevent unnecessary interactivity overhead on desktop. This ensures desktop
 * users don't pay the bundle cost for mobile-only interaction logic.
 *
 * SSR strategy:
 * - Server renders without MobileMenu (no viewport info available)
 * - Client useTask$ detects viewport and hydrates MobileMenu if needed
 * - This allows Qwik to code-split MobileMenu away from desktop users
 */
export const Header = component$(() => {
  // Track whether viewport is mobile (< md breakpoint)
  // undefined: server-side or not yet detected
  // true: mobile viewport detected, render MobileMenu
  // false: desktop viewport, skip MobileMenu hydration
  const isMobileViewport = useSignal<boolean | undefined>(undefined)

  useTask$(() => {
    // Only run on client (window is available)
    if (typeof window === 'undefined') {
      return
    }

    // Detect if viewport is below md breakpoint (768px in Tailwind)
    const mediaQuery = window.matchMedia('(max-width: 767px)')

    const handleChange = (e: MediaQueryListEvent | MediaQueryList) => {
      isMobileViewport.value = e.matches
    }

    // Set initial state
    isMobileViewport.value = mediaQuery.matches

    // Listen for changes (handles responsive resizing)
    mediaQuery.addEventListener('change', handleChange)

    // Cleanup
    return () => {
      mediaQuery.removeEventListener('change', handleChange)
    }
  })

  return (
    <header class="sticky top-0 z-40 border-b border-[var(--border)] bg-[var(--bg)]/90 backdrop-blur-sm">
      <a
        href="#main-content"
        class="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-[var(--radius-lg)] focus:bg-[var(--bg)] focus:px-3 focus:py-2 focus:text-sm focus:font-medium focus:text-[var(--fg)] focus:ring-2 focus:ring-[var(--focus)]"
      >
        Skip to content
      </a>

      <Container>
        <div class="relative flex h-16 items-center justify-between gap-6">
          <a
            href="/"
            class="text-sm font-semibold tracking-tight transition-colors duration-[var(--motion-duration-quick)] ease-[var(--motion-easing-quick)] hover:text-[var(--muted)] focus-visible:rounded-[var(--radius-lg)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--focus)] focus-visible:ring-offset-2"
          >
            Alden Gillespy
          </a>

          <nav aria-label="Primary" class="hidden items-center gap-5 md:flex">
            <a
              href="/"
              class="text-sm font-medium text-[var(--muted)] transition-colors duration-[var(--motion-duration-quick)] ease-[var(--motion-easing-quick)] hover:text-[var(--fg)] focus-visible:rounded-[var(--radius-lg)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--focus)] focus-visible:ring-offset-2 focus-visible:text-[var(--fg)]"
            >
              Home
            </a>
            <a
              href="/about"
              class="text-sm font-medium text-[var(--muted)] transition-colors duration-[var(--motion-duration-quick)] ease-[var(--motion-easing-quick)] hover:text-[var(--fg)] focus-visible:rounded-[var(--radius-lg)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--focus)] focus-visible:ring-offset-2 focus-visible:text-[var(--fg)]"
            >
              About
            </a>
            <a
              href="/resume"
              class="text-sm font-medium text-[var(--muted)] transition-colors duration-[var(--motion-duration-quick)] ease-[var(--motion-easing-quick)] hover:text-[var(--fg)] focus-visible:rounded-[var(--radius-lg)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--focus)] focus-visible:ring-offset-2 focus-visible:text-[var(--fg)]"
            >
              Resume
            </a>
            <a
              href="/blog"
              class="text-sm font-medium text-[var(--muted)] transition-colors duration-[var(--motion-duration-quick)] ease-[var(--motion-easing-quick)] hover:text-[var(--fg)] focus-visible:rounded-[var(--radius-lg)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--focus)] focus-visible:ring-offset-2 focus-visible:text-[var(--fg)]"
            >
              Blog
            </a>
            <a
              href="/contact"
              class="text-sm font-medium text-[var(--muted)] transition-colors duration-[var(--motion-duration-quick)] ease-[var(--motion-easing-quick)] hover:text-[var(--fg)] focus-visible:rounded-[var(--radius-lg)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--focus)] focus-visible:ring-offset-2 focus-visible:text-[var(--fg)]"
            >
              Contact
            </a>
          </nav>

          {/* 
            Conditional render: MobileMenu only hydrated on mobile viewports
            - Server (SSR): isMobileViewport is undefined, nothing renders
            - Client (mobile): useTask$ detects viewport, renders MobileMenu
            - Client (desktop): useTask$ detects viewport, skips MobileMenu
            
            This pattern isolates mobile-only hydration cost to mobile users only.
            Desktop users never pay the bundle cost for MobileMenu interaction logic.
          */}
          {isMobileViewport.value && <MobileMenu />}
        </div>
      </Container>
    </header>
  )
})
