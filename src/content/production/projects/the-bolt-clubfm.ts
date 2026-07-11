import type { ProductionProject } from '~/types/content'

export const theBoltClubfmProject: ProductionProject = {
  id: 'the-bolt-clubfm',
  title: 'The BOLT (ClubFM)',
  slug: 'the-bolt-clubfm',
  description:
    'An active-rock Internet radio station and the flagship of ClubFM, my growing Internet radio network — built as a real, listenable product and the proving ground for Rotavox.',
  media: [
    {
      type: 'image',
      src: '/media/production/the-bolt-clubfm.svg',
      alt: 'Cover graphic for The BOLT, an active-rock station on the ClubFM network',
    },
  ],
  sections: [
    {
      title: 'Overview',
      content:
        'The BOLT is an active-rock Internet radio station spanning the 90s to today, and the first station in ClubFM — a growing Internet radio network. It exists to do two things at once: run as a genuinely enjoyable station with a clear identity, and serve as the live proving ground for Rotavox, the scheduling and automation platform behind it.',
    },
    {
      title: 'Context',
      content:
        'Internet radio is crowded with stations that sound like shuffled playlists — no rotation discipline, no sense of daypart, no identity. The opening for ClubFM is to launch stations that actually feel programmed, starting with a format that rewards tight sequencing and energy management: active rock.',
    },
    {
      title: 'Role and Scope',
      content:
        'I own The BOLT end to end: format definition, music curation and library structure, rotation and clock design, brand and on-air identity, and the technical build that keeps it streaming. Because it doubles as a testbed, every programming decision also stress-tests the automation running underneath it.',
    },
    {
      title: 'Format and Programming',
      content:
        'The format is active rock from the 90s through current releases, sequenced for momentum rather than randomness. Category structure, artist and title separation, and daypart-aware clocks shape how the station breathes across the day, so it holds a consistent energy and identity instead of drifting.',
    },
    {
      title: 'Build and Automation',
      content:
        'The BOLT runs on a modern automation stack driven by Rotavox scheduling into an open playout system. Operating a real station on that stack surfaces the problems a spec never would — edge cases in rotation, log handling, and live continuity — and feeds fixes directly back into the platform.',
    },
    {
      title: 'Why It Mattered',
      content:
        'The BOLT proves the ClubFM thesis: that an independent, well-programmed Internet station can sound intentional and distinct. It also validates Rotavox in the only way that counts — on air, in front of listeners — while establishing the template for the CHR, classic rock, dance, and indie stations meant to follow.',
    },
  ],
  image: '/media/production/the-bolt-clubfm.svg',
  seo: {
    title: 'The BOLT (ClubFM)',
    description:
      'Production case study for The BOLT, an active-rock Internet radio station and flagship of the ClubFM network, built as a live product and the proving ground for Rotavox.',
  },
}
