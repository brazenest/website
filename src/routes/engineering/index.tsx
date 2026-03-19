import { component$ } from '@builder.io/qwik'
import type { DocumentHead } from '@builder.io/qwik-city'
import { ProjectGrid } from '~/components/engineering/ProjectGrid'
import { Footer } from '~/components/footer/Footer'
import { EngineeringHero } from '~/components/hero/EngineeringHero'
import { PageShell } from '~/components/layout/PageShell'
import { Header } from '~/components/nav/Header'
import { Container } from '~/components/ui/Container'
import { Section } from '~/components/ui/Section'
import { ButtonLink } from '~/components/ui/ButtonLink'
import { engineeringHeroContent } from '~/content/engineering/hero'
import { engineeringProjects } from '~/content/engineering/projects'
import { systemThinkingItems } from '~/content/engineering/system-thinking'
import { buildMetadata } from '~/fns/seo/buildMetadata'
import { metadataToDocumentHead } from '~/fns/seo/metadataToDocumentHead'
import { seoPresets } from '~/config/seo'

export const head: DocumentHead = metadataToDocumentHead(
  buildMetadata({
    ...seoPresets.engineering,
    pathname: '/engineering',
  })
)

export default component$(() => {
  return (
    <PageShell theme="engineering">
      <Header />
      <main id="main-content" class="flex-1 p-0">
        <EngineeringHero {...engineeringHeroContent} />

        <Section spacing="default">
          <Container>
            <div id="selected-work" class="scroll-mt-24 flex flex-col gap-6 md:gap-8">
              <div class="flex flex-col gap-2">
                <h2 class="text-2xl font-semibold tracking-tight md:text-3xl">Selected Engineering Case Studies</h2>
                <p class="max-w-[60ch] text-base leading-7 text-[var(--muted)]">
                  Start with compact case studies. Each case study surfaces the operating challenge,
                  the engineering role I held, and the architectural judgment that made the system
                  resilient and maintainable.
                </p>
              </div>

              <ProjectGrid projects={engineeringProjects} />
            </div>
          </Container>
        </Section>

        <Section spacing="compact">
          <Container width="content">
            <div id="system-thinking" class="scroll-mt-24 flex flex-col gap-6 md:gap-8">
              <div class="flex flex-col gap-2">
                <h2 class="text-2xl font-semibold tracking-tight md:text-3xl">How I Make System Decisions</h2>
                <p class="max-w-[60ch] text-base leading-7 text-[var(--muted)]">
                  The projects show the outcomes; these principles explain the decision model behind
                  them.
                </p>
              </div>

              <div class="flex flex-col gap-5 md:gap-6">
                {systemThinkingItems.map((item) => (
                  <div key={item.title} class="flex flex-col gap-2">
                    <h3 class="text-lg font-medium tracking-tight md:text-xl">{item.title}</h3>
                    <p class="text-base leading-7 text-[var(--muted)]">{item.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </Container>
        </Section>
        <Section spacing="compact">
          <Container width="content">
            <div id="engineering-cta" class="flex flex-col gap-4 md:gap-5">
              <p class="text-sm font-medium uppercase tracking-[0.12em] text-[var(--muted)]">
                Next
              </p>

              <p class="max-w-[60ch] text-base leading-7 text-[var(--muted)] md:text-lg">
                To go deeper, open a case study for architecture rationale, tradeoffs, and
                implementation detail.
              </p>

              <div class="ui-cta-group flex-col items-stretch gap-3 sm:flex-row sm:items-start sm:gap-2">
                <ButtonLink
                  href="/engineering#selected-work"
                  label="Browse Engineering Case Studies"
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
