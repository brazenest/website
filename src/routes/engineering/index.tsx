import { component$ } from '@builder.io/qwik'
import { ProjectGrid } from '~/components/engineering/ProjectGrid'
import { Footer } from '~/components/footer/Footer'
import { EngineeringHero } from '~/components/hero/EngineeringHero'
import { PageShell } from '~/components/layout/PageShell'
import { Header } from '~/components/nav/Header'
import { Container } from '~/components/ui/Container'
import { Section } from '~/components/ui/Section'
import { engineeringHeroContent } from '~/content/engineering/hero'
import { engineeringProjects } from '~/content/engineering/projects'
import { systemThinkingItems } from '~/content/engineering/system-thinking'

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
              </div>

              <ProjectGrid projects={engineeringProjects} />
            </div>
          </Container>
        </Section>

        <Section spacing="default">
          <Container width="narrow">
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
      </main>
      <Footer />
    </PageShell>
  )
})
