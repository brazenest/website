import { component$ } from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";
import { ProductionHero } from "~/components/hero/ProductionHero";
import { ProductionCTASection } from "~/components/production/ProductionCTASection";
import { ProductionStorySection } from "~/components/production/ProductionStorySection";
import { AppShell } from "~/components/layout/AppShell";
import { MediaGrid } from "~/components/production/MediaGrid";
import { Container } from "~/components/ui/Container";
import { Section } from "~/components/ui/Section";
import { productionHeroContent } from "~/content/production/hero";
import { productionProjects } from "~/content/production/projects";
import { staticHeads } from "~/fns/seo/staticHeads";

export const head: DocumentHead = staticHeads.production;

export default component$(() => {
  const featuredProject = productionProjects[0];
  const caseStudyHref = featuredProject
    ? `/production/projects/${featuredProject.slug}`
    : "/production";

  return (
    <AppShell>
      <main id="main-content" class="flex-1 p-0">
        <ProductionHero {...productionHeroContent} />

        <Section spacing="default">
          <Container width="wide">
            <section
              id="selected-work"
              aria-labelledby="selected-work-title"
              class="scroll-mt-24 flex flex-col gap-6 md:gap-8"
            >
              <div class="flex flex-col gap-2">
                <p class="ui-meta-label">Selected Work</p>
                <h2
                  id="selected-work-title"
                  class="text-2xl font-semibold tracking-tight md:text-3xl"
                >
                  Production Case Studies
                </h2>
                <p class="max-w-[60ch] text-lg leading-8 text-[var(--muted)]">
                  Start with compact case studies. Each one shows the production
                  context, the role I held, and the framing, coverage, pacing,
                  and editorial decisions that shaped the final asset. They also
                  show how one production window can be
                  <a href="/production#production-story" class="ui-link-inline">
                    structured to produce stronger outcomes across multiple
                    deliverables
                  </a>
                  .
                </p>
              </div>

              <MediaGrid projects={productionProjects} />
            </section>
          </Container>
        </Section>

        {/* Below-the-fold content sections */}
        <ProductionStorySection />
        <ProductionCTASection caseStudyHref={caseStudyHref} />
      </main>
    </AppShell>
  );
});
