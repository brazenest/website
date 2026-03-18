import { component$ } from '@builder.io/qwik'
import type { DocumentHead } from '@builder.io/qwik-city'
import { Footer } from '~/components/footer/Footer'
import { PageShell } from '~/components/layout/PageShell'
import { Header } from '~/components/nav/Header'
import { Container } from '~/components/ui/Container'
import { Section } from '~/components/ui/Section'
import { resumeExperience, resumeSkills } from '~/content/identity/resume'
import { buildTitle } from '~/fns/seo'

export const head: DocumentHead = {
  title: buildTitle('Resume'),
  meta: [
    {
      name: 'description',
      content: 'Resume of Alden Gillespy — engineering and production experience.',
    },
  ],
}

export default component$(() => {
  return (
    <PageShell theme="neutral">
      <Header />

      <main id="main-content" class="flex-1 scroll-mt-24">
        <Section spacing="spacious">
          <Container width="narrow">
            <div class="flex flex-col gap-10 md:gap-12">
              <div class="flex flex-col gap-3 md:gap-4">
                <p class="text-sm font-medium uppercase tracking-[0.12em] text-[var(--muted)]">
                  Resume
                </p>

                <h1 class="text-4xl font-semibold leading-tight tracking-tight md:text-5xl">
                  Experience and skills
                </h1>

                <p class="max-w-[70ch] text-base leading-7 text-[var(--muted)] md:text-lg">
                  A structured overview of software engineering, production, and related work.
                </p>
              </div>

              <section class="flex flex-col gap-6 md:gap-8" aria-labelledby="resume-experience">
                <h2
                  id="resume-experience"
                  class="text-2xl font-semibold tracking-tight md:text-3xl"
                >
                  Experience
                </h2>

                <div class="flex flex-col gap-6 md:gap-8">
                  {resumeExperience.map((entry) => (
                    <article
                      key={`${entry.title}-${entry.organization}-${entry.start}`}
                      class="flex flex-col gap-3 border-t border-[var(--border)] pt-6 first:border-t-0 first:pt-0"
                    >
                      <div class="flex flex-col gap-1">
                        <h3 class="text-lg font-semibold tracking-tight md:text-xl">
                          {entry.title}
                        </h3>

                        <p class="text-sm font-medium text-[var(--muted)] md:text-base">
                          {entry.organization}
                        </p>

                        <p class="text-sm text-[var(--muted)]">
                          {entry.start} — {entry.end ?? 'Present'}
                        </p>
                      </div>

                      <ul class="flex flex-col gap-2 pl-5 text-sm leading-6 text-[var(--fg)] md:text-base">
                        {entry.description.map((item) => (
                          <li key={item} class="list-disc">
                            {item}
                          </li>
                        ))}
                      </ul>
                    </article>
                  ))}
                </div>
              </section>

              <section class="flex flex-col gap-5 md:gap-6" aria-labelledby="resume-skills">
                <h2
                  id="resume-skills"
                  class="text-2xl font-semibold tracking-tight md:text-3xl"
                >
                  Skills
                </h2>

                <ul class="flex flex-wrap gap-3">
                  {resumeSkills.map((skill) => (
                    <li
                      key={skill}
                      class="rounded-[var(--radius-lg)] border border-[var(--border)] bg-[var(--surface)] px-3 py-2 text-sm text-[var(--fg)]"
                    >
                      {skill}
                    </li>
                  ))}
                </ul>
              </section>
            </div>
          </Container>
        </Section>
      </main>

      <Footer />
    </PageShell>
  )
})
