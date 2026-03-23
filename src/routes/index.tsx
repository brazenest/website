import { component$ } from '@builder.io/qwik'
import type { DocumentHead } from '@builder.io/qwik-city'
import { AboutPreview } from '~/components/hero/AboutPreview'
import { HomeHero } from '~/components/hero/HomeHero'
import { HomeCTASection } from '~/components/home/HomeCTASection'
import { ProofStrip } from '~/components/home/ProofStrip'
import { PageShell } from '~/components/layout/PageShell'
import { Footer } from '~/components/footer/Footer'
import { Header } from '~/components/nav/Header'
import { SideSelector } from '~/components/side/SideSelector'
import { aboutPreviewContent } from '~/content/identity/about-preview'
import { heroContent } from '~/content/identity/hero'
import { homeProofStrip } from '~/content/identity/proof-strip'
import { sideLinkCards } from '~/content/identity/side-links'
import { staticHeads } from '~/fns/seo/staticHeads'

export const head: DocumentHead = staticHeads.home

export default component$(() => {
	return (
		<PageShell theme="neutral">
			<Header />

			<main id="main-content" class="flex-1 scroll-mt-24 p-0">
				<HomeHero {...heroContent}>
					<div class="flex flex-col gap-4 md:gap-5">
						<p class="max-w-[62ch] text-sm leading-6 text-[var(--muted)] md:text-base">
							Explore how engineering and production come together to build complete,
							professional-grade platforms.
						</p>

						<SideSelector items={sideLinkCards} />
					</div>
				</HomeHero>

				<ProofStrip items={homeProofStrip} />

				<AboutPreview {...aboutPreviewContent} />

				<HomeCTASection />
			</main>

			<Footer />
		</PageShell>
	)
})
