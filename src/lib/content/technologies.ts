import type { TechnologyItem } from "./model";

export const technologyItems: TechnologyItem[] = [
  {
    icons: ["react", "typescript"],
    name: "React + TypeScript",
    category: "Front-end systems",
    note: "The foundation behind most product-facing engineering work and interface architecture.",
    href: "/uses",
  },
  {
    icons: ["nextjs", "nodejs"],
    name: "Next.js + Node.js",
    category: "Full-stack delivery",
    note: "Used for production web apps, server-rendered flows, and resilient product surfaces.",
    href: "/uses",
  },
  {
    icons: ["qwik", "typed-content"],
    name: "Qwik + typed content modeling",
    category: "Current site foundation",
    note: "The v3 rebuild is using Qwik, route shells, and portable content structures.",
    href: "/uses",
  },
  {
    icons: ["aws", "postgresql"],
    name: "AWS + PostgreSQL",
    category: "Cloud and data",
    note: "The likely baseline when the local content layer graduates to a database-backed system.",
    href: "/uses",
  },
  {
    icons: ["elasticsearch", "solr"],
    name: "Elasticsearch + Apache Solr",
    category: "Search and retrieval",
    note: "Search systems work that informs dense inventory, indexing, and query clarity.",
    href: "/projects",
  },
];
