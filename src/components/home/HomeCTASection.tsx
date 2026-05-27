import { component$ } from '@builder.io/qwik'
import { ButtonLink } from '~/components/ui/ButtonLink'
import { Container } from '~/components/ui/Container'
import { Section } from '~/components/ui/Section'

/**
 * CTA section for homepage
 * Positioned at the end to guide visitors toward initial inquiry or exploration
 */
export const HomeCTASection = component$(() => {
  return (
    <Section spacing="compact">
      <Container width="content">
        <section id="home-cta" aria-labelledby="home-cta-title" class="ui-bottom-cta ui-cta-panel flex flex-col gap-4 md:gap-5">
          <div class="ui-cta-layout">
            <div class="flex flex-col gap-4 md:gap-5">
              <p class="ui-meta-label">Ready</p>

              <h2 id="home-cta-title" class="ui-cta-title">
                Choose your starting point.
              </h2>

              <p class="ui-cta-text max-w-[42ch]">
                Review the case studies, compare the packages, or open the conversation around the platform you need next. The fastest way in is the one that matches the pressure you are under now, then expands into a delivery path that can hold up as your business changes.
              </p>

              <div class="ui-cta-group ui-cta-actions">
                <ButtonLink
                  href="/packages"
                  label="View Packages"
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
                src="/media/generated/home-hero-studio.png"
                alt="Editorial studio image representing the combined engineering and production practice."
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
