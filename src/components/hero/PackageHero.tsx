import { component$ } from '@builder.io/qwik'
import { Container } from '~/components/ui/Container'
import { Section } from '~/components/ui/Section'
import type { PackageHeroContent } from '~/types/content'

export const PackageHero = component$(
  ({ headline, byline, description }: PackageHeroProps) => {
    return (
      <Section spacing="default">
        <Container>
          <div class="flex max-w-[68ch] flex-col gap-3 md:gap-4">
            {byline ? (
              <p class="ui-meta-label">
                {byline}
              </p>
            ) : null}

            <h1 class="text-4xl font-semibold leading-tight tracking-tight md:text-6xl">
              {headline}
            </h1>

            <p class="max-w-[62ch] text-base leading-7 text-[var(--muted)] md:text-lg">
              {description}
            </p>
          </div>
        </Container>
      </Section>
    )
  },
)

type PackageHeroProps = PackageHeroContent
