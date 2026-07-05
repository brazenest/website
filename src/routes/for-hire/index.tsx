import { component$ } from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";
import { ProjectGrid } from "~/components/engineering/ProjectGrid";
import { MediaGrid } from "~/components/production/MediaGrid";
import { AppShell } from "~/components/layout/AppShell";
import { ButtonLink } from "~/components/ui/ButtonLink";
import { Container } from "~/components/ui/Container";
import { Section } from "~/components/ui/Section";
import { engineeringProjects } from "~/content/engineering/projects";
import { productionProjects } from "~/content/production/projects";
import { staticHeads } from "~/fns/seo/staticHeads";

export const head: DocumentHead = staticHeads["for-hire"];

export default component$(() => {
  return (
    <AppShell animateSections>
      <main id="main-content" class="flex-1 scroll-mt-24 p-0">
        <Section spacing="spacious">
          <Container width="wide">
            <div class="flex flex-col gap-3 md:gap-4">
              <p class="ui-meta-label">For Hire</p>
              <h1 class="text-4xl font-semibold tracking-tight leading-tight md:text-5xl">
                Client work across web engineering and media production.
              </h1>
              <p class="max-w-[56ch] text-base leading-7 text-[var(--muted)] md:text-lg">
                I work with independent professionals, small teams, and
                founder-led projects. These case studies show the context, the
                role I held, and the decisions that shaped the outcome. A
                careful structure and a bias toward work that stays useful after
                the first handoff.
              </p>
              <div class="flex flex-wrap gap-3 pt-2">
                <ButtonLink href="/contact" label="Start a Project" variant="primary" />
                <ButtonLink href="/packages" label="Compare Packages" variant="secondary" />
              </div>
            </div>
          </Container>
        </Section>

        <Section spacing="default">
          <Container width="wide">
            <section
              id="engineering-work"
              aria-labelledby="engineering-work-title"
              class="scroll-mt-24 flex flex-col gap-6 md:gap-8"
              data-scroll-reveal
            >
              <div class="flex flex-col gap-2">
                <p class="ui-meta-label">Engineering</p>
                <h2
                  id="engineering-work-title"
                  class="text-2xl font-semibold tracking-tight md:text-3xl"
                >
                  Systems With Some Staying Power
                </h2>
                <p class="max-w-[60ch] text-base leading-7 text-[var(--muted)] md:text-lg">
                  Architecture, data modeling, state clarity, and interface
                  decisions that make products easier to operate and extend.
                </p>
              </div>

              <ProjectGrid projects={engineeringProjects} />

              <div class="ui-cta-group ui-cta-actions">
                <ButtonLink
                  href="/engineering"
                  label="Explore Engineering Services"
                  variant="secondary"
                />
              </div>
            </section>
          </Container>
        </Section>

        <Section spacing="default">
          <Container width="wide">
            <section
              id="production-work"
              aria-labelledby="production-work-title"
              class="scroll-mt-24 flex flex-col gap-6 md:gap-8"
              data-scroll-reveal
            >
              <div class="flex flex-col gap-2">
                <p class="ui-meta-label">Production</p>
                <h2
                  id="production-work-title"
                  class="text-2xl font-semibold tracking-tight md:text-3xl"
                >
                  Media With a Human Center
                </h2>
                <p class="max-w-[60ch] text-base leading-7 text-[var(--muted)] md:text-lg">
                  Framing, coverage, pacing, and editorial decisions that make
                  people, places, and ideas easier to understand.
                </p>
              </div>

              <MediaGrid projects={productionProjects} />

              <div class="ui-cta-group ui-cta-actions">
                <ButtonLink
                  href="/production"
                  label="Explore Production Services"
                  variant="secondary"
                />
              </div>
            </section>
          </Container>
        </Section>

        <Section spacing="compact">
          <Container width="content">
            <section
              id="for-hire-cta"
              class="ui-bottom-cta ui-cta-panel flex flex-col gap-4 md:gap-5"
              data-scroll-reveal
            >
              <div class="ui-cta-layout">
                <div class="flex flex-col gap-4 md:gap-5">
                  <p class="ui-meta-label">Start a Project</p>

                  <h2 class="ui-cta-title">
                    Working on something that needs a clearer shape online?
                  </h2>

                  <p class="ui-cta-text max-w-[42ch]">
                    Send the current site, idea, or project context. If a full
                    build is not the right first step, a teardown can help
                    clarify what is worth changing next.
                  </p>

                  <div class="ui-cta-group ui-cta-actions">
                    <ButtonLink
                      href="/contact"
                      label="Get in Touch"
                      variant="primary"
                    />
                    <ButtonLink
                      href="/packages"
                      label="View Packages"
                      variant="secondary"
                    />
                  </div>
                </div>

                <div class="ui-cta-image ui-editorial-frame aspect-[5/4]">
                  <img
                    src="/media/generated/about-practice-studio.png"
                    alt="Studio workspace representing engineering and production collaboration."
                    width={1536}
                    height={1024}
                    loading="lazy"
                    class="h-full w-full object-cover"
                  />
                </div>
              </div>
            </section>
          </Container>
        </Section>
      </main>
    </AppShell>
  );
});
