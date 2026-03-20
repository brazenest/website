import { component$ } from '@builder.io/qwik'
import { ButtonLink } from '~/components/ui/ButtonLink'
import { Container } from '~/components/ui/Container'
import { Section } from '~/components/ui/Section'

/**
 * Secondary section: "Next Steps" CTA
 * Rendered below-the-fold on the engineering page.
 */
export const EngineeringCTASection = component$(() => {
  return (
    <Section spacing="compact">
      <Container width="content">
        <section id="engineering-cta" aria-labelledby="engineering-cta-title" class="flex flex-col gap-4 md:gap-5">
          <h2 id="engineering-cta-title" class="text-sm font-medium uppercase tracking-[0.12em] text-[var(--muted)]">
            Next Steps
          </h2>

          <p class="max-w-[60ch] text-base leading-7 text-[var(--muted)] md:text-lg">
            To go deeper, open a case study for architecture rationale, tradeoffs, and
            implementation detail. Or explore the <a href="/production" class="underline hover:no-underline">production side</a> of the practice, then <a href="/contact" class="underline hover:no-underline">discuss a project or role</a>.
          </p>

          <div class="ui-cta-group flex-col items-stretch gap-3 sm:flex-row sm:items-start sm:gap-2">
            <ButtonLink
              href="/engineering#selected-work"
              label="Browse Engineering Case Studies"
              variant="primary"
              class="w-full sm:w-auto"
            />
          </div>
        </section>
      </Container>
    </Section>
  )
})
