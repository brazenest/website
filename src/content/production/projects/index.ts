import type { ProductionProject } from '~/types/content'
import { bellagioFountainFilmProject } from './bellagio-fountain-film'

export const productionProjects: ProductionProject[] = [
  {
    ...bellagioFountainFilmProject,
    description:
      'A live-performance short where I translated unpredictable fountain choreography into a clear visual sequence through adaptive coverage and restrained editorial pacing.',
    cardContext: 'Observational short · Director/Shooter/Editor · Live night exterior',
    cardDemonstrates:
      'Coverage strategy under unpredictable timing, low-light framing discipline, and rhythm control in post.',
  },
]