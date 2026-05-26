import type { EngineeringProject } from '~/types/content'

export const andacityBookingSystemProject: EngineeringProject = {
  id: 'andacity-booking-system',
  title: 'Andacity Booking System',
  slug: 'andacity-booking-system',
  description:
    'A full-stack booking platform that translates inconsistent supplier and traveler inputs into one canonical search contract, so results stay dependable as inventory and features grow.',
  techStack: ['Qwik', 'TypeScript', 'Zod', 'PostgreSQL', 'Drizzle'],
  sections: [
    {
      title: 'Overview',
      content:
        'Andacity is a product-facing booking system where search reliability drives conversion. The platform had to support growing inventory, changing query patterns, and iterative UI work without introducing unpredictable search behavior.',
      media: [
        {
          type: 'image',
          src: '/media/engineering/sections/andacity-booking-system-overview.jpg',
          alt: 'Editorial image of a travel booking product planning workspace for the Andacity overview section',
        },
      ],
    },
    {
      title: 'Problem Space',
      content:
        'Travel search inputs arrive in messy forms: ambiguous dates, inconsistent location labels, and supplier-specific naming conventions. Without a canonical model, every new filter or supplier integration creates branching logic and conflicting assumptions across API, database, and UI layers.',
      media: [
        {
          type: 'image',
          src: '/media/engineering/sections/andacity-booking-system-problem-space.jpg',
          alt: 'Editorial image showing fragmented travel-search inputs and conflicting booking cues',
        },
      ],
    },
    {
      title: 'Role and Scope',
      content:
        'I led the system architecture and implementation, including search contract design, schema normalization, route-level composition, and frontend query orchestration. I worked across product requirements and implementation constraints to keep feature delivery fast without sacrificing long-term clarity.',
      media: [
        {
          type: 'image',
          src: '/media/engineering/sections/andacity-booking-system-role-and-scope.jpg',
          alt: 'Lead engineer coordinating architecture decisions for a booking platform',
        },
      ],
    },
    {
      title: 'System Design Decisions',
      content:
        'I established a canonical query layer at the boundary so all downstream logic consumed a normalized representation regardless of how users entered data. Entity modeling was organized around explicit relationships (location, inventory, availability, pricing), which made data flow easier to reason about and reduced hidden coupling between screens.',
      media: [
        {
          type: 'image',
          src: '/media/engineering/sections/andacity-booking-system-system-design-decisions.jpg',
          alt: 'Structured systems-design scene representing canonical queries and normalized data relationships',
        },
      ],
    },
    {
      title: 'Implementation Complexity',
      content:
        'The hard part was preserving product flexibility while preventing query drift. I introduced typed parsing and validation at ingress, route contracts that enforced canonical params, and reusable UI composition patterns that kept filter behavior consistent across responsive breakpoints and future feature additions.',
      media: [
        {
          type: 'image',
          src: '/media/engineering/sections/andacity-booking-system-implementation-complexity.jpg',
          alt: 'Complex but controlled engineering workspace showing validation and route orchestration',
        },
      ],
    },
    {
      title: 'Why It Mattered',
      content:
        'The canonical query layer became the architectural foundation for sustainable growth. Every subsequent feature—new filters, supplier integrations, platform expansion—could build on the same normalized contracts without legacy logic accumulating. The team could ship confidently because architectural constraints reduced edge-case failure modes and made search behavior predictable under scaling. By coupling architectural discipline with explicit role contracts, the system remained maintainable despite growing complexity, which allowed product work to move faster without accumulating technical debt.',
      media: [
        {
          type: 'image',
          src: '/media/engineering/sections/andacity-booking-system-why-it-mattered.jpg',
          alt: 'Mature travel platform atmosphere suggesting scalable dependable product operations',
        },
      ],
    },
  ],
  image: '/media/engineering/andacity-booking-system.jpg',
  seo: {
    title: 'Andacity Booking System',
    description:
      'Engineering case study for a booking platform focused on canonical query architecture, normalized data models, and maintainable growth.',
  },
}
