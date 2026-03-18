import { Slot, component$ } from '@builder.io/qwik'
import { Container } from '~/components/ui/Container'
import { Section } from '~/components/ui/Section'
import type { HeroContent } from '~/types/content'

export const HomeHero = component$(({ name, headline, description }: HomeHeroProps) => {
  return (
    <Section spacing="spacious">
      <Container>
        <div class="flex flex-col gap-8 md:gap-10">
          <div class="flex max-w-[70ch] flex-col gap-4 md:gap-6">
            <p class="text-sm font-medium uppercase tracking-[0.12em] text-[var(--muted)]">
              {name}
            </p>

            <h1 class="max-w-[14ch] text-4xl font-semibold leading-tight tracking-tight md:text-6xl">
              {headline}
            </h1>

            <p class="max-w-[60ch] text-base leading-7 text-[var(--muted)] md:text-lg">
              {description}
            </p>
          </div>

          <Slot />
        </div>
      </Container>
    </Section>
  )
})

type HomeHeroProps = HeroContent