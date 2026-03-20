import { component$ } from '@builder.io/qwik'
import type { DocumentHead } from '@builder.io/qwik-city'
import { Footer } from '~/components/footer/Footer'
import { ProductionHero } from '~/components/hero/ProductionHero'
import { ProductionCTASection } from '~/components/production/ProductionCTASection'
import { ProductionStorySection } from '~/components/production/ProductionStorySection'
import { PageShell } from '~/components/layout/PageShell'
import { Header } from '~/components/nav/Header'
import { MediaGrid } from '~/components/production/MediaGrid'
import { Container } from '~/components/ui/Container'
import { Section } from '~/components/ui/Section'
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
            <section id="selected-work" aria-labelledby="selected-work-title" class="scroll-mt-24 flex flex-col gap-6 md:gap-8">
              <div class="flex flex-col gap-2">
                <h2 id="selected-work-title" class="text-2xl font-semibold tracking-tight md:text-3xl">Selected Production Case Studies</h2>
                <p class="max-w-[60ch] text-base leading-7 text-[var(--muted)]">
                  Start with compact case studies. Each case study shows the production context,
                  the role I held, and the framing, coverage, pacing, and editorial decisions
                  that shaped the final result.
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

      <Footer />
    </PageShell>
  )
})
