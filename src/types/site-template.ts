import type {
  MarketingCtaZoneProps,
  MarketingHeroZoneProps,
  MarketingProofZoneProps,
  MarketingServicesZoneProps,
} from '~/components/zones/marketing/types'

export type SiteTemplateAction = {
  label: string
  href: string
}

export type SiteTemplateMetadata = {
  name: string
  audience: string
  primaryCtas: SiteTemplateAction[]
}

export type SiteTemplateZonePayloads = {
  'hero.primary': MarketingHeroZoneProps
  'proof.simple': MarketingProofZoneProps
  'services.grid': MarketingServicesZoneProps
  'cta.primary': MarketingCtaZoneProps
}

export type SiteTemplateZoneId = keyof SiteTemplateZonePayloads

export type SiteTemplateId = 'default'

export type SiteTemplatePageId = 'home'

export type SiteTemplatePageDefinition = {
  id: SiteTemplatePageId
  path: '/'
  zoneOrder: SiteTemplateZoneId[]
}

export type SiteTemplateConfig = {
  id: SiteTemplateId
  site: SiteTemplateMetadata
  pages: {
    home: SiteTemplatePageDefinition
  }
  zones: SiteTemplateZonePayloads
}
