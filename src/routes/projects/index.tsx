import { component$ } from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";
import { PageLayout } from "~/components/layout";
import { PageCallToAction, PageIntro, ProjectCard } from "~/components/content";
import {
  getCurrentProjects,
  getFeaturedProjects,
  getSiteSettings,
} from "~/lib/content";
import { createPageHead } from "~/lib/seo";

export default component$(() => {
  const currentProjects = getCurrentProjects();
  const featuredProjects = getFeaturedProjects();
  const settings = getSiteSettings();

  return (
    <PageLayout>
      <PageIntro
        eyebrow="Projects"
        title="Current work and selected projects."
        description="A compact record of the active rebuild and a few projects already carried over from the current public site."
        backgroundImage={{
          src: "/assets/images/how-to-become-software-engineer.jpg",
          alt: "An image representing software engineering and project development.",
          width: 1200,
          height: 800,
        }}
      />

      <section
        class="page-section flex flex-col gap-[var(--space-5)] overflow-hidden p-[var(--space-5)] sm:gap-[var(--space-6)] sm:p-[var(--space-6)]"
        aria-labelledby="projects-current"
      >
        <h2 id="projects-current" class="section-title">
          Current
        </h2>
        <ol class="project-grid">
          {currentProjects.map((project) => (
            <li key={project.slug} class="project-grid__item">
              <ProjectCard project={project} />
            </li>
          ))}
        </ol>
      </section>

      <section
        class="page-section flex flex-col gap-[var(--space-5)] overflow-hidden p-[var(--space-5)] sm:gap-[var(--space-6)] sm:p-[var(--space-6)]"
        aria-labelledby="projects-featured"
      >
        <h2 id="projects-featured" class="section-title">
          Featured
        </h2>
        <ol class="project-grid">
          {featuredProjects.map((project) => (
            <li key={project.slug} class="project-grid__item">
              <ProjectCard project={project} />
            </li>
          ))}
        </ol>
      </section>

      <PageCallToAction
        eyebrow="Next step"
        title="Need the fuller background behind the work?"
        description="The project page is the compact view. The resume has the timeline, and I am happy to talk through front-end systems, product work, or the current rebuild if something here is relevant."
        primaryAction={{
          href: settings.contactHref,
          label: settings.contactLabel,
        }}
        secondaryAction={{
          href: settings.resumeHref,
          label: "Resume PDF",
          newTab: true,
        }}
        note={`${settings.location} / ${settings.availability}`}
      />
    </PageLayout>
  );
});

export const head: DocumentHead = createPageHead(
  "Projects",
  "A compact list of current and featured project summaries for the v3 site.",
);
