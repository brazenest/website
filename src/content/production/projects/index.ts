import type { ProductionProject } from '~/types/content'
import { bellagioFountainFilmProject } from './bellagio-fountain-film'

export const productionProjects: ProductionProject[] = [
  {
    ...bellagioFountainFilmProject,
    description:
      'A short film study of the Bellagio fountains that turns unpredictable live choreography into a coherent visual arc through low-light framing and editorial pacing.',
    cardContext: 'Short film study · Director/Editor · Live performance',
    cardDemonstrates:
      'Low-light composition, adaptive coverage, and pacing decisions under changing timing conditions.',
  },
]