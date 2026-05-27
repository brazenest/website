import type { ButtonVariant, ContainerWidth, SectionSpacing, SectionSurface } from '~/types/ui'

export type MarketingZoneAction = {
  href: string
  label: string
  variant?: ButtonVariant
  disabled?: boolean
}

export type MarketingHeroZoneProps = {
  eyebrow?: string
  title: string
  description: string
  primaryAction?: MarketingZoneAction
  secondaryAction?: MarketingZoneAction
  spacing?: SectionSpacing
  containerWidth?: ContainerWidth
}

export type MarketingProofItem = {
  title: string
  statement: string
  href?: string
}

export type MarketingProofZoneProps = {
  eyebrow?: string
  title?: string
  items: MarketingProofItem[]
  spacing?: SectionSpacing
  surface?: SectionSurface
  containerWidth?: ContainerWidth
}

export type MarketingServiceItem = {
  title: string
  description: string
  bullets?: string[]
  cta?: MarketingZoneAction
}

export type MarketingServicesZoneProps = {
  eyebrow?: string
  title: string
  description?: string
  items: MarketingServiceItem[]
  spacing?: SectionSpacing
  surface?: SectionSurface
  containerWidth?: ContainerWidth
}

export type MarketingCtaZoneProps = {
  eyebrow?: string
  title: string
  description: string
  primaryAction: MarketingZoneAction
  secondaryAction?: MarketingZoneAction
  spacing?: SectionSpacing
  surface?: SectionSurface
  containerWidth?: ContainerWidth
}
