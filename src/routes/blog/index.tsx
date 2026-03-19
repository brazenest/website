import { component$ } from '@builder.io/qwik'
import type { DocumentHead } from '@builder.io/qwik-city'
import { ButtonLink } from '~/components/ui/ButtonLink'
import { Footer } from '~/components/footer/Footer'
import { PageShell } from '~/components/layout/PageShell'
import { Header } from '~/components/nav/Header'
import { Container } from '~/components/ui/Container'
import { Section } from '~/components/ui/Section'
import { TextLink } from '~/components/ui/TextLink'
import { blogPageContent } from '~/content/blog'
import {
  draftBlogPosts,
  formatBlogDate,
  getBlogSideLabel,
  publishedBlogPosts,
} from '~/content/blog/posts'
import { buildMetadata } from '~/fns/seo/buildMetadata'
import { metadataToDocumentHead } from '~/fns/seo/metadataToDocumentHead'
import { seoPresets } from '~/config/seo'

export const head: DocumentHead = metadataToDocumentHead(
  buildMetadata({
    ...seoPresets.blog,
    pathname: '/blog',
  })
)

export default component$(() => {
  return (
    <PageShell theme="neutral">
      <Header />

      <main id="main-content" class="flex-1 scroll-mt-24">
        <Section spacing="spacious">
          <Container width="wide">
            <div class="grid gap-10 xl:grid-cols-[minmax(0,1fr)_minmax(18rem,24rem)] xl:gap-12">
              <div class="flex flex-col gap-4 md:gap-5">
                <p class="text-sm font-medium uppercase tracking-[0.12em] text-[var(--muted)]">
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
                {publishedBlogPosts.map((post) => (
                  <li key={post.slug}>
                    <article
                      class="grid gap-4 border-t border-[var(--border)] pt-6 first:border-t-0 first:pt-0 md:grid-cols-[minmax(11rem,13rem)_minmax(0,1fr)] md:gap-8"
                    >
                      <div class="flex flex-col gap-2">
                        <p class="text-xs font-medium uppercase tracking-[0.12em] text-[var(--muted)]">
                          {getBlogSideLabel(post.side)}
                        </p>

                        <p class="text-sm leading-6 text-[var(--muted)] md:text-base">
                          {formatBlogDate(post.date)}
                        </p>
                      </div>

                      <div class="flex flex-col gap-3">
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
                {draftBlogPosts.map((post) => (
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

        <Section spacing="compact">
          <Container width="content">
            <section class="flex flex-col gap-4 rounded-[var(--radius-xl)] border border-[var(--border)] bg-[var(--surface)] p-6 md:gap-5 md:p-8">
              <p class="text-sm font-medium uppercase tracking-[0.12em] text-[var(--muted)]">
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