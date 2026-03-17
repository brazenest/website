import { component$ } from '@builder.io/qwik'
import { Container } from '~/components/ui/Container'

export const Header = component$(() => {
  return (
    <header className="sticky top-0 z-40 border-b border-[var(--border)] bg-[var(--bg)]">
      <Container>
        <div className="flex h-16 items-center justify-between gap-6">
          <a href="/" className="text-sm font-semibold tracking-tight">
            Alden Gillespy
          </a>

          <nav aria-label="Primary" className="flex items-center gap-5">
            <a
              href="/"
              className="text-sm font-medium text-[var(--muted)] transition hover:text-[var(--fg)]"
            >
              Home
            </a>
            <a
              href="/about"
              className="text-sm font-medium text-[var(--muted)] transition hover:text-[var(--fg)]"
            >
              About
            </a>
            <a
              href="/resume"
              className="text-sm font-medium text-[var(--muted)] transition hover:text-[var(--fg)]"
            >
              Resume
            </a>
          </nav>
        </div>
      </Container>
    </header>
  )
})
