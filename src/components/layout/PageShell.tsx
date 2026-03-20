import { Slot, component$, useVisibleTask$ } from '@builder.io/qwik'
import type { ThemeName } from '~/types/ui'

export const PageShell = component$(({ theme, enableScrollReveal = false }: PageShellProps) => {
  useVisibleTask$(() => {
    // Scroll-reveal observer: gated behind explicit opt-in
    // Only routes that use [data-scroll-reveal] elements should enable this
    if (!enableScrollReveal) {
      return
    }

    const sections = Array.from(document.querySelectorAll<HTMLElement>('[data-scroll-reveal]'))

    // Safety check: double-verify reveal elements exist
    if (sections.length === 0) {
      return
    }

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      sections.forEach((section) => {
        section.dataset.revealState = 'visible'
      })
      return
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) {
            return
          }

          const element = entry.target as HTMLElement
          element.dataset.revealState = 'visible'
          observer.unobserve(element)
        })
      },
      {
        rootMargin: '0px 0px 10% 0px',
        threshold: 0.12,
      },
    )

    sections.forEach((section) => {
      const rect = section.getBoundingClientRect()
      const isAlreadyInView = rect.top <= window.innerHeight * 0.9

      if (isAlreadyInView) {
        section.dataset.revealState = 'visible'
        return
      }

      section.dataset.revealState = 'hidden'
      observer.observe(section)
    })

    return () => observer.disconnect()
  })

  return (
    <div data-theme={theme} class="min-h-screen flex flex-col bg-[var(--bg)] text-[var(--text-body)]">
      <Slot />
    </div>
  )
})

type PageShellProps = {
  theme: ThemeName
  /**
   * Enable scroll-reveal observer for [data-scroll-reveal] elements.
   * Only set to true on routes that actually use data-scroll-reveal.
   * @default false
   */
  enableScrollReveal?: boolean
}
