import { component$ } from '@builder.io/qwik'
import { routeLoader$, type DocumentHead } from '@builder.io/qwik-city'
import { PageShell } from '~/components/layout/PageShell'
import { Container } from '~/components/ui/Container'
import { Section } from '~/components/ui/Section'

export const head: DocumentHead = {
  title: 'Admin | Edit Blog Post',
  meta: [
    {
      name: 'description',
      content: 'Private route for editing a blog post.',
    },
    {
      name: 'robots',
      content: 'noindex, nofollow',
    },
  ],
}

export const useAdminBlogPostId = routeLoader$(({ params }) => {
  return params.id
})

export default component$(() => {
  const postId = useAdminBlogPostId()

  return (
    <PageShell theme="neutral">
      <main id="main-content" class="flex-1 scroll-mt-24">
        <Section spacing="spacious">
          <Container width="content">
            <div class="flex flex-col gap-8 rounded-[var(--radius-2xl)] border border-[var(--border)] bg-[var(--surface)] p-6 md:p-8">
              <div class="flex flex-col gap-3">
                <p class="ui-meta-label">
                  Edit Post
                </p>

                <h1 class="text-4xl font-semibold tracking-tight leading-tight md:text-5xl">
                  Protected edit route.
                </h1>

                <p class="max-w-[66ch] text-base leading-7 text-[var(--muted)] md:text-lg">
                  This route is bound to `blog_posts.id` so post edits stay on the server-backed
                  record model already in use for public blog rendering.
                </p>
              </div>

              <div class="rounded-[var(--radius-xl)] border border-[var(--border)] bg-[var(--surface-subtle)] p-5 md:p-6">
                <p class="text-sm uppercase tracking-[0.14em] text-[var(--muted)]">
                  Route parameter
                </p>

                <p class="mt-2 text-xl font-semibold tracking-tight md:text-2xl">
                  {postId.value}
                </p>
              </div>
            </div>
          </Container>
        </Section>
      </main>
    </PageShell>
  )
})
