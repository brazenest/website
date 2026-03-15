export type SiteLink = {
  label: string;
  href: string;
  note?: string;
  external?: boolean;
};

export type MediaAsset = {
  src: string;
  alt: string;
  width: number;
  height: number;
  caption?: string;
};

export type SiteSettings = {
  ownerName: string;
  githubHref: string;
  title: string;
  description: string;
  personName: string;
  role: string;
  brandTag: string;
  location: string;
  availability: string;
  introHeadline: string;
  positioning: string;
  aboutBlurb: string;
  contactPromptHeading: string;
  contactPromptBody: string;
  footerNote: string;
  resumeHref: string;
  contactHref: string;
  contactLabel: string;
};

export type SocialLink = {
  label: string;
  handle: string;
  note: string;
  href?: string;
  external?: boolean;
};

export type TechnologyIconKey =
  | "react"
  | "typescript"
  | "nextjs"
  | "nodejs"
  | "qwik"
  | "typed-content"
  | "aws"
  | "postgresql"
  | "elasticsearch"
  | "solr";

export type TechnologyItem = {
  icons: TechnologyIconKey[];
  name: string;
  category: string;
  note: string;
  href?: string;
};

export type Project = {
  slug: string;
  title: string;
  summary: string;
  status: "Current" | "Featured";
  year: string;
  role: string;
  stack: string[];
  image?: MediaAsset;
  href?: string;
  external?: boolean;
};

export type BlogPostMeta = {
  slug: string;
  title: string;
  summary: string;
  publishedOn: string;
  status: "Stub" | "Draft" | "Published";
  href?: string;
};

export type ResumeEntry = {
  section: string;
  title: string;
  organization: string;
  location: string;
  start: string;
  end?: string;
  summary: string;
  bullets: string[];
  href?: string;
};

export type UsesItem = {
  group: string;
  name: string;
  description: string;
  note?: string;
  href?: string;
};

export type PhotoCatalog = {
  slug: string;
  title: string;
  years: string;
  note: string;
  coverImage: MediaAsset;
};

export type PhotoItem = {
  slug: string;
  catalog: string;
  title: string;
  location: string;
  year: string;
  note?: string;
  featured?: boolean;
  image: MediaAsset;
  href?: string;
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

export type ResumeSection = {
  title: string;
  items: ResumeEntry[];
};

export type UsesGroup = {
  title: string;
  items: UsesItem[];
};

export type HomePageContent = {
  heroImage: MediaAsset;
};

export type ProseSection = {
  heading: string;
  paragraphs: string[];
};

export type AboutPageContent = {
  heroImage: MediaAsset;
  portraitImage: MediaAsset;
  storyImage: MediaAsset;
  introduction: string[];
  philosophy: ProseSection[];
};
