import { component$ } from '@builder.io/qwik'
import { Container } from '~/components/ui/Container'
import { Section } from '~/components/ui/Section'
import { blogPageContent } from '~/content/blog'
import { formatBlogDate, getBlogSideLabel } from '~/lib/blog/presentation'

/**
 * Below-the-fold section: Draft blog posts list
 * Deferred load on /blog route
 */
export const DraftBlogList = component$(() => {
  return (
    <Section spacing="compact" surface="subtle">
      <Container width="wide">
        <section
          class="grid gap-6 lg:grid-cols-[minmax(0,14rem)_minmax(0,1fr)] lg:gap-10"
          aria-labelledby="blog-drafts"
        >
          <div class="flex flex-col gap-2">
            <h2 id="blog-drafts" class="text-2xl font-semibold tracking-tight md:text-3xl">
              {blogPageContent.drafts.heading}
            </h2>

            <p class="max-w-[28ch] text-sm leading-6 text-[var(--muted)] md:text-base">
              {blogPageContent.drafts.intro}
            </p>
          </div>

          <ul class="grid gap-4 md:grid-cols-2">
            {blogPageContent.drafts.items.map((post) => (
              <li key={post.slug}>
                <article
                  class="flex h-full flex-col gap-3 rounded-[var(--radius-xl)] border border-[var(--border)] bg-[var(--surface)] p-5"
                >
                  <div class="flex flex-wrap items-center gap-2 text-xs font-medium uppercase tracking-[0.12em] text-[var(--muted)]">
                    <span class="rounded-[var(--radius-pill)] border border-[var(--border)] bg-[var(--surface-subtle)] px-2.5 py-1">
                      Draft
                    </span>
                    <span>{getBlogSideLabel(post.side)}</span>
                  </div>

                  <div class="flex flex-col gap-1">
                    <h3 class="text-lg font-semibold tracking-tight md:text-xl">
                      {post.title}
                    </h3>

                    <p class="text-sm leading-6 text-[var(--muted)] md:text-base">
                      {formatBlogDate(post.date)}
                    </p>
                  </div>

                  <p class="text-base leading-7 text-[var(--muted)]">
                    {post.summary}
                  </p>
                </article>
              </li>
            ))}
          </ul>
        </section>
      </Container>
    </Section>
  )
})
