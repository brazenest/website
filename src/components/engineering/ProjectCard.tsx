import { component$ } from '@builder.io/qwik'
import { TextLink } from '~/components/ui/TextLink'
import type { EngineeringProject } from '~/types/content'

export const ProjectCard = component$(
  ({ title, slug, description, techStack }: ProjectCardProps) => {
    return (
      <article class="flex h-full flex-col rounded-[var(--radius-lg)] border border-[var(--border)] bg-[var(--surface)] p-6 md:p-7">
        <div class="flex flex-1 flex-col gap-4">
          <div class="flex flex-col gap-2">
            <h3 class="text-xl font-semibold tracking-tight">{title}</h3>
            <p class="text-sm leading-6 text-[var(--muted)] md:text-base">{description}</p>
          </div>

          <ul class="flex flex-wrap gap-2">
            {techStack.map((tech) => (
              <li
                key={tech}
                class="rounded-[var(--radius-lg)] border border-[var(--border)] bg-[var(--surface-subtle)] px-2.5 py-1 text-xs font-medium text-[var(--muted)] md:text-sm"
              >
                {tech}
              </li>
            ))}
          </ul>

          <div class="pt-2">
            <TextLink href={`/engineering/projects/${slug}`} label="View case study" />
          </div>
        </div>
      </article>
    )
  },
)

type ProjectCardProps = Pick<EngineeringProject, 'title' | 'slug' | 'description' | 'techStack'>