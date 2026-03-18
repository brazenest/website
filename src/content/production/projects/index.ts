import type { ProductionProject } from '~/types/content'
import { bellagioFountainFilmProject } from './bellagio-fountain-film'

export const productionProjects: ProductionProject[] = [
  {
    ...bellagioFountainFilmProject,
    description:
      'A cinematic short on the Bellagio fountains, built around low-light composition and editorial pacing to turn a familiar spectacle into a focused visual narrative.',
  },
]