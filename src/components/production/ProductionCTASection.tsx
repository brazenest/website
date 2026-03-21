import { component$ } from '@builder.io/qwik'
import { ButtonLink } from '~/components/ui/ButtonLink'
import { Container } from '~/components/ui/Container'
import { Section } from '~/components/ui/Section'

/**
 * Secondary section: "Next Steps" CTA
 * Rendered below-the-fold on the production page.
 */
type ProductionCTASectionProps = {
  caseStudyHref: string
}

export const ProductionCTASection = component$(({ caseStudyHref }: ProductionCTASectionProps) => {
  return (
    <Section spacing="compact">
      <Container width="content">
        <section id="production-cta" aria-labelledby="production-cta-title" class="flex flex-col gap-4 md:gap-5">
          <h2 id="production-cta-title" class="ui-meta-label">
            Next Steps
          </h2>

          <p class="max-w-[60ch] text-base leading-7 text-[var(--muted)] md:text-lg">
            To see this approach end-to-end, the full case study covers framing decisions,
            coverage strategy, and editorial choices from concept to final cut. Alternatively, explore the <a href="/engineering" class="underline hover:no-underline">engineering side</a> of the practice, then <a href="/contact" class="underline hover:no-underline">discuss a project or role</a>.
          </p>

          <div class="ui-cta-group flex-col items-stretch gap-3 sm:flex-row sm:items-start sm:gap-2">
            <ButtonLink
              href={caseStudyHref}
              label="Read the Case Study"
              variant="primary"
              class="w-full sm:w-auto"
            />
          </div>
        </section>
      </Container>
    </Section>
  )
})
