import { component$, useVisibleTask$ } from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";
import { PackageGrid } from "~/components/packages/PackageGrid";
import { PackageHero } from "~/components/hero/PackageHero";
import { AppShell } from "~/components/layout/AppShell";
import { Container } from "~/components/ui/Container";
import { Section } from "~/components/ui/Section";
import { ButtonLink } from "~/components/ui/ButtonLink";
import { packageHeroContent } from "~/content/packages/hero";
import { packages } from "~/content/packages";
import { staticHeads } from "~/fns/seo/staticHeads";
import { trackEvent } from "~/fns/analytics";

export const head: DocumentHead = staticHeads.packages;

export default component$(() => {
  // eslint-disable-next-line qwik/no-use-visible-task
  useVisibleTask$(() => {
    trackEvent("view_packages");
  });
  return (
    <AppShell>
      <main id="main-content" class="page-packages flex-1 p-0">
        <PackageHero {...packageHeroContent} />

        <Section spacing="default">
          <Container>
            <section
              id="package-tiers"
              aria-labelledby="package-tiers-title"
              class="scroll-mt-24 flex flex-col gap-6 md:gap-8"
            >
              {/* Pride Month accent */}
              <div
                class="h-1 w-32 rounded-full"
                style="background: linear-gradient(90deg, #e40303, #ff8c00, #ffed00, #008026, #004dff, #750787);"
                aria-hidden="true"
              />
              <div class="flex flex-col gap-3">
                <p class="ui-meta-label">Service Packages</p>
                <h2
                  id="package-tiers-title"
                  class="text-2xl font-extrabold tracking-tight text-[var(--heading-fg)] md:text-3xl"
                >
                  Three tiers, one performance standard.
                </h2>
                <p class="max-w-[60ch] text-base leading-7 text-[var(--muted)]">
                  Foundation ships fast. Growth adds depth and conversion architecture.
                  Authority builds the long-term platform. All three share the same
                  performance-first core.
                </p>
              </div>

              <PackageGrid packages={packages} />
            </section>
          </Container>
        </Section>

        <Section spacing="compact">
          <Container width="content">
            <section
              id="package-mid-cta"
              aria-labelledby="package-mid-cta-title"
              class="ui-cta-panel flex flex-col gap-4 md:gap-5"
            >
              <div class="ui-cta-layout">
                <div class="flex flex-col gap-4 md:gap-5">
                  <p class="ui-meta-label">Fit Check</p>

                  <h2 id="package-mid-cta-title" class="ui-cta-title">
                    Choose the entry point that fits.
                  </h2>

                  <p class="ui-cta-text max-w-[34ch]">
                    Choose a package if you are ready to build. Choose a
                    teardown if you want a clearer read on the current site
                    first. Both are practical ways to begin.
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
            <section
              id="teardown"
              aria-labelledby="teardown-title"
              class="scroll-mt-24 flex flex-col gap-6 md:gap-8"
            >
              <div class="flex flex-col gap-2">
                <p class="ui-meta-label">Not Ready for a Full Build?</p>
                <h2
                  id="teardown-title"
                  class="text-2xl font-semibold tracking-tight md:text-3xl"
                >
                  Start with a Website Teardown.
                </h2>
                <p class="max-w-[60ch] text-base leading-7 text-[var(--muted)]">
                  A teardown is a structured assessment of your current site:
                  what is working, what feels unclear, and what could improve
                  technically, visually, and strategically. It is a
                  low-commitment way to get useful direction before a full
                  engagement.
                </p>
              </div>

              <ul class="grid gap-4 md:grid-cols-3 md:gap-5">
                <li class="ui-package-value-card flex flex-col gap-3">
                  <div class="ui-package-value-graphic" aria-hidden="true">
                    <span />
                    <span />
                    <span />
                  </div>
                  <h3 class="text-lg font-medium tracking-tight md:text-xl">
                    Performance and SEO Assessment
                  </h3>
                  <p class="text-base leading-7 text-[var(--muted)]">
                    Core Web Vitals, load behavior, search visibility, and
                    technical blockers reviewed against the conditions your
                    visitors actually encounter.
                  </p>
                </li>

                <li class="ui-package-value-card flex flex-col gap-3">
                  <div class="ui-package-value-graphic" aria-hidden="true">
                    <span />
                    <span />
                    <span />
                  </div>
                  <h3 class="text-lg font-medium tracking-tight md:text-xl">
                    Offer and Conversion Audit
                  </h3>
                  <p class="text-base leading-7 text-[var(--muted)]">
                    Offer clarity, hierarchy, credibility cues, and the visual
                    decisions that make a visitor's next step feel easier.
                  </p>
                </li>

                <li class="ui-package-value-card flex flex-col gap-3">
                  <div class="ui-package-value-graphic" aria-hidden="true">
                    <span />
                    <span />
                    <span />
                  </div>
                  <h3 class="text-lg font-medium tracking-tight md:text-xl">
                    Actionable Next Steps
                  </h3>
                  <p class="text-base leading-7 text-[var(--muted)]">
                    You receive prioritized improvements, not a generic
                    checklist. Each recommendation explains the issue, the
                    likely benefit, and the practical next move.
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
            <section
              id="package-value"
              aria-labelledby="package-value-title"
              class="scroll-mt-24 flex flex-col gap-6 md:gap-8"
            >
              <div class="ui-package-value-intro flex flex-col gap-2">
                <h2
                  id="package-value-title"
                  class="text-2xl font-semibold tracking-tight md:text-3xl"
                >
                  Productized Enough to Move Fast, Custom Enough to Matter
                </h2>
                <p class="max-w-[60ch] text-base leading-7 text-[var(--muted)]">
                  Structured builds reduce delivery risk and keep the project
                  moving without making the result generic. You get a scalable
                  foundation, clear milestones, and custom decisions where they
                  affect clarity, personality, and conversion.
                </p>
              </div>

              <ul class="grid gap-4 md:grid-cols-3 md:gap-5">
                <li class="ui-package-value-card flex flex-col gap-3">
                  <div class="ui-package-value-graphic" aria-hidden="true">
                    <span />
                    <span />
                    <span />
                  </div>
                  <h3 class="text-lg font-medium tracking-tight md:text-xl">
                    Faster Delivery, High Standards
                  </h3>
                  <p class="text-base leading-7 text-[var(--muted)]">
                    A proven underlying system eliminates reinvention while
                    performance, accessibility, responsiveness, and presentation
                    quality stay first-class.
                  </p>
                </li>

                <li class="ui-package-value-card flex flex-col gap-3">
                  <div class="ui-package-value-graphic" aria-hidden="true">
                    <span />
                    <span />
                    <span />
                  </div>
                  <h3 class="text-lg font-medium tracking-tight md:text-xl">
                    Clear Scope, Better Decisions
                  </h3>
                  <p class="text-base leading-7 text-[var(--muted)]">
                    The structure clarifies what ships now and what evolves
                    next, so Foundation, Growth, or Authority maps to the
                    project in front of you.
                  </p>
                </li>

                <li class="ui-package-value-card flex flex-col gap-3">
                  <div class="ui-package-value-graphic" aria-hidden="true">
                    <span />
                    <span />
                    <span />
                  </div>
                  <h3 class="text-lg font-medium tracking-tight md:text-xl">
                    Custom Where It Counts
                  </h3>
                  <p class="text-base leading-7 text-[var(--muted)]">
                    Messaging, selected work, service narrative, and conversion
                    paths are shaped around your market so the site feels
                    specific and believable.
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
            <section
              id="package-cta"
              class="ui-bottom-cta ui-cta-panel scroll-mt-24 flex flex-col gap-4 md:gap-5"
            >
              <div class="ui-cta-layout">
                <div class="flex flex-col gap-4 md:gap-5">
                  <p class="ui-meta-label">Next Steps</p>

                  <h2 class="ui-cta-title">Ready to shape the next version?</h2>
                  <p class="ui-cta-text max-w-[42ch]">
                    Share the goal, the current constraints, and the pace you
                    need. I will help map the right package, teardown, or
                    rollout sequence from there.
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
    </AppShell>
  );
});
