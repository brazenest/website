import { component$ } from '@builder.io/qwik'
import type { IndependentProject } from '~/types/content'

const STATUS_LABELS: Record<NonNullable<IndependentProject['status']>, string> = {
  active: 'Active',
  beta: 'Beta',
  building: 'Building',
  paused: 'Paused',
}

export const IndependentProjectCard = component$(
  ({ project }: { project: IndependentProject }) => {
    const isExternal = project.href !== '#' && !project.href.startsWith('/')
    const initial = project.name.charAt(0).toUpperCase()

    return (
      <a
        href={project.href}
        {...(isExternal
          ? { target: '_blank', rel: 'noopener noreferrer' }
          : {})}
        class="group bento-tile flex flex-col gap-4 p-5 transition-shadow duration-[var(--motion-duration-quick)] ease-[var(--motion-easing-quick)] hover:shadow-[var(--shadow-card-hover)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--focus)] focus-visible:ring-offset-2"
        aria-label={`${project.name} — ${project.tagline}`}
      >
        {/* Logo / Fallback */}
        <div class="flex items-start justify-between gap-3">
          <div class="flex h-12 w-12 shrink-0 items-center justify-center rounded-[var(--radius-lg)] border border-[var(--border)] bg-[var(--surface-subtle)]">
            {project.image ? (
              <img
                src={project.image}
                alt={`${project.name} logo`}
                width={48}
                height={48}
                class="h-10 w-10 rounded-[var(--radius-md)] object-contain"
              />
            ) : (
              <span class="text-xl font-black text-[var(--accent)]">{initial}</span>
            )}
          </div>

          <div class="flex items-center gap-2">
            {project.status && (
              <span class="rounded-full border border-[var(--border)] bg-[var(--surface-subtle)] px-2 py-0.5 text-[0.65rem] font-semibold uppercase tracking-widest text-[var(--muted)]">
                {STATUS_LABELS[project.status]}
              </span>
            )}
            {project.category && (
              <span class="rounded-full bg-[var(--surface)] px-2 py-0.5 text-[0.65rem] font-medium text-[var(--muted)]">
                {project.category}
              </span>
            )}
          </div>
        </div>

        {/* Name + tagline */}
        <div class="flex flex-col gap-1.5">
          <p class="text-base font-bold tracking-tight text-[var(--heading-fg)] transition-colors duration-[var(--motion-duration-quick)] group-hover:text-[var(--accent)]">
            {project.name}
          </p>
          <p class="text-sm leading-6 text-[var(--muted)]">{project.tagline}</p>
        </div>

        {/* External link indicator */}
        {isExternal && (
          <p class="mt-auto text-xs font-semibold text-[var(--accent)] opacity-0 transition-opacity duration-[var(--motion-duration-quick)] group-hover:opacity-100">
            Visit site →
          </p>
        )}
      </a>
    )
  }
)
