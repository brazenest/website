import { component$ } from '@builder.io/qwik'
import { useLocation } from '@builder.io/qwik-city'
import { Footer } from '~/components/footer/Footer'
import { PageShell } from '~/components/layout/PageShell'
import { Header } from '~/components/nav/Header'
import { Container } from '~/components/ui/Container'
import { Section } from '~/components/ui/Section'
import { engineeringProjects } from '~/content/engineering/projects'

export default component$(() => {
  const location = useLocation()
  const slug = location.params.slug

  const project = engineeringProjects.find((item) => item.slug === slug)

  if (!project) {
    return (
      <PageShell theme="engineering">
        <Header />

        <main id="main-content" class="flex-1">
          <Section spacing="hero">
            <Container width="narrow">
              <div class="flex flex-col gap-4">
                <p class="text-sm font-medium uppercase tracking-[0.12em] text-[var(--muted)]">
                  Engineering
                </p>
                <h1 class="text-4xl font-semibold leading-tight tracking-tight md:text-5xl">
                  Project not found
                </h1>
                <p class="text-base leading-7 text-[var(--muted)] md:text-lg">
                  The requested engineering project could not be found.
                </p>
              </div>
            </Container>
          </Section>
        </main>

        <Footer />
      </PageShell>
    )
  }

  return (
    <PageShell theme="engineering">
      <Header />

      <main id="main-content" class="flex-1">
        <Section spacing="hero">
          <Container width="narrow">
            <div class="flex flex-col gap-4 md:gap-5">
              <p class="text-sm font-medium uppercase tracking-[0.12em] text-[var(--muted)]">
                Engineering Project
              </p>

              <h1 class="text-4xl font-semibold leading-tight tracking-tight md:text-5xl">
                {project.title}
              </h1>

              <p class="max-w-[70ch] text-base leading-7 text-[var(--muted)] md:text-lg">
                {project.description}
              </p>

              <ul class="flex flex-wrap gap-2 pt-2">
                {project.techStack.map((tech) => (
                  <li
                    key={tech}
                    class="rounded-[var(--radius-lg)] border border-[var(--border)] bg-[var(--surface-subtle)] px-2.5 py-1 text-xs font-medium text-[var(--muted)] md:text-sm"
                  >
                    {tech}
                  </li>
                ))}
              </ul>
            </div>
          </Container>
        </Section>

        {project.sections.map((section) => (
          <Section key={section.title} spacing="default">
            <Container width="narrow">
              <div class="flex flex-col gap-3 md:gap-4">
                <h2 class="text-2xl font-semibold tracking-tight md:text-3xl">{section.title}</h2>
                <p class="text-base leading-7 text-[var(--muted)] md:text-lg">{section.content}</p>
              </div>
            </Container>
          </Section>
        ))}
      </main>

      <Footer />
    </PageShell>
  )
})
