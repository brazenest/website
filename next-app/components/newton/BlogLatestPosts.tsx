import { getBlogPostsFromDB } from "@/functions/getBlogPostsFromDB"
import { CardLink } from "./layout/CardLink"
import { SplitContentPanelSection } from "./layout/SplitContentPanelSection"
import { BlogPostModel } from "@/types/blog"
import { CardList } from "./layout/CardList"

export const BlogLatestPosts = async () => {

	const posts: BlogPostModel[] = await getBlogPostsFromDB({})

	return (
		<SplitContentPanelSection
			id="latest-blog-posts"
			title="Insights from the Intersection of Code and Creativity"
			subtitle="Stay updated with my most recent posts exploring software engineering, design systems, creative workflows, and the intersection of technical precision and visual storytelling from an experienced software engineer and video producer."
			thumbnail={{
				src: "/assets/images/home/blog-thumbnail.jpg",
				alt: "A collage of images, including a laptop, tablet, and smartphone, a piece of engineering equipment, a man wearing a hoodie and headphones, working on a laptop, with a cup of coffee, on a motion picture production set.",
				width: 400,
				height: 200,
			}}
			variant="half"
			leftContent={
				<span className="blog-post-list-item">
					<CardLink
						title={posts[0].title}
						href={`/blog/posts/${posts[0].slug}`}
					>
						{posts[0].dek}
					</CardLink>
				</span>
			}
			rightContent={
				<ul className="card-list space-y-4.5">
					{posts.slice(1, 4).map((post) => (
						<li key={post.slug} className="blog-post-list-item">
							<CardLink
								title={post.title}
								href={`/blog/posts/${post.slug}`}
								size="sm"
							>
								{post.dek}
							</CardLink>
						</li>
					))}
				</ul>
			}
		/>
	)
}
