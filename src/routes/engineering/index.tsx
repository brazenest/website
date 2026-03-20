import { component$ } from '@builder.io/qwik'
import type { DocumentHead } from '@builder.io/qwik-city'
import { ProjectGrid } from '~/components/engineering/ProjectGrid'
import { EngineeringCTASection } from '~/components/engineering/EngineeringCTASection'
import { SystemThinkingSection } from '~/components/engineering/SystemThinkingSection'
import { Footer } from '~/components/footer/Footer'
import { EngineeringHero } from '~/components/hero/EngineeringHero'
import { PageShell } from '~/components/layout/PageShell'
import { Header } from '~/components/nav/Header'
import { Container } from '~/components/ui/Container'
import { Section } from '~/components/ui/Section'
import { engineeringHeroContent } from '~/content/engineering/hero'
import { engineeringProjects } from '~/content/engineering/projects'
import { staticHeads } from '~/fns/seo/staticHeads'

export const head: DocumentHead = staticHeads.engineering

export default component$(() => {
  return (
    <PageShell theme="engineering">
      <Header />
      <main id="main-content" class="flex-1 p-0">
        <EngineeringHero {...engineeringHeroContent} />

        <Section spacing="default">
          <Container>
            <section id="selected-work" aria-labelledby="selected-work-title" class="scroll-mt-24 flex flex-col gap-6 md:gap-8">
              <div class="flex flex-col gap-2">
                <h2 id="selected-work-title" class="text-2xl font-semibold tracking-tight md:text-3xl">Selected Engineering Case Studies</h2>
                <p class="max-w-[60ch] text-base leading-7 text-[var(--muted)]">
                  Start with compact case studies. Each case study surfaces the operating challenge,
                  the engineering role I held, and the architectural judgment that made the system
                  resilient and maintainable.
                </p>
              </div>

              <ProjectGrid projects={engineeringProjects} />
            </section>
          </Container>
        </Section>

        {/* Below-the-fold content sections */}
        <SystemThinkingSection />
        <EngineeringCTASection />
      </main>
      <Footer />
    </PageShell>
  )
})
