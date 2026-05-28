import { component$ } from '@builder.io/qwik'
import { ButtonLink } from '~/components/ui/ButtonLink'
import { Container } from '~/components/ui/Container'
import { Section } from '~/components/ui/Section'
import type { EngineeringHeroContent } from '~/types/content'

export const EngineeringHero = component$(
  ({
    headline,
    byline,
    description,
    primaryCtaLabel,
    primaryCtaHref,
    secondaryCtaLabel,
    secondaryCtaHref,
    visual,
  }: EngineeringHeroProps) => {
    return (
      <Section spacing="default">
        <Container width="wide">
          <div class="grid gap-8 lg:grid-cols-[minmax(0,1.02fr)_minmax(20rem,0.98fr)] lg:items-start">
            <div class="ui-hero-copy flex flex-col gap-4 md:gap-7">
              <div class="flex max-w-[68ch] flex-col gap-3 md:gap-4">
                <p class="ui-meta-label">
                  {byline || 'Engineering'}
                </p>

                <h1 class="ui-hero-title md:max-w-[11ch]">
                  {headline}
                </h1>

                <p class="ui-hero-text text-[var(--muted)]">
                  {description}
                </p>
              </div>

              <div class="ui-cta-group ui-cta-actions">
                <ButtonLink
                  href={primaryCtaHref}
                  label={primaryCtaLabel}
                  variant="primary"
                />
                <ButtonLink
                  href={secondaryCtaHref}
                  label={secondaryCtaLabel}
                  variant="secondary"
                />
              </div>
            </div>

            {visual ? (
              <div class="hidden lg:block lg:pt-2">
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

type EngineeringHeroProps = EngineeringHeroContent
