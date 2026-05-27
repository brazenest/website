import { defaultSiteTemplate } from '~/content/sites/default'
import type {
  SiteTemplateConfig,
  SiteTemplatePageId,
  SiteTemplateZoneId,
  SiteTemplateZonePayloads,
} from '~/types/site-template'

type ZoneNameFromId<T extends string> = T extends `${infer Name}.${string}` ? Name : never
type ZoneVariantFromId<T extends string> = T extends `${string}.${infer Variant}` ? Variant : never

export type ParsedZoneIdentifier<T extends SiteTemplateZoneId = SiteTemplateZoneId> = {
  id: T
  name: ZoneNameFromId<T>
  variant: ZoneVariantFromId<T>
}

export type ResolvedTemplateZone<T extends SiteTemplateZoneId = SiteTemplateZoneId> = ParsedZoneIdentifier<T> & {
  order: number
  contentKey: T
  content: SiteTemplateZonePayloads[T]
}

export const parseZoneIdentifier = <T extends SiteTemplateZoneId>(zoneId: T): ParsedZoneIdentifier<T> => {
  const [name, variant, ...rest] = zoneId.split('.')

  if (!name || !variant || rest.length > 0) {
    throw new Error(`Invalid zone identifier: "${zoneId}". Expected "name.variant".`)
  }

  return {
    id: zoneId,
    name: name as ZoneNameFromId<T>,
    variant: variant as ZoneVariantFromId<T>,
  }
}

export const resolveZoneOrder = <T extends SiteTemplateZoneId>(
  zoneOrder: readonly T[],
  zones: Pick<SiteTemplateZonePayloads, T>,
): ResolvedTemplateZone<T>[] => {
  return zoneOrder.map((zoneId, order) => {
    const parsed = parseZoneIdentifier(zoneId)

    return {
      ...parsed,
      order,
      contentKey: zoneId,
      content: zones[zoneId],
    }
  })
}

export const resolveTemplatePageZones = (
  template: SiteTemplateConfig,
  pageId: SiteTemplatePageId = 'home',
): ResolvedTemplateZone[] => {
  const page = template.pages[pageId]
  return resolveZoneOrder(page.zoneOrder, template.zones)
}

export const resolveDefaultHomeZones = () => {
  return resolveTemplatePageZones(defaultSiteTemplate, 'home')
}

export const getDefaultHomePageComposition = () => {
  return {
    page: defaultSiteTemplate.pages.home,
    zones: resolveDefaultHomeZones(),
  }
}
