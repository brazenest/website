export const blogPageContent = {
  eyebrow: 'Blog',
  title: 'Essays on Software Systems, Visual Production, and How They Connect',
  intro:
    'Writing by Alden Gillespy across engineering, production, and their unified approach. Some posts analyze engineering decisions, some explore production craft, and some examine how both disciplines share the same working method.',
  bridge:
    'The writing exists to explain the thinking behind the work on the rest of the site. Expect selected essays, process notes, and reflections rather than a high-volume publishing feed.',
  positioning: {
    heading: 'How this section fits the site',
    intro:
      'Projects show evidence. Essays explain the reasoning behind decisions and clarify how engineering and production share the same working method.',
    items: [
      {
        title: 'Engineering notes',
        description:
          'Architecture rationale, boundary decisions, maintainability tradeoffs, and system-design patterns that sit behind product work.',
      },
      {
        title: 'Production notes',
        description:
          'Reflections on framing, coverage planning, pacing, tone, and the practical decisions that shape the finished piece.',
      },
      {
        title: 'Bridge essays',
        description:
          'Cross-disciplinary writing where implementation, authorship, audience control, and revision strategy start to look like the same craft from different angles.',
      },
    ],
  },
  published: {
    heading: 'Published notes',
    intro:
      'Essays covering engineering decisions, production craft, and the areas where both disciplines converge. Each clarifies the thinking behind the work shown on the case study pages.',
  },
  drafts: {
    heading: 'In progress',
    intro:
      'A small queue of next pieces. These are not published yet, but they establish the editorial direction and show the shape of future writing.',
    items: [
      {
        title: 'Designing for Revision in Schema-Driven Systems',
        slug: 'designing-for-revision-in-schema-driven-systems',
        date: '2026-03-18',
        side: 'engineering',
        summary:
          'Schema-driven platforms are often designed around the publishing moment, but the real operating pressure arrives later, during revision. Getting the revision model right from the start determines whether the system stays composable as requirements grow.',
      },
      {
        title: 'One Shoot, Many Deliverables Without Losing Intent',
        slug: 'one-shoot-many-deliverables-without-losing-intent',
        date: '2026-03-05',
        side: 'production',
        summary:
          'Designing coverage around multiple format deliverables creates a specific authorship problem: the temptation to shoot for maximum flexibility usually produces footage that reframes safely but says nothing with conviction. The right frame for multi-format work is story-first coverage, with reframing built in second.',
      },
    ],
  },
} as const