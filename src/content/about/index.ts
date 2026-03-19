export const aboutPageContent = {
  eyebrow: 'About',
  title: 'One Practice Across Systems and Stories',
  intro:
    'I am Alden Gillespy. I build software systems and produce visual stories. The tools change between code and camera, but the method stays the same: define intent, work inside constraints, and execute with discipline.',
  narrativeSections: [
    {
      heading: 'Who I Am',
      paragraphs: [
        'My work combines software engineering and visual production. On one project I may be modeling data, structuring routes, and making architecture decisions. On another, I may be planning coverage, directing a sequence, and shaping rhythm in the edit.',
        'What connects those environments is responsibility. I care about taking ideas from vague to concrete, making key decisions explicit, and shipping work that remains understandable to collaborators after the first handoff.',
      ],
    },
    {
      heading: 'A Multidisciplinary Practice, Not Two Separate Careers',
      paragraphs: [
        'Engineering and production can look unrelated from the outside, but I do not treat them as parallel tracks. They are two views into the same working style.',
        'Engineering is where I show system clarity: boundaries, naming, tradeoffs, and long-term maintainability. Production is where I show narrative clarity: framing, coverage strategy, pacing, and editorial intent.',
        'Both require the same judgment: choose what matters, remove what does not, and leave behind structure that supports the next decision.',
      ],
    },
  ],
  principles: {
    heading: 'How I Think About the Work',
    intro: 'Across engineering and production, my process follows a repeatable decision model.',
    items: [
      {
        title: 'Start from audience and outcome',
        description:
          'Before choosing frameworks or shot lists, I define who the work is for and what should change for them by the end.',
      },
      {
        title: 'Make tradeoffs legible',
        description:
          'I document why decisions were made, from architecture constraints to editorial choices, so teams can reason about the work instead of guessing.',
      },
      {
        title: 'Design for revision',
        description:
          'I structure code and coverage so iteration stays possible when scope, timelines, or requirements shift.',
      },
      {
        title: 'Use restraint as a craft tool',
        description:
          'I avoid unnecessary abstraction, unnecessary effects, and unnecessary complexity. Clarity is usually a stronger signal than novelty.',
      },
    ],
  },
  split: {
    heading: 'Why the Site Is Split Into Engineering and Production',
    intro:
      'The split is intentional. Each section lets you evaluate a different kind of evidence from the same practice.',
    sides: [
      {
        title: 'Engineering',
        description:
          'Architecture rationale, implementation choices, and maintainability decisions under real product constraints.',
      },
      {
        title: 'Production',
        description:
          'Story intent, visual strategy, and editorial control from capture through final cut.',
      },
    ],
    bridge:
      'They belong on one site because they reinforce each other. Engineering sharpens how I structure complex problems. Production sharpens how I control attention, sequence, and emotional clarity. Together they produce work that is both functional and authored.',
  },
  cta: {
    eyebrow: 'Next',
    heading: 'Choose the lens that matches your question.',
    description:
      'If you want technical depth, start with engineering case studies. If you want narrative and visual execution, start with production case studies. For role context across both, review the resume.',
    links: [
      {
        label: 'Browse Engineering Case Studies',
        href: '/engineering#selected-work',
        variant: 'primary',
      },
      {
        label: 'Browse Production Case Studies',
        href: '/production#selected-work',
        variant: 'secondary',
      },
      {
        label: 'View Resume',
        href: '/resume',
        variant: 'ghost',
      },
    ],
  },
} as const
