import { component$ } from '@builder.io/qwik'
import type { DocumentHead } from '@builder.io/qwik-city'
import { ButtonLink } from '~/components/ui/ButtonLink'
import { Footer } from '~/components/footer/Footer'
import { PageShell } from '~/components/layout/PageShell'
import { Header } from '~/components/nav/Header'
import { Container } from '~/components/ui/Container'
import { Section } from '~/components/ui/Section'
import { aboutPageContent } from '~/content/about'
import { staticHeads } from '~/fns/seo/staticHeads'

export const head: DocumentHead = staticHeads.about

export default component$(() => {
  return (
    <PageShell theme="neutral" enableScrollReveal>
      <Header />

      <main id="main-content" class="flex-1 scroll-mt-24">
        <Section spacing="spacious">
          <Container width="content">
            <div class="flex flex-col gap-10 md:gap-12">
              <div class="flex flex-col gap-3 md:gap-4">
                <p class="ui-meta-label">
                  {aboutPageContent.eyebrow}
                </p>

                <h1 class="text-4xl font-semibold tracking-tight leading-tight md:text-5xl">
                  {aboutPageContent.title}
                </h1>

                <p class="max-w-[70ch] text-base leading-7 text-[var(--muted)] md:text-lg">
                  {aboutPageContent.intro}
                </p>
              </div>

              <div class="flex flex-col gap-10 md:gap-12">
                {aboutPageContent.narrativeSections.map((section) => (
                  <section key={section.heading} class="flex flex-col gap-4 md:gap-5" data-scroll-reveal>
                    <h2 class="text-2xl font-semibold tracking-tight md:text-3xl">
                      {section.heading}
                    </h2>

                    <div class="flex flex-col gap-4 md:gap-5">
                      {section.paragraphs.map((paragraph) => (
                        <p
                          key={paragraph}
                          class="max-w-[70ch] text-base leading-7 text-[var(--fg)] md:text-lg"
                        >
                          {paragraph}
                        </p>
                      ))}
                    </div>
                  </section>
                ))}

                <section class="flex flex-col gap-5 md:gap-6" data-scroll-reveal>
                  <h2 class="text-2xl font-semibold tracking-tight md:text-3xl">
                    {aboutPageContent.principles.heading}
                  </h2>

                  <p class="max-w-[70ch] text-base leading-7 text-[var(--muted)] md:text-lg">
                    {aboutPageContent.principles.intro}
                  </p>

                  <ul class="flex flex-col gap-5 md:gap-6">
                    {aboutPageContent.principles.items.map((item) => (
                      <li key={item.title} class="flex flex-col gap-2">
                        <h3 class="text-lg font-medium tracking-tight md:text-xl">
                          {item.title}
                        </h3>
                        <p class="text-base leading-7 text-[var(--muted)]">
                          {item.description}
                        </p>
                      </li>
                    ))}
                  </ul>
                </section>

                <section class="flex flex-col gap-5 md:gap-6" data-scroll-reveal>
                  <h2 class="text-2xl font-semibold tracking-tight md:text-3xl">
                    {aboutPageContent.split.heading}
                  </h2>

                  <p class="max-w-[70ch] text-base leading-7 text-[var(--muted)] md:text-lg">
                    {aboutPageContent.split.intro}
                  </p>

                  <div class="grid gap-4 md:grid-cols-2">
                    {aboutPageContent.split.sides.map((side) => (
                      <article
                        key={side.title}
                        class="flex flex-col gap-2 rounded-[var(--radius-xl)] border border-[var(--border)] bg-[var(--surface)] p-5"
                      >
                        <h3 class="text-lg font-semibold tracking-tight md:text-xl">
                          {side.title}
                        </h3>
                        <p class="text-base leading-7 text-[var(--muted)]">
                          {side.description}
                        </p>
                      </article>
                    ))}
                  </div>

                  <p class="max-w-[70ch] text-base leading-7 text-[var(--fg)] md:text-lg">
                    {aboutPageContent.split.bridge}
                  </p>
                </section>

                <section id="about-next" class="flex flex-col gap-4 md:gap-5" data-scroll-reveal>
                  <p class="ui-meta-label">
                    {aboutPageContent.cta.eyebrow}
                  </p>

                  <h2 class="text-2xl font-semibold tracking-tight md:text-3xl">
                    {aboutPageContent.cta.heading}
                  </h2>

                  <p class="max-w-[70ch] text-base leading-7 text-[var(--muted)] md:text-lg">
                    {aboutPageContent.cta.description}
                  </p>

                  <div class="ui-cta-group flex-col items-stretch gap-3 sm:flex-row sm:items-start sm:gap-2">
                    {aboutPageContent.cta.links.map((link) => (
                      <ButtonLink
                        key={`${link.href}-${link.label}`}
                        href={link.href}
                        label={link.label}
                        variant={link.variant}
                        class="w-full sm:w-auto"
                      />
                    ))}
                  </div>
                </section>
              </div>
            </div>
          </Container>
        </Section>
      </main>

      <Footer />
    </PageShell>
  )
})
