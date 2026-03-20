import { component$ } from '@builder.io/qwik'
import { Container } from '~/components/ui/Container'
import { Section } from '~/components/ui/Section'
import { TextLink } from '~/components/ui/TextLink'
import { blogPageContent } from '~/content/blog'
import { formatBlogDate, getBlogSideLabel, type PublishedBlogListItem } from '~/lib/blog/presentation'

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

          <ul class="flex flex-col gap-6 md:gap-8">
            {posts.map((post) => (
              <li key={post.slug}>
                <article
                  class="grid gap-4 border-t border-[var(--border)] pt-6 first:border-t-0 first:pt-0 md:grid-cols-[minmax(11rem,13rem)_minmax(0,1fr)] md:gap-8"
                >
                  <div class="flex flex-col gap-2">
                    <p class="text-xs font-medium uppercase tracking-[0.12em] text-[var(--muted)]">
                      {getBlogSideLabel(post.side)}
                    </p>

                    <p class="text-sm leading-6 text-[var(--muted)] md:text-base">
                      {formatBlogDate(post.publishedDate)}
                    </p>
                  </div>

                  <div class="flex flex-col gap-3">
                    {post.coverImageUrl && (
                      <img
                        src={post.coverImageUrl}
                        alt={post.coverImageAlt || post.title}
                        class="w-full rounded-[var(--radius-lg)] border border-[var(--border)] object-cover"
                        width={672}
                        height={336}
                      />
                    )}

                    <h3 class="text-xl font-semibold tracking-tight md:text-2xl">
                      {post.title}
                    </h3>

                    <p class="max-w-[68ch] text-base leading-7 text-[var(--muted)] md:text-lg">
                      {post.summary}
                    </p>

                    <div>
                      <TextLink href={`/blog/${post.slug}`} label={`Read: ${post.title}`} />
                    </div>
                  </div>
                </article>
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
