import { component$ } from '@builder.io/qwik'
import { ButtonLink } from '~/components/ui/ButtonLink'
import { Container } from '~/components/ui/Container'
import { Section } from '~/components/ui/Section'
import type { ProductionHeroContent } from '~/types/content'

export const ProductionHero = component$(
  ({ headline, byline, description, primaryCtaLabel, primaryCtaHref, visual }: ProductionHeroProps) => {
    return (
      <Section spacing="default">
        <Container width="full">
          <div class="grid gap-8 lg:grid-cols-[minmax(0,1.02fr)_minmax(20rem,0.98fr)] lg:items-start">
            <div class="ui-hero-copy flex flex-col gap-5 md:gap-8">
              <div class="flex max-w-[72ch] flex-col gap-3 md:gap-5">
                <p class="ui-meta-label">
                  {byline || 'Production'}
                </p>

                <h1 class="ui-hero-title md:max-w-[12ch]">
                  {headline}
                </h1>

                <p class="ui-hero-text text-[var(--muted)]">
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

            {visual ? (
              <div class="lg:pt-2">
                <div class="ui-editorial-frame aspect-[6/5]">
                  <img
                    src={visual.src}
                    alt={visual.alt}
                    width={1536}
                    height={1024}
                    loading="eager"
                    class="h-full w-full object-cover"
                  />
                </div>
              </div>
            ) : null}
          </div>
        </Container>
      </Section>
    )
  },
)

type ProductionHeroProps = ProductionHeroContent
