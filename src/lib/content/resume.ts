import type { ResumeEntry } from "./model";

export const resumeSectionOrder = [
  "Experience",
  "Education",
] as const;

export const resumeEntries: ResumeEntry[] = [
  {
    section: "Experience",
    title: "Senior Software Engineer",
    organization: "SERP Solutions",
    location: "Salt Lake City, UT",
    start: "Jul 2024",
    end: "Present",
    summary:
      "Designed and delivered cloud-native solutions for small businesses, with a focus on reliability, scalability, and maintainable front-end systems.",
    bullets: [
      "Architected full-stack systems with WordPress backends and React front-ends on AWS, improving deployment efficiency.",
      "Built automation tooling around Amazon EC2 lifecycle operations to accelerate future development workflows.",
      "Used Mocha.js and Chai.js for unit tests and QA automation with a test-driven maintenance mindset.",
    ],
  },
  {
    section: "Experience",
    title: "Senior Software Engineer",
    organization: "Ancestry",
    location: "Lehi, UT",
    start: "Apr 2023",
    end: "Oct 2025",
    summary:
      "Built and optimized high-traffic React and Redux experiences supporting consumer DNA kit activation flows used at significant scale.",
    bullets: [
      "Engineered Node.js and Kotlin microservices for mission-critical activation workflows with improved resilience.",
      "Led the end-to-end redesign of the DNA Test Activation flow with a mobile-first React-driven UX.",
      "Collaborated with cross-functional teams and executive stakeholders to align technical delivery with business goals.",
    ],
  },
  {
    section: "Experience",
    title: "Lead Software Engineer",
    organization: "NBCUniversal (GolfNow)",
    location: "Orlando, FL",
    start: "Jan 2021",
    end: "Sep 2022",
    summary:
      "Developed and maintained Node.js microservices powering booking and content workflows for high-traffic consumer products.",
    bullets: [
      "Built a JavaScript content-transformation pipeline to produce AMP-compliant pages and improve mobile load speed.",
      "Developed ingestion and transformation tooling with Node.js and RabbitMQ to normalize disparate sources.",
      "Helped drive a Docker-first microservice architecture for stronger deployment consistency and scalability.",
    ],
  },
  {
    section: "Experience",
    title: "Developer",
    organization: "Concepta Tech",
    location: "Orlando, FL",
    start: "Mar 2020",
    end: "Jan 2021",
    summary:
      "Built search-heavy platforms with LAMP and WordPress foundations for clients with demanding indexing and retrieval needs.",
    bullets: [
      "Developed a LAMP-based platform with Apache Solr integration for natural-language search capabilities.",
      "Built and deployed a WordPress platform powered by Elasticsearch to improve search performance and indexing quality.",
    ],
  },
  {
    section: "Education",
    title: "B.S., Computer Science",
    organization: "University of Florida",
    location: "Gainesville, FL",
    start: "2008",
    end: "2012",
    summary:
      "Comprehensive foundation in computer science theory and software engineering, including algorithms, systems programming, and web technologies.",
    bullets: [
      "Built the technical base that still informs product architecture and implementation choices today.",
    ],
  },
  {
    section: "Education",
    title: "A.S., Film and Video Production",
    organization: "Full Sail University",
    location: "Winter Park, FL",
    start: "2005",
    end: "2006",
    summary:
      "Intensive training in cinematography, editing, lighting, color, and directing that still shapes how interfaces are paced and presented.",
    bullets: [
      "Established the visual storytelling background that now complements engineering work across products and media.",
    ],
  },
];
