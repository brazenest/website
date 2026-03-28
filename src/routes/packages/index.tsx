import { component$, useVisibleTask$ } from '@builder.io/qwik'
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
import { trackEvent } from '~/fns/analytics'

export const head: DocumentHead = staticHeads.packages

export default component$(() => {
  // eslint-disable-next-line qwik/no-use-visible-task
  useVisibleTask$(() => {
    trackEvent('view_packages')
  })
  return (
    <PageShell theme="neutral">
      <Header />
      <main id="main-content" class="flex-1 p-0">
        <PackageHero {...packageHeroContent} />

        <Section spacing="default">
          <Container>
            <section id="package-tiers" aria-labelledby="package-tiers-title" class="scroll-mt-24 flex flex-col gap-6 md:gap-8">
              <div class="flex flex-col gap-2">
                <h2 id="package-tiers-title" class="text-2xl font-semibold tracking-tight md:text-3xl">Three Packages, One Proven Structure</h2>
                <p class="max-w-[60ch] text-base leading-7 text-[var(--muted)]">
                  Every package starts from a performance-first system refined across real client work, then tailored to your positioning, offer, and audience journey. Choose the tier that matches your growth goals and delivery depth.
                </p>
              </div>

              <PackageGrid packages={packages} />
            </section>
          </Container>
        </Section>

        <Section spacing="compact">
          <Container width="content">
            <section id="package-mid-cta" aria-labelledby="package-mid-cta-title" class="flex flex-col gap-4 md:gap-5">
              <p class="max-w-[60ch] text-base leading-7 text-[var(--muted)] md:text-lg">
                Unsure which package fits? Start with strategy if you are ready to build, or begin with a teardown if you want clarity on your current site before committing.
              </p>

              <div class="ui-cta-group flex-col items-stretch gap-3 sm:flex-row sm:items-start sm:gap-2">
                <ButtonLink
                  href="/contact"
                  label="Discuss Your Project"
                  variant="secondary"
                  class="w-full sm:w-auto"
                />
                <ButtonLink
                  href="/contact#teardown-request"
                  label="Request a Website Teardown"
                  variant="ghost"
                  class="w-full sm:w-auto"
                />
              </div>
            </section>
          </Container>
        </Section>

        <Section spacing="default">
          <Container>
            <section id="package-value" aria-labelledby="package-value-title" class="scroll-mt-24 flex flex-col gap-6 md:gap-8">
              <div class="flex flex-col gap-2">
                <h2 id="package-value-title" class="text-2xl font-semibold tracking-tight md:text-3xl">Proven Structure, Tailored Execution</h2>
                <p class="max-w-[60ch] text-base leading-7 text-[var(--muted)]">
                  Structured builds reduce delivery risk and accelerate momentum without compromising craft. You get a scalable foundation, clear milestones, and custom decisions where they matter most.
                </p>
              </div>

              <ul class="flex flex-col gap-5 md:gap-6">
                <li class="flex flex-col gap-2">
                  <h3 class="text-lg font-medium tracking-tight md:text-xl">Faster Delivery, High Standards</h3>
                  <p class="text-base leading-7 text-[var(--muted)]">
                    A proven underlying system eliminates reinvention, so delivery moves faster while performance, accessibility, and presentation quality remain first-class.
                  </p>
                </li>

                <li class="flex flex-col gap-2">
                  <h3 class="text-lg font-medium tracking-tight md:text-xl">Clear Scope, Better Decisions</h3>
                  <p class="text-base leading-7 text-[var(--muted)]">
                    The structure clarifies what ships now and what evolves next. You can confidently choose Foundation, Growth, or Authority based on real business goals.
                  </p>
                </li>

                <li class="flex flex-col gap-2">
                  <h3 class="text-lg font-medium tracking-tight md:text-xl">Custom Where It Counts</h3>
                  <p class="text-base leading-7 text-[var(--muted)]">
                    Messaging, proof, service narrative, and conversion paths are shaped to your practice so the site feels specific to your market, not interchangeable.
                  </p>
                </li>
              </ul>

              <div class="ui-cta-group flex-col items-stretch gap-3 sm:flex-row sm:items-start sm:gap-2">
                <ButtonLink
                  href="/packages/preview"
                  label="Preview the Starting Structure"
                  variant="secondary"
                  class="w-full sm:w-auto"
                />
                <ButtonLink
                  href="/contact#teardown-request"
                  label="Start with a Teardown"
                  variant="ghost"
                  class="w-full sm:w-auto"
                />
              </div>
            </section>
          </Container>
        </Section>

        <Section spacing="compact">
          <Container>
            <section id="package-cta" class="scroll-mt-24 flex flex-col gap-3 md:gap-4 rounded-lg border border-[var(--border)] bg-[var(--bg-secondary)] p-6 md:p-8">
              <h2 class="text-2xl font-semibold tracking-tight md:text-3xl">
                Ready to map your delivery path?
              </h2>
              <p class="max-w-[60ch] text-base leading-7 text-[var(--muted)]">
                Share your goals and current constraints, and we will map the right package and rollout sequence. If you want to validate fit first, request a teardown and we will start there.
              </p>
              <div class="ui-cta-group flex-col items-stretch gap-3 sm:flex-row sm:items-start sm:gap-2 pt-2">
                <ButtonLink
                  href="/contact"
                  label="Get in Touch"
                  variant="primary"
                  class="w-full sm:w-auto"
                />
                <ButtonLink
                  href="/contact#teardown-request"
                  label="Request Teardown First"
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
