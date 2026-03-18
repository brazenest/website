import type { EngineeringProject } from '~/types/content'
import { andacityBookingSystemProject } from './andacity-booking-system'

export const engineeringProjects: EngineeringProject[] = [
  {
    ...andacityBookingSystemProject,
    description:
      'A full-stack booking platform that normalizes messy travel inputs into canonical queries, keeping search reliable as the product scales.',
    cardDescriptor: 'Full-stack travel booking platform',
    cardHighlight:
      'Entity normalization and canonical routing kept search behavior predictable and easy to extend.',
  },
]
