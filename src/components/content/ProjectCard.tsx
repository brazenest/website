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
      <div class="project-card__body mt-auto flex flex-col gap-[var(--space-3)]">
        <header class="entry-header flex flex-col gap-[var(--space-2)]">
          <p class="entry-meta text-[var(--color-text-muted)] font-[var(--font-mono)] text-[0.78rem] tracking-[0.08em] uppercase">
            {project.status} / {project.year}
          </p>
          <h3 class="entry-title text-[clamp(1.35rem,3.5vw,1.85rem)] leading-[1.05] tracking-[-0.03em]">
            {project.title}
          </h3>
          <p class="entry-kicker text-[var(--color-text)] text-base font-semibold tracking-[-0.01em]">{project.role}</p>
        </header>
        <p class="entry-summary text-[var(--color-text-soft)] leading-[1.72]">{project.summary}</p>
        <ul class="entry-tags list-none p-0 flex flex-wrap gap-[0.4rem_0.75rem]" aria-label={`${project.title} technologies`}>
          {project.stack.map((item) => (
            <li key={item} class="entry-tag">
              {item}
            </li>
          ))}
        </ul>
      </div>
    </article>
  );
});
