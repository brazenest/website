import type { ContactPageContent } from '~/types/content'

export const contactPageContent: ContactPageContent = {
  eyebrow: 'Contact',
  title: 'Project inquiries, website teardowns, and focused collaborations.',
  intro:
    'I take on software engineering projects, production work, professional collaborations, and website strategy sessions. Whether you\'re building something new, improving what you have, or evaluating your current web presence, this is where to start.',
  bridge:
    'If the work sits somewhere between engineering and production rather than neatly inside one category, that is usually useful context, not a problem.',
  contactPanel: {
    eyebrow: 'Best first step',
    heading: 'Email with your situation and goals.',
    description:
      'Email is the best opening move for project inquiries, website teardowns, collaboration ideas, and strategy discussions. A brief note explaining your situation and what you\'re looking for is enough to start a real conversation.',
    methods: [
      {
        label: 'Email',
        value: 'ag@aldengillespy.com',
        href: 'mailto:ag@aldengillespy.com?subject=Website%20Project%20Inquiry',
        description: 'Best for project briefs, website analysis requests, and collaboration notes.',
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
    heading: 'What we can discuss',
    intro:
      'The strongest outreach is specific about your situation, your goals, and what you need help with.',
    items: [
      {
        title: 'Website projects',
        description:
          'Building or redesigning professional websites. Single-page platforms, full-stack applications, performance optimization, search visibility, and conversion-focused architecture.',
      },
      {
        title: 'Website teardowns and audits',
        description:
          'Strategic analysis of your existing website. Technology assessment, performance review, SEO diagnostics, design/UX critique, and recommendations for improvement.',
      },
      {
        title: 'Production work',
        description:
          'Directed shoots, founder and profile pieces, branded content, interviews, editorial finishing, and multi-format campaign delivery.',
      },
      {
        title: 'Cross-disciplinary collaborations',
        description:
          'Projects where product, content, and communication overlap and the work benefits from both technical structure and narrative control.',
      },
    ],
  },
  includeItems: {
    heading: 'What to include',
    intro:
      'The details you provide help me understand your situation quickly and respond with something useful.',
    items: [
      {
        title: 'Your situation or current state',
        description:
          'For projects: what you\'re building and what outcome you want. For teardowns: your current website URL and what prompted the analysis request.',
      },
      {
        title: 'Your specific goals',
        description:
          'For projects: scope, deliverables, and where you need ownership. For teardowns: what you want to understand (performance, design, strategy, all of the above).',
      },
      {
        title: 'Timeline and constraints',
        description:
          'Deadlines, budget range, technical requirements, approval processes, or anything that shapes the decision-making.',
      },
      {
        title: 'Why you\'re reaching out now',
        description:
          'A sentence on what prompted this inquiry helps me understand urgency and context. For packages: which tier interests you. For teardowns: what triggered the need.',
      },
    ],
  },
  nextSteps: {
    heading: 'What happens next',
    intro:
      'After you email, I review for fit, scope, and timing. If the work looks aligned, I respond with a specific next step rather than generic back-and-forth.',
    items: [
      {
        title: 'Initial review',
        description:
          'I look at the project type or analysis scope, the decision surface, whether it aligns with the work I take on, and if there\'s a time fit.',
      },
      {
        title: 'Reply with questions or next step',
        description:
          'If aligned: I\'ll ask clarifying questions, share availability, or suggest a conversation. If not aligned: I\'ll explain why and suggest alternatives where possible.',
      },
      {
        title: 'Scope alignment or analysis',
        description:
          'For projects: a call or email thread to nail deliverables and timeline. For teardowns: discussion of what to analyze and how to present findings.',
      },
    ],
    note:
      'Replies are direct and personal, not automated. If the work looks aligned, the first response will be specific to your situation rather than a template.',
  },
  cta: {
    eyebrow: 'Ready to start',
    heading: 'Send your project brief or teardown request.',
    description:
      'A short email with your situation, goals, and timeline is enough to start a real conversation about what\'s possible.',
    buttons: [
      {
        label: 'Email Your Inquiry',
        href: 'mailto:ag@aldengillespy.com?subject=Website%20Project%20Inquiry',
        variant: 'primary',
      },
      {
        label: 'View Packages',
        href: '/packages',
        variant: 'secondary',
      },
    ],
    footnote:
      'Not sure if you want a full project or just a teardown? Send the context anyway. I can quickly clarify what makes sense given your goals and budget.',
  },
} as const