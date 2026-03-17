import { component$ } from '@builder.io/qwik'
import { Container } from '~/components/ui/Container'
import { MobileMenu } from '~/components/nav/MobileMenu'

export const Header = component$(() => {
  return (
    <header class="sticky top-0 z-40 border-b border-[var(--border)] bg-[var(--bg)]/90 backdrop-blur-sm">
      <Container>
        <div class="relative flex h-16 items-center justify-between gap-6">
          <a href="/" class="text-sm font-semibold tracking-tight">
            Alden Gillespy
          </a>

          <nav aria-label="Primary" class="hidden items-center gap-5 md:flex">
            <a
              href="/"
              class="text-sm font-medium text-[var(--muted)] transition hover:text-[var(--fg)]"
            >
              Home
            </a>
            <a
              href="/about"
              class="text-sm font-medium text-[var(--muted)] transition hover:text-[var(--fg)]"
            >
              About
            </a>
            <a
              href="/resume"
              class="text-sm font-medium text-[var(--muted)] transition hover:text-[var(--fg)]"
            >
              Resume
            </a>
          </nav>

          <MobileMenu />
        </div>
      </Container>
    </header>
  )
})
