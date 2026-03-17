export type SEO = {
	title: string
	description: string
}

export type HeroContent = {
	name: string
	headline: string
	description: string
}

export type SideLinkCardContent = {
	title: string
	description: string
	href: string
	ctaLabel: string
	themeHint: 'engineering' | 'production'
}

export type AboutPreviewContent = {
	eyebrow?: string
	heading: string
	description: string
	href: string
	ctaLabel: string
}

export type AboutContent = {
	title: string
	intro: string
	paragraphs: string[]
}

export type ResumeEntry = {
	title: string
	organization: string
	start: string
	end?: string
	description: string[]
}
