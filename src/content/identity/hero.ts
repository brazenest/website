import type { HeroContent } from '~/types/content'

export const heroContent: HeroContent = {
  name: 'Alden Gillespy',
  headline: 'Software Systems & Visual Storytelling',
  description:
    'I am a software engineer and video producer using the same working method across both disciplines: define intent, respect constraints, and execute with discipline. This site is split into Engineering and Production so you can move directly into software systems, architecture, performance, and tooling work or into filming, editing, and visual narrative work. Use this page to orient yourself, then choose the side that best matches what you want to evaluate.',
  ctas: [
    {
      label: 'Enter Engineering Side',
      href: '/engineering',
      variant: 'primary',
    },
    {
      label: 'Enter Production Side',
      href: '/production',
      variant: 'secondary',
    },
    {
      label: 'Learn More About Alden',
      href: '/about',
      variant: 'ghost',
    },
  ],
}
