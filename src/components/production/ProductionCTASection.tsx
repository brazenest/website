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
        <section id="production-cta" aria-labelledby="production-cta-title" class="ui-cta-panel flex flex-col gap-4 md:gap-5">
          <div class="ui-cta-layout">
            <div class="flex flex-col gap-4 md:gap-5">
              <p class="ui-meta-label">Next</p>

              <h2 id="production-cta-title" class="ui-cta-title">
                See the full editorial breakdown.
              </h2>

              <p class="ui-cta-text max-w-[42ch]">
                Read the case study for framing, coverage, and pacing decisions, then compare the engineering side or start a project with a sharper visual standard from day one.
              </p>

              <div class="ui-cta-group flex-col items-stretch gap-3 sm:flex-row sm:items-start sm:gap-2">
                <ButtonLink
                  href={caseStudyHref}
                  label="Read the Case Study"
                  variant="primary"
                  class="w-full sm:w-auto"
                />
                <ButtonLink
                  href="/contact"
                  label="Start a Project"
                  variant="secondary"
                  class="w-full sm:w-auto"
                />
              </div>
            </div>

            <div class="ui-cta-image ui-editorial-frame aspect-[5/4]">
              <img
                src="/media/generated/production-hero-storycraft.png"
                alt="Editorial production image showing directed cinematic work."
                width={1536}
                height={1024}
                loading="lazy"
                class="h-full w-full object-cover"
              />
            </div>
          </div>
        </section>
      </Container>
    </Section>
  )
})
