import { component$ } from '@builder.io/qwik'
import type { DocumentHeadProps } from '@builder.io/qwik-city'
import { useLocation } from '@builder.io/qwik-city'
import { Footer } from '~/components/footer/Footer'
import { PageShell } from '~/components/layout/PageShell'
import { Header } from '~/components/nav/Header'
import { Container } from '~/components/ui/Container'
import { Section } from '~/components/ui/Section'
import { ResponsiveVideo } from '~/components/media/ResponsiveVideo'
import { productionProjects } from '~/content/production/projects'
import { buildMetadata } from '~/fns/seo/buildMetadata'
import { metadataToDocumentHead } from '~/fns/seo/metadataToDocumentHead'
import { buildProjectStructuredData } from '~/fns/seo/buildStructuredData'

export const head = ({ params }: DocumentHeadProps) => {
  const project = productionProjects.find((item) => item.slug === params.slug)

  if (!project) {
    return metadataToDocumentHead(
      buildMetadata({
        title: 'Video Production Project | Alden Gillespy',
        description: 'Production project detail by Alden Gillespy.',
        pathname: `/production/projects/${params.slug}`,
      })
    )
  }

  // Build CreativeWork schema for this production project
  const projectSchema = buildProjectStructuredData({
    title: project.title,
    description: project.description,
    url: `/production/projects/${params.slug}`,
    image: project.image,
    section: 'Production',
  })

  const metadata = buildMetadata({
    title: `${project.title} — Video Production Case Study | Alden Gillespy`,
    description: project.seo?.description ?? project.description,
    pathname: `/production/projects/${params.slug}`,
    image: project.image,
  })

  const documentHead = metadataToDocumentHead(metadata)
  return {
    ...documentHead,
    scripts: [
      {
        props: {
          type: 'application/ld+json',
        },
        script: JSON.stringify(projectSchema),
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
                <p class="ui-meta-label">
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
                      loading="eager"
                      class="h-full w-full object-cover"
                    />
                  ) : (
                    // Hero video: conservative loading with poster fallback
                    // preload="metadata": Load only metadata, not video frames
                    // controls: Show player controls for user interaction
                    // No autoplay: User must explicitly choose to play
                    <ResponsiveVideo
                      src={heroMedia.src}
                      poster={heroMedia.poster}
                      width={1600}
                      height={900}
                    />
                  )
                ) : (
                  <div class="flex h-full items-center justify-center px-4 text-sm text-[var(--muted)]">
                    Media preview
                  </div>
                )}
              </div>

              <div class="flex max-w-[72ch] flex-col gap-4 md:gap-5">
                <p class="ui-meta-label">
                  Production Case Study
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

                {section.items?.length ? (
                  <ul class="max-w-[65ch] flex flex-col gap-2 text-base leading-7 text-[var(--muted)] md:text-lg">
                    {section.items.map((item) => (
                      <li key={item} class="flex gap-3">
                        <span class="flex-shrink-0 text-[var(--fg)]">•</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
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
                          // Section video: render poster with play button
                          <div class="relative min-h-48 w-full">
                            {item.poster ? (
                              <img
                                src={item.poster}
                                alt={item.alt ?? `${section.title} video preview`}
                                width={1600}
                                height={900}
                                class="h-full w-full object-cover"
                              />
                            ) : (
                              <div class="h-full w-full bg-gradient-to-br from-[var(--surface-subtle)] to-[var(--surface)]" />
                            )}
                            {/* Play button indicator */}
                            <div class="absolute inset-0 flex items-center justify-center">
                              <div class="rounded-full bg-[var(--fg)]/80 p-3 backdrop-blur-sm transition-all duration-200">
                                <svg
                                  width="20"
                                  height="20"
                                  viewBox="0 0 20 20"
                                  fill="none"
                                  xmlns="http://www.w3.org/2000/svg"
                                  class="h-5 w-5 text-[var(--bg)]"
                                  aria-hidden="true"
                                >
                                  <path d="M5 3.5L5 16.5L16 10L5 3.5Z" fill="currentColor" />
                                </svg>
                              </div>
                            </div>
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
