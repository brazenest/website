import type { SideLinkCardContent } from '~/types/content'

export const sideLinkCards: SideLinkCardContent[] = [
  {
    title: 'Engineering',
    description: 'Performance, search visibility, and durable architecture for platforms that have to keep working under real pressure, not just in a polished demo. This side focuses on maintainability, clarity of contracts, and technical decisions that compound over time.',
    href: '/engineering',
    ctaLabel: 'Enter Engineering Side',
    themeHint: 'engineering',
  },
  {
    title: 'Production',
    description: 'Imagery, polish, and editorial control that make the work feel authored, credible, and immediately professional from the first screen onward. This side focuses on framing, pacing, and visual judgment that strengthens trust before visitors read deeply.',
    href: '/production',
    ctaLabel: 'Enter Production Side',
    themeHint: 'production',
  },
]
