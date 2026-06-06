import { component$ } from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";
import { AboutPreview } from "~/components/hero/AboutPreview";
import { HomeHero } from "~/components/hero/HomeHero";
import { HomeCTASection } from "~/components/home/HomeCTASection";
import { ProofStrip } from "~/components/home/ProofStrip";
import { PageShell } from "~/components/layout/PageShell";
import { Footer } from "~/components/footer/Footer";
import { Header } from "~/components/nav/Header";
import { SideSelector } from "~/components/side/SideSelector";
import { aboutPreviewContent } from "~/content/identity/about-preview";
import { heroContent } from "~/content/identity/hero";
import { homeProofStrip } from "~/content/identity/proof-strip";
import { sideLinkCards } from "~/content/identity/side-links";
import { Container } from "~/components/ui/Container";
import { Section } from "~/components/ui/Section";
import { staticHeads } from "~/fns/seo/staticHeads";

export const head: DocumentHead = staticHeads.home;

export default component$(() => {
  return (
    <PageShell theme="neutral">
      {/* Pride Month 2026 — rainbow accent bar */}
      <div class="pride-rainbow-bar" aria-hidden="true" />
      <Header />

      <main id="main-content" class="page-home flex-1 scroll-mt-24 p-0">
        <HomeHero {...heroContent}>
          <section
            aria-labelledby="home-side-selector-heading"
            class="flex flex-col gap-4 md:gap-5"
          >
            <div class="flex max-w-[62ch] flex-col gap-2 md:gap-3">
              <p class="ui-meta-label">What I Do</p>

              <h2
                id="home-side-selector-heading"
                class="text-2xl font-semibold tracking-tight md:text-3xl"
              >
                One practice split into two useful paths.
              </h2>

              <p class="text-base leading-7 text-[var(--muted)] md:text-lg">
                Engineering is where I work on the structure underneath:
                performance, architecture, content models, and maintainable web
                systems. Production is where I work on the human surface:
                profiles, interviews, campaign assets, and visual stories.
                Explore the path that matches your project, or{" "}
                <a href="/about" class="ui-link-inline">
                  read the personal background behind both
                </a>
                .
              </p>
            </div>

            <SideSelector items={sideLinkCards} />
          </section>
        </HomeHero>

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

        <AboutPreview {...aboutPreviewContent} />

        <HomeCTASection />
      </main>

      <Footer />
    </PageShell>
  );
});
