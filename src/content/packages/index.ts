import type { Package } from '~/types/content'

export const packages: Package[] = [
  {
    id: 'foundation',
    title: 'Foundation',
    slug: 'foundation',
    description:
      'Technical groundwork and professional presence for professionals launching or rebuilding their web presence.',
    forWho: 'Professionals establishing their digital foundation: consultants, coaches, practitioners starting to self-market.',
    includes: [
      'Performance-optimized web foundation',
      'Search engine fundamentals',
      'Professional visual identity',
      'Compelling hero and portfolio sections',
      'Client case studies or work samples',
      'Search console setup and basic SEO',
      'Contact system',
    ],
    outcome:
      'A professional-grade web presence that works reliably, ranks in search, and presents your expertise clearly to potential clients.',
    ctaLabel: 'Discuss Foundation Package',
    ctaHref: '/contact',
  },
  {
    id: 'growth',
    title: 'Growth',
    slug: 'growth',
    description:
      'Comprehensive platform engineered for visibility, client conversion, and sustainable growth as your practice scales.',
    forWho:
      'Established professionals who need their website to actively generate leads, rank competitively, and support business growth.',
    includes: [
      'Everything in Foundation',
      'Advanced search optimization',
      'Conversion-focused architecture',
      'Dynamic content management',
      'Client testimonials or results showcase',
      'Performance monitoring and analytics',
      'Blog or resources section',
      'Lead capture workflows',
    ],
    outcome:
      'A platform that competes in search results, converts qualified visitors into inquiries, and grows with your business.',
    ctaLabel: 'Discuss Growth Package',
    ctaHref: '/contact',
    highlight: true,
  },
  {
    id: 'authority',
    title: 'Authority',
    slug: 'authority',
    description:
      'Premium platform that positions you as a recognized expert, drives consistent acquisition, and scales with your practice.',
    forWho:
      'High-performing professionals positioned as industry experts, ready to invest in a website that reinforces authority and generates sustainable client flow.',
    includes: [
      'Everything in Growth',
      'Advanced analytics and performance dashboards',
      'Proprietary content systems',
      'Strategic SEO roadmap',
      'Integrated case study platform',
      'Audience engagement tools',
      'Advanced conversion optimization',
      'Long-term performance partnership',
    ],
    outcome:
      'A recognized platform that establishes you as a trusted authority, consistently acquires qualified clients, and scales with your expertise.',
    ctaLabel: 'Discuss Authority Package',
    ctaHref: '/contact',
  },
]
