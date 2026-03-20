export const contactPageContent = {
  eyebrow: 'Contact',
  title: 'Engineering work, production projects, and focused collaborations.',
  intro:
    'I\'m Alden Gillespy. I take on software engineering engagements, production assignments, and professional collaborations where clarity, execution, and ownership matter.',
  bridge:
    'If the work sits somewhere between engineering and production rather than neatly inside one category, that is usually useful context, not a problem.',
  contactPanel: {
    eyebrow: 'Best first step',
    heading: 'Email with project or role context.',
    description:
      'Email is the best opening move for project inquiries, collaboration ideas, and role discussions. A short note is enough if it explains the work, the timeline, and why the fit makes sense.',
    methods: [
      {
        label: 'Email',
        value: 'ag@aldengillespy.com',
        href: 'mailto:ag@aldengillespy.com?subject=Project%20Inquiry',
        description: 'Best for project briefs, collaboration notes, and role conversations.',
      },
      {
        label: 'LinkedIn',
        value: 'linkedin.com/in/alden-gillespy',
        href: 'https://www.linkedin.com/in/alden-gillespy/',
        description: 'Useful for professional context and background before reaching out.',
      },
      {
        label: 'GitHub',
        value: 'github.com/brazenest',
        href: 'https://github.com/brazenest',
        description: 'Engineering samples, experiments, and implementation history.',
      },
      {
        label: 'YouTube',
        value: 'youtube.com/@SHADOWCATpictures',
        href: 'https://youtube.com/@SHADOWCATpictures',
        description: 'Production work, visual samples, and edit-driven pieces.',
      },
    ],
  },
  inquiryTypes: {
    heading: 'Good reasons to reach out',
    intro:
      'The strongest outreach is specific about the work, the constraints, and the kind of judgment you need.',
    items: [
      {
        title: 'Engineering engagements',
        description:
          'Frontend systems, full-stack product work, platform tooling, performance improvement, search/data workflows, and maintainability-focused architecture work.',
      },
      {
        title: 'Production engagements',
        description:
          'Directed shoots, founder and profile pieces, branded content, interviews, editorial finishing, and multi-format campaign delivery.',
      },
      {
        title: 'Cross-disciplinary collaborations',
        description:
          'Projects where product, content, and communication overlap and the work benefits from both technical structure and narrative control.',
      },
      {
        title: 'Selected professional opportunities',
        description:
          'Freelance, contract, consulting, and carefully scoped roles where multidisciplinary ownership is part of the actual job, not just a nice-to-have.',
      },
    ],
  },
  includeItems: {
    heading: 'What to include',
    intro:
      'A concise message is enough if it gives me the context I need to respond with something useful.',
    items: [
      {
        title: 'The project or opportunity',
        description:
          'What you are building, producing, or hiring for, and what outcome you are trying to reach.',
      },
      {
        title: 'Scope and deliverables',
        description:
          'What needs to happen, what stage the work is in, and where you need direct ownership or support.',
      },
      {
        title: 'Timeline and constraints',
        description:
          'Deadlines, technical realities, production limitations, approval loops, or anything that shapes the decision-making.',
      },
      {
        title: 'Why the fit makes sense',
        description:
          'A sentence on why you think my engineering, production, or crossover background matches the work helps move the conversation faster.',
      },
    ],
  },
  nextSteps: {
    heading: 'What happens next',
    intro:
      'After you reach out, I review for fit, scope, and timing. If the work looks aligned, I respond with the most useful next step instead of generic back-and-forth.',
    items: [
      {
        title: 'Initial review',
        description:
          'I look at the project type, the decision surface, and whether the scope fits the kind of engineering or production work I take on.',
      },
      {
        title: 'Reply with questions or availability',
        description:
          'If it looks aligned, I usually reply with follow-up questions, a sense of timing, or a proposed conversation.',
      },
      {
        title: 'Scope discussion',
        description:
          'For active projects, the next step is typically a short call or email thread to clarify goals, constraints, ownership, and deliverables.',
      },
    ],
    note:
      'Replies are direct and personal, not routed through an intake system. If the work looks aligned, the first response will be specific to your context rather than a generic acknowledgment.',
  },
  cta: {
    eyebrow: 'Start here',
    heading: 'Send enough context to make the first response useful.',
    description:
      'A short brief with the project, goal, timeline, and the help you need is enough to start a real conversation.',
    buttons: [
      {
        label: 'Email Project Details',
        href: 'mailto:ag@aldengillespy.com?subject=Project%20Inquiry',
        variant: 'primary',
      },
      {
        label: 'View Resume',
        href: '/resume',
        variant: 'secondary',
      },
    ],
    footnote:
      'If you are unsure whether the project belongs on the engineering side or the production side, send the context anyway. I can usually tell quickly where the conversation should go.',
  },
} as const