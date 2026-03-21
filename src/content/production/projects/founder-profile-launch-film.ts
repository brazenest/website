import type { ProductionProject } from '~/types/content'

export const founderProfileLaunchFilmProject: ProductionProject = {
  id: 'founder-profile-launch-film',
  title: 'Founder Profile Launch Film',
  slug: 'founder-profile-launch-film',
  description:
    'A founder-led launch film that translated product strategy into a focused interview narrative, balancing brand clarity with personal voice across direction, capture, and edit.',
  media: [
    {
      type: 'video',
      src: '/media/production/founder-profile-launch-film.mp4',
      alt: 'Founder profile launch film preview frame',
      poster: '/media/production/founder-profile-launch-film.jpg',
    },
  ],
  sections: [
    {
      title: 'Overview',
      content:
        'This piece introduced a new product direction through a founder story rather than a feature montage. It is a launch narrative film focused on making positioning understandable in under two minutes. What makes it notable: the work balances strategic messaging with authentic executive voice without sacrificing either.',
    },
    {
      title: 'Context',
      content:
        'The launch timeline was compressed and messaging was still evolving during production. The film had to support marketing objectives, preserve executive authenticity, remain flexible enough to survive late product changes, and deliver on established brand tone.',
    },
    {
      title: 'Problem',
      content:
        'Founder-led positioning films often fail when they prioritize script authenticity over strategy or vice versa. The tension is between making the business case clear and keeping the person on camera credible. With compressed timeline and stakeholder alignment issues, the risk was high of either a canned corporate message or a rambling founder monologue.',
    },
    {
      title: 'Approach',
      content:
        'I structured the narrative around three beats: problem (why the product exists), belief (why we approach it this way), and impact (what it enables). Interview prompts were designed to produce concise, usable statements in-camera, reducing dependence on scripted voice-over. This preserved authenticity while giving the edit clear narrative anchors.',
    },
    {
      title: 'Execution',
      items: [
        'Interview direction focused on producing clear statements rather than natural conversation flow, with planned pauses for edit flexibility',
        'Coverage paired a stable interview anchor with intentional contextual inserts so each claim had visual support',
        'Framing favored clean eyelines, controlled depth, and negative space for lower-third and title overlays',
        'B-roll shot with editorial intent, not as post-hoc decoration (each insert previsualized for narrative function)',
        'Edit prioritized statement clarity and pacing discipline, cutting aggressively around redundancy',
      ],
    },
    {
      title: 'Outcome',
      content:
        'The film gave the launch team a primary narrative asset that aligned strategy, messaging, and visual execution. Marketing could use the full version for investor presentations and a cut-down version for social. The piece demonstrated ability to turn ambiguous product context into a clear story under tight production constraints.',
    },
    {
      title: 'Reflection',
      content:
        'The success came from treating interview direction as production design—controlling statement clarity and response length as carefully as framing. In retrospect, I would have spent more time developing fallback edit structures in case late message changes occurred, since that was the actual constraint.',
    },
  ],
  image: '/media/production/founder-profile-launch-film.jpg',
  seo: {
    title: 'Founder Profile Launch Film',
    description:
      'Production case study for a founder-led launch film focused on interview direction, narrative framing, and editorial clarity under timeline pressure.',
  },
}
