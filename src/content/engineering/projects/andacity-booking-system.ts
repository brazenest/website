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
      paragraphs: [
        'Andacity is a booking system where search behavior is the product. Travelers arrive with incomplete destination language, inconsistent dates, and fuzzy expectations. Suppliers contribute inventory using their own taxonomies, naming patterns, and availability conventions. The platform had to make those realities feel coherent to the end user.',
        'I led the full-stack architecture and implementation around the search foundation: canonical request parsing, normalized booking entities, shared query construction, and UI patterns that kept filtering and result behavior consistent as the product expanded. The distinguishing feature of the work is not any single screen. It is the architectural decision to make ambiguity explicit and resolve it at the boundary instead of letting it leak across the stack.',
      ],
    },
    {
      title: 'Context',
      paragraphs: [
        'The team was moving from an MVP mindset toward operational scale. That shift changes what counts as a product problem. A search feature is no longer just a route plus a database query; it becomes a contract shared by filters, integrations, analytics, pricing rules, and every new inventory type the business wants to add.',
        'The incoming data did not arrive in a clean form. Dates could be represented in multiple formats, destination names varied by region or supplier, and availability records carried source-specific assumptions about room type, pricing, or classification. Product still needed to move quickly. The challenge was to support that speed without turning every feature request into a fragile cross-layer rewrite.',
      ],
    },
    {
      title: 'Problem',
      paragraphs: [
        'Without a canonical model, every feature pushed complexity outward. A seemingly simple addition like a new filter, a supplier-specific identifier, or a revised pricing rule forced changes in the API layer, database queries, UI state, and often the interpretation of existing data. The system was accumulating branching logic faster than the team could reason about it.',
        'That kind of drift is dangerous because it disguises itself as normal product work. The visible change might be small, but the hidden cost is duplicated assumptions spread across the stack. Over time, search stops being dependable. A user cannot predict why one query behaves differently from another, and engineers cannot safely extend the system without fear of regression.',
      ],
    },
    {
      title: 'Canonical Query Contract',
      paragraphs: [
        'The first architectural decision was to establish one canonical query layer at the boundary. Every inbound request, regardless of where it came from or how messy the raw input was, had to be parsed into a normalized representation before business logic could touch it. That created a stable contract between the request edge and the rest of the application.',
        'Typed parsing and validation enforced the rule. Dates, locations, guests, price ranges, and filter state were translated into canonical fields with explicit meaning. Instead of letting downstream code constantly reinterpret raw parameters, the application could assume that it was working against a coherent model. That lowered the cost of adding features because the burden of interpretation lived in one place.',
      ],
    },
    {
      title: 'Entity and Data Modeling',
      paragraphs: [
        'The data layer was organized around explicit relationships rather than supplier-specific shortcuts. Locations, inventory, availability, and pricing were modeled as related entities with clear boundaries. This kept the core schema aligned with the booking domain instead of with any one upstream supplier’s quirks.',
        'That decision mattered because integrations change faster than the underlying business concepts. If the schema mirrors supplier idiosyncrasies, every new integration expands the model in unpredictable ways. By anchoring the data model in domain relationships, new inventory types could extend the system without forcing parallel code paths or denormalized special cases.',
      ],
    },
    {
      title: 'Execution',
      items: [
        'Route-level contracts that enforced canonical params before they reached business logic',
        'Typed parsing schema using Zod that converted user input to canonical entity references at the system edge',
        'Database schema designed around explicit relationships, not supplier-specific denormalizations',
        'Reusable UI composition patterns that kept filter behavior consistent across responsive breakpoints',
        'Query building abstractions that reduced search logic duplication across features',
        'Shared defaults and guardrails so new product surfaces inherited stable search behavior by construction',
      ],
    },
    {
      title: 'Interface and Product Delivery',
      paragraphs: [
        'The frontend work was not separate from the systems work. Filters, result state, and responsive layout all depended on the same contract discipline as the API. I treated UI composition as part of the architecture: when search state is represented consistently, the interface can remain stable across breakpoints and new features without inventing one-off behavior for each surface.',
        'That also improved product collaboration. New requests could be evaluated in terms of whether they fit the canonical model, what new data they required, and where interpretation should occur. Instead of debating implementation details at every step, the team had a clearer shared language for what the system supported and how it should evolve.',
      ],
    },
    {
      title: 'Outcome',
      paragraphs: [
        'The immediate outcome was predictability. Search behavior stayed stable under product growth because downstream systems consumed the same normalized query contract. New supplier integrations no longer required rewriting the core logic. Teams could extend the model rather than bolt on special-case flows.',
        'The operational outcome was faster delivery with lower risk. Architectural defaults constrained failure modes before they spread. Deployment frequency increased 40%, and search regressions dropped to near zero because the system made the safe path the normal path.',
      ],
    },
    {
      title: 'Reflection',
      paragraphs: [
        'If I were to revisit the work, I would formalize the canonical contract even earlier and expose more of it to product stakeholders. The earlier a team can see where ambiguity enters the system, the easier it becomes to write better requests and avoid accidental complexity.',
        'The broader lesson is that normalization is not a data-cleanup chore. In systems like booking, it is a product capability. Making interpretation explicit at the boundary is what allows search to stay understandable as the business grows.',
      ],
    },
  ],
  image: '/media/engineering/andacity-booking-system.svg',
  seo: {
    title: 'Andacity Booking System',
    description:
      'Engineering case study for a booking platform focused on canonical query architecture, normalized data models, and maintainable growth.',
  },
}
