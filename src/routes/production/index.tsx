import { component$ } from '@builder.io/qwik'
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

export default component$(() => {
  return (
    <PageShell theme="production">
      <Header />

      <main id="main-content" class="flex-1">
        <ProductionHero {...productionHeroContent} />

        <Section spacing="default">
          <Container>
            <div class="flex flex-col gap-6 md:gap-8">
              <div class="flex flex-col gap-2">
                <h2 class="text-2xl font-semibold tracking-tight md:text-3xl">
                  Featured Work
                </h2>
              </div>

              <MediaGrid projects={productionProjects} />
            </div>
          </Container>
        </Section>

        <Section spacing="compact">
          <Container width="narrow">
            <div class="flex flex-col gap-6 md:gap-8">
              <div class="flex flex-col gap-2">
                <h2 class="text-2xl font-semibold tracking-tight md:text-3xl">
                  Process
                </h2>
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
      </main>

      <Footer />
    </PageShell>
  )
})
