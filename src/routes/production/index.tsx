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
import { buildMetadata } from '~/fns/seo/buildMetadata'
import { metadataToDocumentHead } from '~/fns/seo/metadataToDocumentHead'
import { seoPresets } from '~/config/seo'

export const head: DocumentHead = metadataToDocumentHead(
  buildMetadata({
    ...seoPresets.production,
    pathname: '/production',
  })
)

export default component$(() => {
  const featuredProject = productionProjects[0]
  const caseStudyHref = featuredProject ? `/production/projects/${featuredProject.slug}` : '/production'

  return (
    <PageShell theme="production">
      <Header />

      <main id="main-content" class="flex-1 p-0">
        <ProductionHero {...productionHeroContent} />

        <Section spacing="default">
          <Container>
            <div id="selected-work" class="scroll-mt-24 flex flex-col gap-6 md:gap-8">
              <div class="flex flex-col gap-2">
                <h2 class="text-2xl font-semibold tracking-tight md:text-3xl">Selected Production Case Studies</h2>
                <p class="max-w-[60ch] text-base leading-7 text-[var(--muted)]">
                  Start with compact case studies. Each case study shows the production context,
                  the role I held, and the framing, coverage, pacing, and editorial decisions
                  that shaped the final result.
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
                <h2 class="text-2xl font-semibold tracking-tight md:text-3xl">How I Build the Story</h2>
                <p class="max-w-[60ch] text-base leading-7 text-[var(--muted)]">
                  After the finished work, here is the repeatable method behind it: define visual
                  intent, capture adaptable coverage, and cut for rhythm, clarity, and mood.
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
                To see this approach end-to-end, the full case study covers framing decisions,
                coverage strategy, and editorial choices from concept to final cut.
              </p>

              <div class="ui-cta-group flex-col items-stretch gap-3 sm:flex-row sm:items-start sm:gap-2">
                <ButtonLink
                  href={caseStudyHref}
                  label="Read the Case Study"
                  variant="primary"
                  class="w-full sm:w-auto"
                />
              </div>
            </div>
          </Container>
        </Section>
      </main>

      <Footer />
    </PageShell>
  )
})
