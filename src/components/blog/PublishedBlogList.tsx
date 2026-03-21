import { component$ } from '@builder.io/qwik'
import { BlogListItem } from '~/components/blog/BlogListItem'
import { Container } from '~/components/ui/Container'
import { Section } from '~/components/ui/Section'
import { blogPageContent } from '~/content/blog'
import { type PublishedBlogListItem } from '~/lib/blog/presentation'

/**
 * Below-the-fold section: Published blog posts list
 * Deferred load on /blog route
 */
export const PublishedBlogList = component$(({ posts }: PublishedBlogListProps) => {
  return (
    <Section spacing="compact">
      <Container width="wide">
        <section
          class="grid gap-6 lg:grid-cols-[minmax(0,14rem)_minmax(0,1fr)] lg:gap-10"
          aria-labelledby="blog-published"
        >
          <div class="flex flex-col gap-2">
            <h2 id="blog-published" class="text-2xl font-semibold tracking-tight md:text-3xl">
              {blogPageContent.published.heading}
            </h2>

            <p class="max-w-[28ch] text-sm leading-6 text-[var(--muted)] md:text-base">
              {blogPageContent.published.intro}
            </p>
          </div>

          <ul class="flex flex-col gap-6 md:gap-8" role="list">
            {posts.map((post) => (
              <li key={post.slug}>
                <BlogListItem post={post} />
              </li>
            ))}
          </ul>
        </section>
      </Container>
    </Section>
  )
})

type PublishedBlogListProps = {
  posts: PublishedBlogListItem[]
}
