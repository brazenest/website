import type { EngineeringProject } from '~/types/content'
import { andacityBookingSystemProject } from './andacity-booking-system'

export const engineeringProjects: EngineeringProject[] = [
  {
    ...andacityBookingSystemProject,
    description:
      'A full-stack booking platform that turns messy travel inputs into canonical queries, so search stays reliable as the product scales.',
    cardDescriptor: 'Full-stack travel booking platform',
    cardHighlight:
      'Normalized entities and canonical routing made search behavior predictable and safer to extend.',
  },
]
