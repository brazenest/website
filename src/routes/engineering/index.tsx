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
import { buildTitle } from '~/fns/seo'

export const head: DocumentHead = {
  title: buildTitle('Engineering'),
  meta: [
    {
      name: 'description',
      content:
        'Engineering side of Alden Gillespy\'s work, focused on systems architecture, implementation tradeoffs, and maintainable software.',
    },
  ],
}

export default component$(() => {
  return (
    <PageShell theme="engineering">
      <Header />
      <main id="main-content" class="flex-1">
        <EngineeringHero {...engineeringHeroContent} />

        <Section spacing="default">
          <Container>
            <div id="selected-work" class="flex flex-col gap-6 md:gap-8">
              <div class="flex flex-col gap-2">
                <h2 class="text-2xl font-semibold tracking-tight md:text-3xl">Selected Work</h2>
                <p class="max-w-[60ch] text-base leading-7 text-[var(--muted)]">
                  Selected projects from the engineering side, chosen for the system decisions they
                  make visible: architecture, data modeling, and implementation tradeoffs.
                </p>
              </div>

              <ProjectGrid projects={engineeringProjects} />
            </div>
          </Container>
        </Section>

        <Section spacing="compact">
          <Container width="content">
            <div id="system-thinking" class="flex flex-col gap-6 md:gap-8">
              <div class="flex flex-col gap-2">
                <h2 class="text-2xl font-semibold tracking-tight md:text-3xl">System Thinking</h2>
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
                Each case study covers the system decisions, architecture tradeoffs, and
                implementation details behind the work.
              </p>

              <div class="ui-cta-group flex-col items-start sm:flex-row">
                <ButtonLink href="/engineering#selected-work" label="Browse Engineering Projects" variant="primary" />
              </div>
            </div>
          </Container>
        </Section>
      </main>
      <Footer />
    </PageShell>
  )
})
