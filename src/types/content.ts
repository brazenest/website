export type SEO = {
  title: string
  description: string
}

export type EngineeringSection = {
  title: string
  content: string
}

export type EngineeringProject = {
  id: string
  title: string
  slug: string
  description: string
  cardDescriptor?: string
  cardHighlight?: string
  techStack: string[]
  sections: EngineeringSection[]
  seo?: SEO
}

export type EngineeringHeroContent = {
  headline: string
  description: string
  primaryCtaLabel: string
  primaryCtaHref: string
  secondaryCtaLabel: string
  secondaryCtaHref: string
}

export type SystemThinkingItem = {
  title: string
  description: string
}

export type MediaItem = {
  type: 'image' | 'video'
  src: string
  alt?: string
}

export type ProductionSection = {
  title: string
  content?: string
  media?: MediaItem[]
}

export type ProductionProject = {
  id: string
  title: string
  slug: string
  description: string
  cardContext?: string
  cardDemonstrates?: string
  media: MediaItem[]
  sections: ProductionSection[]
  seo?: SEO
}

export type ProductionHeroContent = {
  headline: string
  description: string
  primaryCtaLabel: string
  primaryCtaHref: string
}

export type ProcessItem = {
  title: string
  description: string
}

export type HeroContent = {
  name: string
  headline: string
  description: string
}

export type SideLinkCardContent = {
  title: string
  description: string
  href: string
  ctaLabel: string
  themeHint: 'engineering' | 'production'
}

export type AboutPreviewContent = {
  eyebrow?: string
  heading: string
  description: string
  href: string
  ctaLabel: string
}

export type AboutContent = {
  title: string
  intro: string
  paragraphs: string[]
}

export type BlogPostSide = 'engineering' | 'production' | 'bridge'

export type BlogPostSection = {
  title: string
  paragraphs: string[]
}

export type BlogPost = {
  title: string
  slug: string
  date: string
  summary: string
  side: BlogPostSide
  published: boolean
  sections: BlogPostSection[]
}

export type ResumeEntry = {
  title: string
  organization: string
  start: string
  end?: string
  description: string[]
}
