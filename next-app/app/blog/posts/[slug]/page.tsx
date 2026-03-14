import { BlogLatestPosts } from "@/components/newton/BlogLatestPosts"
import { ContactCTASection } from "@/components/newton/contact/ContactCTASection"
import { BlogBody } from "@/components/newton/layout/BlogBody"
import { Page } from "@/components/newton/layout/Page"
import { Panel } from "@/components/newton/layout/Panel"
import { TagBar } from "@/components/newton/layout/TagBar"
import { formatBlogPostDate } from "@/functions/formatBlogPostDate"
import { getBlogPostsFromDB } from "@/functions/getBlogPostsFromDB"
import { notFound } from "next/navigation"

export default async function BlogPostsSinglePage({
	params,
}: {
  params: Promise<{ slug: string }>
}) {

	const { slug } = await params
	const [ post ] = await getBlogPostsFromDB({ slug })

	if (!post) notFound()
  
	return (
		<Page id="blog-posts-single-page">
			<article id={`blog-post--${post.id}`}>

				{/* Post header */}
				<header className="blog-post-header py-15 w-full border-b border-blue-200 dark:border-blue-800 bg-blue-100 dark:bg-blue-900 text-gray-800 dark:text-gray-200">
					<div className="max-w-5xl mx-auto">
						<hgroup>
							<h1 className="blog-post--title max-w-3xl lg:max-w-5xl text-4xl md:text-5xl lg:text-6xl md:leading-13.75 font-heading font-semibold text-shadow-md lg:leading-18.25 mx-auto text-center mb-4.25">
								{post.title}
							</h1>
							<p className="blog-post--dek text-xl leading-7.25 md:max-w-2xl mx-auto text-center text-gray-600 dark:text-gray-400">
								{post.dek}
							</p>
						</hgroup>
					</div>
				</header>

				<div id="blog-posts-single-page--inner-wrap" className="px-5 md:px-9.25 lg:px-8">

					{/* Post body */}
					<BlogBody className="my-15.25 px-0.25">
						{post.body}
					</BlogBody>

					{/* Post footer */}
					<footer id={`blog-post-footer--id-${post.id}`} className="md:max-w-3xl mx-auto" role="contentinfo">
						<Panel id="blog-post--meta" title="About this post">
							<div className="flex flex-col md:flex-row gap-6">
								<dl className="grid md:grid-cols-2 w-full">
									<span className="blog-post--meta--col-1 md:block space-y-4">
										<div className="blog-post--meta--col-item">
											<dt className="font-heading font-semibold my-1">Posted on</dt>
											<dd><time dateTime={post.date.toISOString()}>{formatBlogPostDate(post.date)}</time></dd>
										</div>
										<div className="blog-post--meta--col-item">
											<dt className="font-heading font-semibold my-0.75">Author</dt>
											<dd>Alden Gillespy</dd>
										</div>

									</span>
									<span className="blog-post--meta--col-2 md:block">
										{/* <dt>Last updated</dt>
									<dd><time dateTime={post.datemodified.toISOString()}>{formatBlogPostDate(post.datemodified)}</time></dd> */}
										<div className="blog-post--meta--col-item">
											<dt className="font-heading font-semibold my-0.75">Tags</dt>
											<dd>{post.tags.length ? (
												<TagBar tags={post.tags} />
											) : <span><em>none</em></span>}</dd>
										</div>

									</span>
								</dl>
							</div>
						</Panel>

					</footer>

				</div>

			</article>

			<BlogLatestPosts />

			<ContactCTASection
				id="blog-post--contact-cta"
				heading="Ready to begin a journey together?"
				text="Reach out to me today to let me know how I can assist you with your projects. I am ready to help accomplish your goals regardless which phase of development your team is in."
				actions={[
					{ text: "View resume", href: "/assets/files/Resume_2026-01.pdf", variant: "secondary" },
				]}
			/>

		</Page>
	)
}