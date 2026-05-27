import type { ContactPageContent } from '~/types/content'

export const contactPageContent: ContactPageContent = {
  eyebrow: 'Contact',
  title: 'Let’s talk about your project.',
  intro:
    'If you are building something new, improving what already exists, or trying to understand why your current site is not performing, you are in the right place. I take on engineering work, production work, and strategy-led website engagements.',
  bridge:
    'If your project sits between engineering and production, that is usually a strength. I work across both, so you do not need to force your situation into one box.',
  contactPanel: {
    eyebrow: 'Best first step',
    heading: 'Send me your context and what you need.',
    description:
      'Email is the easiest way to start. A short note on where things stand, what you are aiming for, and where you feel stuck gives me enough to respond usefully.',
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
    heading: 'What I can help with',
    intro:
      'The most helpful messages are specific about your situation, your goals, and the decision you are trying to make.',
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
      'A little context upfront helps me understand your situation quickly and reply with something concrete.',
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
      'After you reach out, I review for fit, scope, and timing. If it looks aligned, I will reply with a clear next step instead of generic back-and-forth.',
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
      'You will get a direct reply from me. No automation, no canned intake sequence.',
  },
  cta: {
    eyebrow: 'Ready to start',
    heading: 'Send a quick note and I’ll take it from there.',
    description:
      'A few lines about your situation, goals, and timeline are enough to start a focused conversation.',
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
      'If you are not sure whether you need a full project or a teardown, send the context anyway. I can help you choose the right path quickly.',
  },
} as const
