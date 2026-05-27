import { component$ } from '@builder.io/qwik'
import type { DocumentHead } from '@builder.io/qwik-city'
import { Footer } from '~/components/footer/Footer'
import { PageShell } from '~/components/layout/PageShell'
import { Header } from '~/components/nav/Header'
import { MarketingCtaZone } from '~/components/zones/marketing/cta/MarketingCtaZone'
import { MarketingHeroZone } from '~/components/zones/marketing/hero/MarketingHeroZone'
import { MarketingProofZone } from '~/components/zones/marketing/proof/MarketingProofZone'
import { MarketingServicesZone } from '~/components/zones/marketing/services/MarketingServicesZone'
import type {
  MarketingCtaZoneProps,
  MarketingHeroZoneProps,
  MarketingProofZoneProps,
  MarketingServicesZoneProps,
} from '~/components/zones/marketing/types'
import { getDefaultHomePageComposition } from '~/fns/sites/resolve-zones'
import type { ResolvedTemplateZone } from '~/fns/sites/resolve-zones'

export const head: DocumentHead = {
  title: 'Professional Services Template Preview | Alden Gillespy',
  meta: [
    {
      name: 'description',
      content:
        'Preview route for the reusable professional-services template composed from site config and marketing zones.',
    },
  ],
}

const renderResolvedZone = (zone: ResolvedTemplateZone) => {
  const key = `${zone.contentKey}-${zone.order}`

  switch (zone.contentKey) {
    case 'hero.primary':
      return <MarketingHeroZone key={key} {...(zone.content as MarketingHeroZoneProps)} />
    case 'proof.simple':
      return <MarketingProofZone key={key} {...(zone.content as MarketingProofZoneProps)} />
    case 'services.grid':
      return <MarketingServicesZone key={key} {...(zone.content as MarketingServicesZoneProps)} />
    case 'cta.primary':
      return <MarketingCtaZone key={key} {...(zone.content as MarketingCtaZoneProps)} />
    default:
      return null
  }
}

export default component$(() => {
  const composition = getDefaultHomePageComposition()

  return (
    <PageShell theme="neutral">
      <Header />

      <main id="main-content" class="flex-1 scroll-mt-24 p-0">
        {composition.zones.map((zone) => renderResolvedZone(zone))}
      </main>

      <Footer />
    </PageShell>
  )
})
