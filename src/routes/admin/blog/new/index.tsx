import { component$ } from '@builder.io/qwik'
import type { DocumentHead } from '@builder.io/qwik-city'
import { PageShell } from '~/components/layout/PageShell'
import { Container } from '~/components/ui/Container'
import { Section } from '~/components/ui/Section'
import { BLOG_POST_AUTHORING_FIELDS } from '~/types/content'

export const head: DocumentHead = {
  title: 'Admin | New Blog Post',
  meta: [
    {
      name: 'description',
      content: 'Private route for creating a blog post.',
    },
    {
      name: 'robots',
      content: 'noindex, nofollow',
    },
  ],
}

export default component$(() => {
  return (
    <PageShell theme="neutral">
      <main id="main-content" class="flex-1 scroll-mt-24">
        <Section spacing="spacious">
          <Container width="content">
            <div class="flex flex-col gap-8 rounded-[var(--radius-2xl)] border border-[var(--border)] bg-[var(--surface)] p-6 md:p-8">
              <div class="flex flex-col gap-3">
                <p class="ui-meta-label">
                  Create Post
                </p>

                <h1 class="text-4xl font-semibold tracking-tight leading-tight md:text-5xl">
                  New blog post contract.
                </h1>

                <p class="max-w-[66ch] text-base leading-7 text-[var(--muted)] md:text-lg">
                  This route is protected and reserved for the minimal `blog_posts` authoring form.
                  The launch contract is fixed to the fields below.
                </p>
              </div>

              <div class="grid gap-3 md:grid-cols-2">
                {BLOG_POST_AUTHORING_FIELDS.map((fieldName) => (
                  <div
                    key={fieldName}
                    class="rounded-[var(--radius-xl)] border border-[var(--border)] bg-[var(--surface-subtle)] px-4 py-3 text-sm font-medium tracking-[0.02em] text-[var(--fg)]"
                  >
                    {fieldName}
                  </div>
                ))}
              </div>
            </div>
          </Container>
        </Section>
      </main>
    </PageShell>
  )
})
