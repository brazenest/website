import { component$ } from "@builder.io/qwik";
import type { DocumentHeadProps } from "@builder.io/qwik-city";
import { useLocation } from "@builder.io/qwik-city";
import { Footer } from "~/components/footer/Footer";
import { PageShell } from "~/components/layout/PageShell";
import { Header } from "~/components/nav/Header";
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
    title: project.seo?.title ?? project.title,
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

        <main id="main-content" class="flex-1">
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

      <main id="main-content" class="flex-1">
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

              <p class="ui-meta-label">Engineering Case Study</p>

              <h1 class="max-w-[14ch] text-4xl font-semibold leading-tight tracking-tight md:text-5xl">
                {project.title}
              </h1>

              <p class="max-w-[62ch] text-base leading-7 text-[var(--muted)] md:text-lg">
                {project.description}
              </p>

              <ul class="flex flex-wrap gap-2 pt-2">
                {project.techStack.map((tech) => (
                  <li
                    key={tech}
                    class="rounded-[var(--radius-lg)] border border-[var(--border)] bg-[var(--surface-elevated)] px-2.5 py-1 text-xs font-medium text-[var(--fg)] md:text-sm"
                  >
                    {tech}
                  </li>
                ))}
              </ul>
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
                <div class="ui-case-study-copy flex flex-col gap-3 md:gap-4">
                  <h2 class="text-2xl font-semibold tracking-tight md:text-3xl">
                    {section.title}
                  </h2>
                  <p class="max-w-[62ch] text-lg leading-8 text-[var(--muted)]">
                    {section.content}
                  </p>
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
            <section class="ui-context-panel flex flex-col gap-3 p-6 md:gap-4 md:p-8">
              <h2 class="text-2xl font-semibold tracking-tight md:text-3xl">
                Build systems like this
              </h2>
              <p class="max-w-[62ch] text-base leading-7 text-[var(--muted)]">
                This case study demonstrates architectural discipline, strategic
                decision-making under complexity, and long-term thinking about
                maintainability. If you're looking to build systems that scale
                with your business, let's talk about your challenges.
              </p>
              <div class="flex flex-col gap-2 pt-2">
                <a
                  href="/packages"
                  class="inline-flex items-center gap-1 text-sm font-medium text-[var(--primary)] transition-colors duration-[var(--motion-duration-quick)] ease-[var(--motion-easing-quick)] hover:text-[var(--fg)] focus-visible:rounded-[var(--radius-lg)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--focus)] focus-visible:ring-offset-2"
                >
                  View service packages
                  <span aria-hidden="true">→</span>
                </a>
                <a
                  href="/contact"
                  class="inline-flex items-center gap-1 text-sm font-medium text-[var(--primary)] transition-colors duration-[var(--motion-duration-quick)] ease-[var(--motion-easing-quick)] hover:text-[var(--fg)] focus-visible:rounded-[var(--radius-lg)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--focus)] focus-visible:ring-offset-2"
                >
                  Email about your project
                  <span aria-hidden="true">→</span>
                </a>
              </div>
            </section>
          </Container>
        </Section>
      </main>

      <Footer />
    </PageShell>
  );
});
