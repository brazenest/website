import type { EngineeringProject } from '~/types/content'
import { andacityBookingSystemProject } from './andacity-booking-system'
import { ancestryDnaKitActivationProject } from './ancestry-dna-kit-activation'
import { timeshareSearchRentalsProject } from './timeshare-search-rentals'

export const engineeringProjects: EngineeringProject[] = [
  {
    ...andacityBookingSystemProject,
    description:
      'Search inputs arrived from users and suppliers in inconsistent formats, so I designed a canonical query layer and normalized data model that kept booking behavior stable as the product expanded.',
    cardDescriptor: 'Lead full-stack engineer · Search architecture and data modeling',
    cardHighlight:
      'Canonical contracts and entity normalization reduced edge-case drift and made new integrations safer to ship.',
  },
  {
    ...timeshareSearchRentalsProject,
    description:
      'Dense listing inventory and inconsistent card hierarchy made search harder to trust, so I reworked the listing system around clearer comparison, stronger information lanes, and stable booking interactions.',
    cardDescriptor: 'Frontend systems engineer · Search ergonomics and comparison UX',
    cardHighlight:
      'Stable listing structure turned variable inventory into a more predictable, decision-friendly search experience.',
  },
  {
    ...ancestryDnaKitActivationProject,
    description:
      'A high-trust activation flow for a sensitive consumer product, rebuilt around explicit state, calm validation patterns, and reusable UI behavior at very large scale.',
    cardDescriptor: 'Frontend systems engineer · High-trust flow design and state clarity',
    cardHighlight:
      'Clear state transitions and predictable validation reduced uncertainty in a sensitive multi-step experience.',
  },
]
