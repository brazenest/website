import type { EngineeringProject } from '~/types/content'
import { andacityBookingSystemProject } from './andacity-booking-system'
import { fulfillmentReliabilityConsoleProject } from './fulfillment-reliability-console'
import { studioContentOpsPlatformProject } from './studio-content-ops-platform'

export const engineeringProjects: EngineeringProject[] = [
  {
    ...andacityBookingSystemProject,
    description:
      'Search inputs arrived from users and suppliers in inconsistent formats, creating unpredictable search behavior. I designed a canonical query layer and normalized entity model that kept booking behavior stable as the product expanded and suppliers grew.',
    cardDescriptor: 'Lead full-stack engineer · Search architecture and data modeling',
    cardHighlight:
      'Canonical contracts eliminated edge-case branching logic. New integrations shipped without rewriting search semantics. Architecture-level decisions made feature work faster and safer.',
  },
  {
    ...studioContentOpsPlatformProject,
    description:
      'Campaign launches were bespoke builds with inconsistent schemas and manual QA handoffs. I implemented schema-driven content blocks and governed publish workflows that transformed delivery from project-based into platform-based operations.',
    cardDescriptor: 'Lead platform engineer · Content modeling and publishing workflow',
    cardHighlight:
      'Versioned schemas and release gates prevented regressions by design. Campaign teams shipped faster with fewer approval steps. Platform reduced engineering overhead of each new launch.',
  },
  {
    ...fulfillmentReliabilityConsoleProject,
    description:
      'Incident diagnosis scattered across logs, scripts, and tribal knowledge. I built a reliability console that unified failure context and recovery controls so operations and engineering could move from reactive incident heroics to systematic troubleshooting.',
    cardDescriptor: 'Lead systems engineer · Reliability tooling and incident response UX',
    cardHighlight:
      'Event correlation and guarded replay tooling made diagnosis systematic and safe. Operations team gained visibility without requiring engineering on every incident. Infrastructure reliability became measurable.',
  },
]
