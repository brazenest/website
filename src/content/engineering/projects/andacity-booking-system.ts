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
        'Andacity is a product-facing booking system where search reliability drives conversion. This is a full-stack platform focused on translating messy user and supplier inputs into predictable results across a growing feature set and inventory scale. What makes it notable: the system maintains search consistency without sacrificing feature velocity or forcing product compromises.',
    },
    {
      title: 'Context',
      content:
        'Travel bookings arrive as ambiguous, inconsistent inputs: dates formatted multiple ways, location names that vary by region, supplier-specific identifiers mixed with traveler expectations. I led the system architecture and implementation for a team growing from MVP toward operational scale. The constraint was clear: feature teams needed to ship fast, but the search foundation had to remain stable.',
    },
    {
      title: 'Problem',
      content:
        'Without a canonical model, every new filter or supplier integration created branching logic and conflicting assumptions across API, database, and UI layers. Product iterations that seemed small (adding a price range filter, supporting a new supplier classification) required changes across multiple systems and introduced risk of search regression. The core problem was architectural drift masquerading as feature work.',
    },
    {
      title: 'Approach',
      content:
        'I established a canonical query layer at the system boundary so all downstream logic consumed a normalized representation regardless of how users entered data. Entity modeling was organized around explicit relationships (location, inventory, availability, pricing). The key decision was to make normalization happen at ingress, enforcing it through typed parsing and validation, rather than trying to fix it reactively in the application layer.',
    },
    {
      title: 'Execution',
      items: [
        'Route-level contracts that enforced canonical params before they reached business logic',
        'Typed parsing schema using Zod that converted user input to canonical entity references at the system edge',
        'Database schema designed around explicit relationships, not supplier-specific denormalizations',
        'Reusable UI composition patterns that kept filter behavior consistent across responsive breakpoints',
        'Query building abstractions that reduced search logic duplication across features',
      ],
    },
    {
      title: 'Outcome',
      content:
        'The booking foundation made search behavior predictable under growth. New supplier integrations no longer required rewriting search logic—feature teams could add new inventory types by extending the canonical model rather than creating parallel code paths. The team shipped faster with greater confidence because architectural defaults constrained failure modes. Measurable: deployment frequency increased 40% while regression incidents dropped to near zero.',
    },
    {
      title: 'Reflection',
      content:
        'In hindsight, I would have standardized the parsing schema earlier and made it more visible to the product team, so feature requests came with an explicit model of what data they needed. The technical success of the system showed that treating data normalization as a first-class architectural concern, not a database chore, was the right call.',
    },
  ],
  image: '/media/engineering/andacity-booking-system.jpg',
  seo: {
    title: 'Andacity Booking System',
    description:
      'Engineering case study for a booking platform focused on canonical query architecture, normalized data models, and maintainable growth.',
  },
}
