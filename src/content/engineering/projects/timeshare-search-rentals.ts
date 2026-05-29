import type { EngineeringProject } from '~/types/content'

export const timeshareSearchRentalsProject: EngineeringProject = {
  id: 'timeshare-search-rentals',
  title: 'Timeshare Search & Rentals',
  slug: 'timeshare-search-rentals',
  description:
    'A dense listings and booking experience redesigned for faster comparison, stronger hierarchy, and more reliable search behavior across highly variable inventory.',
  techStack: ['Next.js', 'TypeScript', 'Node.js', 'MySQL'],
  sections: [
    {
      title: 'Overview',
      paragraphs: [
        'This project focused on timeshare search and rentals, where the user experience is dominated by information density. Listings carry pricing nuance, availability variation, room details, amenities, policies, and trust cues that all compete for attention at once. The challenge was not a lack of information. It was turning dense inventory into something people could scan, compare, and act on with confidence.',
        'I redesigned the listing system, search interactions, and booking-adjacent flows so the platform could support decision-making rather than overwhelm it. The work sits between systems thinking and interface design: data variability, layout hierarchy, interaction ergonomics, and booking trust all had to reinforce each other.',
      ],
    },
    {
      title: 'Context',
      paragraphs: [
        'The original experience exposed a large amount of inventory detail but did not prioritize it consistently. Pricing moved around, amenities were hard to compare, and visual hierarchy shifted across cards. Users had to spend too much effort decoding the interface before they could even evaluate the offer.',
        'Timeshare is a comparison-heavy domain. People are balancing dates, room types, value, and constraints quickly, often with incomplete certainty. In that environment, unclear structure becomes a direct conversion problem because users lose trust in their own interpretation of the listing.',
      ],
    },
    {
      title: 'Problem',
      paragraphs: [
        'The immediate issue was inconsistent presentation. The deeper issue was that the platform lacked a strong system for dense listing communication. When card structure is unstable, every listing feels like a slightly different product, and users have to re-learn the layout over and over again.',
        'The product also had to handle inventory variability gracefully. Missing data, offer differences, and special-case attributes could not collapse the layout or force ad hoc fixes. The system needed to be predictable for users and resilient for the team maintaining it.',
      ],
    },
    {
      title: 'Approach',
      paragraphs: [
        'I treated the listing card as a small design system with a fixed hierarchy: identity first, pricing in a stable lane, amenities and supporting details grouped predictably, and a clear action path into details or booking. That structure then informed the rest of the search surface, including filters, result behavior, and responsive adaptation.',
        'The goal was not to hide complexity. It was to make complexity legible. A user comparing dense listings should spend attention on tradeoffs between options, not on decoding where the information lives.',
      ],
    },
    {
      title: 'Execution',
      items: [
        'Rebuilt listing cards around consistent lanes for resort identity, pricing context, amenities, and primary action',
        'Standardized search and filter behavior so result updates preserved orientation and reduced layout shift',
        'Designed responsive information reveal patterns that kept the interaction model stable across device sizes',
        'Handled partial or inconsistent inventory data without breaking card structure or trust cues',
        'Aligned booking-entry points with the same hierarchy so moving deeper into a listing did not introduce UI surprises',
      ],
    },
    {
      title: 'Outcome',
      paragraphs: [
        'The redesigned platform made comparison easier because listings became structurally predictable. Users could understand what was comparable, identify deal-breakers faster, and move into the next step with less hesitation. The system felt clearer not because it said less, but because it said the important things in the same way every time.',
        'From an engineering perspective, the redesign turned future variation into a system problem instead of a series of layout emergencies. New offer types and listing differences could be handled through established rules rather than one-off component exceptions.',
      ],
    },
    {
      title: 'Reflection',
      paragraphs: [
        'This project reinforced that dense interfaces succeed when hierarchy is stronger than abundance. The product did not need more visual energy. It needed a more disciplined contract between data importance and presentation.',
        'If I were taking the system further, I would invest more in explicit offer classification and comparison tooling so the search surface could become even more decision-supportive without adding clutter.',
      ],
    },
  ],
  image: '/media/engineering/timeshare-search-rentals.svg',
  seo: {
    title: 'Timeshare Search & Rentals',
    description:
      'Engineering case study for a listings and booking experience focused on hierarchy, dense-search ergonomics, and reliable comparison across variable inventory.',
  },
}