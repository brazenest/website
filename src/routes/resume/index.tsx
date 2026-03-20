import { component$ } from '@builder.io/qwik'
import type { DocumentHead } from '@builder.io/qwik-city'
import { Footer } from '~/components/footer/Footer'
import { PageShell } from '~/components/layout/PageShell'
import { Header } from '~/components/nav/Header'
import { Container } from '~/components/ui/Container'
import { Section } from '~/components/ui/Section'
import { TextLink } from '~/components/ui/TextLink'
import { resumePageContent } from '~/content/resume'
import { buildMetadata } from '~/fns/seo/buildMetadata'
import { metadataToDocumentHead } from '~/fns/seo/metadataToDocumentHead'
import { seoPresets } from '~/config/seo'

export const head: DocumentHead = metadataToDocumentHead(
  buildMetadata({
    ...seoPresets.resume,
    pathname: '/resume',
  })
)

export default component$(() => {
  return (
    <PageShell theme="neutral">
      <Header />

      <main id="main-content" class="flex-1 scroll-mt-24">
        <Section spacing="spacious">
          <Container width="wide">
            <div class="flex flex-col gap-12 md:gap-16">
              <div class="grid gap-8 border-b border-[var(--border)] pb-10 md:grid-cols-[minmax(0,1fr)_minmax(16rem,20rem)] md:items-start md:gap-10 md:pb-12">
                <div class="flex flex-col gap-3 md:gap-4">
                  <p class="text-sm font-medium uppercase tracking-[0.12em] text-[var(--muted)]">
                    {resumePageContent.header.eyebrow}
                  </p>

                  <div class="flex flex-col gap-2">
                    <h1 class="text-4xl font-semibold leading-tight tracking-tight md:text-5xl">
                      {resumePageContent.header.name}
                    </h1>

                    <p class="text-lg font-medium leading-7 text-[var(--muted)] md:text-xl">
                      {resumePageContent.header.title}
                    </p>
                  </div>
                </div>

                <div class="flex flex-col gap-3 md:gap-4">
                  <p class="text-sm font-medium uppercase tracking-[0.12em] text-[var(--muted)]">
                    Contact
                  </p>

                  <ul class="grid gap-2 text-sm leading-6 text-[var(--muted)] md:text-base">
                    {resumePageContent.header.contactItems.map((item) => (
                      <li key={`${item.label}-${'href' in item ? item.href : 'text'}`}>
                        {'href' in item ? (
                          <a
                            href={item.href}
                            target={item.href.startsWith('http') ? '_blank' : undefined}
                            rel={item.href.startsWith('http') ? 'noreferrer' : undefined}
                            class="rounded-[var(--radius-lg)] transition-colors duration-[var(--motion-duration-quick)] ease-[var(--motion-easing-quick)] hover:text-[var(--fg)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--focus)] focus-visible:ring-offset-2 focus-visible:text-[var(--fg)]"
                          >
                            {item.label}
                          </a>
                        ) : (
                          <span>{item.label}</span>
                        )}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <p class="max-w-[70ch] text-base leading-7 text-[var(--muted)] md:text-lg">
                {resumePageContent.intro}
              </p>

              <section
                class="grid gap-4 lg:grid-cols-[minmax(0,14rem)_minmax(0,1fr)] lg:gap-10"
                aria-labelledby="resume-summary"
                data-scroll-reveal
              >
                <h2 id="resume-summary" class="text-2xl font-semibold tracking-tight md:text-3xl">
                  Summary
                </h2>

                <p class="max-w-[72ch] text-base leading-7 text-[var(--muted)] md:text-lg">
                  {resumePageContent.summary}
                </p>
              </section>

              <section
                class="grid gap-6 lg:grid-cols-[minmax(0,14rem)_minmax(0,1fr)] lg:gap-10"
                aria-labelledby="resume-experience"
                data-scroll-reveal
              >
                <div class="flex flex-col gap-2">
                  <h2
                    id="resume-experience"
                    class="text-2xl font-semibold tracking-tight md:text-3xl"
                  >
                    Experience
                  </h2>

                  <p class="max-w-[28ch] text-sm leading-6 text-[var(--muted)] md:text-base">
                    Reverse-chronological roles focused on product delivery, reliability, and
                    full-stack system ownership.
                  </p>
                </div>

                <div class="flex flex-col gap-8 md:gap-10">
                  {resumePageContent.experience.map((entry) => (
                    <article
                      key={`${entry.title}-${entry.organization}-${entry.timeframe}`}
                      class="grid gap-4 border-t border-[var(--border)] pt-6 first:border-t-0 first:pt-0 md:grid-cols-[minmax(15rem,18rem)_minmax(0,1fr)] md:gap-8"
                    >
                      <div class="flex flex-col gap-1">
                        <h3 class="text-lg font-semibold tracking-tight md:text-xl">
                          {entry.title}
                        </h3>

                        <p class="text-sm font-medium text-[var(--muted)] md:text-base">
                          {entry.organization}
                        </p>

                        <p class="text-sm text-[var(--muted)]">
                          {entry.timeframe}
                        </p>

                        <p class="text-sm text-[var(--muted)]">
                          {entry.context}
                        </p>
                      </div>

                      <ul class="flex flex-col gap-2 pl-5 text-sm leading-6 text-[var(--fg)] md:text-base">
                        {entry.bullets.map((item) => (
                          <li key={item} class="list-disc">
                            {item}
                          </li>
                        ))}
                      </ul>
                    </article>
                  ))}
                </div>
              </section>
            </div>
          </Container>
        </Section>

        <Section spacing="compact" surface="subtle">
          <Container width="wide">
            <section
              class="grid gap-6 lg:grid-cols-[minmax(0,14rem)_minmax(0,1fr)] lg:gap-10"
              aria-labelledby="resume-selected-projects"
            >
              <div class="flex flex-col gap-2">
                <h2
                  id="resume-selected-projects"
                  class="text-2xl font-semibold tracking-tight md:text-3xl"
                >
                  Selected Projects
                </h2>

                <p class="max-w-[28ch] text-sm leading-6 text-[var(--muted)] md:text-base">
                  Compact cross-disciplinary examples adapted from the longer engineering and
                  production case studies.
                </p>
              </div>

              <div class="grid gap-4 md:grid-cols-2">
                {resumePageContent.selectedProjects.map((project) => (
                  <article
                    key={`${project.discipline}-${project.title}`}
                    class="flex h-full flex-col gap-3 rounded-[var(--radius-xl)] border border-[var(--border)] bg-[var(--surface)] p-5"
                  >
                    <div class="flex flex-col gap-2">
                      <p class="text-xs font-medium uppercase tracking-[0.12em] text-[var(--muted)]">
                        {project.discipline}
                      </p>

                      <div class="flex flex-col gap-1">
                        <h3 class="text-lg font-semibold tracking-tight md:text-xl">
                          {project.title}
                        </h3>

                        <p class="text-sm font-medium text-[var(--muted)] md:text-base">
                          {project.role}
                        </p>
                      </div>
                    </div>

                    <p class="text-sm leading-6 text-[var(--muted)] md:text-base">
                      {project.description}
                    </p>

                    <div class="mt-auto pt-1">
                      <TextLink href={project.href} label={`View ${project.discipline} case study`} />
                    </div>
                  </article>
                ))}
              </div>
            </section>
          </Container>
        </Section>

        <Section spacing="compact">
          <Container width="wide">
            <div class="grid gap-10 xl:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] xl:gap-12">
              <section class="flex flex-col gap-5 md:gap-6" aria-labelledby="resume-skills">
                <h2
                  id="resume-skills"
                  class="text-2xl font-semibold tracking-tight md:text-3xl"
                >
                  Skills
                </h2>

                <div class="grid gap-4">
                  {resumePageContent.skills.map((group) => (
                    <article
                      key={group.title}
                      class="flex flex-col gap-4 rounded-[var(--radius-xl)] border border-[var(--border)] bg-[var(--surface)] p-5"
                    >
                      <h3 class="text-lg font-semibold tracking-tight md:text-xl">
                        {group.title}
                      </h3>

                      <ul class="flex flex-wrap gap-2">
                        {group.items.map((item) => (
                          <li
                            key={`${group.title}-${item}`}
                            class="rounded-[var(--radius-lg)] border border-[var(--border)] bg-[var(--surface-subtle)] px-3 py-2 text-sm text-[var(--fg)]"
                          >
                            {item}
                          </li>
                        ))}
                      </ul>
                    </article>
                  ))}
                </div>
              </section>

              <section class="flex flex-col gap-6 md:gap-8" aria-labelledby="resume-education">
                <h2
                  id="resume-education"
                  class="text-2xl font-semibold tracking-tight md:text-3xl"
                >
                  Education
                </h2>

                <div class="flex flex-col gap-5 md:gap-6">
                  {resumePageContent.education.map((entry) => (
                    <article
                      key={`${entry.credential}-${entry.institution}`}
                      class="flex flex-col gap-2 rounded-[var(--radius-xl)] border border-[var(--border)] bg-[var(--surface)] p-5"
                    >
                      <div class="flex flex-col gap-1">
                        <h3 class="text-lg font-semibold tracking-tight md:text-xl">
                          {entry.credential}
                        </h3>

                        <p class="text-sm font-medium text-[var(--muted)] md:text-base">
                          {entry.institution}
                        </p>

                        <p class="text-sm text-[var(--muted)]">
                          {entry.timeframe}
                        </p>
                      </div>

                      <p class="text-sm leading-6 text-[var(--muted)] md:text-base">
                        {entry.description}
                      </p>
                    </article>
                  ))}
                </div>
              </section>
            </div>
          </Container>
        </Section>

        <Section spacing="compact">
          <Container width="content">
            <section id="resume-cta" aria-labelledby="resume-cta-title" class="flex flex-col gap-4 md:gap-5">
              <h2 id="resume-cta-title" class="text-sm font-medium uppercase tracking-[0.12em] text-[var(--muted)]">
                Next Steps
              </h2>

              <p class="max-w-[60ch] text-base leading-7 text-[var(--muted)] md:text-lg">
                For a deeper look at the work, browse the <a href="/engineering#selected-work" class="underline hover:no-underline">engineering case studies</a> and <a href="/production#selected-work" class="underline hover:no-underline">production projects</a>. To discuss a specific role or project, <a href="/contact" class="underline hover:no-underline">start a conversation</a>.
              </p>
            </section>
          </Container>
        </Section>
      </main>

      <Footer />
    </PageShell>
  )
})
