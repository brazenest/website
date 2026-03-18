import type { EngineeringProject } from '~/types/content'
import { andacityBookingSystemProject } from './andacity-booking-system'
import { fulfillmentReliabilityConsoleProject } from './fulfillment-reliability-console'
import { studioContentOpsPlatformProject } from './studio-content-ops-platform'

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
    ...studioContentOpsPlatformProject,
    description:
      'Campaign launches depended on one-off builds, so I implemented schema-driven content blocks and a governed publish pipeline that turned delivery into a repeatable platform workflow.',
    cardDescriptor: 'Lead platform engineer · Content modeling and publishing workflow',
    cardHighlight:
      'Versioned schemas and release gates cut launch regressions while giving content teams more autonomy.',
  },
  {
    ...fulfillmentReliabilityConsoleProject,
    description:
      'Incident response was spread across logs, scripts, and tribal knowledge, so I built a reliability console that unified event context and recovery controls in one operational surface.',
    cardDescriptor: 'Lead systems engineer · Reliability tooling and incident response UX',
    cardHighlight:
      'Event correlation and guarded replay tooling reduced diagnosis time and prevented high-cost recovery mistakes.',
  },
]
