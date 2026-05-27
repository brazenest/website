import type { EngineeringHeroContent } from '~/types/content'

export const engineeringHeroContent: EngineeringHeroContent = {
  headline: 'I architect and ship maintainable software systems.',
  byline: 'Alden Gillespy — Software Engineer',
  description:
    'I design systems that stay understandable as they scale: clear contracts, reliable performance, and implementation choices teams can extend without rewriting core foundations every quarter.',
  primaryCtaLabel: 'Browse Case Studies',
  primaryCtaHref: '/engineering#selected-work',
  secondaryCtaLabel: 'See My Approach',
  secondaryCtaHref: '/engineering#system-thinking',
  visual: {
    src: '/media/generated/engineering-hero-systems.png',
    alt: 'Editorial engineering photograph showing system planning, code structure, and calm technical decision-making in a refined workspace.',
  },
}
