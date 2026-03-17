import { component$ } from '@builder.io/qwik'
import { Container } from '~/components/ui/Container'
import { TextLink } from '~/components/ui/TextLink'

export const Footer = component$(() => {
  return (
    <footer class="border-t border-[var(--border)] bg-[var(--surface-subtle)]">
      <Container>
        <div class="grid gap-8 py-12 md:grid-cols-3 md:gap-10 md:py-16">
          <div class="flex flex-col gap-3">
            <p class="text-base font-semibold tracking-tight">Alden Gillespy</p>
            <p class="max-w-[28ch] text-sm leading-6 text-[var(--muted)]">
              Software engineering and cinematic production, structured as one practice.
            </p>
          </div>

          <div class="flex flex-col gap-3">
            <p class="text-sm font-semibold tracking-tight">Navigation</p>
            <nav aria-label="Footer" class="flex flex-col gap-2">
              <a href="/" class="text-sm text-[var(--muted)] transition hover:text-[var(--fg)]">
                Home
              </a>
              <a
                href="/about"
                class="text-sm text-[var(--muted)] transition hover:text-[var(--fg)]"
              >
                About
              </a>
              <a
                href="/resume"
                class="text-sm text-[var(--muted)] transition hover:text-[var(--fg)]"
              >
                Resume
              </a>
              <a
                href="/engineering"
                class="text-sm text-[var(--muted)] transition hover:text-[var(--fg)]"
              >
                Engineering
              </a>
              <a
                href="/production"
                class="text-sm text-[var(--muted)] transition hover:text-[var(--fg)]"
              >
                Production
              </a>
            </nav>
          </div>

          <div class="flex flex-col gap-3">
            <p class="text-sm font-semibold tracking-tight">Contact</p>
            <p class="max-w-[30ch] text-sm leading-6 text-[var(--muted)]">
              Let's build something interesting.
            </p>
            <div>
              <TextLink href="/about" label="Learn more" />
            </div>
          </div>
        </div>
      </Container>
    </footer>
  )
})
