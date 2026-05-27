import { Slot, component$ } from "@builder.io/qwik";
import { Container } from "~/components/ui/Container";
import { Section } from "~/components/ui/Section";
import type { HeroContent } from "~/types/content";

export const HomeHero = component$(
  ({ name, headline, description, visual }: HomeHeroProps) => {
    return (
      <Section spacing="default">
        <Container width="wide">
          <div class="flex flex-col gap-6 md:gap-10">
            <div class="grid gap-8 lg:grid-cols-[minmax(0,1.05fr)_minmax(18rem,0.95fr)] lg:items-start">
              <div class="ui-hero-copy flex max-w-[70ch] flex-col gap-3 md:gap-6">
                <p class="ui-meta-label">{name}</p>

                <h1 class="ui-hero-title md:max-w-[12ch]">
                  {headline}
                </h1>

                <p class="ui-hero-text text-[var(--muted)]">
                  {description}
                </p>
              </div>

              {visual ? (
                <div class="lg:pt-2">
                  <div class="ui-editorial-frame aspect-[6/5]">
                    <img
                      src={visual.src}
                      alt={visual.alt}
                      width={1200}
                      height={1000}
                      loading="eager"
                      class="h-full w-full object-cover"
                    />
                  </div>
                </div>
              ) : null}
            </div>

            <Slot />
          </div>
        </Container>
      </Section>
    );
  },
);

type HomeHeroProps = HeroContent;
