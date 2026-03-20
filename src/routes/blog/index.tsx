import { component$ } from '@builder.io/qwik'
import type { DocumentHead } from '@builder.io/qwik-city'
import { ButtonLink } from '~/components/ui/ButtonLink'
import { DraftBlogList } from '~/components/blog/DraftBlogList'
import { PublishedBlogList } from '~/components/blog/PublishedBlogList'
import { Footer } from '~/components/footer/Footer'
import { PageShell } from '~/components/layout/PageShell'
import { Header } from '~/components/nav/Header'
import { Container } from '~/components/ui/Container'
import { Section } from '~/components/ui/Section'
import { blogPageContent } from '~/content/blog'
import { staticHeads } from '~/fns/seo/staticHeads'

export const head: DocumentHead = staticHeads.blog

export default component$(() => {
  return (
    <PageShell theme="neutral">
      <Header />

      <main id="main-content" class="flex-1 scroll-mt-24">
        <Section spacing="spacious">
          <Container width="wide">
            <div class="grid gap-10 xl:grid-cols-[minmax(0,1fr)_minmax(18rem,24rem)] xl:gap-12">
              <div class="flex flex-col gap-4 md:gap-5">
                <p class="ui-meta-label">
                  {blogPageContent.eyebrow}
                </p>

                <h1 class="max-w-[18ch] text-4xl font-semibold leading-tight tracking-tight md:max-w-[20ch] md:text-5xl">
                  {blogPageContent.title}
                </h1>

                <p class="max-w-[72ch] text-base leading-7 text-[var(--muted)] md:text-lg">
                  {blogPageContent.intro}
                </p>

                <p class="max-w-[68ch] text-base leading-7 text-[var(--fg)] md:text-lg">
                  {blogPageContent.bridge}
                </p>
              </div>

              <aside class="flex flex-col gap-5 rounded-[var(--radius-xl)] border border-[var(--border)] bg-[var(--surface-subtle)] p-5 md:p-6">
                <div class="flex flex-col gap-2">
                  <h2 class="text-2xl font-semibold tracking-tight md:text-3xl">
                    {blogPageContent.positioning.heading}
                  </h2>

                  <p class="text-base leading-7 text-[var(--muted)]">
                    {blogPageContent.positioning.intro} <a href="/about" class="underline hover:no-underline">Learn more about the unified practice</a>.
                  </p>
                </div>

                <div class="flex flex-col gap-4">
                  {blogPageContent.positioning.items.map((item) => (
                    <article
                      key={item.title}
                      class="flex flex-col gap-2 border-t border-[var(--border)] pt-4 first:border-t-0 first:pt-0"
                    >
                      <h3 class="text-lg font-semibold tracking-tight md:text-xl">
                        {item.title}
                      </h3>

                      <p class="text-sm leading-6 text-[var(--muted)] md:text-base">
                        {item.description}
                      </p>
                    </article>
                  ))}
                </div>
              </aside>
            </div>
          </Container>
        </Section>

        {/* Below-the-fold content sections */}
        <PublishedBlogList />
        <DraftBlogList />

        <Section spacing="compact">
          <Container width="content">
            <section class="flex flex-col gap-4 rounded-[var(--radius-xl)] border border-[var(--border)] bg-[var(--surface)] p-6 md:gap-5 md:p-8">
              <p class="ui-meta-label">
                Next
              </p>

              <h2 class="text-2xl font-semibold tracking-tight md:text-3xl">
                Writing supports the project pages, not a separate content machine.
              </h2>

              <p class="max-w-[62ch] text-base leading-7 text-[var(--muted)] md:text-lg">
                If you want the applied work behind these notes, browse the case studies on either
                side. If you have a project or role in mind, the contact page is the right next step.
              </p>

              <div class="ui-cta-group flex-col items-stretch gap-3 sm:flex-row sm:items-start sm:gap-2">
                <ButtonLink
                  href="/engineering#selected-work"
                  label="Browse Engineering"
                  variant="primary"
                  class="w-full sm:w-auto"
                />
                <ButtonLink
                  href="/production#selected-work"
                  label="Browse Production"
                  variant="secondary"
                  class="w-full sm:w-auto"
                />
                <ButtonLink
                  href="/contact"
                  label="Start a Conversation"
                  variant="ghost"
                  class="w-full sm:w-auto"
                />
              </div>
            </section>
          </Container>
        </Section>
      </main>

      <Footer />
    </PageShell>
  )
})