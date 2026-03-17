import { component$ } from '@builder.io/qwik'
import { TextLink } from '~/components/ui/TextLink'
import { Container } from '~/components/ui/Container'
import { Section } from '~/components/ui/Section'
import type { EngineeringHeroContent } from '~/types/content'

export const EngineeringHero = component$(
  ({
    headline,
    description,
    primaryCtaLabel,
    primaryCtaHref,
    secondaryCtaLabel,
    secondaryCtaHref,
  }: EngineeringHeroProps) => {
    return (
      <Section spacing="hero">
        <Container>
          <div class="flex flex-col gap-5 md:gap-7">
            <div class="flex max-w-[68ch] flex-col gap-3 md:gap-4">
              <p class="text-sm font-medium uppercase tracking-[0.12em] text-[var(--muted)]">
                Engineering
              </p>

              <h1 class="max-w-[12ch] text-4xl font-semibold leading-tight tracking-tight md:text-6xl">
                {headline}
              </h1>

              <p class="max-w-[62ch] text-base leading-7 text-[var(--muted)] md:text-lg">
                {description}
              </p>
            </div>

            <div class="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center sm:gap-5">
              <TextLink href={primaryCtaHref} label={primaryCtaLabel} />
              <TextLink href={secondaryCtaHref} label={secondaryCtaLabel} />
            </div>
          </div>
        </Container>
      </Section>
    )
  },
)

type EngineeringHeroProps = EngineeringHeroContent