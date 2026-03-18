import { component$ } from '@builder.io/qwik'
import type { DocumentHead } from '@builder.io/qwik-city'
import { useLocation } from '@builder.io/qwik-city'
import { Footer } from '~/components/footer/Footer'
import { PageShell } from '~/components/layout/PageShell'
import { Header } from '~/components/nav/Header'
import { Container } from '~/components/ui/Container'
import { Section } from '~/components/ui/Section'
import { productionProjects } from '~/content/production/projects'
import { buildTitle } from '~/fns/seo'

export const head: DocumentHead = ({ params }) => {
  const project = productionProjects.find((item) => item.slug === params.slug)

  if (!project) {
    return {
      title: buildTitle('Production Project'),
      meta: [
        {
          name: 'description',
          content: 'Production project detail by Alden Gillespy.',
        },
      ],
    }
  }

  return {
    title: buildTitle(project.seo?.title ?? project.title),
    meta: [
      {
        name: 'description',
        content: project.seo?.description ?? project.description,
      },
    ],
  }
}

export default component$(() => {
  const location = useLocation()
  const slug = location.params.slug

  const project = productionProjects.find((item) => item.slug === slug)

  if (!project) {
    return (
      <PageShell theme="production">
        <Header />

        <main id="main-content" class="flex-1">
          <Section spacing="spacious">
            <Container width="content">
              <div class="flex flex-col gap-4">
                <p class="text-sm font-medium uppercase tracking-[0.12em] text-[var(--muted)]">
                  Production
                </p>
                <h1 class="text-4xl font-semibold leading-tight tracking-tight md:text-5xl">
                  Project not found
                </h1>
                <p class="text-base leading-7 text-[var(--muted)] md:text-lg">
                  The requested production project could not be found.
                </p>
              </div>
            </Container>
          </Section>
        </main>

        <Footer />
      </PageShell>
    )
  }

  const heroMedia = project.media[0]

  return (
    <PageShell theme="production">
      <Header />

      <main id="main-content" class="flex-1">
        <Section spacing="spacious">
          <Container>
            <div class="flex flex-col gap-6 md:gap-8">
              <div class="aspect-[16/9] w-full overflow-hidden rounded-[var(--radius-lg)] border border-[var(--border)] bg-[var(--surface-subtle)]">
                {heroMedia ? (
                  heroMedia.type === 'image' ? (
                    <img
                      src={heroMedia.src}
                      alt={heroMedia.alt ?? project.title}
                      width={1600}
                      height={900}
                      class="h-full w-full object-cover"
                    />
                  ) : (
                    <div class="flex h-full items-center justify-center px-4 text-sm text-[var(--muted)]">
                      Video preview
                    </div>
                  )
                ) : (
                  <div class="flex h-full items-center justify-center px-4 text-sm text-[var(--muted)]">
                    Media preview
                  </div>
                )}
              </div>

              <div class="flex max-w-[72ch] flex-col gap-4 md:gap-5">
                <p class="text-sm font-medium uppercase tracking-[0.12em] text-[var(--muted)]">
                  Production Project
                </p>

                <h1 class="max-w-[15ch] text-4xl font-semibold leading-tight tracking-tight md:text-5xl">
                  {project.title}
                </h1>

                <p class="max-w-[65ch] text-base leading-7 text-[var(--muted)] md:text-lg">
                  {project.description}
                </p>
              </div>
            </div>
          </Container>
        </Section>

        {project.sections.map((section) => (
          <Section key={section.title} spacing="default">
            <Container width="content">
              <div class="flex flex-col gap-3 md:gap-4">
                <h2 class="text-2xl font-semibold tracking-tight md:text-3xl">{section.title}</h2>

                {section.content ? (
                  <p class="max-w-[65ch] text-base leading-7 text-[var(--muted)] md:text-lg">
                    {section.content}
                  </p>
                ) : null}

                {section.media?.length ? (
                  <div class="grid grid-cols-1 gap-4 pt-2">
                    {section.media.map((item, index) => (
                      <div
                        key={`${section.title}-${item.src}-${index}`}
                        class="overflow-hidden rounded-[var(--radius-lg)] border border-[var(--border)] bg-[var(--surface-subtle)]"
                      >
                        {item.type === 'image' ? (
                          <img
                            src={item.src}
                            alt={item.alt ?? section.title}
                            width={1600}
                            height={900}
                            class="h-full w-full object-cover"
                          />
                        ) : (
                          <div class="flex min-h-48 items-center justify-center px-4 py-10 text-sm text-[var(--muted)]">
                            Video preview
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                ) : null}
              </div>
            </Container>
          </Section>
        ))}
      </main>

      <Footer />
    </PageShell>
  )
})
