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
        'This platform supported marketing and editorial teams launching campaigns across multiple brands and markets. The objective was to move from ad-hoc implementations to a repeatable system that could scale without sacrificing content quality.',
    },
    {
      title: 'Problem Space',
      content:
        'Each launch previously required bespoke page assembly, inconsistent data structures, and manual QA handoffs. As campaign volume increased, the team spent more time reconciling schema differences and release risk than improving content quality or speed.',
    },
    {
      title: 'Role and Scope',
      content:
        'I led platform design and implementation for the shared content model, authoring constraints, and publish lifecycle. I coordinated requirements with design, content operations, and engineering stakeholders to align flexibility for authors with enforceable technical guardrails.',
    },
    {
      title: 'System Design Decisions',
      content:
        'I modeled content as versioned block schemas with explicit validation and ownership boundaries. Draft, preview, and publish states were treated as first-class workflow stages, making release intent visible and reducing accidental drift between authored content and rendered output.',
    },
    {
      title: 'Implementation Complexity',
      content:
        'The core challenge was balancing composability with governance. I built migration-safe schema evolution patterns, deterministic preview rendering, and release checks that prevented invalid states from moving forward while still letting teams ship quickly under tight campaign timelines.',
    },
    {
      title: 'Why It Mattered',
      content:
        'The platform turned campaign delivery into an operational capability rather than a sequence of custom builds. Teams could launch faster with fewer regressions, and engineering effort shifted from repetitive assembly work to improving shared system capabilities.',
    },
  ],
  image: '/media/engineering/studio-content-ops-platform.jpg',
  seo: {
    title: 'Studio Content Ops Platform',
    description:
      'Engineering case study for a schema-driven publishing platform focused on content modeling, release workflow, and maintainable multi-tenant operations.',
  },
}
