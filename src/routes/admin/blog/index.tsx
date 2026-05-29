import { component$ } from '@builder.io/qwik'
import { routeLoader$, type DocumentHead } from '@builder.io/qwik-city'
import { PageShell } from '~/components/layout/PageShell'
import { Container } from '~/components/ui/Container'
import { Section } from '~/components/ui/Section'
import { ButtonLink } from '~/components/ui/ButtonLink'
import { getAdminBlogPosts } from '~/lib/blog/admin/getAdminBlogPosts'

export const head: DocumentHead = {
  title: 'Admin | Blog',
  meta: [
    {
      name: 'description',
      content: 'Private blog admin routes for launch authoring.',
    },
    {
      name: 'robots',
      content: 'noindex, nofollow',
    },
  ],
}

const authoringScope = [
  'Create post',
  'Edit post',
  'Draft or publish toggle',
] as const

export const useAdminBlogPosts = routeLoader$(async () => {
  return getAdminBlogPosts()
})

export default component$(() => {
  const posts = useAdminBlogPosts()

  return (
    <PageShell theme="neutral">
      <main id="main-content" class="flex-1 scroll-mt-24">
        <Section spacing="spacious">
          <Container width="content">
            <div class="flex flex-col gap-8 rounded-[var(--radius-2xl)] border border-[var(--border)] bg-[var(--surface)] p-6 md:p-8">
              <div class="flex flex-col gap-3">
                <p class="ui-meta-label">
                  Blog Admin
                </p>

                <h1 class="text-4xl font-semibold tracking-tight leading-tight md:text-5xl">
                  Launch-only blog authoring surface.
                </h1>

                <p class="max-w-[66ch] text-base leading-7 text-[var(--muted)] md:text-lg">
                  The admin area stays intentionally constrained for launch timing. There are no
                  user accounts, OAuth flows, or CMS platform features here.
                </p>
              </div>

              <section class="flex flex-col gap-4 rounded-[var(--radius-xl)] border border-[var(--border)] bg-[var(--surface-subtle)] p-5 md:p-6">
                <h2 class="text-2xl font-semibold tracking-tight md:text-3xl">
                  Scope
                </h2>

                <ul class="flex flex-col gap-3 text-base leading-7 text-[var(--fg)]">
                  {authoringScope.map((item) => (
                    <li key={item} class="border-t border-[var(--border)] pt-3 first:border-t-0 first:pt-0">
                      {item}
                    </li>
                  ))}
                </ul>
              </section>

              <section class="flex flex-col gap-4 rounded-[var(--radius-xl)] border border-[var(--border)] bg-[var(--surface-subtle)] p-5 md:p-6">
                <div class="flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
                  <div class="flex flex-col gap-2">
                    <h2 class="text-2xl font-semibold tracking-tight md:text-3xl">
                      Posts
                    </h2>

                    <p class="text-base leading-7 text-[var(--muted)]">
                      Draft and published posts are both visible here. Public routes still show published posts only.
                    </p>
                  </div>

                  <ButtonLink href="/admin/blog/new" label="New Post" variant="primary" class="w-full md:w-auto" />
                </div>

                <div class="flex flex-col gap-3">
                  {posts.value.length === 0 && (
                    <div class="rounded-[var(--radius-lg)] border border-dashed border-[var(--border)] bg-[var(--surface)] p-5 text-base leading-7 text-[var(--muted)]">
                      No posts exist yet. Create the first record from the new-post route.
                    </div>
                  )}

                  {posts.value.map((post) => (
                    <article
                      key={post.id}
                      class="flex flex-col gap-4 rounded-[var(--radius-lg)] border border-[var(--border)] bg-[var(--surface)] p-5"
                    >
                      <div class="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
                        <div class="flex flex-col gap-2">
                          <h3 class="text-xl font-semibold tracking-tight">
                            {post.title}
                          </h3>

                          <p class="text-sm leading-6 text-[var(--muted)]">
                            /{post.slug}
                          </p>
                        </div>

                        <div class="flex items-center gap-2">
                          <span class="rounded-full border border-[var(--border)] px-3 py-1 text-xs font-semibold uppercase tracking-[0.12em] text-[var(--muted)]">
                            {post.status}
                          </span>
                          <a
                            href={`/admin/blog/${post.id}`}
                            class="rounded-full border border-[var(--border)] px-3 py-1 text-xs font-semibold uppercase tracking-[0.12em] text-[var(--fg)] transition-colors hover:bg-[var(--surface-base)]"
                          >
                            Edit
                          </a>
                        </div>
                      </div>

                      <p class="text-base leading-7 text-[var(--muted)]">
                        {post.summary}
                      </p>

                      <div class="flex flex-col gap-1 text-sm leading-6 text-[var(--muted)] md:flex-row md:flex-wrap md:gap-x-6">
                        <span>Side: {post.side}</span>
                        <span>Updated: {post.updatedAt ?? 'Never'}</span>
                        <span>Published: {post.publishedAt ?? 'Draft only'}</span>
                      </div>
                    </article>
                  ))}
                </div>
              </section>

              <div class="ui-cta-group flex-col items-stretch gap-3 sm:flex-row sm:items-start sm:gap-2">
                <ButtonLink href="/admin/blog/new" label="New Post Route" variant="primary" class="w-full sm:w-auto" />
                <ButtonLink href="/admin" label="Back to Admin" variant="ghost" class="w-full sm:w-auto" />
              </div>
            </div>
          </Container>
        </Section>
      </main>
    </PageShell>
  )
})
