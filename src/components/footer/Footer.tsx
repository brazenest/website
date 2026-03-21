import { component$ } from '@builder.io/qwik'
import { Container } from '~/components/ui/Container'
import { releaseDateLabel, releaseLabel } from '~/config/site'
import { TextLink } from '~/components/ui/TextLink'

export const Footer = component$(() => {
  return (
    <footer class="border-t border-[var(--border)] bg-[var(--surface-subtle)]">
      <Container>
        <div class="py-12 md:py-16">
          <div class="grid gap-8 md:grid-cols-3 md:gap-10">
            <div class="flex flex-col gap-3">
              <p class="text-base font-semibold tracking-tight">Alden Gillespy</p>
              <p class="max-w-[28ch] text-sm leading-6 text-[var(--muted)]">
                Software engineering and cinematic production, structured as one practice.
              </p>
            </div>

            <div class="flex flex-col gap-3">
              <p class="text-sm font-semibold tracking-tight">Navigation</p>
              <nav aria-label="Footer" class="flex flex-col gap-2">
                <a
                  href="/"
                  class="rounded-[var(--radius-lg)] text-sm text-[var(--muted)] transition-colors duration-[var(--motion-duration-quick)] ease-[var(--motion-easing-quick)] hover:text-[var(--fg)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--focus)] focus-visible:ring-offset-2 focus-visible:text-[var(--fg)]"
                >
                  Home
                </a>
                <a
                  href="/about"
                  class="rounded-[var(--radius-lg)] text-sm text-[var(--muted)] transition-colors duration-[var(--motion-duration-quick)] ease-[var(--motion-easing-quick)] hover:text-[var(--fg)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--focus)] focus-visible:ring-offset-2 focus-visible:text-[var(--fg)]"
                >
                  About
                </a>
                <a
                  href="/resume"
                  class="rounded-[var(--radius-lg)] text-sm text-[var(--muted)] transition-colors duration-[var(--motion-duration-quick)] ease-[var(--motion-easing-quick)] hover:text-[var(--fg)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--focus)] focus-visible:ring-offset-2 focus-visible:text-[var(--fg)]"
                >
                  Resume
                </a>
                <a
                  href="/blog"
                  class="rounded-[var(--radius-lg)] text-sm text-[var(--muted)] transition-colors duration-[var(--motion-duration-quick)] ease-[var(--motion-easing-quick)] hover:text-[var(--fg)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--focus)] focus-visible:ring-offset-2 focus-visible:text-[var(--fg)]"
                >
                  Blog
                </a>
                <a
                  href="/contact"
                  class="rounded-[var(--radius-lg)] text-sm text-[var(--muted)] transition-colors duration-[var(--motion-duration-quick)] ease-[var(--motion-easing-quick)] hover:text-[var(--fg)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--focus)] focus-visible:ring-offset-2 focus-visible:text-[var(--fg)]"
                >
                  Contact
                </a>
                <a
                  href="/engineering"
                  class="rounded-[var(--radius-lg)] text-sm text-[var(--muted)] transition-colors duration-[var(--motion-duration-quick)] ease-[var(--motion-easing-quick)] hover:text-[var(--fg)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--focus)] focus-visible:ring-offset-2 focus-visible:text-[var(--fg)]"
                >
                  Engineering
                </a>
                <a
                  href="/production"
                  class="rounded-[var(--radius-lg)] text-sm text-[var(--muted)] transition-colors duration-[var(--motion-duration-quick)] ease-[var(--motion-easing-quick)] hover:text-[var(--fg)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--focus)] focus-visible:ring-offset-2 focus-visible:text-[var(--fg)]"
                >
                  Production
                </a>
              </nav>
            </div>

            <div class="flex flex-col gap-3">
              <p class="text-sm font-semibold tracking-tight">Contact</p>
              <p class="max-w-[30ch] text-sm leading-6 text-[var(--muted)]">
                Engineering work, production inquiries, and selected opportunities.
              </p>
              <div>
                <TextLink href="/contact" label="Start a project conversation" />
              </div>
            </div>
          </div>

          <div class="mt-10 border-t border-[var(--border)] pt-5 text-sm text-[var(--muted)] md:mt-12 md:flex md:items-center md:justify-between md:gap-6">
            <p>Release {releaseLabel}</p>
            <p>Published {releaseDateLabel}</p>
          </div>
        </div>
      </Container>
    </footer>
  )
})
