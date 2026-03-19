import { component$ } from '@builder.io/qwik'
import { ProjectCard } from '~/components/engineering/ProjectCard'
import type { EngineeringProject } from '~/types/content'

export const ProjectGrid = component$(({ projects }: ProjectGridProps) => {
  return (
    <ul class="grid grid-cols-1 gap-5 md:grid-cols-2 md:gap-6 xl:gap-8">
      {projects.map((project) => (
        <li key={project.slug}>
          <ProjectCard {...project} />
        </li>
      ))}
    </ul>
  )
})

type ProjectGridProps = {
  projects: EngineeringProject[]
}