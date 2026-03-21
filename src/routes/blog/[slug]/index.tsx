import { component$ } from '@builder.io/qwik'
import { routeLoader$, type DocumentHead, type DocumentHeadProps } from '@builder.io/qwik-city'
import { ButtonLink } from '~/components/ui/ButtonLink'
import { Footer } from '~/components/footer/Footer'
import { PageShell } from '~/components/layout/PageShell'
import { Header } from '~/components/nav/Header'
import { Container } from '~/components/ui/Container'
import { Section } from '~/components/ui/Section'
import { TextLink } from '~/components/ui/TextLink'
import { buildBlogArticleSEOInput, blogArticleSeoFallback } from '~/config/seo'
import { buildBlogArticleStructuredDataInput } from '~/config/structured-data'
import { buildMetadata } from '~/fns/seo/buildMetadata'
import { buildArticleStructuredData } from '~/fns/seo/buildStructuredData'
import { metadataToDocumentHead } from '~/fns/seo/metadataToDocumentHead'
import { getBlogPostBySlug } from '~/lib/blog/getBlogPostBySlug'
import { renderMarkdownHtml } from '~/lib/blog/markdown'
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

export const useBlogPost = routeLoader$(async ({ params, status }) => {
  const post = await getBlogPostBySlug(params.slug)

  if (!post) {
    status(404)
  }

  return post
})

export const head = (({ resolveValue, params }: DocumentHeadProps) => {
  const post = resolveValue(useBlogPost)

  if (!post) {
    return toHeadValue(
      buildMetadata({
        ...blogArticleSeoFallback,
        pathname: `/blog/${params.slug}`,
      })
    )
  }

  const metadata = buildMetadata(buildBlogArticleSEOInput(post))

  const articleSchema = buildArticleStructuredData(
    buildBlogArticleStructuredDataInput(post, metadata.image.url)
  )

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

  const bodyHtml = renderMarkdownHtml(post.value.bodyMarkdown)

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

              {post.value.coverImageUrl && (
                <img
                  src={post.value.coverImageUrl}
                  alt={post.value.coverImageAlt || post.value.title}
                  class="w-full rounded-[var(--radius-lg)] border border-[var(--border)] object-cover"
                  width={896}
                  height={448}
                />
              )}
            </div>
          </Container>
        </Section>

        <Section spacing="compact">
          <Container width="content">
            <article
              class="blog-post-body max-w-none text-base leading-7 text-[var(--muted)] md:text-lg
                [&_h1]:mt-8 [&_h1]:text-3xl [&_h1]:font-semibold [&_h1]:leading-tight [&_h1]:tracking-tight
                [&_h2]:mt-7 [&_h2]:text-2xl [&_h2]:font-semibold [&_h2]:leading-tight [&_h2]:tracking-tight
                [&_h3]:mt-6 [&_h3]:text-xl [&_h3]:font-semibold [&_h3]:leading-tight
                [&_p]:mb-4 [&_p]:max-w-[65ch] [&_p]:whitespace-pre-wrap
                [&_ul]:mb-5 [&_ul]:ml-6 [&_ul]:max-w-[65ch] [&_ul]:list-disc
                [&_ol]:mb-5 [&_ol]:ml-6 [&_ol]:max-w-[65ch] [&_ol]:list-decimal
                [&_li]:mb-2
                [&_blockquote]:my-5 [&_blockquote]:border-l-2 [&_blockquote]:border-[var(--border)] [&_blockquote]:pl-4 [&_blockquote]:italic
                [&_a]:underline [&_a]:decoration-[var(--border-strong)] [&_a]:underline-offset-4
                [&_code]:rounded [&_code]:bg-[var(--surface-subtle)] [&_code]:px-1.5 [&_code]:py-0.5 [&_code]:font-mono [&_code]:text-[0.9em]
                [&_pre]:my-5 [&_pre]:overflow-x-auto [&_pre]:rounded-[var(--radius-lg)] [&_pre]:border [&_pre]:border-[var(--border)] [&_pre]:bg-[var(--surface-subtle)] [&_pre]:p-4
                [&_pre_code]:bg-transparent [&_pre_code]:p-0"
              dangerouslySetInnerHTML={bodyHtml}
            >
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