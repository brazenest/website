import { component$ } from "@builder.io/qwik";
import type { DocumentHeadProps } from "@builder.io/qwik-city";
import { useLocation } from "@builder.io/qwik-city";
import { Footer } from "~/components/footer/Footer";
import { PageShell } from "~/components/layout/PageShell";
import { Header } from "~/components/nav/Header";
import { ButtonLink } from "~/components/ui/ButtonLink";
import { Container } from "~/components/ui/Container";
import { Section } from "~/components/ui/Section";
import { cn } from "~/fns/cn";
import { engineeringProjects } from "~/content/engineering/projects";
import { buildMetadata } from "~/fns/seo/buildMetadata";
import { metadataToDocumentHead } from "~/fns/seo/metadataToDocumentHead";
import { buildProjectStructuredData } from "~/fns/seo/buildStructuredData";

export const head = ({ params }: DocumentHeadProps) => {
  const project = engineeringProjects.find((item) => item.slug === params.slug);

  if (!project) {
    return metadataToDocumentHead(
      buildMetadata({
        title: "Engineering Project",
        description: "Engineering project detail by Alden Gillespy.",
        pathname: `/engineering/projects/${params.slug}`,
      }),
    );
  }

  // Build CreativeWork schema for this engineering project
  const projectSchema = buildProjectStructuredData({
    title: project.title,
    description: project.description,
    url: `/engineering/projects/${params.slug}`,
    image: project.image,
    section: "Engineering",
  });

  const metadata = buildMetadata({
    title: `${project.seo?.title ?? project.title} — Engineering Case Study | Alden Gillespy`,
    description: project.seo?.description ?? project.description,
    pathname: `/engineering/projects/${params.slug}`,
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

  const project = engineeringProjects.find((item) => item.slug === slug);

  if (!project) {
    return (
      <PageShell theme="engineering">
        <Header />

        <main id="main-content" class="page-engineering-project flex-1">
          <Section spacing="spacious">
            <Container width="content">
              <div class="flex flex-col gap-4">
                <p class="ui-meta-label">Engineering</p>
                <h1 class="text-4xl font-semibold leading-tight tracking-tight md:text-5xl">
                  Project not found
                </h1>
                <p class="text-base leading-7 text-[var(--muted)] md:text-lg">
                  The requested engineering project could not be found.
                </p>
              </div>
            </Container>
          </Section>
        </main>

        <Footer />
      </PageShell>
    );
  }

  return (
    <PageShell theme="engineering">
      <Header />

      <main id="main-content" class="page-engineering-project flex-1">
        <Section spacing="spacious">
          <Container width="content">
            <div class="flex flex-col gap-4 md:gap-5">
              {project.image ? (
                <div class="overflow-hidden rounded-[var(--radius-lg)] border border-[var(--border)] bg-[var(--surface-elevated)]">
                  <img
                    src={project.image}
                    alt={project.title}
                    width={1600}
                    height={900}
                    loading="eager"
                    class="h-full w-full object-cover"
                  />
                </div>
              ) : null}

              <div class="flex flex-col gap-4 md:gap-5">
                <p class="ui-meta-label">Engineering Case Study</p>

                <h1 class="max-w-[14ch] text-4xl font-semibold leading-tight tracking-tight md:text-5xl">
                  {project.title}
                </h1>

                <p class="max-w-[65ch] text-base leading-7 text-[var(--muted)] md:text-lg">
                  {project.description}
                </p>

                <ul class="flex flex-wrap gap-2 pt-2" aria-label="Tech stack">
                  {project.techStack.map((tech, i) => (
                    <li
                      key={tech}
                      class="rounded-[var(--radius-pill)] border border-[var(--border-interactive)] bg-[var(--accent-soft)] px-3 py-1 text-xs font-semibold text-[var(--accent)]"
                      style={i % 3 === 2 ? "background: var(--surface-tint);" : ""}
                    >
                      {tech}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </Container>
        </Section>

        {project.sections.map((section, index) => (
          <Section
            key={section.title}
            spacing={index === 0 ? "compact" : "default"}
          >
            <Container width="content">
              <div
                class={cn(
                  "ui-case-study-section",
                  index % 2 === 1 && "ui-case-study-section--reverse",
                )}
              >
                <div class={`ui-case-study-copy flex flex-col gap-3 md:gap-4${index === 0 ? " border-l-2 border-[var(--accent)] pl-5" : ""}`}>
                  <h2 class="text-2xl font-semibold tracking-tight md:text-3xl">
                    {section.title}
                  </h2>

                  {section.content ? (
                    <p class="max-w-[62ch] text-lg leading-8 text-[var(--muted)]">
                      {section.content}
                    </p>
                  ) : null}

                  {section.paragraphs?.length ? (
                    <div class="max-w-[62ch] flex flex-col gap-4">
                      {section.paragraphs.map((paragraph) => (
                        <p
                          key={paragraph}
                          class="text-lg leading-8 text-[var(--muted)]"
                        >
                          {paragraph}
                        </p>
                      ))}
                    </div>
                  ) : null}

                  {section.items?.length ? (
                    <ul class="max-w-[62ch] flex flex-col gap-2 text-lg leading-8 text-[var(--muted)]">
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
                    <img
                      src={section.media[0].src}
                      alt={section.media[0].alt ?? section.title}
                      width={1400}
                      height={1120}
                      loading="lazy"
                    />
                  </div>
                ) : null}
              </div>
            </Container>
          </Section>
        ))}

        <Section spacing="compact">
          <Container width="content">
            <section
              id="engineering-project-cta"
              class="ui-bottom-cta ui-cta-panel flex flex-col gap-4 md:gap-5"
            >
              <div class="ui-cta-layout">
                <div class="flex flex-col gap-4 md:gap-5">
                  <p class="ui-meta-label">Next</p>
                  <h2 class="ui-cta-title">Build systems like this.</h2>
                  <p class="ui-cta-text max-w-[42ch]">
                    This case study demonstrates architectural discipline,
                    strategic decision-making under complexity, and long-term
                    maintainability thinking. If you want this level of system
                    clarity, let&apos;s talk.
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
                    src="/media/generated/engineering-hero-systems.png"
                    alt="Editorial engineering image showing structured technical systems work."
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
