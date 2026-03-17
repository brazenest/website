import { component$ } from '@builder.io/qwik'
import { ProjectCard } from '@/components/engineering/ProjectCard'
import type { EngineeringProject } from '@/types/content'

export const ProjectGrid = component$(({ projects }: ProjectGridProps) => {
  return (
    <div class="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 xl:gap-8">
      {projects.map((project) => (
        <ProjectCard key={project.slug} {...project} />
      ))}
    </div>
  )
})

type ProjectGridProps = {
  projects: EngineeringProject[]
}