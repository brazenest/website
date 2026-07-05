import { component$ } from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";
import { ProofStrip } from "~/components/home/ProofStrip";
import { AppShell } from "~/components/layout/AppShell";
import { IndependentProjectGrid } from "~/components/projects/IndependentProjectGrid";
import { ButtonLink } from "~/components/ui/ButtonLink";
import { Container } from "~/components/ui/Container";
import { Section } from "~/components/ui/Section";
import { homeProofStrip } from "~/content/identity/proof-strip";
import { independentProjects } from "~/content/projects";
import { staticHeads } from "~/fns/seo/staticHeads";

export const head: DocumentHead = staticHeads.home;

export default component$(() => {
  return (
    <AppShell>
      <main id="main-content" class="page-home flex-1 scroll-mt-24 p-0">
        {/* Pride Month 2026 — rainbow accent bar */}
        <div class="pride-rainbow-bar" aria-hidden="true" />

        {/* BENTO GRID HERO */}
        <Section spacing="default">
          <Container width="wide">
            <div class="grid gap-4 md:grid-cols-2 lg:grid-cols-3 lg:grid-rows-[auto_auto]">

              {/* Tile 1: Identity — spans 2 cols on large screens */}
              <div class="bento-tile flex flex-col justify-between gap-6 p-6 md:p-8 lg:col-span-2">
                <div class="flex flex-col gap-4">
                  <p class="ui-meta-label">Alden Gillespy</p>
                  <h1 class="text-3xl font-extrabold leading-tight tracking-tight text-[var(--heading-fg)] md:text-4xl lg:text-5xl">
                    I build products, websites, and stories.
                  </h1>
                  <p class="max-w-[52ch] text-base leading-7 text-[var(--muted)]">
                    Software engineer, media producer, and independent founder.
                    This is my home base — a portal to the products I'm building,
                    the client work I take on, and the writing I publish.
                  </p>
                </div>
                <div class="flex flex-wrap gap-3">
                  <ButtonLink href="/for-hire" label="For-Hire Work" variant="primary" />
                  <ButtonLink href="/blog" label="My Writing" variant="secondary" />
                </div>
              </div>

              {/* Tile 2: Photo — tall on desktop */}
              <div class="bento-tile relative overflow-hidden lg:row-span-2">
                <img
                  src="/media/generated/home-hero-studio.png"
                  alt="Alden Gillespy — studio photograph"
                  width={600}
                  height={800}
                  loading="eager"
                  class="h-full min-h-[280px] w-full object-cover lg:min-h-[500px]"
                />
                <div class="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/60 to-transparent p-4">
                  <p class="text-sm font-semibold text-white">Builder · Producer · Founder</p>
                  <p class="text-xs text-white/70">San Francisco, CA</p>
                </div>
              </div>

              {/* Tile 3: For-hire path */}
              <div class="bento-tile flex flex-col gap-3 p-5">
                <div class="flex items-center gap-2">
                  <div class="h-2 w-2 rounded-full bg-[var(--accent)]" />
                  <p class="text-xs font-bold uppercase tracking-widest text-[var(--muted)]">For Hire</p>
                </div>
                <p class="text-sm font-semibold leading-snug text-[var(--heading-fg)]">
                  Web engineering, video production, and cross-disciplinary client work.
                </p>
                <a href="/for-hire" class="mt-auto text-xs font-semibold text-[var(--accent)] underline underline-offset-2">
                  See client work →
                </a>
              </div>

              {/* Tile 4: Writing path */}
              <div class="bento-tile flex flex-col gap-3 p-5" style="border-color: var(--impact); border-opacity: 0.3;">
                <div class="flex items-center gap-2">
                  <div class="h-2 w-2 rounded-full bg-[var(--impact)]" />
                  <p class="text-xs font-bold uppercase tracking-widest text-[var(--muted)]">Writing</p>
                </div>
                <p class="text-sm font-semibold leading-snug text-[var(--heading-fg)]">
                  Essays and process notes on systems, stories, and craft.
                </p>
                <a href="/blog" class="mt-auto text-xs font-semibold text-[var(--impact)] underline underline-offset-2">
                  Read the blog →
                </a>
              </div>

            </div>
          </Container>
        </Section>

        {/* INDEPENDENT PROJECTS */}
        <Section spacing="default">
          <Container width="wide">
            <div class="flex flex-col gap-6 md:gap-8">
              <div class="flex flex-col gap-2">
                <p class="ui-meta-label">Independent Projects</p>
                <h2 class="text-2xl font-extrabold tracking-tight text-[var(--heading-fg)] md:text-3xl">
                  Things I'm building.
                </h2>
                <p class="max-w-[56ch] text-base leading-7 text-[var(--muted)]">
                  Products, platforms, and experiments I'm building under Radiant
                  Ventures, my holding company for independent work. Each lives on
                  its own domain — this is the map.
                </p>
              </div>
              <IndependentProjectGrid projects={independentProjects} />
            </div>
          </Container>
        </Section>

        {/* PROOF STRIP — social proof carries across positioning */}
        <ProofStrip items={homeProofStrip} />

        {/* PRIDE: Values statement */}
        <Section spacing="compact">
          <Container width="content">
            <div class="pride-values-section">
              <p class="text-base leading-7 text-[var(--muted)] md:text-lg">
                I design and build with inclusion in mind — not as a policy,
                but as a practice. Good work is for everyone.{" "}
                <a href="/about" class="ui-link-inline font-medium">
                  About me
                </a>
                .
              </p>
            </div>
          </Container>
        </Section>

        {/* BOTTOM CTA */}
        <Section spacing="compact">
          <Container width="content">
            <section
              id="home-cta"
              aria-labelledby="home-cta-title"
              class="ui-bottom-cta ui-cta-panel flex flex-col gap-4 md:gap-5"
            >
              <div class="ui-cta-layout">
                <div class="flex flex-col gap-4 md:gap-5">
                  <p class="ui-meta-label">Work Together</p>

                  <h2 id="home-cta-title" class="ui-cta-title">
                    Have a project that needs engineering or production?
                  </h2>

                  <p class="ui-cta-text max-w-[42ch]">
                    I take on client work across web engineering and media
                    production. A short note with your context is enough to
                    start a useful conversation.
                  </p>

                  <div class="ui-cta-group ui-cta-actions">
                    <ButtonLink
                      href="/for-hire"
                      label="See Client Work"
                      variant="primary"
                    />
                    <ButtonLink
                      href="/contact"
                      label="Get in Touch"
                      variant="secondary"
                    />
                  </div>
                </div>

                <div class="ui-cta-image ui-editorial-frame aspect-[5/4]">
                  <img
                    src="/media/generated/home-hero-studio.png"
                    alt="Alden Gillespy studio."
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
