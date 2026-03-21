import type { EngineeringProject } from '~/types/content'

export const studioContentOpsPlatformProject: EngineeringProject = {
  id: 'studio-content-ops-platform',
  title: 'Studio Content Ops Platform',
  slug: 'studio-content-ops-platform',
  description:
    'A multi-tenant publishing platform that replaced one-off campaign page builds with schema-driven content blocks, preview tooling, and controlled release workflows.',
  techStack: ['TypeScript', 'Node.js', 'PostgreSQL', 'React', 'GraphQL'],
  sections: [
    {
      title: 'Overview',
      content:
        'This platform supported marketing and editorial teams launching campaigns across multiple brands and markets. It is a schema-driven publishing system focused on replacing ad-hoc implementations with repeatable, governed workflows. What makes it notable: it transformed campaign delivery from a sequence of custom builds into a scalable operational capability.',
    },
    {
      title: 'Context',
      content:
        'Each launch previously required building a new page from components, writing schema manually, and running inconsistent QA. As campaign volume increased to 8–12 launches per month, the team spent more time reconciling schema differences and release risk than improving content or speed. I led the platform design and implementation in close coordination with design, content operations, and engineering teams.',
    },
    {
      title: 'Problem',
      content:
        'Without a shared content model, duplicate schema definitions proliferated. Data structures for the same content type diverged across campaigns, creating friction during QA and making it harder to reuse components or migrate content between sites. Each new launch was a custom implementation with no institutional learning.',
    },
    {
      title: 'Approach',
      content:
        'I modeled content as versioned block schemas with explicit validation and ownership boundaries. Draft, preview, and publish states were treated as first-class workflow stages, making release intent visible and reducing accidental drift between authored content and rendered output. The key decision was to treat the schema as the contract between content authors and the renderer.',
    },
    {
      title: 'Execution',
      items: [
        'Versioned block schema system that supported composition without creating schema sprawl',
        'Migration-safe schema evolution patterns so content teams could iterate without breaking live campaigns',
        'Deterministic preview rendering that guaranteed what you see in preview matches production',
        'Release workflow with approval gates, scheduled publishing, and automated pre-publish validation',
        'GraphQL API that exposed content in a queryable format, unifying access for multiple frontends',
      ],
    },
    {
      title: 'Outcome',
      content:
        'Launch time decreased from 3–4 days of custom engineering to 8–12 hours of content authoring and review. The platform enabled content teams to operate independently for routine updates and gave engineering predictability around campaign delivery. Schema versioning prevented regressions, and the audit trail made content governance visible to stakeholders.',
    },
    {
      title: 'Reflection',
      content:
        'The project succeeded because I consulted authors early and often about workflow pain points, not just technical constraints. If I were to rebuild, I would invest earlier in content migration tooling and give teams stronger guidance on schema composition at the start, rather than learning through trial.',
    },
  ],
  image: '/media/engineering/studio-content-ops-platform.jpg',
  seo: {
    title: 'Studio Content Ops Platform',
    description:
      'Engineering case study for a schema-driven publishing platform focused on content modeling, release workflow, and maintainable multi-tenant operations.',
  },
}
