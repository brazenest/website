import { Slot, component$, useVisibleTask$ } from '@builder.io/qwik'
import { activeBrandTheme } from '~/config/brand-theme'
import { SideNav } from '~/components/nav/SideNav'

export const AppShell = component$(({ animateSections = false }: AppShellProps) => {
  // eslint-disable-next-line qwik/no-use-visible-task
  useVisibleTask$(() => {
    if (!animateSections) return

    const sections = Array.from(
      document.querySelectorAll<HTMLElement>('[data-scroll-reveal]'),
    )
    if (sections.length === 0) return

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      sections.forEach((s) => { s.dataset.revealState = 'visible' })
      return
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return
          const el = entry.target as HTMLElement
          el.dataset.revealState = 'visible'
          observer.unobserve(el)
        })
      },
      { rootMargin: '0px 0px 10% 0px', threshold: 0.12 },
    )

    sections.forEach((section) => {
      const rect = section.getBoundingClientRect()
      if (rect.top <= window.innerHeight * 0.9) {
        section.dataset.revealState = 'visible'
      } else {
        section.dataset.revealState = 'hidden'
        observer.observe(section)
      }
    })

    return () => observer.disconnect()
  })

  return (
    <div
      class="v5-shell"
      data-theme="neutral"
      data-brand-theme={activeBrandTheme}
    >
      <SideNav />

      <div class="v5-main">
        <a href="#main-content" class="v5-skip-link">
          Skip to content
        </a>

        <Slot />

        <footer class="v5-app-footer" aria-label="Site footer">
          <div class="v5-app-footer-inner">
            <p>© {new Date().getFullYear()} Alden Gillespy</p>
            <nav aria-label="Footer links" class="v5-app-footer-nav">
              <a href="/about">About</a>
              <a href="/resume">Resume</a>
              <a href="/contact">Contact</a>
            </nav>
          </div>
        </footer>
      </div>
    </div>
  )
})

type AppShellProps = {
  animateSections?: boolean
}
