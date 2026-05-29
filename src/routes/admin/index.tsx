import { component$ } from '@builder.io/qwik'
import { routeLoader$, type DocumentHead } from '@builder.io/qwik-city'
import { PageShell } from '~/components/layout/PageShell'
import { Container } from '~/components/ui/Container'
import { Section } from '~/components/ui/Section'
import { ButtonLink } from '~/components/ui/ButtonLink'
import { getAdminBlogPosts } from '~/lib/blog/admin/getAdminBlogPosts'

export const head: DocumentHead = {
  title: 'Admin',
  meta: [
    {
      name: 'description',
      content: 'Private admin entry for blog authoring.',
    },
    {
      name: 'robots',
      content: 'noindex, nofollow',
    },
  ],
}

export const useAdminOverview = routeLoader$(async () => {
  const posts = await getAdminBlogPosts()

  return {
    totalPosts: posts.length,
    draftPosts: posts.filter((post) => post.status === 'draft').length,
    publishedPosts: posts.filter((post) => post.status === 'published').length,
    recentPosts: posts.slice(0, 5),
  }
})

export default component$(() => {
  const overview = useAdminOverview()

  return (
    <PageShell theme="neutral">
      <main id="main-content" class="flex-1 scroll-mt-24">
        <Section spacing="spacious">
          <Container width="content">
            <div class="flex flex-col gap-8 rounded-[var(--radius-2xl)] border border-[var(--border)] bg-[var(--surface)] p-6 md:p-8">
              <div class="flex flex-col gap-3">
                <p class="ui-meta-label">
                  Private Admin
                </p>

                <h1 class="text-4xl font-semibold tracking-tight leading-tight md:text-5xl">
                  Minimal launch authoring area.
                </h1>

                <p class="max-w-[64ch] text-base leading-7 text-[var(--muted)] md:text-lg">
                  This surface is intentionally small for v3.0.0. It exists only for blog authoring
                  and is protected at the server layer with HTTP Basic Auth.
                </p>
              </div>

              <div class="grid gap-4 md:grid-cols-3">
                <article class="rounded-[var(--radius-xl)] border border-[var(--border)] bg-[var(--surface-subtle)] p-5">
                  <p class="text-sm uppercase tracking-[0.14em] text-[var(--muted)]">Total posts</p>
                  <p class="mt-2 text-3xl font-semibold tracking-tight">{overview.value.totalPosts}</p>
                </article>

                <article class="rounded-[var(--radius-xl)] border border-[var(--border)] bg-[var(--surface-subtle)] p-5">
                  <p class="text-sm uppercase tracking-[0.14em] text-[var(--muted)]">Drafts</p>
                  <p class="mt-2 text-3xl font-semibold tracking-tight">{overview.value.draftPosts}</p>
                </article>

                <article class="rounded-[var(--radius-xl)] border border-[var(--border)] bg-[var(--surface-subtle)] p-5">
                  <p class="text-sm uppercase tracking-[0.14em] text-[var(--muted)]">Published</p>
                  <p class="mt-2 text-3xl font-semibold tracking-tight">{overview.value.publishedPosts}</p>
                </article>
              </div>

              <section class="flex flex-col gap-4 rounded-[var(--radius-xl)] border border-[var(--border)] bg-[var(--surface-subtle)] p-5 md:p-6">
                <div class="flex flex-col gap-2">
                  <h2 class="text-2xl font-semibold tracking-tight md:text-3xl">Recent blog records</h2>
                  <p class="text-base leading-7 text-[var(--muted)]">
                    The admin area is limited to listing, creating, and editing blog posts for launch.
                  </p>
                </div>

                <div class="flex flex-col gap-3">
                  {overview.value.recentPosts.map((post) => (
                    <a
                      key={post.id}
                      href={`/admin/blog/${post.id}`}
                      class="flex flex-col gap-2 rounded-[var(--radius-lg)] border border-[var(--border)] bg-[var(--surface)] p-4 transition-colors hover:bg-[var(--surface-base)]"
                    >
                      <div class="flex items-center justify-between gap-3">
                        <h3 class="text-lg font-semibold tracking-tight">{post.title}</h3>
                        <span class="rounded-full border border-[var(--border)] px-3 py-1 text-xs font-semibold uppercase tracking-[0.12em] text-[var(--muted)]">
                          {post.status}
                        </span>
                      </div>

                      <p class="text-sm leading-6 text-[var(--muted)]">/{post.slug}</p>
                    </a>
                  ))}
                </div>
              </section>

              <div class="ui-cta-group flex-col items-stretch gap-3 sm:flex-row sm:items-start sm:gap-2">
                <ButtonLink href="/admin/blog" label="Go to Blog Admin" variant="primary" class="w-full sm:w-auto" />
                <ButtonLink href="/admin/blog/new" label="Create New Post" variant="secondary" class="w-full sm:w-auto" />
                <ButtonLink href="/blog" label="View Public Blog" variant="ghost" class="w-full sm:w-auto" />
              </div>
            </div>
          </Container>
        </Section>
      </main>
    </PageShell>
  )
})
