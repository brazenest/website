import { component$ } from '@builder.io/qwik'
import { ButtonLink } from '~/components/ui/ButtonLink'
import { Container } from '~/components/ui/Container'
import { Section } from '~/components/ui/Section'
import type { ProductionHeroContent } from '~/types/content'

export const ProductionHero = component$(
  ({ headline, byline, description, primaryCtaLabel, primaryCtaHref }: ProductionHeroProps) => {
    return (
      <Section spacing="default">
        <Container>
          <div class="flex flex-col gap-5 md:gap-8">
            <div class="flex max-w-[72ch] flex-col gap-3 md:gap-5">
              <p class="ui-meta-label">
                {byline || 'Production'}
              </p>

              <h1 class="max-w-[16ch] text-4xl font-semibold leading-tight tracking-tight md:max-w-[15ch] md:text-6xl">
                {headline}
              </h1>

              <p class="max-w-[65ch] text-base leading-7 text-[var(--muted)] md:text-lg">
                {description}
              </p>
            </div>

            <div class="ui-cta-group w-full">
              <ButtonLink
                href={primaryCtaHref}
                label={primaryCtaLabel}
                variant="primary"
                class="w-full sm:w-auto"
              />
            </div>
          </div>
        </Container>
      </Section>
    )
  },
)

type ProductionHeroProps = ProductionHeroContent