import type { ResumeEntry } from '~/types/content'

export const resumeExperience: ResumeEntry[] = [
  {
    title: 'Senior Full-Stack Engineer',
    organization: 'Creative Digital Studio',
    start: '2022',
    description: [
      'Led cross-functional design and engineering on 8+ client projects spanning healthcare, fintech, and e-commerce',
      'Architected and shipped a design system component library (React + TypeScript) adopted by 20+ product teams',
      'Reduced page load times by 60% through systematic performance auditing and modern framework migration',
      'Mentored 5 junior engineers and conducted technical interviews',
    ],
  },
  {
    title: 'Full-Stack Engineer',
    organization: 'Startup Ventures',
    start: '2020',
    end: '2022',
    description: [
      'Built and shipped customer-facing web platform (Next.js, PostgreSQL) serving 50K+ users',
      'Designed and implemented authentication system supporting OAuth, JWT, and session-based flows',
      'Established SEO and performance baselines; improved Core Web Vitals by 40%',
      'Contributed to open-source projects and published 6 technical blog posts',
    ],
  },
  {
    title: 'Frontend Engineer',
    organization: 'Technology Agency',
    start: '2018',
    end: '2020',
    description: [
      'Developed responsive web applications for 15+ clients using React and Vue.js',
      'Implemented CSS-in-JS solutions and design systems to improve developer experience',
      'Collaborated with designers and product managers in agile workflows',
      'Trained team on modern JavaScript tooling and best practices',
    ],
  },
]

export const resumeSkills: string[] = [
  'TypeScript',
  'React',
  'Next.js',
  'Qwik',
  'Node.js',
  'PostgreSQL',
  'Tailwind CSS',
  'Web Performance',
  'Accessibility (a11y)',
  'Design Systems',
  'REST APIs',
  'GraphQL',
  'Git',
  'Figma',
  'Product Design',
  'Technical Leadership',
]
