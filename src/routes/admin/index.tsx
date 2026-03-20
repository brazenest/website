import { component$ } from '@builder.io/qwik'
import type { DocumentHead } from '@builder.io/qwik-city'
import { PageShell } from '~/components/layout/PageShell'
import { Container } from '~/components/ui/Container'
import { Section } from '~/components/ui/Section'
import { ButtonLink } from '~/components/ui/ButtonLink'

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

export default component$(() => {
  return (
    <PageShell theme="neutral">
      <main id="main-content" class="flex-1 scroll-mt-24">
        <Section spacing="spacious">
          <Container width="content">
            <div class="flex flex-col gap-6 rounded-[var(--radius-2xl)] border border-[var(--border)] bg-[var(--surface)] p-6 md:p-8">
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

              <div class="ui-cta-group flex-col items-stretch gap-3 sm:flex-row sm:items-start sm:gap-2">
                <ButtonLink href="/admin/blog" label="Go to Blog Admin" variant="primary" class="w-full sm:w-auto" />
                <ButtonLink href="/blog" label="View Public Blog" variant="ghost" class="w-full sm:w-auto" />
              </div>
            </div>
          </Container>
        </Section>
      </main>
    </PageShell>
  )
})
