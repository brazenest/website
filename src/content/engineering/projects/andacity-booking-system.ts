import type { EngineeringProject } from '~/types/content'

export const andacityBookingSystemProject: EngineeringProject = {
  id: 'andacity-booking-system',
  title: 'Andacity Booking System',
  slug: 'andacity-booking-system',
  description:
    'A structured travel booking application focused on canonical search architecture, typed content, and scalable frontend systems.',
  techStack: ['Qwik', 'TypeScript', 'Tailwind CSS', 'PostgreSQL', 'Drizzle'],
  sections: [
    {
      title: 'Overview',
      content:
        'This project explores a structured booking experience built around canonical search inputs, normalized entities, and scalable route architecture.',
    },
    {
      title: 'Architecture',
      content:
        'The system emphasizes route clarity, typed data models, reusable UI patterns, and a clean separation between content structure and rendering.',
    },
    {
      title: 'Implementation',
      content:
        'The implementation work focuses on query routing, normalized content/data handling, and a maintainable frontend composition system.',
    },
    {
      title: 'Outcomes',
      content:
        'The result is a stronger foundation for iteration, easier reasoning about search behavior, and a cleaner path for future growth.',
    },
  ],
  seo: {
    title: 'Andacity Booking System',
    description:
      'Engineering case study for a structured travel booking system focused on canonical search and scalable frontend architecture.',
  },
}
