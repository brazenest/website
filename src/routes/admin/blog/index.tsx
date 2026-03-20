import { component$ } from '@builder.io/qwik'
import type { DocumentHead } from '@builder.io/qwik-city'
import { PageShell } from '~/components/layout/PageShell'
import { Container } from '~/components/ui/Container'
import { Section } from '~/components/ui/Section'
import { ButtonLink } from '~/components/ui/ButtonLink'

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

export default component$(() => {
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

              <div class="ui-cta-group flex-col items-stretch gap-3 sm:flex-row sm:items-start sm:gap-2">
                <ButtonLink href="/admin/blog/new" label="New Post Route" variant="primary" class="w-full sm:w-auto" />
                <ButtonLink href="/admin/blog/example-post-id" label="Edit Route Example" variant="secondary" class="w-full sm:w-auto" />
                <ButtonLink href="/admin" label="Back to Admin" variant="ghost" class="w-full sm:w-auto" />
              </div>
            </div>
          </Container>
        </Section>
      </main>
    </PageShell>
  )
})
