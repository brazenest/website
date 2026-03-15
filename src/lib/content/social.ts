import type { SocialLink } from "./model";

export const socialLinks: SocialLink[] = [
  {
    label: "Email",
    handle: "contact@aldengillespy.com",
    note: "Best if you want to talk about a role, a freelance project, or something concrete.",
    href: "mailto:contact@aldengillespy.com",
  },
  {
    label: "GitHub",
    handle: "@brazenest",
    note: "Where the rebuilds, experiments, and quieter technical work usually show up first.",
    href: "https://github.com/brazenest",
    external: true,
  },
  {
    label: "YouTube",
    handle: "@SHADOWCATpictures",
    note: "The film side of the work: editing, pacing, and longer-form visual storytelling.",
    href: "https://youtube.com/@SHADOWCATpictures",
    external: true,
  },
  {
    label: "LinkedIn",
    handle: "Alden Gillespy",
    note: "The straight-line professional version of the background, roles, and timeline.",
    href: "https://www.linkedin.com/in/alden-gillespy",
    external: true,
  },
];
