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
      <main id="main-content" class="page-packages flex-1 p-0">
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
            <section id="package-mid-cta" aria-labelledby="package-mid-cta-title" class="ui-cta-panel flex flex-col gap-4 md:gap-5">
              <div class="ui-cta-layout">
                <div class="flex flex-col gap-4 md:gap-5">
                  <p class="ui-meta-label">Fit Check</p>

                  <h2 id="package-mid-cta-title" class="ui-cta-title">
                    Start with the right entry point.
                  </h2>

                  <p class="ui-cta-text max-w-[34ch]">
                    Strategy if you are ready to build. Teardown if you want clarity first. Both give you a practical next move, not just a general opinion.
                  </p>

                  <div class="ui-cta-group ui-cta-actions">
                    <ButtonLink
                      href="/contact"
                      label="Discuss Your Project"
                      variant="secondary"
                    />
                    <ButtonLink
                      href="/contact#teardown-request"
                      label="Request a Website Teardown"
                      variant="ghost"
                    />
                  </div>
                </div>

                <div class="ui-cta-image ui-editorial-frame aspect-[5/4]">
                  <img
                    src="/media/generated/packages-hero-delivery.png"
                    alt="Editorial image showing package selection and website planning workflow."
                    width={1536}
                    height={1024}
                    loading="lazy"
                    class="h-full w-full object-cover"
                  />
                </div>
              </div>
            </section>
          </Container>
        </Section>

        <Section spacing="default">
          <Container>
            <section id="teardown" aria-labelledby="teardown-title" class="scroll-mt-24 flex flex-col gap-6 md:gap-8">
              <div class="flex flex-col gap-2">
                <p class="ui-meta-label">Not Ready for a Full Build?</p>
                <h2 id="teardown-title" class="text-2xl font-semibold tracking-tight md:text-3xl">Start with a Website Teardown.</h2>
                <p class="max-w-[60ch] text-base leading-7 text-[var(--muted)]">
                  A teardown is a structured, direct assessment of your current site — what is holding it back technically, visually, and strategically. It is the lowest-commitment way to get actionable clarity before committing to a full engagement.
                </p>
              </div>

              <ul class="grid gap-4 md:grid-cols-3 md:gap-5">
                <li class="ui-package-value-card flex flex-col gap-3">
                  <div class="ui-package-value-graphic" aria-hidden="true">
                    <span />
                    <span />
                    <span />
                  </div>
                  <h3 class="text-lg font-medium tracking-tight md:text-xl">Performance and SEO Assessment</h3>
                  <p class="text-base leading-7 text-[var(--muted)]">
                    Core Web Vitals, load behavior, and search visibility reviewed against the specific conditions your visitors encounter — not just a Lighthouse score.
                  </p>
                </li>

                <li class="ui-package-value-card flex flex-col gap-3">
                  <div class="ui-package-value-graphic" aria-hidden="true">
                    <span />
                    <span />
                    <span />
                  </div>
                  <h3 class="text-lg font-medium tracking-tight md:text-xl">Visual and Conversion Audit</h3>
                  <p class="text-base leading-7 text-[var(--muted)]">
                    Hierarchy, trust signals, and the visual decisions that accelerate or slow a visitor's path to taking action — identified and explained without jargon.
                  </p>
                </li>

                <li class="ui-package-value-card flex flex-col gap-3">
                  <div class="ui-package-value-graphic" aria-hidden="true">
                    <span />
                    <span />
                    <span />
                  </div>
                  <h3 class="text-lg font-medium tracking-tight md:text-xl">Actionable Next Steps</h3>
                  <p class="text-base leading-7 text-[var(--muted)]">
                    You receive a prioritized set of specific improvements — not a general to-do list. Each recommendation explains the problem and the expected outcome so you can act on it or hand it off.
                  </p>
                </li>
              </ul>

              <div class="ui-cta-group ui-cta-actions">
                <ButtonLink
                  href="/contact#teardown-request"
                  label="Request a Website Teardown"
                  variant="secondary"
                />
              </div>
            </section>
          </Container>
        </Section>

        <Section spacing="default">
          <Container>
            <section id="package-value" aria-labelledby="package-value-title" class="scroll-mt-24 flex flex-col gap-6 md:gap-8">
              <div class="ui-package-value-intro flex flex-col gap-2">
                <h2 id="package-value-title" class="text-2xl font-semibold tracking-tight md:text-3xl">Proven Structure, Tailored Execution</h2>
                <p class="max-w-[60ch] text-base leading-7 text-[var(--muted)]">
                  Structured builds reduce delivery risk and accelerate momentum without compromising craft. You get a scalable foundation, clear milestones, and custom decisions where they matter most.
                </p>
              </div>

              <ul class="grid gap-4 md:grid-cols-3 md:gap-5">
                <li class="ui-package-value-card flex flex-col gap-3">
                  <div class="ui-package-value-graphic" aria-hidden="true">
                    <span />
                    <span />
                    <span />
                  </div>
                  <h3 class="text-lg font-medium tracking-tight md:text-xl">Faster Delivery, High Standards</h3>
                  <p class="text-base leading-7 text-[var(--muted)]">
                    A proven underlying system eliminates reinvention, so delivery moves faster while performance, accessibility, and presentation quality remain first-class.
                  </p>
                </li>

                <li class="ui-package-value-card flex flex-col gap-3">
                  <div class="ui-package-value-graphic" aria-hidden="true">
                    <span />
                    <span />
                    <span />
                  </div>
                  <h3 class="text-lg font-medium tracking-tight md:text-xl">Clear Scope, Better Decisions</h3>
                  <p class="text-base leading-7 text-[var(--muted)]">
                    The structure clarifies what ships now and what evolves next. You can confidently choose Foundation, Growth, or Authority based on real business goals.
                  </p>
                </li>

                <li class="ui-package-value-card flex flex-col gap-3">
                  <div class="ui-package-value-graphic" aria-hidden="true">
                    <span />
                    <span />
                    <span />
                  </div>
                  <h3 class="text-lg font-medium tracking-tight md:text-xl">Custom Where It Counts</h3>
                  <p class="text-base leading-7 text-[var(--muted)]">
                    Messaging, proof, service narrative, and conversion paths are shaped to your practice so the site feels specific to your market, not interchangeable.
                  </p>
                </li>
              </ul>

              <div class="ui-cta-group ui-cta-actions">
                <ButtonLink
                  href="/packages/preview"
                  label="Preview the Starting Structure"
                  variant="secondary"
                />
                <ButtonLink
                  href="/contact#teardown-request"
                  label="Start with a Teardown"
                  variant="ghost"
                />
              </div>
            </section>
          </Container>
        </Section>

        <Section spacing="compact">
          <Container width="content">
            <section id="package-cta" class="ui-bottom-cta ui-cta-panel scroll-mt-24 flex flex-col gap-4 md:gap-5">
              <div class="ui-cta-layout">
                <div class="flex flex-col gap-4 md:gap-5">
                  <p class="ui-meta-label">Next Steps</p>

                  <h2 class="ui-cta-title">
                    Ready to map your delivery path?
                  </h2>
                  <p class="ui-cta-text max-w-[42ch]">
                    Share the goal, the current constraints, and the pace you need. We will map the right package and rollout sequence from there.
                  </p>
                  <div class="ui-cta-group ui-cta-actions pt-2">
                    <ButtonLink
                      href="/contact"
                      label="Get in Touch"
                      variant="primary"
                    />
                    <ButtonLink
                      href="/contact#teardown-request"
                      label="Request Teardown First"
                      variant="secondary"
                    />
                  </div>
                </div>

                <div class="ui-cta-image ui-editorial-frame aspect-[5/4]">
                  <img
                    src="/media/generated/packages-hero-delivery.png"
                    alt="Editorial image showing structured website delivery planning."
                    width={1536}
                    height={1024}
                    loading="lazy"
                    class="h-full w-full object-cover"
                  />
                </div>
              </div>
            </section>
          </Container>
        </Section>
      </main>
      <Footer />
    </PageShell>
  )
})
