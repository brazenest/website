export type SEOProps = {
	title: string
	description: string
}

export const buildTitle = (title: string) => {
	return `${title} — Alden Gillespy`
}

export const personStructuredData = {
	'@context': 'https://schema.org',
	'@type': 'Person',
	name: 'Alden Gillespy',
	url: 'https://aldengillespy.com',
	sameAs: [],
}