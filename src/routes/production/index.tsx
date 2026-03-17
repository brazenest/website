import { component$ } from '@builder.io/qwik'
import { Footer } from '@/components/footer/Footer'
import { ProductionHero } from '@/components/hero/ProductionHero'
import { PageShell } from '@/components/layout/PageShell'
import { Header } from '@/components/nav/Header'
import { productionHeroContent } from '@/content/production/hero'

export default component$(() => {
  return (
    <PageShell theme="production">
      <Header />
      <main class="flex-1">
        <ProductionHero {...productionHeroContent} />
      </main>
      <Footer />
    </PageShell>
  )
})
