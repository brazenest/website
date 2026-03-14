import type { Metadata } from "next"
import 'dotenv/config'
import { GoogleAnalytics } from '@next/third-parties/google'
import { Space_Grotesk, Inter } from "next/font/google"
import "@/app/globals.css"
import { SiteHeader } from "@/components/newton/site/SiteHeader"
import { SiteFooter } from "@/components/newton/site/SiteFooter"
import { LinkModel } from "@/types/ui"
import ContactModal from "@/components/newton/contact/ContactModal"

const fontTech = Inter({
	variable: '--font-tech',
	subsets: ["latin"],
})

const fontCinema = Space_Grotesk({
	variable: '--font-cinema',
	subsets: ["latin"],
})

export const metadata: Metadata = {
	title: "Alden Gillespy — Full-Stack Software Engineer, Web Designer & Video Producer",
	description: "Full-stack software engineer, web designer, and video producer blending product-grade engineering with cinematic storytelling for modern digital experiences.",
	icons: {
		icon: [
			{ url: '/assets/images/favicons/favicon-color.ico', media: '(prefers-color-scheme: light)' },
			{ url: '/assets/images/favicons/favicon.ico', media: '(prefers-color-scheme: dark)' },
		],
	},
	metadataBase: new URL("https://aldengillespy.com"),
	keywords: [
		"Software Engineer",
		"Full-Stack Engineer",
		"React",
		"Next.js",
		"Web Design",
		"Video Production",
		"Cinematic Storytelling",
		"Design Systems",
	],
	openGraph: {
		title: "Alden Gillespy — Full-Stack Software Engineer, Web Designer & Video Producer",
		description:
			"Full-stack engineering meets cinematic storytelling — portfolio, case studies, and blog posts.",
		url: "https://aldengillespy.com",
		type: "website",
	},
}

const footerLinks: LinkModel[] = [
	{
		href: '/',
		content: 'Home',
	},
	{
		href: '/about',
		content: 'About Me',
	},
	{
		href: '/blog',
		content: 'Blog',
	},
	{
		href: 'mailto:contact@aldengillespy.com?subject=Reaching out from your site',
		content: 'Contact',
	}
]

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<html id="root" lang="en" suppressHydrationWarning>
			<body
				id="site"
				className={`${fontTech.variable} ${fontCinema.variable} bg-white dark:bg-black text-gray-900 dark:text-gray-100 font-body transition-colors duration-300 ease-in-out`}
			>
				<SiteHeader />

				<div id="page-wrap" className="min-h-screen mt-20">
					{children}
				</div>

				<SiteFooter links={footerLinks} />

				<ContactModal />

				<GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_MEASUREMENT_ID!} />
			</body>
		</html>
	)
}
