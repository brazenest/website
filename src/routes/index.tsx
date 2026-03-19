import { component$ } from '@builder.io/qwik'
import type { DocumentHead } from '@builder.io/qwik-city'
import { AboutPreview } from '~/components/hero/AboutPreview'
import { HomeHero } from '~/components/hero/HomeHero'
import { PageShell } from '~/components/layout/PageShell'
import { Footer } from '~/components/footer/Footer'
import { Header } from '~/components/nav/Header'
import { SideSelector } from '~/components/side/SideSelector'
import { aboutPreviewContent } from '~/content/identity/about-preview'
import { heroContent } from '~/content/identity/hero'
import { sideLinkCards } from '~/content/identity/side-links'
import { personStructuredData } from '~/fns/seo'
import { buildMetadata } from '~/fns/seo/buildMetadata'
import { metadataToDocumentHead } from '~/fns/seo/metadataToDocumentHead'
import { seoPresets } from '~/config/seo'

export const head: DocumentHead = (() => {
	const metadata = buildMetadata({
		...seoPresets.home,
		pathname: '/',
	})
	const documentHead = metadataToDocumentHead(metadata)
	return {
		...documentHead,
		scripts: [
			{
				props: {
					type: 'application/ld+json',
				},
				script: JSON.stringify(personStructuredData),
			},
		],
	}
})()

export default component$(() => {
	return (
		<PageShell theme="neutral">
			<Header />

			<main id="main-content" class="flex-1 scroll-mt-24 p-0">
				<HomeHero {...heroContent}>
					<div class="flex flex-col gap-4 md:gap-5">
						<p class="max-w-[62ch] text-sm leading-6 text-[var(--muted)] md:text-base">
							Choose the side you want to evaluate first, then use shared context to connect
							both perspectives.
						</p>

						<SideSelector items={sideLinkCards} />
					</div>
				</HomeHero>

				<AboutPreview {...aboutPreviewContent} />
			</main>

			<Footer />
		</PageShell>
	)
})
