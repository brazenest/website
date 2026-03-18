export const blogPageContent = {
  eyebrow: 'Blog',
  title: 'Writing across systems, stories, and the space between them.',
  intro:
    'This is one writing hub with side-aware labels. Some posts stay close to engineering decisions, some stay close to production and editorial craft, and some sit directly in the overlap where both disciplines use the same decision model.',
  bridge:
    'The writing exists to explain the thinking behind the work on the rest of the site. Expect selected essays, process notes, and reflections rather than a high-volume publishing feed.',
  positioning: {
    heading: 'How this section fits the site',
    intro:
      'Projects show evidence. The blog explains the operating logic behind them and makes the connection between Side 1, Side 2, and the shared method more explicit.',
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
      'Finished writing that sets the tone for the section and clarifies the kind of thinking that will live here.',
  },
  drafts: {
    heading: 'In progress',
    intro:
      'A small queue of next pieces. These are not published yet, but they establish the editorial direction and show the shape of future writing.',
  },
} as const