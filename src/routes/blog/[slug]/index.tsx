import { component$ } from '@builder.io/qwik'
import type { DocumentHead } from '@builder.io/qwik-city'
import { useLocation } from '@builder.io/qwik-city'
import { ButtonLink } from '~/components/ui/ButtonLink'
import { Footer } from '~/components/footer/Footer'
import { PageShell } from '~/components/layout/PageShell'
import { Header } from '~/components/nav/Header'
import { Container } from '~/components/ui/Container'
import { Section } from '~/components/ui/Section'
import { TextLink } from '~/components/ui/TextLink'
import {
  formatBlogDate,
  getBlogSideLabel,
  getPublishedBlogPostBySlug,
} from '~/content/blog/posts'
import { buildTitle } from '~/fns/seo'

export const head: DocumentHead = ({ params }) => {
  const post = getPublishedBlogPostBySlug(params.slug)

  if (!post) {
    return {
      title: buildTitle('Blog Post'),
      meta: [
        {
          name: 'description',
          content: 'Writing by Alden Gillespy across engineering and production practice.',
        },
      ],
    }
  }

  return {
    title: buildTitle(post.title),
    meta: [
      {
        name: 'description',
        content: post.summary,
      },
    ],
  }
}

export default component$(() => {
  const location = useLocation()
  const post = getPublishedBlogPostBySlug(location.params.slug)

  if (!post) {
    return (
      <PageShell theme="neutral">
        <Header />

        <main id="main-content" class="flex-1">
          <Section spacing="spacious">
            <Container width="content">
              <div class="flex flex-col gap-4 md:gap-5">
                <p class="text-sm font-medium uppercase tracking-[0.12em] text-[var(--muted)]">
                  Blog
                </p>
                <h1 class="text-4xl font-semibold leading-tight tracking-tight md:text-5xl">
                  Post not found
                </h1>
                <p class="max-w-[62ch] text-base leading-7 text-[var(--muted)] md:text-lg">
                  The requested post could not be found or is not published yet.
                </p>
                <div>
                  <TextLink href="/blog" label="Back to blog" />
                </div>
              </div>
            </Container>
          </Section>
        </main>

        <Footer />
      </PageShell>
    )
  }

  return (
    <PageShell theme="neutral">
      <Header />

      <main id="main-content" class="flex-1">
        <Section spacing="spacious">
          <Container width="content">
            <div class="flex flex-col gap-4 md:gap-5">
              <div>
                <TextLink href="/blog" label="Back to blog" />
              </div>

              <div class="flex flex-wrap items-center gap-2 text-xs font-medium uppercase tracking-[0.12em] text-[var(--muted)]">
                <span class="rounded-[var(--radius-pill)] border border-[var(--border)] bg-[var(--surface-subtle)] px-2.5 py-1">
                  {getBlogSideLabel(post.side)}
                </span>
                <span>{formatBlogDate(post.date)}</span>
              </div>

              <h1 class="max-w-[16ch] text-4xl font-semibold leading-tight tracking-tight md:text-5xl">
                {post.title}
              </h1>

              <p class="max-w-[65ch] text-base leading-7 text-[var(--muted)] md:text-lg">
                {post.summary}
              </p>
            </div>
          </Container>
        </Section>

        {post.sections.map((section, index) => (
          <Section key={section.title} spacing={index === 0 ? 'compact' : 'default'}>
            <Container width="content">
              <div class="flex flex-col gap-4 md:gap-5">
                <h2 class="text-2xl font-semibold tracking-tight md:text-3xl">
                  {section.title}
                </h2>

                <div class="flex flex-col gap-4 md:gap-5">
                  {section.paragraphs.map((paragraph) => (
                    <p
                      key={paragraph}
                      class="max-w-[65ch] text-base leading-7 text-[var(--muted)] md:text-lg"
                    >
                      {paragraph}
                    </p>
                  ))}
                </div>
              </div>
            </Container>
          </Section>
        ))}

        <Section spacing="compact" surface="subtle">
          <Container width="content">
            <section class="flex flex-col gap-4 rounded-[var(--radius-xl)] border border-[var(--border)] bg-[var(--surface)] p-6 md:gap-5 md:p-8">
              <p class="text-sm font-medium uppercase tracking-[0.12em] text-[var(--muted)]">
                Next
              </p>

              <h2 class="text-2xl font-semibold tracking-tight md:text-3xl">
                Follow the writing back into the work.
              </h2>

              <p class="max-w-[62ch] text-base leading-7 text-[var(--muted)] md:text-lg">
                The essays live here to clarify the thinking behind the projects. Browse more notes,
                move into case studies, or start a conversation if the work overlaps with what you
                are building.
              </p>

              <div class="ui-cta-group flex-col items-stretch gap-3 sm:flex-row sm:items-start sm:gap-2">
                <ButtonLink
                  href="/blog"
                  label="Browse More Writing"
                  variant="primary"
                  class="w-full sm:w-auto"
                />
                <ButtonLink
                  href="/contact"
                  label="Start a Conversation"
                  variant="secondary"
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