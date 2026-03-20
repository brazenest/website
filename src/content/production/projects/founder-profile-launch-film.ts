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
        'This piece introduced a new product direction through a founder story rather than a feature montage. The intent was to make positioning understandable in under two minutes while keeping the narrative grounded and credible.',
    },
    {
      title: 'Context',
      content:
        'The launch timeline was compressed and messaging was still evolving. The film had to support marketing objectives, preserve executive authenticity, and remain adaptable enough to survive late product and copy changes.',
    },
    {
      title: 'Role and Scope',
      content:
        'I led end-to-end production: creative development, interview direction, shot design, principal capture, and final edit. I translated stakeholder goals into a practical production plan that could be executed quickly without losing narrative control.',
    },
    {
      title: 'Story and Interview Strategy',
      content:
        'I structured the narrative around three beats: problem, product belief, and practical impact. Interview prompts were designed to produce concise, usable statements in-camera, reducing dependence on scripted voice-over and improving authenticity in the final cut.',
    },
    {
      title: 'Coverage and Framing Decisions',
      content:
        'Coverage paired a stable interview anchor with intentional contextual inserts so each claim had visual support. Framing favored clean eyelines, controlled depth, and negative space that made lower-third and title overlays readable across delivery versions.',
    },
    {
      title: 'Editorial Judgment',
      content:
        'In post, I prioritized statement clarity and pacing discipline. I cut aggressively around redundancy, used b-roll to preserve momentum through transitions, and controlled tone through restrained grade and sound shaping rather than dramatic effects.',
    },
    {
      title: 'Why It Mattered',
      content:
        'The final film gave the launch team a primary narrative asset that aligned strategy, messaging, and visual execution. It demonstrated my ability to turn ambiguous product context into a clear story under tight production constraints.',
    },
  ],
  seo: {
    title: 'Founder Profile Launch Film',
    description:
      'Production case study for a founder-led launch film focused on interview direction, narrative framing, and editorial clarity under timeline pressure.',
  },
}
