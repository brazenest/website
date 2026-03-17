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

export type ResumeEntry = {
  title: string
  organization: string
  start: string
  end?: string
  description: string[]
}
