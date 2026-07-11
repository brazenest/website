import type { EngineeringProject } from '~/types/content'

export const memreyProject: EngineeringProject = {
  id: 'memrey',
  title: 'Memrey',
  slug: 'memrey',
  description:
    'A platform that reconstructs meaningful moments from your own digitized media, turning scattered personal archives into memories you can step back into and explore.',
  techStack: ['TypeScript', 'React', 'Node.js', 'Cloudflare'],
  sections: [
    {
      title: 'Overview',
      paragraphs: [
        'Memrey is a memory reconstruction platform. It takes the digitized media people already have — photos, video, audio, and the fragments in between — and reassembles it into meaningful moments they can revisit and explore, rather than files that sit inertly in folders.',
        'The goal is a product that makes the past feel present. That is as much an experience problem as a data one: the system has to organize fragmented, inconsistent personal media and then present it in a way that feels calm, coherent, and alive.',
      ],
    },
    {
      title: 'Context',
      paragraphs: [
        'Most people are sitting on years of accumulated digital media spread across phones, drives, and old accounts. It is abundant but effectively inaccessible — hard to search, hard to relate, and rarely revisited because nothing turns the raw archive into something worth returning to.',
        'The opportunity is to treat that archive as raw material for reconstruction, not just storage. The value is not in holding the media; it is in bringing specific moments back into reach.',
      ],
    },
    {
      title: 'Problem',
      paragraphs: [
        'Personal media arrives in wildly inconsistent formats, quality, and completeness. Turning that into coherent "moments" requires ingesting mixed media reliably, understanding how pieces relate, and assembling them without losing the emotional truth of what actually happened.',
        'Just as important, the material is deeply personal. The system has to earn trust — handling sensitive data carefully and presenting reconstructed moments in a way that feels respectful and grounded rather than gimmicky.',
      ],
    },
    {
      title: 'Approach',
      paragraphs: [
        'I structured the platform around a clear pipeline: ingest and normalize varied media, relate the pieces into moments, and present those moments through an interface built for revisiting rather than browsing. Keeping those stages distinct lets each one improve independently as the product matures.',
        'The experience layer is deliberately restrained. When the subject is someone\'s memories, the design has to prioritize clarity and emotional steadiness over spectacle, so the moment — not the interface — is what the person feels.',
      ],
    },
    {
      title: 'Execution',
      items: [
        'Designed an ingestion layer that normalizes mixed personal media into a consistent internal representation',
        'Modeled reconstructed "moments" as a first-class concept relating related media over time',
        'Built an interface focused on revisiting and exploring moments rather than managing files',
        'Prioritized privacy-conscious handling of highly personal data throughout the architecture',
      ],
    },
    {
      title: 'Outcome',
      paragraphs: [
        'Memrey is in active development, with early work concentrated on dependable ingestion and a presentation model that makes a reconstructed moment feel present rather than archived.',
        'The foundation is intentionally general so the experience can deepen over time while the core promise stays the same: bring your most meaningful moments back within reach.',
      ],
    },
    {
      title: 'Reflection',
      paragraphs: [
        'The hardest and most important part of Memrey is trust — both in how carefully the system treats personal data and in how faithfully it reconstructs what mattered. Get that wrong and no feature list saves it.',
        'That constraint shapes every technical decision: reliability, restraint, and respect for the material come before novelty.',
      ],
    },
  ],
  seo: {
    title: 'Memrey',
    description:
      'Engineering case study for Memrey, a memory reconstruction platform that turns scattered personal digitized media into meaningful moments you can revisit.',
  },
}
