import { component$, useVisibleTask$ } from '@builder.io/qwik'
import type { DocumentHead } from '@builder.io/qwik-city'
import { PackageGrid } from '~/components/packages/PackageGrid'
import { Footer } from '~/components/footer/Footer'
import { PageShell } from '~/components/layout/PageShell'
import { Header } from '~/components/nav/Header'
import { Container } from '~/components/ui/Container'
import { Section } from '~/components/ui/Section'
import { ButtonLink } from '~/components/ui/ButtonLink'
import { packages } from '~/content/packages'
import { creatorsContent } from '~/content/niche'
import { trackNichePageView } from '~/fns/analytics'

export const head: DocumentHead = {
  title: 'For Creators | Alden Gillespy',
  meta: [
    {
      name: 'description',
      content:
        'Owned platforms for video creators and content professionals. Amplify your work, own your audience relationships, and build sustainable reach.',
    },
  ],
}

export default component$(() => {
  // eslint-disable-next-line qwik/no-use-visible-task
  useVisibleTask$(() => {
    trackNichePageView('creators')
  })

  return (
    <PageShell theme="neutral">
      <Header />

      <main id="main-content" class="flex-1 scroll-mt-24 p-0">
        {/* Hero Section */}
        <Section spacing="spacious">
          <Container width="content">
            <div class="flex flex-col gap-4 md:gap-5">
              <p class="ui-meta-label">{creatorsContent.eyebrow}</p>

              <h1 class="max-w-[18ch] text-4xl font-semibold leading-tight tracking-tight md:text-5xl">
                {creatorsContent.title}
              </h1>

              <p class="max-w-[70ch] text-base leading-7 text-[var(--muted)] md:text-lg">
                {creatorsContent.description}
              </p>
            </div>
          </Container>
        </Section>

        {/* Pain Points Section */}
        <Section spacing="default">
          <Container width="content">
            <section class="flex flex-col gap-6 md:gap-8">
              <div class="flex flex-col gap-2">
                <h2 class="text-2xl font-semibold tracking-tight md:text-3xl">
                  The platform fragmentation problem
                </h2>
                <p class="max-w-[60ch] text-base leading-7 text-[var(--muted)]">
                  Your best work gets spread across YouTube, social platforms, and email. Your audience can't find everything you've made. And you can't control the format, timing, or discovery.
                </p>
              </div>

              <ul class="grid gap-4 md:grid-cols-3">
                {creatorsContent.painPoints.map((item) => (
                  <li
                    key={item.problem}
                    class="flex flex-col gap-2 rounded-[var(--radius-lg)] border border-[var(--border)] bg-[var(--surface)] p-5"
                  >
                    <p class="font-medium text-[var(--fg)]">{item.problem}</p>
                    <p class="text-sm leading-6 text-[var(--muted)]">{item.outcome}</p>
                  </li>
                ))}
              </ul>
            </section>
          </Container>
        </Section>

        {/* Offer Section */}
        <Section spacing="default" surface="subtle">
          <Container width="content">
            <section class="flex flex-col gap-4 md:gap-5">
              <h2 class="text-2xl font-semibold tracking-tight md:text-3xl">
                {creatorsContent.offer.heading}
              </h2>

              <p class="max-w-[70ch] text-base leading-7 text-[var(--muted)] md:text-lg">
                {creatorsContent.offer.description}
              </p>
            </section>
          </Container>
        </Section>

        {/* Packages Section */}
        <Section spacing="default">
          <Container width="wide">
            <section class="flex flex-col gap-6 md:gap-8">
              <div class="flex flex-col gap-2">
                <h2 class="text-2xl font-semibold tracking-tight md:text-3xl">Three Tiers for Your Growth</h2>
                <p class="max-w-[60ch] text-base leading-7 text-[var(--muted)]">
                  Choose the tier that matches your creative vision and audience goals.
                </p>
              </div>

              <PackageGrid packages={packages} />
            </section>
          </Container>
        </Section>

        {/* Mid CTA */}
        <Section spacing="compact">
          <Container width="content">
            <section class="flex flex-col gap-4 md:gap-5">
              <p class="max-w-[60ch] text-base leading-7 text-[var(--muted)] md:text-lg">
                Unsure which tier fits your creative practice? Let's explore what serves your audience best.
              </p>

              <div class="ui-cta-group">
                <ButtonLink
                  href="/contact"
                  label="Discuss Your Creative Work"
                  variant="secondary"
                />
              </div>
            </section>
          </Container>
        </Section>

        {/* End CTA */}
        <Section spacing="compact">
          <Container width="content">
            <section class="flex flex-col gap-4 rounded-[var(--radius-xl)] border border-[var(--border)] bg-[var(--surface)] p-6 md:gap-5 md:p-8">
              <h2 class="text-2xl font-semibold tracking-tight md:text-3xl">
                {creatorsContent.cta.heading}
              </h2>

              <p class="max-w-[62ch] text-base leading-7 text-[var(--muted)] md:text-lg">
                {creatorsContent.cta.description}
              </p>

              <div class="ui-cta-group flex-col items-stretch gap-3 sm:flex-row sm:items-start sm:gap-2">
                <ButtonLink
                  href="/contact"
                  label="Start a Conversation"
                  variant="primary"
                  class="w-full sm:w-auto"
                />
                <ButtonLink
                  href="/packages"
                  label="View All Packages"
                  variant="secondary"
                  class="w-full sm:w-auto"
                />
              </div>
            </section>
          </Container>
        </Section>
      </main>

      <Footer />
    </PageShell>
  )
})
