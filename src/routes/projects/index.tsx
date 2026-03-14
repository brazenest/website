import { component$ } from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";
import { PageLayout } from "~/components/layout";
import { PageIntro, ProjectCard } from "~/components/content";
import { getCurrentProjects, getFeaturedProjects } from "~/lib/content";
import { createPageHead } from "~/lib/seo";

export default component$(() => {
  const currentProjects = getCurrentProjects();
  const featuredProjects = getFeaturedProjects();

  return (
    <PageLayout>
      <PageIntro
        eyebrow="Projects"
        title="Current work and selected projects."
        description="A compact record of the active rebuild and a few projects already carried over from the current public site."
      />

      <section class="page-section" aria-labelledby="projects-current">
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

      <section class="page-section" aria-labelledby="projects-featured">
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
    </PageLayout>
  );
});

export const head: DocumentHead = createPageHead(
  "Projects",
  "A compact list of current and featured project summaries for the v3 site.",
);
