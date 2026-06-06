import { component$ } from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";
import { HomeCTASection } from "~/components/home/HomeCTASection";
import { ProofStrip } from "~/components/home/ProofStrip";
import { PageShell } from "~/components/layout/PageShell";
import { Footer } from "~/components/footer/Footer";
import { Header } from "~/components/nav/Header";
import { SideSelector } from "~/components/side/SideSelector";
import { Container } from "~/components/ui/Container";
import { Section } from "~/components/ui/Section";
import { ButtonLink } from "~/components/ui/ButtonLink";
import { homeProofStrip } from "~/content/identity/proof-strip";
import { sideLinkCards } from "~/content/identity/side-links";
import { staticHeads } from "~/fns/seo/staticHeads";

export const head: DocumentHead = staticHeads.home;

export default component$(() => {
  return (
    <PageShell theme="neutral">
      {/* Pride Month 2026 — rainbow accent bar */}
      <div class="pride-rainbow-bar" aria-hidden="true" />
      <Header />

      <main id="main-content" class="page-home flex-1 scroll-mt-24 p-0">

        {/* BENTO GRID HERO */}
        <Section spacing="default">
          <Container width="wide">
            <div class="grid gap-4 md:grid-cols-2 lg:grid-cols-3 lg:grid-rows-[auto_auto]">

              {/* Tile 1: Intro — spans 2 cols on large screens */}
              <div class="bento-tile flex flex-col justify-between gap-6 p-6 md:p-8 lg:col-span-2">
                <div class="flex flex-col gap-4">
                  <p class="ui-meta-label">Alden Gillespy</p>
                  <h1 class="text-3xl font-extrabold leading-tight tracking-tight text-[var(--heading-fg)] md:text-4xl lg:text-5xl">
                    Websites, stories, and useful systems for people building things.
                  </h1>
                  <p class="max-w-[52ch] text-base leading-7 text-[var(--muted)]">
                    Software engineer and video producer. I help independent professionals
                    and small teams build a web presence that explains their work clearly
                    and earns the next conversation.
                  </p>
                </div>
                <div class="flex flex-wrap gap-3">
                  <ButtonLink href="/contact" label="Start a Project" variant="primary" />
                  <ButtonLink href="/work" label="View Work" variant="secondary" />
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
                  <p class="text-sm font-semibold text-white">Engineering + Production</p>
                  <p class="text-xs text-white/70">San Francisco, CA</p>
                </div>
              </div>

              {/* Tile 3: Engineering path */}
              <div class="bento-tile flex flex-col gap-3 p-5">
                <div class="flex items-center gap-2">
                  <div class="h-2 w-2 rounded-full bg-[var(--accent)]" />
                  <p class="text-xs font-bold uppercase tracking-widest text-[var(--muted)]">Engineering</p>
                </div>
                <p class="text-sm font-semibold leading-snug text-[var(--heading-fg)]">
                  Web architecture, performance audits, and scalable systems.
                </p>
                <a href="/engineering" class="mt-auto text-xs font-semibold text-[var(--accent)] underline underline-offset-2">
                  View engineering work →
                </a>
              </div>

              {/* Tile 4: Production path */}
              <div class="bento-tile flex flex-col gap-3 p-5" style="border-color: var(--impact); border-opacity: 0.3;">
                <div class="flex items-center gap-2">
                  <div class="h-2 w-2 rounded-full bg-[var(--impact)]" />
                  <p class="text-xs font-bold uppercase tracking-widest text-[var(--muted)]">Production</p>
                </div>
                <p class="text-sm font-semibold leading-snug text-[var(--heading-fg)]">
                  Founder profiles, campaign films, and visual storytelling.
                </p>
                <a href="/production" class="mt-auto text-xs font-semibold text-[var(--impact)] underline underline-offset-2">
                  View production work →
                </a>
              </div>

            </div>
          </Container>
        </Section>

        {/* Stats band — horizontal tiles */}
        <Section spacing="compact">
          <Container>
            <div class="grid grid-cols-2 gap-4 md:grid-cols-4">
              {[
                { value: "7+", label: "Projects shipped" },
                { value: "3", label: "Active clients" },
                { value: "5+", label: "Years building" },
                { value: "2", label: "Disciplines" },
              ].map((stat) => (
                <div key={stat.label} class="bento-tile--subtle rounded-[var(--radius-card)] p-4 text-center">
                  <p class="text-3xl font-black tracking-tight text-[var(--accent)]">{stat.value}</p>
                  <p class="text-xs font-medium text-[var(--muted)]">{stat.label}</p>
                </div>
              ))}
            </div>
          </Container>
        </Section>

        {/* Testimonials */}
        <ProofStrip items={homeProofStrip} />

        {/* Pride: Values statement */}
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

        {/* Full path selector */}
        <Section spacing="default">
          <Container width="wide">
            <div class="flex flex-col gap-5">
              <div class="flex flex-col gap-2">
                <p class="ui-meta-label">Choose a path</p>
                <h2 class="text-2xl font-extrabold tracking-tight text-[var(--heading-fg)] md:text-3xl">
                  One practice, two entry points.
                </h2>
              </div>
              <SideSelector items={sideLinkCards} />
            </div>
          </Container>
        </Section>

        <HomeCTASection />
      </main>

      <Footer />
    </PageShell>
  );
});
