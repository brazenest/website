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
					<section
						aria-labelledby="home-side-selector-heading"
						class="flex flex-col gap-4 md:gap-5"
					>
						<div class="flex max-w-[62ch] flex-col gap-2 md:gap-3">
							<h2
								id="home-side-selector-heading"
								class="text-2xl font-semibold tracking-tight md:text-3xl"
							>
								Choose a Side
							</h2>

							<p class="text-base leading-7 text-[var(--muted)] md:text-lg">
								Start with the discipline you want to evaluate first. Each side expands into project work, process, and the decisions that shape the outcome.
							</p>
						</div>

						<SideSelector items={sideLinkCards} />
					</section>
				</HomeHero>

				<ProofStrip items={homeProofStrip} />

				<AboutPreview {...aboutPreviewContent} />

				<HomeCTASection />
			</main>

			<Footer />
		</PageShell>
	)
})
