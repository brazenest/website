import type { EngineeringProject } from "~/types/content";

export const aldenGillespySiteV4Project: EngineeringProject = {
  id: "alden-gillespy-site-v4",
  title: "AldenGillespy.com v4.0",
  slug: "alden-gillespy-site-v4",
  description:
    "A fourth-generation personal site rebuilt as a clearer work platform for engineering, production, writing, packages, and deployment operations.",
  techStack: [
    "Qwik",
    "TypeScript",
    "Fastify",
    "PostgreSQL",
    "Docker",
    "GitHub Actions",
  ],
  sections: [
    {
      title: "Overview",
      content:
        "Version 4.0 turned this site from a portfolio into a working platform for the whole practice. The release brings engineering case studies, production work, service packages, blog infrastructure, admin authoring, and deployment operations into one coherent system.",
      media: [
        {
          type: "image",
          src: "/media/engineering/sections/alden-gillespy-site-v4-overview.svg",
          alt: "Editorial system graphic for the AldenGillespy.com v4 overview",
        },
      ],
    },
    {
      title: "Problem Space",
      content:
        "The site needed to explain two disciplines without splitting the audience or flattening the work into generic portfolio cards. It also needed to be maintainable after launch: content should be structured, metadata should be reliable, and deployment should be repeatable enough to support future releases.",
      media: [
        {
          type: "image",
          src: "/media/engineering/sections/alden-gillespy-site-v4-problem-space.svg",
          alt: "Structured portfolio platform graphic showing the v4 problem space",
        },
      ],
    },
    {
      title: "Role and Scope",
      content:
        "I handled product direction, information architecture, frontend implementation, content modeling, backend integration, release hardening, and deployment automation. The work combined design judgment with full-stack engineering so the public experience and operational layer supported the same positioning.",
      media: [
        {
          type: "image",
          src: "/media/engineering/sections/alden-gillespy-site-v4-role-and-scope.svg",
          alt: "Full-stack project scope graphic for the AldenGillespy.com v4 case study",
        },
      ],
    },
    {
      title: "System Design Decisions",
      content:
        "The site is organized around typed content modules, reusable route patterns, centralized SEO helpers, and discipline-specific design systems. Blog and admin flows use PostgreSQL-backed records, while static case study content remains versioned with the codebase for reviewable releases.",
      media: [
        {
          type: "image",
          src: "/media/engineering/sections/alden-gillespy-site-v4-system-design-decisions.svg",
          alt: "Typed content and release architecture graphic for AldenGillespy.com v4",
        },
      ],
    },
    {
      title: "Implementation Complexity",
      content:
        "The hardest part was keeping the site expressive without making it fragile. I had to balance rich editorial pages, responsive layout behavior, structured data, contact handling, image assets, Docker builds, and branch-aware deployment names without letting one concern leak across the rest of the system.",
      media: [
        {
          type: "image",
          src: "/media/engineering/sections/alden-gillespy-site-v4-implementation-complexity.svg",
          alt: "Implementation complexity graphic showing connected site systems",
        },
      ],
    },
    {
      title: "Why It Mattered",
      content:
        "The release gives the practice a durable operating base: clients can understand the overlap between software and production, case studies can grow without redesigning the site, and releases can move through a predictable pipeline. It is both the work surface and an example of the engineering judgment behind the work.",
      media: [
        {
          type: "image",
          src: "/media/engineering/sections/alden-gillespy-site-v4-why-it-mattered.svg",
          alt: "Finished platform graphic showing why the v4 release mattered",
        },
      ],
    },
  ],
  image: "/media/engineering/alden-gillespy-site-v4.jpg",
  seo: {
    title: "AldenGillespy.com v4.0",
    description:
      "Engineering case study for the fourth-generation Alden Gillespy site, focused on typed content, full-stack delivery, SEO structure, and Docker-based release operations.",
  },
};
