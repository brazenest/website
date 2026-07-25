/**
 * about seed — BUILD.md §7 (About page design pass), authored from the ABOUT handoff.
 *
 * ⚠ author to verify — this is a version-controlled DRAFT for a fresh DB, not final copy.
 * Deliberately conservative per the handoff's §19 verification list:
 *   - NO unverified metrics stated as fact (no "millions of users", no view counts, no
 *     "thousands of daily interactions").
 *   - The handoff's "SERP Solutions" employer and its "Sunthetic" umbrella-company concept
 *     are both represented here as RADIANT VENTURES — Alden's own venture and the umbrella
 *     for his products (per his instruction). SERP's infra work folds into that entry.
 *   - Education, degrees, and institutions are OMITTED until verified (handoff §7).
 *   - A personal phone number is OMITTED (handoff §2).
 * Like siteMeta, this global is admin-owned: the seed only populates it on an empty DB and
 * never overwrites afterward (see seed/index.ts). Edit the real copy in the Payload admin,
 * verify the flagged facts, then `pnpm run export`. Social links + contact email are NOT
 * here — they live on siteMeta (the About page reads them from there).
 */
import { richText } from './lexical'

/**
 * /about search terms (v6.2). This is the page that should rank for the NAME — so the terms
 * lean toward identity and role rather than technology, which /engineering already targets.
 * Backfilled onto an existing DB without disturbing the authored copy (see seed/index.ts).
 */
export function aboutKeywordsSeed() {
  return [
    { term: 'Alden Gillespy' },
    { term: 'Alden Gillespy bio' },
    { term: 'software engineer Salt Lake City' },
    { term: 'full-stack product builder' },
    { term: 'video producer Utah' },
    { term: 'engineer and filmmaker' },
  ]
}

export const aboutSeed = {
  metaDescription:
    'Alden Gillespy is a Salt Lake City software engineer, full-stack product builder, video producer, and photographer — building web applications, AI products, and cinematic media.',
  keywords: aboutKeywordsSeed(),
  location: 'Salt Lake City, Utah',
  intro:
    'I’m a software engineer and video producer who builds digital systems and the visual stories that go with them — the engineering and the storytelling by the same hands.',
  bio: richText([
    'I’m Alden Gillespy. I work across two disciplines that most people keep apart: software engineering and cinematic production. On one side I design, build, ship, and operate full-stack web applications; on the other I direct, shoot, and edit video and photography. They’re not a day job and a hobby — they’re one body of work.',
    'The two sides share more than it first seems. Structure, timing, focus, hierarchy, pacing, and the way an audience actually experiences a thing matter as much in an interface as they do in a cut. Engineering gives my visual work repeatability and precision; filmmaking gives my software a sense of motion, atmosphere, and emotional clarity. I don’t treat design as decoration added after the code — architecture, interface, motion, language, and story are parts of the same product.',
    'On the engineering side I’ve contributed to production software at real scale — including a consumer DNA-kit activation experience at Ancestry (React, Redux, Node, Kotlin) and a search-driven marketplace platform at Concepta (PHP, MySQL, Apache Solr) — alongside a growing portfolio of products I’ve built independently, end to end: architecture, frontend, backend, data model, cloud deployment, and the design system tying them together.',
    'Those independent products include Memrey, a memory-centered system for organizing and rediscovering personal media with AI, kept honest by traceable evidence; and Andacity, a travel search-and-booking platform built on Qwik and TypeScript. Others are earlier — prototypes, investor demonstrators, and concepts still in build — and I try to say plainly which is which rather than dressing every idea up as a launched company.',
    'Alongside the software, I produce cinematic video and photography under Shadowcat Pictures: music-driven visual storytelling, editing for rhythm and emotion, and large-scale fountain films built around light, motion, and sound. The same instinct runs through my media systems, too — like Radiant Radio: The BOLT, an internet radio station with its own programming strategy, brand identity, and broadcast chain.',
    'What ties all of it together is a single problem I keep coming back to: taking something complicated — a system, an idea, a lifetime of photographs — and turning it into something clear, useful, and worth remembering. I’m interested in work and collaborators where that’s the goal, whether it’s an engineering role, an early-stage product, or a piece of visual work. (This bio is a working draft — verify the flagged details, then make it yours.)',
  ]),
  disciplines: [
    {
      label: 'Engineering & product',
      tagline: 'Full-stack systems, built to be maintained.',
      accent: 'engineering',
      points: [
        { text: 'TypeScript, React, Qwik, Next.js, Node' },
        { text: 'Design systems, typed rendering, light/dark themes' },
        { text: 'PostgreSQL, MySQL, Solr — data modeling & search' },
        { text: 'AWS, Docker, CI/CD, deployment & release readiness' },
        { text: 'Accessibility, performance, durable architecture' },
      ],
    },
    {
      label: 'Cinematic production',
      tagline: 'Visual stories, shot and cut.',
      accent: 'media',
      points: [
        { text: 'Cinematography, photography, color' },
        { text: 'Editing for rhythm, pacing, and emotion' },
        { text: 'Storyboarding, shot planning, motion' },
        { text: 'Branded, promotional, and social video' },
        { text: 'Music-driven, atmospheric visual storytelling' },
      ],
    },
  ],
  experience: [
    {
      org: 'Radiant Ventures',
      role: 'Software engineer & product builder',
      period: '2024–present',
      summary:
        'Building and operating a portfolio of original products end to end — product architecture, frontend and backend, database design, design systems, and the web infrastructure they run on, from concept through release.',
      stack: 'TypeScript, Qwik, Node.js, PostgreSQL, Drizzle, Docker, AWS (EC2, RDS, Route 53)',
    },
    {
      org: 'Ancestry',
      role: 'Full-stack software engineer — DNA-kit activation',
      period: '2023–2025',
      summary:
        'Built and maintained the consumer DNA-kit activation experience — a multi-step customer journey where clarity and reliability are essential — integrating frontend and backend across an established production system.',
      stack: 'React, Redux, Node.js, Kotlin',
    },
    {
      // Title + stack confirmed by Alden; period is his approximate range (verify if needed).
      org: 'NBCUniversal (Golf Channel)',
      role: 'Lead Software Engineer',
      period: '2021–2023',
      summary:
        'Led software work for Golf Channel, a national golf-media platform — building and shipping production services at national scale, test-driven throughout.',
      stack:
        'Node.js, JavaScript, Hapi.js, PHP, SQL, XML, RabbitMQ, Docker, Kubernetes, Linux, GitHub Actions, New Relic, Google AMP, Mocha.js, Chai.js, TDD',
    },
    {
      org: 'Concepta',
      role: 'Full-stack developer — timeshare marketplace',
      period: '2020–2021',
      summary:
        'Worked on a search-driven platform for timeshare sales and rentals: marketplace workflows, a database-backed catalog, and discovery experiences within an existing commercial codebase.',
      stack: 'PHP, MySQL, Apache Solr',
    },
  ],
  principles: [
    {
      title: 'Clarity before complexity',
      body: 'Complex systems should feel understandable to the person using them — whether that’s a travel search, a cloud tool, or a lifetime of memories.',
    },
    {
      title: 'Design and engineering belong together',
      body: 'Visual design is part of the architecture, not a coat of paint applied at the end.',
    },
    {
      title: 'Evidence matters',
      body: 'When a product makes a claim — especially an AI one — it should stay connected to real, understandable source material.',
    },
    {
      title: 'Built to last',
      body: 'I favor reusable systems, typed models, shared tokens, and documented decisions that survive beyond a single demo.',
    },
  ],
  now: {
    text: 'Rebuilding this site on Payload + Astro, shipping products under Radiant Ventures, and writing again on the blog.',
    updated: '2026-07-01T00:00:00.000Z',
  },
  selectedWork: [
    { label: 'Engineering', href: '/engineering', blurb: 'Products I’ve built, start to finish.' },
    { label: 'Media', href: '/media', blurb: 'Cinematic work under Shadowcat Pictures.' },
    { label: 'Blog', href: '/blog', blurb: 'Essays on engineering, craft, and process.' },
  ],
}
