export type SiteLink = {
  href: string;
  label: string;
  note?: string;
  external?: boolean;
};

export type HomeIndexItem = {
  label: string;
  note: string;
  href?: string;
  external?: boolean;
};

export type HomeIndexGroup = {
  title: string;
  items: HomeIndexItem[];
};

export const resumeAssetHref = "/assets/files/Resume_with_Cover_Letter_2026-02.pdf";

export const primaryNav: SiteLink[] = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/projects", label: "Projects" },
  { href: "/blog", label: "Blog" },
  { href: "/uses", label: "Uses" },
  { href: "/resume", label: "Resume" },
];

export const footerLinks: SiteLink[] = [
  { href: resumeAssetHref, label: "Resume PDF" },
  {
    href: "https://github.com/brazenest",
    label: "GitHub",
    external: true,
  },
];

export const homeSecondaryCtas: SiteLink[] = [
  { href: "/resume", label: "Resume" },
  { href: "/projects", label: "Projects" },
  { href: "/blog", label: "Blog" },
];

export const homeIndexGroups: HomeIndexGroup[] = [
  {
    title: "Technologies I use",
    items: [
      {
        label: "Qwik + TypeScript",
        note: "Current app shell and front-end foundation",
        href: "/uses",
      },
      {
        label: "Node.js + PostgreSQL",
        note: "Application and data work",
        href: "/uses",
      },
      {
        label: "Figma + plain CSS",
        note: "Interface systems and layout thinking",
        href: "/uses",
      },
    ],
  },
  {
    title: "Projects I'm working on",
    items: [
      {
        label: "Personal site v3",
        note: "Design foundation and information architecture",
        href: "/projects",
      },
      {
        label: "Case study compression",
        note: "Turning long work into shorter, clearer reads",
        href: "/projects",
      },
      {
        label: "Writing pipeline refresh",
        note: "A lighter system for notes and essays",
        href: "/projects",
      },
    ],
  },
  {
    title: "Recent writing",
    items: [
      {
        label: "Build notes for the rewrite",
        note: "Starter draft",
        href: "/blog",
      },
      {
        label: "Selected engineering essays",
        note: "Archive coming online next",
        href: "/blog",
      },
      {
        label: "Short working notes",
        note: "Placeholder for quick entries",
      },
    ],
  },
  {
    title: "About",
    items: [
      {
        label: "Background",
        note: "The through-line between software and storytelling",
        href: "/about",
      },
      {
        label: "Uses",
        note: "Tools, setup, and defaults",
        href: "/uses",
      },
      {
        label: "Resume snapshot",
        note: "Concise history and current focus",
        href: "/resume",
      },
    ],
  },
  {
    title: "Social handles",
    items: [
      {
        label: "GitHub / @brazenest",
        note: "Public code and experiments",
        href: "https://github.com/brazenest",
        external: true,
      },
      {
        label: "LinkedIn / pending",
        note: "Public profile link will be added here",
      },
      {
        label: "Other socials / pending",
        note: "Consolidating the public set for v3",
      },
    ],
  },
  {
    title: "Resume PDF",
    items: [
      {
        label: "February 2026 PDF",
        note: "Current downloadable resume",
        href: resumeAssetHref,
      },
      {
        label: "Resume page",
        note: "Short on-site summary",
        href: "/resume",
      },
    ],
  },
];
