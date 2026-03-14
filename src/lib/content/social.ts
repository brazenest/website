import type { SocialLink } from "./model";

export const socialLinks: SocialLink[] = [
  {
    label: "Email",
    handle: "ag@aldengillespy.com",
    note: "Best for direct role, freelance, and project inquiries.",
    href: "mailto:ag@aldengillespy.com",
  },
  {
    label: "GitHub",
    handle: "@brazenest",
    note: "Public code, prototypes, and rebuilds in progress.",
    href: "https://github.com/brazenest",
    external: true,
  },
  {
    label: "YouTube",
    handle: "@SHADOWCATpictures",
    note: "Cinematic work, editing, and long-tail visual storytelling.",
    href: "https://youtube.com/@SHADOWCATpictures",
    external: true,
  },
  {
    label: "LinkedIn",
    handle: "Alden Gillespy",
    note: "Listed in the current resume; public profile link can be added next.",
  },
];
