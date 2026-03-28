import type { SiteTemplateConfig } from '~/types/site-template'

export const defaultSiteTemplate: SiteTemplateConfig = {
  id: 'default',
  site: {
    name: 'Alden Gillespy',
    audience: 'Consultants, creators, and professional service providers building authority online.',
    primaryCtas: [
      {
        label: 'Start a Conversation',
        href: '/contact',
      },
      {
        label: 'View Packages',
        href: '/packages',
      },
    ],
  },
  pages: {
    home: {
      id: 'home',
      path: '/',
      zoneOrder: ['hero.primary', 'proof.simple', 'services.grid', 'cta.primary'],
    },
  },
  zones: {
    'hero.primary': {
      eyebrow: 'Professional Services Website',
      title: 'High-performance websites for self-marketed professionals',
      description:
        'A focused web platform that combines engineering reliability and clear messaging so the right clients understand your value quickly.',
      primaryAction: {
        label: 'Start a Conversation',
        href: '/contact',
        variant: 'primary',
      },
      secondaryAction: {
        label: 'View Packages',
        href: '/packages',
        variant: 'secondary',
      },
    },
    'proof.simple': {
      eyebrow: 'Proof',
      title: 'Recent outcomes',
      items: [
        {
          title: 'Andacity Platform',
          statement: 'Scalable travel platform architecture with clear booking flows.',
          href: '/engineering/projects/andacity-booking-system',
        },
        {
          title: 'Studio Content Ops',
          statement: 'Production-ready campaign operations system for repeatable launches.',
          href: '/engineering/projects/studio-content-ops-platform',
        },
        {
          title: 'Bellagio Fountain Film',
          statement: 'Cinematic production execution for high-visibility brand storytelling.',
          href: '/production/projects/bellagio-fountain-film',
        },
      ],
    },
    'services.grid': {
      eyebrow: 'Services',
      title: 'Core service pillars',
      description: 'Each engagement is built to improve clarity, trust, and qualified inquiry flow.',
      items: [
        {
          title: 'Engineering Foundation',
          description: 'Performance, search readiness, and durable architecture that supports growth.',
          bullets: ['Fast page delivery', 'Technical SEO setup', 'Maintainable implementation'],
          cta: {
            label: 'Explore Engineering',
            href: '/engineering',
            variant: 'ghost',
          },
        },
        {
          title: 'Content and Proof Structure',
          description: 'Service messaging and case-study placement that guide visitors toward action.',
          bullets: ['Audience-specific messaging', 'Proof-first section planning', 'Offer clarity'],
        },
        {
          title: 'Production and Presentation',
          description: 'Visual systems and editorial polish that reinforce professional credibility.',
          bullets: ['Visual consistency', 'Media optimization', 'Conversion-aware layout polish'],
          cta: {
            label: 'Explore Production',
            href: '/production',
            variant: 'ghost',
          },
        },
      ],
    },
    'cta.primary': {
      eyebrow: 'Next Step',
      title: 'Ready to plan your site build?',
      description:
        'Share your audience, current constraints, and goals. We can map the right scope and sequencing for your next release.',
      primaryAction: {
        label: 'Start a Conversation',
        href: '/contact',
        variant: 'primary',
      },
      secondaryAction: {
        label: 'Review Packages',
        href: '/packages',
        variant: 'secondary',
      },
    },
  },
}
