import { component$ } from '@builder.io/qwik'
import { routeLoader$, type DocumentHead, type DocumentHeadProps } from '@builder.io/qwik-city'
import { ButtonLink } from '~/components/ui/ButtonLink'
import { Footer } from '~/components/footer/Footer'
import { PageShell } from '~/components/layout/PageShell'
import { Header } from '~/components/nav/Header'
import { Container } from '~/components/ui/Container'
import { Section } from '~/components/ui/Section'
import { TextLink } from '~/components/ui/TextLink'
import { buildMetadata } from '~/fns/seo/buildMetadata'
import { buildArticleStructuredData } from '~/fns/seo/buildStructuredData'
import { metadataToDocumentHead } from '~/fns/seo/metadataToDocumentHead'
import { getBlogPostBySlug } from '~/lib/blog/getBlogPostBySlug'
import { getMarkdownParagraphs } from '~/lib/blog/markdown'
import { formatBlogDate, getBlogSideLabel } from '~/lib/blog/presentation'

function toHeadValue(metadata: ReturnType<typeof buildMetadata>) {
  const documentHead = metadataToDocumentHead(metadata) as {
    title?: string
    meta?: any[]
    links?: any[]
  }

  return {
    title: documentHead.title,
    meta: documentHead.meta,
    links: documentHead.links,
  }
}

export const useBlogPost = routeLoader$(async ({ params }) => {
  return getBlogPostBySlug(params.slug)
})

export const head = (({ resolveValue, params }: DocumentHeadProps) => {
  const post = resolveValue(useBlogPost)

  if (!post) {
    return toHeadValue(
      buildMetadata({
        title: 'Blog Post',
        description: 'Writing by Alden Gillespy across engineering and production practice.',
        pathname: `/blog/${params.slug}`,
      })
    )
  }

  const metadata = buildMetadata({
    title: post.title,
    description: post.summary,
    pathname: `/blog/${params.slug}`,
    type: 'article',
    image: post.coverImageUrl
      ? {
        url: post.coverImageUrl,
        ...(post.coverImageAlt ? { alt: post.coverImageAlt } : {}),
      }
      : undefined,
    publishedTime: post.publishedAt ?? undefined,
    modifiedTime: post.updatedAt ?? undefined,
  })

  const articleSchema = buildArticleStructuredData({
    title: post.title,
    description: post.summary,
    url: `/blog/${params.slug}`,
    image: post.coverImageUrl ?? undefined,
    datePublished: post.publishedAt ?? post.createdAt,
    dateModified: post.updatedAt ?? undefined,
    keywords: post.side ? [post.side] : undefined,
    articleBody: post.bodyMarkdown,
  })

  const documentHead = toHeadValue(metadata)

  return {
    ...documentHead,
    scripts: [
      {
        props: {
          type: 'application/ld+json',
        },
        script: JSON.stringify(articleSchema),
      },
    ],
  }
}) satisfies DocumentHead

export default component$(() => {
  const post = useBlogPost()

  if (!post.value) {
    return (
      <PageShell theme="neutral">
        <Header />

        <main id="main-content" class="flex-1">
          <Section spacing="spacious">
            <Container width="content">
              <div class="flex flex-col gap-4 md:gap-5">
                <p class="ui-meta-label">
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

  const bodyParagraphs = getMarkdownParagraphs(post.value.bodyMarkdown)

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
                  {getBlogSideLabel(post.value.side)}
                </span>
                <span>{formatBlogDate(post.value.publishedAt ?? post.value.createdAt)}</span>
              </div>

              <h1 class="max-w-[16ch] text-4xl font-semibold leading-tight tracking-tight md:text-5xl">
                {post.value.title}
              </h1>

              <p class="max-w-[65ch] text-base leading-7 text-[var(--muted)] md:text-lg">
                {post.value.summary}
              </p>
            </div>
          </Container>
        </Section>

        <Section spacing="compact">
          <Container width="content">
            <article class="flex flex-col gap-4 md:gap-5">
              {bodyParagraphs.map((paragraph) => (
                <p key={paragraph} class="max-w-[65ch] whitespace-pre-wrap text-base leading-7 text-[var(--muted)] md:text-lg">
                  {paragraph}
                </p>
              ))}
            </article>
          </Container>
        </Section>

        <Section spacing="compact" surface="subtle">
          <Container width="content">
            <section class="flex flex-col gap-4 rounded-[var(--radius-xl)] border border-[var(--border)] bg-[var(--surface)] p-6 md:gap-5 md:p-8">
              <p class="ui-meta-label">
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