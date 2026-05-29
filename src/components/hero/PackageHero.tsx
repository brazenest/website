import { component$ } from '@builder.io/qwik'
import { Container } from '~/components/ui/Container'
import { Section } from '~/components/ui/Section'
import type { PackageHeroContent } from '~/types/content'

export const PackageHero = component$(
  ({ headline, byline, description, visual }: PackageHeroProps) => {
    return (
      <Section spacing="default">
        <Container width="wide">
          <div class="grid gap-8 lg:grid-cols-[minmax(0,1.02fr)_minmax(20rem,0.98fr)] lg:items-start">
            <div class="ui-hero-copy flex max-w-[68ch] flex-col gap-3 md:gap-4">
              {byline ? (
                <p class="ui-meta-label">
                  {byline}
                </p>
              ) : null}

              <h1 class="ui-hero-title">
                {headline}
              </h1>

              <p class="ui-hero-text text-[var(--muted)]">
                {description}
              </p>
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

type PackageHeroProps = PackageHeroContent
