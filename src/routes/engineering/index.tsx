import { component$ } from '@builder.io/qwik'
import { Footer } from '@/components/footer/Footer'
import { EngineeringHero } from '@/components/hero/EngineeringHero'
import { PageShell } from '@/components/layout/PageShell'
import { Header } from '@/components/nav/Header'
import { engineeringHeroContent } from '@/content/engineering/hero'

export default component$(() => {
  return (
    <PageShell theme="engineering">
      <Header />
      <main class="flex-1">
        <EngineeringHero {...engineeringHeroContent} />
      </main>
      <Footer />
    </PageShell>
  )
})
