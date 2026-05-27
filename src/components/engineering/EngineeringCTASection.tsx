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
        <section id="engineering-cta" aria-labelledby="engineering-cta-title" class="ui-bottom-cta ui-cta-panel flex flex-col gap-4 md:gap-5">
          <div class="ui-cta-layout">
            <div class="flex flex-col gap-4 md:gap-5">
              <p class="ui-meta-label">Next</p>

              <h2 id="engineering-cta-title" class="ui-cta-title">
                Go deeper into the systems work.
              </h2>

              <p class="ui-cta-text max-w-[42ch]">
                Open a case study for architecture rationale and implementation choices, then compare how the production side sharpens the same practice into something people can immediately trust.
              </p>

              <div class="ui-cta-group ui-cta-actions">
                <ButtonLink
                  href="/engineering#selected-work"
                  label="Browse Case Studies"
                  variant="primary"
                />
                <ButtonLink
                  href="/contact"
                  label="Start a Project"
                  variant="secondary"
                />
              </div>
            </div>

            <div class="ui-cta-image ui-editorial-frame aspect-[5/4]">
              <img
                src="/media/generated/engineering-hero-systems.png"
                alt="Editorial engineering image showing structured technical work."
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
