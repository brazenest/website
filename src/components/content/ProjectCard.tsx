import { component$ } from "@builder.io/qwik";
import { DeferredMediaFigure } from "~/components/content";
import type { Project } from "~/lib/content";

type ProjectCardProps = {
  project: Project;
};

export const ProjectCard = component$<ProjectCardProps>(({ project }) => {
  return (
    <article class="project-card">
      {project.image && (
        <DeferredMediaFigure
          asset={project.image}
          class="project-card__media"
          placeholderLabel={`Loading ${project.title}`}
        />
      )}
      <header class="entry-header">
        <p class="entry-meta">
          {project.status} / {project.year}
        </p>
        <h3 class="entry-title">{project.title}</h3>
        <p class="entry-kicker text-[var(--color-text)] text-base font-semibold tracking-[-0.01em]">{project.role}</p>
      </header>
      <p class="entry-summary">{project.summary}</p>
      <ul class="entry-tags list-none p-0 flex flex-wrap gap-[0.4rem_0.75rem]" aria-label={`${project.title} technologies`}>
        {project.stack.map((item) => (
          <li key={item} class="entry-tag">
            {item}
          </li>
        ))}
      </ul>
    </article>
  );
});