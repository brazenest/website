/**
 * Résumé seed (v6.3) — carried over from the v5 web résumé (git ee2d6cb,
 * src/content/resume/index.ts), with AfterQuery added to the AI-training contract role.
 *
 * Admin-owned: seeded only into an empty global (force with SEED_RESUME=1). Phone number and
 * education confirmed by Alden on 2026-11-07 (education rows are `verified: true`).
 */
const b = (...lines: string[]) => lines.map((text) => ({ text }))

export const resumeSeed = {
  name: 'Alden Gillespy',
  headline: 'Senior Software Engineer · Founder, Radiant Ventures · Filmmaker',
  location: 'Salt Lake City, Utah',
  summary:
    'Full-stack software engineer with a production background, now founder of Radiant Ventures, where I build and operate an independent portfolio of web and AI products. I ship scalable applications across frontend, backend, and cloud infrastructure, train and evaluate large language models for leading AI platforms, and bring narrative clarity and cross-disciplinary execution to product and platform work.',
  contact: [
    { label: 'aldengillespy.com', href: 'https://aldengillespy.com' },
    { label: 'contact@aldengillespy.com', href: 'mailto:contact@aldengillespy.com' },
    { label: '801-410-9158', href: 'tel:+18014109158' },
    { label: 'LinkedIn', href: 'https://www.linkedin.com/in/alden-gillespy/' },
    { label: 'GitHub', href: 'https://github.com/brazenest' },
    { label: 'YouTube', href: 'https://youtube.com/@ShadowcatPictures' },
  ],
  experience: [
    {
      title: 'Founder & CEO / Principal Engineer',
      organization: 'Radiant Ventures',
      timeframe: 'Jul 2024 – Present',
      context: 'United States · Founder-owned venture',
      bullets: b(
        'Founded and lead an independent product studio, owning strategy, engineering, and delivery across a portfolio of SaaS, marketplace, media, and AI-agent products.',
        'Architect and ship full-stack applications end to end with TypeScript, React, Qwik, and Node.js, deployed on Cloudflare and AWS.',
        'Build agentic and AI-driven systems, including identity and payments infrastructure for agentic commerce and AI-assisted marketplace automation.',
        'Deliver freelance engineering and cloud consulting for external clients — WordPress and React platforms on AWS with Mocha.js and Chai.js QA automation and Amazon EC2 lifecycle tooling.',
        'Own product design, infrastructure, SEO, web performance, and accessibility across every brand in the portfolio.',
      ),
    },
    {
      title: 'AI Trainer & Data Annotator',
      organization: 'AfterQuery · Mercor · micro1 · Alignerr',
      timeframe: 'Jan 2026 – Present',
      context: 'Remote · Contract',
      bullets: b(
        'Train and evaluate large language models across coding, reasoning, and domain-expert tasks for leading AI data platforms, including AfterQuery.',
        'Author, annotate, and rank model responses and training data against detailed rubrics to improve model quality, safety, and alignment.',
        'Produce high-quality code samples and technical evaluations used in RLHF and supervised fine-tuning pipelines.',
        'Apply senior software-engineering judgment to specialized annotation projects requiring expert-level technical review.',
      ),
    },
    {
      title: 'Senior Software Engineer',
      organization: 'Ancestry',
      timeframe: 'Apr 2023 – Oct 2025',
      context: 'Lehi, UT · Full-time',
      bullets: b(
        'Built and optimized high-traffic React and Redux experiences serving 20,000+ daily visitors, with emphasis on performance and accessibility.',
        'Led the end-to-end redesign of the DNA Test Activation flow with a mobile-first React UX that reduced friction and improved completion.',
        'Helped architect a high-performance Java service layer that streamlined critical workflows and removed costly operational inefficiencies.',
        'Reduced infrastructure overhead and processing time, supported traffic above 100,000 concurrent users, and contributed to millions in annual savings.',
        'Partnered with executive stakeholders and cross-functional teams to align technical decisions with business objectives.',
      ),
    },
    {
      title: 'Lead Software Engineer',
      organization: 'NBCUniversal (GolfNow)',
      timeframe: 'Jan 2021 – Sep 2022',
      context: 'Orlando, FL · Full-time',
      bullets: b(
        'Developed and maintained Node.js microservices supporting booking and content workflows for 1,000,000+ daily visitors.',
        'Built automation and unit tests with Mocha.js and Chai.js to strengthen QA coverage and release confidence.',
        'Created a JavaScript content-transformation pipeline for AMP-compliant pages, improving mobile load speeds and delivery consistency.',
        'Developed Node.js and RabbitMQ ingestion tooling to normalize disparate sources and reduce processing overhead.',
        'Helped transition services toward a Docker-first microservice architecture for more consistent deployments and scale.',
      ),
    },
    {
      title: 'Developer',
      organization: 'Concepta Tech',
      timeframe: 'Mar 2020 – Jan 2021',
      context: 'Orlando, FL · Full-time',
      bullets: b(
        'Built a LAMP-based platform with Apache Solr integration to deliver natural-language search capabilities for the flagship client.',
        'Developed and deployed a WordPress platform powered by Elasticsearch, improving search relevance, indexing quality, and performance.',
      ),
    },
  ],
  ventures: [
    {
      name: 'Rotavox',
      category: 'Radio SaaS',
      status: 'Early access',
      tagline: 'Music scheduling and automation for radio — format clocks, separation rules and rotation, built to outclass legacy broadcast tools.',
      href: 'https://rotavox.com',
    },
    {
      name: 'The BOLT',
      category: 'Internet radio',
      status: 'Live',
      tagline: 'An active-rock Internet radio station and the flagship of the CLUBFM network — and the live proving ground for Rotavox.',
      href: 'https://thebolt.stream',
    },
    {
      name: 'Memrey',
      category: 'Consumer AI',
      status: 'In development',
      tagline: 'Reconstructs meaningful moments from your own digitized media, so you can find — and step back into — them.',
      href: 'https://memrey.ai',
    },
    {
      name: 'Andacity',
      category: 'Travel',
      status: 'In development',
      tagline: 'Discovery-first travel planning — destinations, hotels, flights and cars assembled around one trip.',
      href: null,
    },
  ],
  skills: [
    { title: 'Engineering', items: 'TypeScript, JavaScript, React, Redux, Next.js, Qwik, Astro, Node.js, PHP, Java, HTML/CSS' },
    { title: 'AI and applied ML', items: 'LLM training and evaluation, RLHF, Data annotation, Prompt engineering, Agentic systems, AI-assisted development' },
    {
      title: 'Systems and product',
      items: 'REST API design, PostgreSQL, SQL and NoSQL, Elasticsearch, Apache Solr, AWS, Cloudflare, Docker, Kubernetes, CI/CD, Web performance, SEO, Accessibility',
    },
    { title: 'Production', items: 'Cinematography, Shot planning, Editing, Editorial pacing, Lighting, Color grading, Multi-format delivery' },
  ],
  education: [
    {
      credential: 'B.S., Computer Science',
      institution: 'University of Florida',
      timeframe: '2008 – 2012',
      description: 'Computer science theory and software engineering — algorithms, systems programming, data structures, and web technologies.',
      verified: true,
    },
    {
      credential: 'A.S., Film & Video Production',
      institution: 'Full Sail University',
      timeframe: '2005 – 2006',
      description: 'Cinematography, editing, lighting, color, and directing.',
      verified: true,
    },
  ],
}
