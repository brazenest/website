import type { SideLinkCardContent } from '~/types/content'

export const sideLinkCards: SideLinkCardContent[] = [
  {
    title: 'Engineering',
    description:
      'Explore systems architecture, application builds, performance work, and tooling that keeps products maintainable in production. This side focuses on turning ambiguous requirements into clear implementations across frontend, backend, data, and developer experience without losing operational discipline.',
    href: '/engineering',
    ctaLabel: 'Enter Engineering Side',
    themeHint: 'engineering',
  },
  {
    title: 'Production',
    description:
      'Explore filming, editing, and visual story work shaped through pre-production planning, coverage decisions, and post-production craft. This side focuses on cinematic narrative, pacing, and emotional clarity across client pieces and self-directed work where execution has to serve the story.',
    href: '/production',
    ctaLabel: 'Enter Production Side',
    themeHint: 'production',
  },
]
