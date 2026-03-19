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
  }: EngineeringHeroProps) => {
    return (
      <Section spacing="default">
        <Container>
          <div class="flex flex-col gap-4 md:gap-7">
            <div class="flex max-w-[68ch] flex-col gap-3 md:gap-4">
              <p class="text-sm font-medium uppercase tracking-[0.12em] text-[var(--muted)]">
                {byline || 'Engineering'}
              </p>

              <h1 class="max-w-[15ch] text-4xl font-semibold leading-tight tracking-tight md:max-w-[12ch] md:text-6xl">
                {headline}
              </h1>

              <p class="max-w-[62ch] text-base leading-7 text-[var(--muted)] md:text-lg">
                {description}
              </p>
            </div>

            <div class="ui-cta-group flex-col items-stretch gap-3 sm:flex-row sm:items-start sm:gap-2">
              <ButtonLink
                href={primaryCtaHref}
                label={primaryCtaLabel}
                variant="primary"
                class="w-full sm:w-auto"
              />
              <ButtonLink
                href={secondaryCtaHref}
                label={secondaryCtaLabel}
                variant="secondary"
                class="w-full sm:w-auto"
              />
            </div>
          </div>
        </Container>
      </Section>
    )
  },
)

type EngineeringHeroProps = EngineeringHeroContent