import { component$ } from '@builder.io/qwik'
import { AboutPreview } from '~/components/hero/AboutPreview'
import { HomeHero } from '~/components/hero/HomeHero'
import { PageShell } from '~/components/layout/PageShell'
import { SideSelector } from '~/components/side/SideSelector'
import { aboutPreviewContent } from '~/content/identity/about-preview'
import { heroContent } from '~/content/identity/hero'
import { sideLinkCards } from '~/content/identity/side-links'

export default component$(() => {
	return (
		<PageShell theme="neutral">
			<main className="flex-1">
				<HomeHero {...heroContent}>
					<SideSelector items={sideLinkCards} />
				</HomeHero>

				<AboutPreview {...aboutPreviewContent} />
			</main>
		</PageShell>
	)
})
