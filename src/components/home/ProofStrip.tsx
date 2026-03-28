import { component$ } from '@builder.io/qwik'
import { Container } from '~/components/ui/Container'
import { Section } from '~/components/ui/Section'
import type { ProofItem } from '~/types/content'

type ProofStripProps = {
  items: ProofItem[]
}

export const ProofStrip = component$(({ items }: ProofStripProps) => {
  return (
    <Section spacing="compact" surface="subtle">
      <Container width="wide">
        <section class="flex flex-col gap-3 md:gap-4">
          <p class="ui-meta-label">Proof</p>

          <ul class="grid gap-4 md:grid-cols-3">
            {items.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  class="group flex flex-col gap-2 rounded-[var(--radius-lg)] border border-[var(--border)] bg-[var(--surface)] px-4 py-3 transition-colors duration-[var(--motion-duration-quick)] ease-[var(--motion-easing-quick)] hover:border-[var(--fg)] hover:bg-[var(--surface-subtle)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--focus)] focus-visible:ring-offset-2 md:px-5 md:py-4"
                >
                  <p class="text-sm font-semibold text-[var(--fg)] transition-colors group-hover:text-[var(--state-hover-accent)]">
                    {item.title}
                  </p>
                  <p class="text-xs leading-5 text-[var(--muted)] transition-colors group-hover:text-[var(--fg)]">
                    {item.statement}
                  </p>
                </a>
              </li>
            ))}
          </ul>
        </section>
      </Container>
    </Section>
  )
})
