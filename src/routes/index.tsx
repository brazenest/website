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
import { buildTitle, personStructuredData } from '~/fns/seo'

export const head: DocumentHead = {
	title: buildTitle('Home'),
	meta: [
		{
			name: 'description',
			content: 'Software engineering and cinematic production by Alden Gillespy.',
		},
	],
	scripts: [
		{
			props: {
				type: 'application/ld+json',
			},
			script: JSON.stringify(personStructuredData),
		},
	],
}

export default component$(() => {
	return (
		<PageShell theme="neutral">
			<Header />

			<main className="flex-1">
				<HomeHero {...heroContent}>
					<SideSelector items={sideLinkCards} />
				</HomeHero>

				<AboutPreview {...aboutPreviewContent} />
			</main>

			<Footer />
		</PageShell>
	)
})
