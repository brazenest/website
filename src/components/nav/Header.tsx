import { component$ } from '@builder.io/qwik'
import { Container } from '~/components/ui/Container'
import { MobileMenu } from '~/components/nav/MobileMenu'

export const Header = component$(() => {
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
            class="text-sm font-semibold tracking-tight transition hover:text-[var(--muted)] focus-visible:rounded-[var(--radius-lg)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--focus)] focus-visible:ring-offset-2"
          >
            Alden Gillespy
          </a>

          <nav aria-label="Primary" class="hidden items-center gap-5 md:flex">
            <a
              href="/"
              class="text-sm font-medium text-[var(--muted)] transition hover:text-[var(--fg)] focus-visible:rounded-[var(--radius-lg)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--focus)] focus-visible:ring-offset-2 focus-visible:text-[var(--fg)]"
            >
              Home
            </a>
            <a
              href="/about"
              class="text-sm font-medium text-[var(--muted)] transition hover:text-[var(--fg)] focus-visible:rounded-[var(--radius-lg)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--focus)] focus-visible:ring-offset-2 focus-visible:text-[var(--fg)]"
            >
              About
            </a>
            <a
              href="/resume"
              class="text-sm font-medium text-[var(--muted)] transition hover:text-[var(--fg)] focus-visible:rounded-[var(--radius-lg)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--focus)] focus-visible:ring-offset-2 focus-visible:text-[var(--fg)]"
            >
              Resume
            </a>
            <a
              href="/contact"
              class="text-sm font-medium text-[var(--muted)] transition hover:text-[var(--fg)] focus-visible:rounded-[var(--radius-lg)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--focus)] focus-visible:ring-offset-2 focus-visible:text-[var(--fg)]"
            >
              Contact
            </a>
          </nav>

          <MobileMenu />
        </div>
      </Container>
    </header>
  )
})
