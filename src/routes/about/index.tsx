import { component$ } from '@builder.io/qwik'
import type { DocumentHead } from '@builder.io/qwik-city'
import { Footer } from '~/components/footer/Footer'
import { PageShell } from '~/components/layout/PageShell'
import { Header } from '~/components/nav/Header'
import { Container } from '~/components/ui/Container'
import { Section } from '~/components/ui/Section'
import { aboutContent } from '~/content/identity/about'
import { buildTitle } from '~/fns/seo'

export const head: DocumentHead = {
  title: buildTitle('About'),
  meta: [
    {
      name: 'description',
      content: 'About Alden Gillespy — software engineer and visual storyteller.',
    },
  ],
}

export default component$(() => {
  return (
    <PageShell theme="neutral">
      <Header />

      <main id="main-content" class="flex-1 scroll-mt-24">
        <Section spacing="spacious">
          <Container width="content">
            <div class="flex flex-col gap-6 md:gap-8">
              <div class="flex flex-col gap-3 md:gap-4">
                <p class="text-sm font-medium uppercase tracking-[0.12em] text-[var(--muted)]">
                  About
                </p>

                <h1 class="text-4xl font-semibold tracking-tight leading-tight md:text-5xl">
                  {aboutContent.title}
                </h1>

                <p class="max-w-[70ch] text-base leading-7 text-[var(--muted)] md:text-lg">
                  {aboutContent.intro}
                </p>
              </div>

              <div class="flex flex-col gap-5 md:gap-6">
                {aboutContent.paragraphs.map((paragraph) => (
                  <p
                    key={paragraph}
                    class="max-w-[70ch] text-base leading-7 text-[var(--fg)] md:text-lg"
                  >
                    {paragraph}
                  </p>
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
