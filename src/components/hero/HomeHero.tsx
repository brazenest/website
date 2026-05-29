import { Slot, component$ } from "@builder.io/qwik";
import { ButtonLink } from "~/components/ui/ButtonLink";
import { Container } from "~/components/ui/Container";
import { Section } from "~/components/ui/Section";
import type { HeroContent } from "~/types/content";

export const HomeHero = component$(
  ({ name, headline, description, visual }: HomeHeroProps) => {
    return (
      <Section spacing="default">
        <Container width="wide">
          <div class="flex flex-col gap-8 md:gap-12">
            <div class="ui-home-hero-grid">
              <div class="ui-hero-copy flex max-w-[70ch] flex-col gap-4 md:gap-6">
                <p class="ui-meta-label">{name}</p>

                <h1 class="ui-hero-title ui-home-hero-title">{headline}</h1>

                <p class="ui-hero-text text-[var(--muted)]">{description}</p>

                <div class="ui-cta-group ui-cta-actions ui-home-hero-actions">
                  <ButtonLink
                    href="/contact"
                    label="Start a Project"
                    variant="primary"
                  />
                  <ButtonLink
                    href="/work"
                    label="View Work"
                    variant="secondary"
                  />
                </div>

                <ul class="ui-home-hero-points" aria-label="Core services">
                  <li>Sites that sell expertise clearly</li>
                  <li>Audits for speed, SEO, UX, and architecture</li>
                  <li>Founder media, profile films, and launch assets</li>
                </ul>
              </div>

              {visual ? (
                <div class="ui-home-hero-visual">
                  <div class="ui-editorial-frame aspect-[5/4] sm:aspect-[6/5]">
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
