import { component$ } from '@builder.io/qwik'
import type { DocumentHead } from '@builder.io/qwik-city'
import { ProjectGrid } from '~/components/engineering/ProjectGrid'
import { MediaGrid } from '~/components/production/MediaGrid'
import { Footer } from '~/components/footer/Footer'
import { PageShell } from '~/components/layout/PageShell'
import { Header } from '~/components/nav/Header'
import { ButtonLink } from '~/components/ui/ButtonLink'
import { Container } from '~/components/ui/Container'
import { Section } from '~/components/ui/Section'
import { engineeringProjects } from '~/content/engineering/projects'
import { productionProjects } from '~/content/production/projects'
import { staticHeads } from '~/fns/seo/staticHeads'

export const head: DocumentHead = staticHeads.work

export default component$(() => {
  return (
    <PageShell theme="neutral" enableScrollReveal>
      <Header />

      <main id="main-content" class="flex-1 scroll-mt-24 p-0">
        <Section spacing="spacious">
          <Container width="wide">
            <div class="flex flex-col gap-3 md:gap-4">
              <p class="ui-meta-label">Selected Work</p>
              <h1 class="text-4xl font-semibold tracking-tight leading-tight md:text-5xl">
                Case studies across engineering and production.
              </h1>
              <p class="max-w-[56ch] text-base leading-7 text-[var(--muted)] md:text-lg">
                Each entry surfaces the operating challenge, the role I held, and the decisions — architectural or editorial — that shaped the outcome. Engineering work focuses on systems, reliability, and long-term maintainability. Production work focuses on framing, coverage, and editorial judgment.
              </p>
            </div>
          </Container>
        </Section>

        <Section spacing="default">
          <Container width="wide">
            <section id="engineering-work" aria-labelledby="engineering-work-title" class="scroll-mt-24 flex flex-col gap-6 md:gap-8" data-scroll-reveal>
              <div class="flex flex-col gap-2">
                <p class="ui-meta-label">Engineering</p>
                <h2 id="engineering-work-title" class="text-2xl font-semibold tracking-tight md:text-3xl">Software Engineering</h2>
                <p class="max-w-[60ch] text-base leading-7 text-[var(--muted)] md:text-lg">
                  Architecture, data modeling, and system decisions that keep platforms performant, maintainable, and stable under real operating conditions.
                </p>
              </div>

              <ProjectGrid projects={engineeringProjects} />

              <div class="ui-cta-group ui-cta-actions">
                <ButtonLink href="/engineering" label="Full Engineering Context" variant="secondary" />
              </div>
            </section>
          </Container>
        </Section>

        <Section spacing="default">
          <Container width="wide">
            <section id="production-work" aria-labelledby="production-work-title" class="scroll-mt-24 flex flex-col gap-6 md:gap-8" data-scroll-reveal>
              <div class="flex flex-col gap-2">
                <p class="ui-meta-label">Production</p>
                <h2 id="production-work-title" class="text-2xl font-semibold tracking-tight md:text-3xl">Cinematic Production</h2>
                <p class="max-w-[60ch] text-base leading-7 text-[var(--muted)] md:text-lg">
                  Framing, coverage, pacing, and editorial decisions that make the work feel authored, credible, and immediately legible to the audience it is made for.
                </p>
              </div>

              <MediaGrid projects={productionProjects} />

              <div class="ui-cta-group ui-cta-actions">
                <ButtonLink href="/production" label="Full Production Context" variant="secondary" />
              </div>
            </section>
          </Container>
        </Section>

        <Section spacing="compact">
          <Container width="content">
            <section id="work-cta" class="ui-bottom-cta ui-cta-panel flex flex-col gap-4 md:gap-5" data-scroll-reveal>
              <div class="ui-cta-layout">
                <div class="flex flex-col gap-4 md:gap-5">
                  <p class="ui-meta-label">Start a Project</p>

                  <h2 class="ui-cta-title">
                    Ready to discuss your project?
                  </h2>

                  <p class="ui-cta-text max-w-[42ch]">
                    If the work looks aligned, get in touch with the goal and constraints. Or start with a website teardown if you want an honest read on what is holding your current site back.
                  </p>

                  <div class="ui-cta-group ui-cta-actions">
                    <ButtonLink href="/contact" label="Get in Touch" variant="primary" />
                    <ButtonLink href="/packages" label="View Packages" variant="secondary" />
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

      <Footer />
    </PageShell>
  )
})
