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
        <section id="home-cta" aria-labelledby="home-cta-title" class="flex flex-col gap-4 md:gap-5">
          <h2 id="home-cta-title" class="ui-meta-label">
            Ready to explore?
          </h2>

          <p class="max-w-[60ch] text-base leading-7 text-[var(--muted)] md:text-lg">
            Review case studies across engineering and production, explore service packages, or start a conversation about your next project.
          </p>

          <div class="ui-cta-group flex-col items-stretch gap-3 sm:flex-row sm:items-start sm:gap-2">
            <ButtonLink
              href="/packages"
              label="View Packages"
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
        </section>
      </Container>
    </Section>
  )
})
