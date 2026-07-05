import { component$ } from '@builder.io/qwik'
import type { IndependentProject } from '~/types/content'
import { IndependentProjectCard } from '~/components/projects/IndependentProjectCard'

export const IndependentProjectGrid = component$(
  ({ projects }: { projects: IndependentProject[] }) => {
    return (
      <ul
        role="list"
        class="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3"
      >
        {projects.map((project) => (
          <li key={project.id}>
            <IndependentProjectCard project={project} />
          </li>
        ))}
      </ul>
    )
  }
)
