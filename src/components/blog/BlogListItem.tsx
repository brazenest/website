import { component$ } from '@builder.io/qwik'
import { formatBlogDate, getBlogSideLabel, type PublishedBlogListItem } from '~/lib/blog/presentation'

export const BlogListItem = component$(({ post }: BlogListItemProps) => {
  return (
    <article class="border-t border-[var(--border)] pt-6 first:border-t-0 first:pt-0 md:pt-8">
      <a
        href={`/blog/${post.slug}`}
        class="group flex flex-col gap-4 rounded-[var(--radius-xl)] border border-[var(--border)] bg-[var(--surface)] px-0 py-0 transition-[background-color,border-color,color,transform] duration-[var(--motion-duration-quick)] ease-[var(--motion-easing-quick)] outline-none focus-visible:border-[var(--accent)] focus-visible:bg-[var(--accent-soft)] focus-visible:ring-2 focus-visible:ring-[var(--focus-ring-color)] focus-visible:ring-offset-[var(--state-focus-ring-offset)] hover:border-[var(--border-interactive-hover)] hover:bg-[var(--surface-subtle)] md:grid md:grid-cols-[minmax(11rem,13rem)_minmax(0,1fr)] md:gap-8"
      >
        <div class="flex flex-col gap-2 px-4 pt-4 md:px-5 md:py-5">
          <p class="text-xs font-medium uppercase tracking-[0.12em] text-[var(--muted)]">
            {getBlogSideLabel(post.side)}
          </p>

          <p class="text-sm leading-6 text-[var(--muted)] md:text-base">
            {formatBlogDate(post.publishedDate)}
          </p>
        </div>

        <div class="flex flex-col gap-3 px-4 pb-4 md:px-5 md:py-5">
          {post.coverImageUrl && (
            <img
              src={post.coverImageUrl}
              alt={post.coverImageAlt || post.title}
              class="w-full rounded-[var(--radius-lg)] border border-[var(--border)] object-cover"
              width={672}
              height={336}
            />
          )}

          <h3 class="text-xl font-semibold tracking-tight text-[var(--text-strong)] transition-colors duration-[var(--motion-duration-quick)] ease-[var(--motion-easing-quick)] group-hover:text-[var(--accent)] md:text-2xl">
            {post.title}
          </h3>

          <p class="max-w-[66ch] text-base leading-7 text-[var(--muted)] md:text-lg">
            {post.summary}
          </p>

          <p class="text-sm font-medium tracking-[0.01em] text-[var(--text-strong)] transition-colors duration-[var(--motion-duration-quick)] ease-[var(--motion-easing-quick)] group-hover:text-[var(--accent)] md:text-base">
            Read article
          </p>
        </div>
      </a>
    </article>
  )
})

type BlogListItemProps = {
  post: PublishedBlogListItem
}