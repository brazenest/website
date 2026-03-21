import { component$ } from '@builder.io/qwik'
import { MediaCard } from '~/components/production/MediaCard'
import type { ProductionProject } from '~/types/content'

export const MediaGrid = component$(({ projects }: MediaGridProps) => {
  return (
    <ul class="grid grid-cols-1 gap-5 md:grid-cols-2 md:gap-6 xl:gap-8">
      {projects.map((project) => (
        <li key={project.slug}>
          <MediaCard {...project} />
        </li>
      ))}
    </ul>
  )
})

type MediaGridProps = {
  projects: ProductionProject[]
}