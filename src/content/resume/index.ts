export const resumePageContent = {
  header: {
    eyebrow: 'Resume',
    name: 'Alden Gillespy',
    title: 'Senior Software Engineer and Production Storyteller',
    contactItems: [
      {
        label: 'aldengillespy.com',
        href: 'https://aldengillespy.com',
      },
      {
        label: 'Contact form',
        href: '/contact',
      },
      {
        label: '(813) 437-7425',
        href: 'tel:+18134377425',
      },
      {
        label: 'Salt Lake City, UT',
      },
      {
        label: 'LinkedIn',
        href: 'https://www.linkedin.com/in/alden-gillespy/',
      },
      {
        label: 'GitHub',
        href: 'https://github.com/brazenest',
      },
      {
        label: 'YouTube',
        href: 'https://youtube.com/@SHADOWCATpictures',
      },
    ],
  }, intro:
    'Below is my complete professional background across software engineering, product work, and production roles. Each section shows the scope, impact, and decisions from roles I have held.', summary:
    'Full-stack software engineer with a production background, working at the overlap of systems and storytelling. Builds scalable web applications across frontend, backend, and cloud infrastructure while bringing narrative clarity, usability judgment, and cross-disciplinary execution to product work.',
  experience: [
    {
      title: 'Senior Software Engineer',
      organization: 'SERP Solutions',
      timeframe: 'Jul 2024 - Present',
      context: 'Salt Lake City, UT · On-site, Freelance',
      bullets: [
        'Design and deliver cloud-native solutions for small businesses, improving reliability and scalability across multiple client platforms.',
        'Architect full-stack systems with WordPress backends and React frontends on AWS, improving deployment efficiency and maintainability.',
        'Write unit tests and QA automation with Mocha.js and Chai.js to catch regressions early and reduce maintenance risk.',
        'Build automation around Amazon EC2 lifecycle operations to speed environment setup and future development workflows.',
      ],
    },
    {
      title: 'Senior Software Engineer',
      organization: 'Ancestry',
      timeframe: 'Apr 2023 - Oct 2025',
      context: 'Lehi, UT · Full-time',
      bullets: [
        'Built and optimized high-traffic React and Redux experiences serving 20,000+ daily visitors, with emphasis on performance and accessibility.',
        'Led the end-to-end redesign of the DNA Test Activation flow with a mobile-first React UX that reduced friction and improved completion.',
        'Helped architect a high-performance Java service layer that streamlined critical workflows and removed costly operational inefficiencies.',
        'Reduced infrastructure overhead and processing time, supported traffic above 100,000 concurrent users, and contributed to millions in annual savings.',
        'Partnered with executive stakeholders and cross-functional teams to align technical decisions with business objectives.',
      ],
    },
    {
      title: 'Lead Software Engineer',
      organization: 'NBCUniversal (GolfNow)',
      timeframe: 'Jan 2021 - Sep 2022',
      context: 'Orlando, FL · Full-time',
      bullets: [
        'Developed and maintained Node.js microservices supporting booking and content workflows for 1,000,000+ daily visitors.',
        'Built automation and unit tests with Mocha.js and Chai.js to strengthen QA coverage and release confidence.',
        'Created a JavaScript content-transformation pipeline for AMP-compliant pages, improving mobile load speeds and delivery consistency.',
        'Developed Node.js and RabbitMQ ingestion tooling to normalize disparate sources and reduce processing overhead.',
        'Helped transition services toward a Docker-first microservice architecture for more consistent deployments and scale.',
      ],
    },
    {
      title: 'Developer',
      organization: 'Concepta Tech',
      timeframe: 'Mar 2020 - Jan 2021',
      context: 'Orlando, FL · Full-time',
      bullets: [
        'Built a LAMP-based platform with Apache Solr integration to deliver natural-language search capabilities for the flagship client.',
        'Developed and deployed a WordPress platform powered by Elasticsearch, improving search relevance, indexing quality, and performance.',
      ],
    },
  ],
  selectedProjects: [
    {
      discipline: 'Engineering',
      title: 'Andacity Booking System',
      role: 'Lead full-stack engineer',
      description:
        'Built a booking platform around a canonical search contract and normalized data model so new inventory integrations and feature work stayed dependable as the product expanded.',
      href: '/engineering/projects/andacity-booking-system',
    },
    {
      discipline: 'Engineering',
      title: 'Fulfillment Reliability Console',
      role: 'Lead systems engineer',
      description:
        'Designed a reliability console that unified queue telemetry, event context, and guarded replay controls, reducing diagnosis time and making recovery workflows safer under pressure.',
      href: '/engineering/projects/fulfillment-reliability-console',
    },
    {
      discipline: 'Production',
      title: 'Founder Profile Launch Film',
      role: 'Creative development, direction, capture, and edit',
      description:
        'Translated product strategy into an interview-led launch film that balanced message precision with authentic on-camera voice and gave the launch team a clear narrative asset.',
      href: '/production/projects/founder-profile-launch-film',
    },
    {
      discipline: 'Production',
      title: 'Night Market Social Campaign',
      role: 'Creative development, production, and editorial lead',
      description:
        'Planned one production window to support multiple social deliverables, using format-aware coverage and pacing to keep the campaign cohesive across channels.',
      href: '/production/projects/night-market-social-campaign',
    },
  ],
  skills: [
    {
      title: 'Engineering',
      items: [
        'TypeScript',
        'JavaScript',
        'React',
        'Redux',
        'Next.js',
        'Qwik',
        'Node.js',
        'PHP',
        'Java',
        'HTML/CSS',
      ],
    },
    {
      title: 'Systems and product',
      items: [
        'REST API design',
        'Relational databases',
        'SQL and NoSQL',
        'Elasticsearch',
        'Apache Solr',
        'AWS',
        'Docker',
        'Kubernetes',
        'CI/CD',
        'Web performance',
        'SEO/SEM',
        'Accessibility',
        'Cross-functional collaboration',
      ],
    },
    {
      title: 'Production',
      items: [
        'Visual storytelling',
        'Shot planning',
        'Camera operation',
        'Interview direction',
        'Editing',
        'Editorial pacing',
        'Lighting',
        'Color judgment',
        'Multi-format delivery',
      ],
    },
  ],
  education: [
    {
      credential: 'B.S., Computer Science',
      institution: 'University of Florida',
      timeframe: '2008 - 2012',
      description:
        'Foundation in computer science theory and software engineering, including algorithms, systems programming, data structures, and web technologies.',
    },
    {
      credential: 'A.S., Film & Video Production',
      institution: 'Full Sail University',
      timeframe: '2005 - 2006',
      description:
        'Training in cinematography, editing, lighting, color, and directing that continues to inform production work and audience-focused communication.',
    },
  ],
} as const