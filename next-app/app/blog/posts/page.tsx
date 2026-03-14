import { ContactCTASection } from "@/components/newton/contact/ContactCTASection"
import { HeroSection } from "@/components/newton/HeroSection"
import { CardLink } from "@/components/newton/layout/CardLink"
import { Page } from "@/components/newton/layout/Page"
import { Panel } from "@/components/newton/layout/Panel"
import { Section } from "@/components/newton/layout/Section"
import { getBlogPostsFromDB } from "@/functions/getBlogPostsFromDB"

export default async function BlogPostsIndexPage() {

	const posts = await getBlogPostsFromDB({})

	return (
		<Page id="blog-index-page">

			<HeroSection
				title="My Blog Posts"
				subtitle="Insights on software engineering, design systems, and the intersection of code and creativity."
				className="bg-blue-100 dark:bg-blue-900 text-gray-950 dark:text-gray-50"
				subtitleClassName="text-gray-800 dark:text-gray-200"
			/>

			<Section id="blog-posts-index-section" className="px-5 md:px-9.25 lg:px-8 py-12">
				<Panel id="blog-posts-list-panel">
					<ol id="blog-posts-list" className="md:columns-2 space-y-6">
						{posts.map((post, i) => (
							<li key={i} className="blog-posts-list-item break-inside-avoid">
								<article key={post.id} id={`article-card--id-${post.id}`} className="blog-post-list-article">
									<CardLink
										title={post.title}
										href={`/blog/posts/${post.slug}`}
									>
										{post.dek}
									</CardLink>
								</article>
							</li>
						))}
					</ol>
				</Panel>
			</Section>

			<ContactCTASection
				id="blog-post--contact-cta"
				heading="Ready to begin a productive journey together?"
				text="Reach out to me today to let me know how I can assist you with your projects. I am ready to help accomplish your goals regardless which phase of development your team is in."
				actions={[
					{ text: "View resume", href: "/assets/files/Resume_2026-01.pdf", variant: "secondary" },
				]}
			/>
			
		</Page>
	)
}