export type SEO = {
  title: string;
  description: string;
};

export type EngineeringSection = {
  title: string;
  content: string;
  media?: MediaItem[];
};

export type EngineeringProject = {
  id: string;
  title: string;
  slug: string;
  description: string;
  cardDescriptor?: string;
  cardHighlight?: string;
  techStack: string[];
  sections: EngineeringSection[];
  seo?: SEO;
  image?: string;
};

export type EngineeringHeroContent = {
  headline: string;
  byline?: string;
  description: string;
  primaryCtaLabel: string;
  primaryCtaHref: string;
  secondaryCtaLabel: string;
  secondaryCtaHref: string;
  visual?: MediaAsset;
};

export type SystemThinkingItem = {
  title: string;
  description: string;
};

export type MediaItem = {
  type: "image" | "video";
  src: string;
  alt?: string;
  /**
   * Poster image for video media
   * Used as a lightweight preview before/instead of loading the full video
   * Enables poster-first strategy for better perceived performance
   */
  poster?: string;
};

export type ProductionSection = {
  title: string;
  content?: string;
  items?: string[];
  media?: MediaItem[];
};

export type ProductionProject = {
  id: string;
  title: string;
  slug: string;
  description: string;
  cardContext?: string;
  cardDemonstrates?: string;
  media: MediaItem[];
  sections: ProductionSection[];
  seo?: SEO;
  image?: string;
};

export type ProductionHeroContent = {
  headline: string;
  byline?: string;
  description: string;
  primaryCtaLabel: string;
  primaryCtaHref: string;
  visual?: MediaAsset;
};

export type MediaAsset = {
  src: string;
  alt: string;
};

export type ProcessItem = {
  title: string;
  description: string;
};

export type HeroContent = {
  name: string;
  headline: string;
  description: string;
  visual?: MediaAsset;
};

export type SideLinkCardContent = {
  title: string;
  description: string;
  href: string;
  ctaLabel: string;
  themeHint: "engineering" | "production";
};

export type ProofItem = {
  title: string;
  statement: string;
  href: string;
  detail?: string;
  impact?: string;
};

export type AboutPreviewContent = {
  eyebrow?: string;
  heading: string;
  description: string;
  href: string;
  ctaLabel: string;
  visual?: MediaAsset;
};

export type AboutContent = {
  title: string;
  intro: string;
  paragraphs: string[];
};

export type ResumeEntry = {
  title: string;
  organization: string;
  start: string;
  end?: string;
  description: string[];
};

export type Package = {
  id: string;
  title: string;
  slug: string;
  description: string;
  forWho: string;
  includes: string[];
  outcome: string;
  ctaLabel: string;
  ctaHref: string;
  highlight?: boolean;
};

export type PackageHeroContent = {
  headline: string;
  byline?: string;
  description: string;
  visual?: MediaAsset;
};

export type ContactMethod = {
  label: string;
  value: string;
  href: string;
  description: string;
};

export type InquiryType = {
  title: string;
  description: string;
};

export type IncludeItem = {
  title: string;
  description: string;
};

export type NextStep = {
  title: string;
  description: string;
};

export type CTAButton = {
  label: string;
  href: string;
  variant: "primary" | "secondary";
};

export type ContactPageContent = {
  eyebrow: string;
  title: string;
  intro: string;
  bridge: string;
  contactPanel: {
    eyebrow: string;
    heading: string;
    description: string;
    methods: ContactMethod[];
  };
  inquiryTypes: {
    heading: string;
    intro: string;
    items: InquiryType[];
  };
  includeItems: {
    heading: string;
    intro: string;
    items: IncludeItem[];
  };
  nextSteps: {
    heading: string;
    intro: string;
    items: NextStep[];
    note: string;
  };
  cta: {
    eyebrow: string;
    heading: string;
    description: string;
    buttons: CTAButton[];
    footnote: string;
  };
};
