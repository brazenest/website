import { component$ } from '@builder.io/qwik'
import type { DocumentHead } from '@builder.io/qwik-city'
import { ButtonLink } from '~/components/ui/ButtonLink'
import { Footer } from '~/components/footer/Footer'
import { ProductionHero } from '~/components/hero/ProductionHero'
import { PageShell } from '~/components/layout/PageShell'
import { Header } from '~/components/nav/Header'
import { MediaGrid } from '~/components/production/MediaGrid'
import { Container } from '~/components/ui/Container'
import { Section } from '~/components/ui/Section'
import { processItems } from '~/content/production/process'
import { productionHeroContent } from '~/content/production/hero'
import { productionProjects } from '~/content/production/projects'
import { buildTitle } from '~/fns/seo'

export const head: DocumentHead = {
  title: buildTitle('Production'),
  meta: [
    {
      name: 'description',
      content:
        'Production side of Alden Gillespy\'s work, focused on visual storytelling, editorial judgment, and cinematic craft.',
    },
  ],
}

export default component$(() => {
  const featuredProject = productionProjects[0]
  const caseStudyHref = featuredProject ? `/production/projects/${featuredProject.slug}` : '/production'

  return (
    <PageShell theme="production">
      <Header />

      <main id="main-content" class="flex-1">
        <ProductionHero {...productionHeroContent} />

        <Section spacing="default">
          <Container>
            <div id="selected-work" class="flex flex-col gap-6 md:gap-8">
              <div class="flex flex-col gap-2">
                <h2 class="text-2xl font-semibold tracking-tight md:text-3xl">Selected Work</h2>
                <p class="max-w-[60ch] text-base leading-7 text-[var(--muted)]">
                  Selected projects from the production side, chosen for the storytelling decisions
                  they make visible: framing, coverage strategy, pacing, and editorial control.
                </p>
              </div>

              <MediaGrid projects={productionProjects} />
            </div>
          </Container>
        </Section>

        <Section spacing="compact">
          <Container width="content">
            <div class="flex flex-col gap-6 md:gap-8">
              <div class="flex flex-col gap-2">
                <h2 class="text-2xl font-semibold tracking-tight md:text-3xl">Storytelling Approach</h2>
                <p class="max-w-[60ch] text-base leading-7 text-[var(--muted)]">
                  This approach stays practical: define visual intent, capture adaptable coverage,
                  and cut for rhythm, clarity, and mood.
                </p>
              </div>

              <div class="flex flex-col gap-5 md:gap-6">
                {processItems.map((item) => (
                  <div key={item.title} class="flex flex-col gap-2">
                    <h3 class="text-lg font-medium tracking-tight md:text-xl">
                      {item.title}
                    </h3>
                    <p class="text-base leading-7 text-[var(--muted)]">
                      {item.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </Container>
        </Section>

        <Section spacing="compact">
          <Container width="content">
            <div id="production-cta" class="flex flex-col gap-4 md:gap-5">
              <p class="text-sm font-medium uppercase tracking-[0.12em] text-[var(--muted)]">
                Next
              </p>

              <p class="max-w-[60ch] text-base leading-7 text-[var(--muted)] md:text-lg">
                The full case study covers framing decisions, coverage strategy, and editorial choices
                from concept to final cut.
              </p>

              <div class="ui-cta-group flex-col items-start sm:flex-row">
                <ButtonLink href={caseStudyHref} label="Read the Case Study" variant="primary" />
              </div>
            </div>
          </Container>
        </Section>
      </main>

      <Footer />
    </PageShell>
  )
})
