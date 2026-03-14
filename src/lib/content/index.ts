export type SiteLink = {
  href: string;
  label: string;
  note: string;
};

export type SiteLinkGroup = {
  title: string;
  links: SiteLink[];
};

export const primaryNav: SiteLink[] = [
  { href: "/", label: "Home", note: "Temporary landing page." },
  { href: "/about", label: "About", note: "Personal narrative placeholder." },
  {
    href: "/projects",
    label: "Projects",
    note: "Selected work and case studies placeholder.",
  },
  { href: "/blog", label: "Blog", note: "Writing archive placeholder." },
  { href: "/resume", label: "Resume", note: "Resume snapshot placeholder." },
  { href: "/uses", label: "Uses", note: "Tools and setup placeholder." },
];

export const homeLinkGroups: SiteLinkGroup[] = [
  {
    title: "Foundation",
    links: [
      primaryNav[1],
      primaryNav[2],
      primaryNav[3],
    ],
  },
  {
    title: "Reference",
    links: [
      primaryNav[4],
      primaryNav[5],
    ],
  },
];
