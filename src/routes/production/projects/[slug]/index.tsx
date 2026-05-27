import { component$ } from "@builder.io/qwik";
import type { DocumentHeadProps } from "@builder.io/qwik-city";
import { useLocation } from "@builder.io/qwik-city";
import { Footer } from "~/components/footer/Footer";
import { PageShell } from "~/components/layout/PageShell";
import { Header } from "~/components/nav/Header";
import { ButtonLink } from "~/components/ui/ButtonLink";
import { Container } from "~/components/ui/Container";
import { Section } from "~/components/ui/Section";
import { ResponsiveVideo } from "~/components/media/ResponsiveVideo";
import { productionProjects } from "~/content/production/projects";
import { buildMetadata } from "~/fns/seo/buildMetadata";
import { metadataToDocumentHead } from "~/fns/seo/metadataToDocumentHead";
import { buildProjectStructuredData } from "~/fns/seo/buildStructuredData";
import { cn } from "~/fns/cn";

export const head = ({ params }: DocumentHeadProps) => {
  const project = productionProjects.find((item) => item.slug === params.slug);

  if (!project) {
    return metadataToDocumentHead(
      buildMetadata({
        title: "Video Production Project | Alden Gillespy",
        description: "Production project detail by Alden Gillespy.",
        pathname: `/production/projects/${params.slug}`,
      }),
    );
  }

  // Build CreativeWork schema for this production project
  const projectSchema = buildProjectStructuredData({
    title: project.title,
    description: project.description,
    url: `/production/projects/${params.slug}`,
    image: project.image,
    section: "Production",
  });

  const metadata = buildMetadata({
    title: `${project.title} — Video Production Case Study | Alden Gillespy`,
    description: project.seo?.description ?? project.description,
    pathname: `/production/projects/${params.slug}`,
    image: project.image,
  });

  const documentHead = metadataToDocumentHead(metadata);
  return {
    ...documentHead,
    scripts: [
      {
        props: {
          type: "application/ld+json",
        },
        script: JSON.stringify(projectSchema),
      },
    ],
  };
};

export default component$(() => {
  const location = useLocation();
  const slug = location.params.slug;

  const project = productionProjects.find((item) => item.slug === slug);

  if (!project) {
    return (
      <PageShell theme="production">
        <Header />

        <main id="main-content" class="page-production-project flex-1">
          <Section spacing="spacious">
            <Container width="content">
              <div class="flex flex-col gap-4">
                <p class="ui-meta-label">Production</p>
                <h1 class="text-4xl font-semibold leading-tight tracking-tight md:text-5xl">
                  Project not found
                </h1>
                <p class="text-base leading-7 text-[var(--muted)] md:text-lg">
                  The requested production project could not be found.
                </p>
              </div>
            </Container>
          </Section>
        </main>

        <Footer />
      </PageShell>
    );
  }

  const heroMedia = project.media[0];

  return (
    <PageShell theme="production">
      <Header />

      <main id="main-content" class="page-production-project flex-1">
        <Section spacing="spacious">
          <Container>
            <div class="flex flex-col gap-6 md:gap-8">
              <div class="aspect-[16/9] w-full overflow-hidden rounded-[var(--radius-lg)] border border-[var(--border)] bg-[var(--surface-elevated)]">
                {heroMedia ? (
                  heroMedia.type === "image" ? (
                    <img
                      src={heroMedia.src}
                      alt={heroMedia.alt ?? project.title}
                      width={1600}
                      height={900}
                      loading="eager"
                      class="h-full w-full object-cover"
                    />
                  ) : (
                    // Hero video: conservative loading with poster fallback
                    // preload="metadata": Load only metadata, not video frames
                    // controls: Show player controls for user interaction
                    // No autoplay: User must explicitly choose to play
                    <ResponsiveVideo
                      src={heroMedia.src}
                      poster={heroMedia.poster}
                      width={1600}
                      height={900}
                    />
                  )
                ) : (
                  <div class="flex h-full items-center justify-center px-4 text-sm text-[var(--muted)]">
                    Media preview
                  </div>
                )}
              </div>

              <div class="flex max-w-[72ch] flex-col gap-4 md:gap-5">
                <p class="ui-meta-label">Production Case Study</p>

                <h1 class="max-w-[15ch] text-4xl font-semibold leading-tight tracking-tight md:text-5xl">
                  {project.title}
                </h1>

                <p class="max-w-[65ch] text-base leading-7 text-[var(--muted)] md:text-lg">
                  {project.description}
                </p>
              </div>
            </div>
          </Container>
        </Section>

        {project.sections.map((section, index) => (
          <Section key={section.title} spacing="default">
            <Container width="content">
              <div
                class={cn(
                  "ui-case-study-section",
                  index % 2 === 1 && "ui-case-study-section--reverse",
                )}
              >
                <div class="ui-case-study-copy flex flex-col gap-3 md:gap-4">
                  <h2 class="text-2xl font-semibold tracking-tight md:text-3xl">
                    {section.title}
                  </h2>

                  {section.content ? (
                    <p class="max-w-[65ch] text-lg leading-8 text-[var(--muted)]">
                      {section.content}
                    </p>
                  ) : null}

                  {section.items?.length ? (
                    <ul class="max-w-[65ch] flex flex-col gap-2 text-lg leading-8 text-[var(--muted)]">
                      {section.items.map((item) => (
                        <li key={item} class="flex gap-3">
                          <span class="flex-shrink-0 text-[var(--fg)]">•</span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  ) : null}
                </div>

                {section.media?.[0] ? (
                  <div class="ui-case-study-media aspect-[5/4]">
                    {section.media[0].type === "image" ? (
                      <img
                        src={section.media[0].src}
                        alt={section.media[0].alt ?? section.title}
                        width={1400}
                        height={1120}
                        loading="lazy"
                      />
                    ) : (
                      <ResponsiveVideo
                        src={section.media[0].src}
                        poster={section.media[0].poster}
                        width={1400}
                        height={1120}
                      />
                    )}
                  </div>
                ) : null}
              </div>
            </Container>
          </Section>
        ))}

        <Section spacing="compact">
          <Container width="content">
            <section id="production-project-cta" class="ui-bottom-cta ui-cta-panel flex flex-col gap-4 md:gap-5">
              <div class="ui-cta-layout">
                <div class="flex flex-col gap-4 md:gap-5">
                  <p class="ui-meta-label">Next</p>
                  <h2 class="ui-cta-title">
                    Work on projects like this.
                  </h2>
                  <p class="ui-cta-text max-w-[42ch]">
                    This work shows strategic planning, editorial discipline, and translation of intent into compelling visual narrative. If you want this level of production execution, let&apos;s discuss your project.
                  </p>
                  <div class="ui-cta-group ui-cta-actions">
                    <ButtonLink
                      href="/packages"
                      label="View Service Packages"
                      variant="primary"
                    />
                    <ButtonLink
                      href="/contact"
                      label="Start a Project"
                      variant="secondary"
                    />
                  </div>
                </div>

                <div class="ui-cta-image ui-editorial-frame aspect-[5/4]">
                  <img
                    src="/media/generated/production-hero-storycraft.png"
                    alt="Editorial production image representing cinematic direction and finishing craft."
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
  );
});
