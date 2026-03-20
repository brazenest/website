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
        'This project delivered a coordinated set of short-form pieces for campaign rollout across multiple platforms. The objective was to maintain one coherent mood while tailoring structure and tempo to each format.',
    },
    {
      title: 'Context',
      content:
        'The campaign had limited shoot time, fast turnaround expectations, and competing requirements from brand, social, and paid teams. The work needed to produce consistent identity while supporting multiple runtime and aspect-ratio targets.',
    },
    {
      title: 'Role and Scope',
      content:
        'I handled creative development, shot planning, on-location production, and the full editorial pass for all deliverables. My role centered on building a production and post workflow that scaled across formats without diluting intent.',
    },
    {
      title: 'Production Challenge',
      content:
        'The key challenge was coverage planning for edit flexibility. Every setup had to work in vertical, square, and horizontal compositions while still preserving subject focus, directional movement, and continuity from shot to shot.',
    },
    {
      title: 'Coverage and Format Strategy',
      content:
        'I designed each sequence with safe framing zones and transition options so critical action survived reframing. Shot sets were organized as modular units with predictable start and end motion, enabling fast restructuring in the timeline without visual collisions.',
    },
    {
      title: 'Editorial and Mood Control',
      content:
        'Edits were tuned per channel objective: tighter cadence for short attention windows, longer rhythm for story-forward cuts. I used consistent tonal treatment, contrast envelope, and music dynamics to keep the campaign recognizable while allowing pacing to vary.',
    },
    {
      title: 'Why It Mattered',
      content:
        'The final package demonstrated operational production thinking, not just shot-making: one coordinated capture and edit system produced multiple outputs with clear creative continuity and lower revision overhead for launch teams.',
    },
  ],
  image: '/media/production/night-market-social-campaign.jpg',
  seo: {
    title: 'Night Market Social Campaign',
    description:
      'Production case study for a short-form social campaign focused on multi-format coverage planning, pacing strategy, and consistent mood control.',
  },
}
