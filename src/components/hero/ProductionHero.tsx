import { component$ } from '@builder.io/qwik'
import { ButtonLink } from '~/components/ui/ButtonLink'
import { Container } from '~/components/ui/Container'
import { Section } from '~/components/ui/Section'
import type { ProductionHeroContent } from '~/types/content'

export const ProductionHero = component$(
  ({ headline, description, primaryCtaLabel, primaryCtaHref }: ProductionHeroProps) => {
    return (
      <Section spacing="spacious">
        <Container>
          <div class="flex flex-col gap-6 md:gap-8">
            <div class="flex max-w-[72ch] flex-col gap-4 md:gap-5">
              <p class="text-sm font-medium uppercase tracking-[0.12em] text-[var(--muted)]">
                Production
              </p>

              <h1 class="max-w-[15ch] text-4xl font-semibold leading-tight tracking-tight md:text-6xl">
                {headline}
              </h1>

              <p class="max-w-[65ch] text-base leading-7 text-[var(--muted)] md:text-lg">
                {description}
              </p>
            </div>

            <div class="ui-cta-group">
              <ButtonLink href={primaryCtaHref} label={primaryCtaLabel} variant="primary" />
            </div>
          </div>
        </Container>
      </Section>
    )
  },
)

type ProductionHeroProps = ProductionHeroContent