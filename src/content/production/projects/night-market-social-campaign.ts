import type { ProductionProject } from '~/types/content'

export const nightMarketSocialCampaignProject: ProductionProject = {
  id: 'night-market-social-campaign',
  title: 'Night Market Social Campaign',
  slug: 'night-market-social-campaign',
  description:
    'A short-form campaign package for social channels, built from one production window into multiple cuts with distinct pacing profiles and format-aware visual hierarchy.',
  media: [
    {
      type: 'video',
      src: '/media/production/night-market-social-campaign.mp4',
      alt: 'Night market social campaign video preview frame',
      poster: '/media/production/night-market-social-campaign.jpg',
    },
  ],
  sections: [
    {
      title: 'Overview',
      content:
        'This project delivered a coordinated set of short-form pieces for campaign rollout across multiple platforms. It is a multi-format social package focused on maintaining one coherent mood while tailoring structure and tempo to each delivery format. What makes it notable: one production and editorial system produced multiple outputs with clear creative continuity.',
    },
    {
      title: 'Context',
      content:
        'The campaign had limited shoot time, fast turnaround expectations, and competing requirements from brand, social, and paid teams. The work needed to produce consistent visual identity while supporting multiple runtime and aspect-ratio targets (square, vertical, horizontal).',
    },
    {
      title: 'Problem',
      content:
        'Multi-format campaign packages often result in either lowest-common-denominator framing (safe for all formats but visually boring) or disconnected cuts (coherent per format but lacking campaign identity). The tension: building strong visual language that survives radical reframing without looking like a crop.'
    },
    {
      title: 'Approach',
      content:
        'I designed coverage planning as the control surface. Every setup had to work in vertical, square, and horizontal compositions while still preserving subject focus, directional movement, and continuity. Shot sets were organized as modular units with predictable start and end motion.',
    },
    {
      title: 'Execution',
      items: [
        'Safe framing zones and transition options planned so critical action survived reframing across all formats',
        'Coverage organized as modular units with predictable start and end motion for timeline restructuring',
        'Tonal treatment consistent across all cuts but pacing tuned per channel (tight for short windows, longer for story-forward)',
        'Edit structures built to allow fast recomposition without visual collisions or awkward framing through recuts',
        'Contrast envelope and music dynamics controlled per delivery version to maintain mood across pacing changes',
      ],
    },
    {
      title: 'Outcome',
      content:
        'The final package demonstrated operational production thinking: one coordinated capture and edit system produced multiple outputs with clear creative continuity and lower revision overhead. Launch teams could use the same asset library across channels without requesting recuts or resignaling content.',
    },
    {
      title: 'Reflection',
      content:
        'The biggest realization was that format-aware production planning is not about compromise—it is about designing coverage for multiple valid interpretations rather than trying to make one framing work everywhere. This approach shifted the constraint from "fit this frame" to "use framing as a design element in each version."',
    },
  ],
  image: '/media/production/night-market-social-campaign.jpg',
  seo: {
    title: 'Night Market Social Campaign',
    description:
      'Production case study for a short-form social campaign focused on multi-format coverage planning, pacing strategy, and consistent mood control.',
  },
}
