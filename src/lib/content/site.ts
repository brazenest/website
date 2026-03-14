import type { SiteLink, SiteSettings } from "./model";

export const resumeAssetHref = "/assets/files/Resume_with_Cover_Letter_2026-02.pdf";

export const siteSettings: SiteSettings = {
  title: "Alden Gillespy",
  description:
    "Personal index for Alden Gillespy's engineering, design, writing, and cinematic work.",
  personName: "Alden Gillespy",
  role: "Front-end software engineer, web designer, and video producer",
  brandTag: "Front-end engineer / design / video",
  location: "Salt Lake City, UT",
  availability: "Open to full-time roles and select freelance work",
  introHeadline: "I build interfaces with product-grade engineering and cinematic polish.",
  positioning:
    "Front-end software engineer, web designer, and video producer bridging resilient systems with visuals that feel intentional.",
  aboutBlurb:
    "I studied Computer Science at the University of Florida, later earned a Film & Video Production degree from Full Sail University, and still build at the overlap of product engineering and visual storytelling.",
  contactPromptHeading:
    "If you need engineering depth with a strong visual sense, reach out.",
  contactPromptBody:
    "The dedicated contact flow is still being rebuilt for v3, but the shared content layer now carries the real identity, project, and resume data this site will grow from.",
  footerNote:
    "Front-end software engineer, web designer, and video producer.",
  resumeHref: resumeAssetHref,
  contactHref: "mailto:ag@aldengillespy.com",
  contactLabel: "Email me",
};

export const primaryNav: SiteLink[] = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/projects", label: "Projects" },
  { href: "/photos", label: "Photos" },
  { href: "/blog", label: "Blog" },
  { href: "/uses", label: "Uses" },
  { href: "/resume", label: "Resume" },
];

export const homeSecondaryCtas: SiteLink[] = [
  { href: "/resume", label: "Resume" },
  { href: "/projects", label: "Projects" },
  { href: "/blog", label: "Blog" },
];
