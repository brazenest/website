import { component$ } from '@builder.io/qwik'
import type { DocumentHead } from '@builder.io/qwik-city'
import { PackageGrid } from '~/components/packages/PackageGrid'
import { PackageHero } from '~/components/hero/PackageHero'
import { Footer } from '~/components/footer/Footer'
import { PageShell } from '~/components/layout/PageShell'
import { Header } from '~/components/nav/Header'
import { Container } from '~/components/ui/Container'
import { Section } from '~/components/ui/Section'
import { ButtonLink } from '~/components/ui/ButtonLink'
import { packageHeroContent } from '~/content/packages/hero'
import { packages } from '~/content/packages'
import { staticHeads } from '~/fns/seo/staticHeads'

export const head: DocumentHead = staticHeads.packages

export default component$(() => {
  return (
    <PageShell theme="neutral">
      <Header />
      <main id="main-content" class="flex-1 p-0">
        <PackageHero {...packageHeroContent} />

        <Section spacing="default">
          <Container>
            <section id="package-tiers" aria-labelledby="package-tiers-title" class="scroll-mt-24 flex flex-col gap-6 md:gap-8">
              <div class="flex flex-col gap-2">
                <h2 id="package-tiers-title" class="text-2xl font-semibold tracking-tight md:text-3xl">Three Tiers, Clear Scope</h2>
                <p class="max-w-[60ch] text-base leading-7 text-[var(--muted)]">
                  Each package combines engineering excellence and visual craft. Choose the tier that matches your audience and acquisition goals. Pricing is custom and depends on scope—email to discuss what makes sense for your practice.
                </p>
              </div>

              <PackageGrid packages={packages} />
            </section>
          </Container>
        </Section>

        <Section spacing="default">
          <Container>
            <section id="package-value" aria-labelledby="package-value-title" class="scroll-mt-24 flex flex-col gap-6 md:gap-8">
              <div class="flex flex-col gap-2">
                <h2 id="package-value-title" class="text-2xl font-semibold tracking-tight md:text-3xl">Why Packages?</h2>
                <p class="max-w-[60ch] text-base leading-7 text-[var(--muted)]">
                  A website is a business asset that needs to perform. Packaged scope removes uncertainty, clarifies what success looks like, and lets you invest with confidence. No guessing about features or timelines—just clear outcomes and sustainable delivery.
                </p>
              </div>

              <ul class="flex flex-col gap-5 md:gap-6">
                <li class="flex flex-col gap-2">
                  <h3 class="text-lg font-medium tracking-tight md:text-xl">Predictable Delivery</h3>
                  <p class="text-base leading-7 text-[var(--muted)]">
                    Packages eliminate scope creep. You know what you're getting, when you're getting it, and what success looks like when we ship.
                  </p>
                </li>

                <li class="flex flex-col gap-2">
                  <h3 class="text-lg font-medium tracking-tight md:text-xl">Built Around Your Goals</h3>
                  <p class="text-base leading-7 text-[var(--muted)]">
                    Foundation sites establish presence. Growth sites convert prospects. Authority sites reinforce expertise. Pick the tier that matches where you're going.
                  </p>
                </li>

                <li class="flex flex-col gap-2">
                  <h3 class="text-lg font-medium tracking-tight md:text-xl">Long-term Thinking</h3>
                  <p class="text-base leading-7 text-[var(--muted)]">
                    Your website grows with your practice. Packages are architected for maintainability and future work—not just initial launch.
                  </p>
                </li>
              </ul>
            </section>
          </Container>
        </Section>

        <Section spacing="compact">
          <Container>
            <section id="package-cta" class="scroll-mt-24 flex flex-col gap-3 md:gap-4 rounded-lg border border-[var(--border)] bg-[var(--bg-secondary)] p-6 md:p-8">
              <h2 class="text-2xl font-semibold tracking-tight md:text-3xl">
                Ready to talk about your project?
              </h2>
              <p class="max-w-[60ch] text-base leading-7 text-[var(--muted)]">
                Email with your goals, current situation, and what tier resonates. Let's discuss what would make sense for your practice.
              </p>
              <div class="ui-cta-group flex-col items-stretch gap-3 sm:flex-row sm:items-start sm:gap-2 pt-2">
                <ButtonLink
                  href="/contact"
                  label="Get in Touch"
                  variant="primary"
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
