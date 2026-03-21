import { Slot, component$ } from '@builder.io/qwik'
import { ButtonLink } from '~/components/ui/ButtonLink'
import { Container } from '~/components/ui/Container'
import { Section } from '~/components/ui/Section'
import type { HeroContent } from '~/types/content'

export const HomeHero = component$(({ name, headline, description, ctas }: HomeHeroProps) => {
  return (
    <Section spacing="default">
      <Container>
        <div class="flex flex-col gap-6 md:gap-10">
          <div class="flex max-w-[70ch] flex-col gap-3 md:gap-6">
            <p class="ui-meta-label">
              {name}
            </p>

            <h1 class="max-w-[16ch] text-4xl font-semibold leading-tight tracking-tight md:max-w-[14ch] md:text-6xl">
              {headline}
            </h1>

            <p class="max-w-[60ch] text-base leading-7 text-[var(--muted)] md:text-lg">
              {description}
            </p>

            {ctas?.length ? (
              <div class="ui-cta-group flex-col items-stretch gap-3 pt-2 sm:flex-row sm:items-start sm:gap-2">
                {ctas.map((cta) => (
                  <ButtonLink
                    key={`${cta.href}-${cta.label}`}
                    href={cta.href}
                    label={cta.label}
                    variant={cta.variant || 'secondary'}
                    class="w-full sm:w-auto"
                  />
                ))}
              </div>
            ) : null}
          </div>

          <Slot />
        </div>
      </Container>
    </Section>
  )
})

type HomeHeroProps = HeroContent