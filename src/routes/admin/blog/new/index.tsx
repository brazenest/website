import { component$ } from '@builder.io/qwik'
import { Form, routeAction$, type DocumentHead } from '@builder.io/qwik-city'
import { PageShell } from '~/components/layout/PageShell'
import { Container } from '~/components/ui/Container'
import { Section } from '~/components/ui/Section'
import { createBlogPost } from '~/lib/blog/admin/createBlogPost'
import type { BlogPostSide, BlogPostStatus, CreateBlogPostInput } from '~/types/content'

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

type CreateBlogPostFormValues = {
  title: string
  slug: string
  summary: string
  bodyMarkdown: string
  side: BlogPostSide
  status: BlogPostStatus
  publishedAt: string
  coverImageUrl: string
  coverImageAlt: string
}

type CreateBlogPostActionResult = {
  success: false
  formError?: string
  fieldErrors: Partial<Record<keyof CreateBlogPostFormValues, string>>
  values: CreateBlogPostFormValues
}

const DEFAULT_FORM_VALUES: CreateBlogPostFormValues = {
  title: '',
  slug: '',
  summary: '',
  bodyMarkdown: '',
  side: 'engineering',
  status: 'draft',
  publishedAt: '',
  coverImageUrl: '',
  coverImageAlt: '',
}

const SIDE_OPTIONS: BlogPostSide[] = ['engineering', 'production', 'bridge']
const STATUS_OPTIONS: BlogPostStatus[] = ['draft', 'published']

function normalizeFormValue(value: FormDataEntryValue | null): string {
  return typeof value === 'string' ? value.trim() : ''
}

function isBlogPostSide(value: string): value is BlogPostSide {
  return SIDE_OPTIONS.includes(value as BlogPostSide)
}

function isBlogPostStatus(value: string): value is BlogPostStatus {
  return STATUS_OPTIONS.includes(value as BlogPostStatus)
}

function isValidIsoDate(value: string): boolean {
  return !Number.isNaN(new Date(value).getTime())
}

function parseCreateBlogPostInput(formData: FormData): CreateBlogPostActionResult | { input: CreateBlogPostInput } {
  const rawStatus = normalizeFormValue(formData.get('status'))
  const rawSide = normalizeFormValue(formData.get('side'))
  const title = normalizeFormValue(formData.get('title'))
  const slug = normalizeFormValue(formData.get('slug')).toLowerCase()
  const summary = normalizeFormValue(formData.get('summary'))
  const bodyMarkdown = normalizeFormValue(formData.get('bodyMarkdown'))
  const publishedAtInput = normalizeFormValue(formData.get('publishedAt'))
  const coverImageUrl = normalizeFormValue(formData.get('coverImageUrl'))
  const coverImageAlt = normalizeFormValue(formData.get('coverImageAlt'))

  const values: CreateBlogPostFormValues = {
    title,
    slug,
    summary,
    bodyMarkdown,
    side: isBlogPostSide(rawSide) ? rawSide : 'engineering',
    status: isBlogPostStatus(rawStatus) ? rawStatus : 'draft',
    publishedAt: publishedAtInput,
    coverImageUrl,
    coverImageAlt,
  }

  const fieldErrors: CreateBlogPostActionResult['fieldErrors'] = {}

  if (!title) {
    fieldErrors.title = 'Title is required.'
  }

  if (!slug) {
    fieldErrors.slug = 'Slug is required.'
  } else if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug)) {
    fieldErrors.slug = 'Slug must use lowercase letters, numbers, and hyphens only.'
  }

  if (!summary) {
    fieldErrors.summary = 'Summary is required.'
  }

  if (!bodyMarkdown) {
    fieldErrors.bodyMarkdown = 'Markdown body is required.'
  }

  if (!isBlogPostSide(rawSide)) {
    fieldErrors.side = 'Select a valid side.'
  }

  if (!isBlogPostStatus(rawStatus)) {
    fieldErrors.status = 'Select a valid status.'
  }

  if (coverImageAlt && !coverImageUrl) {
    fieldErrors.coverImageUrl = 'Cover image URL is required when alt text is provided.'
  }

  if (publishedAtInput && !isValidIsoDate(publishedAtInput)) {
    fieldErrors.publishedAt = 'Published at must be a valid date/time.'
  }

  if (Object.keys(fieldErrors).length > 0) {
    return {
      success: false,
      fieldErrors,
      values,
    }
  }

  const nowIso = new Date().toISOString()
  const publishedAt = values.status === 'published'
    ? (publishedAtInput ? new Date(publishedAtInput).toISOString() : nowIso)
    : null

  return {
    input: {
      title,
      slug,
      summary,
      bodyMarkdown,
      side: values.side,
      status: values.status,
      publishedAt,
      updatedAt: nowIso,
      coverImageUrl: coverImageUrl || null,
      coverImageAlt: coverImageAlt || null,
    },
  }
}

export const useCreateBlogPost = routeAction$(async (_, requestEvent) => {
  const formData = await requestEvent.parseBody() as FormData
  const parsed = parseCreateBlogPostInput(formData)

  if ('success' in parsed) {
    return parsed
  }

  try {
    const post = await createBlogPost(parsed.input)
    throw requestEvent.redirect(302, `/admin/blog/${post.id}`)
  } catch (error) {
    const formDataFallback = parseCreateBlogPostInput(formData)
    const values = 'success' in formDataFallback ? formDataFallback.values : DEFAULT_FORM_VALUES
    const fieldErrors = 'success' in formDataFallback ? formDataFallback.fieldErrors : {}
    const databaseError = error as { code?: string }

    if (databaseError.code === '23505') {
      return {
        success: false,
        formError: 'Slug must be unique. Choose a different slug and try again.',
        fieldErrors: {
          ...fieldErrors,
          slug: 'This slug is already in use.',
        },
        values,
      } satisfies CreateBlogPostActionResult
    }

    return {
      success: false,
      formError: 'Unable to save the post right now. Try again.',
      fieldErrors,
      values,
    } satisfies CreateBlogPostActionResult
  }
})

export default component$(() => {
  const createBlogPostAction = useCreateBlogPost()
  const actionValue = createBlogPostAction.value
  const values = actionValue?.success === false ? actionValue.values : DEFAULT_FORM_VALUES
  const fieldErrors = actionValue?.success === false ? actionValue.fieldErrors : {}

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
                  Submit a draft or publish immediately; the server fills `published_at` when needed.
                </p>
              </div>

              <Form action={createBlogPostAction} class="flex flex-col gap-6">
                {actionValue?.success === false && actionValue.formError && (
                  <div class="rounded-[var(--radius-xl)] border border-[var(--border)] bg-[var(--surface-subtle)] px-4 py-3 text-sm leading-6 text-[var(--fg)]">
                    {actionValue.formError}
                  </div>
                )}

                <div class="grid gap-5 md:grid-cols-2">
                  <label class="flex flex-col gap-2 text-sm font-medium text-[var(--fg)]">
                    <span>Title</span>
                    <input
                      name="title"
                      type="text"
                      value={values.title}
                      class="rounded-[var(--radius-lg)] border border-[var(--border)] bg-[var(--surface-subtle)] px-4 py-3 text-base"
                    />
                    {fieldErrors.title && <span class="text-sm text-[var(--muted)]">{fieldErrors.title}</span>}
                  </label>

                  <label class="flex flex-col gap-2 text-sm font-medium text-[var(--fg)]">
                    <span>Slug</span>
                    <input
                      name="slug"
                      type="text"
                      value={values.slug}
                      class="rounded-[var(--radius-lg)] border border-[var(--border)] bg-[var(--surface-subtle)] px-4 py-3 text-base"
                    />
                    {fieldErrors.slug && <span class="text-sm text-[var(--muted)]">{fieldErrors.slug}</span>}
                  </label>

                  <label class="flex flex-col gap-2 text-sm font-medium text-[var(--fg)] md:col-span-2">
                    <span>Summary</span>
                    <textarea
                      name="summary"
                      rows={3}
                      class="rounded-[var(--radius-lg)] border border-[var(--border)] bg-[var(--surface-subtle)] px-4 py-3 text-base"
                    >
                      {values.summary}
                    </textarea>
                    {fieldErrors.summary && <span class="text-sm text-[var(--muted)]">{fieldErrors.summary}</span>}
                  </label>

                  <label class="flex flex-col gap-2 text-sm font-medium text-[var(--fg)]">
                    <span>Side</span>
                    <select
                      name="side"
                      value={values.side}
                      class="rounded-[var(--radius-lg)] border border-[var(--border)] bg-[var(--surface-subtle)] px-4 py-3 text-base"
                    >
                      {SIDE_OPTIONS.map((side) => (
                        <option key={side} value={side}>{side}</option>
                      ))}
                    </select>
                    {fieldErrors.side && <span class="text-sm text-[var(--muted)]">{fieldErrors.side}</span>}
                  </label>

                  <label class="flex flex-col gap-2 text-sm font-medium text-[var(--fg)]">
                    <span>Status</span>
                    <select
                      name="status"
                      value={values.status}
                      class="rounded-[var(--radius-lg)] border border-[var(--border)] bg-[var(--surface-subtle)] px-4 py-3 text-base"
                    >
                      {STATUS_OPTIONS.map((status) => (
                        <option key={status} value={status}>{status}</option>
                      ))}
                    </select>
                    {fieldErrors.status && <span class="text-sm text-[var(--muted)]">{fieldErrors.status}</span>}
                  </label>

                  <label class="flex flex-col gap-2 text-sm font-medium text-[var(--fg)] md:col-span-2">
                    <span>Published at</span>
                    <input
                      name="publishedAt"
                      type="datetime-local"
                      value={values.publishedAt}
                      class="rounded-[var(--radius-lg)] border border-[var(--border)] bg-[var(--surface-subtle)] px-4 py-3 text-base"
                    />
                    <span class="text-sm leading-6 text-[var(--muted)]">
                      Optional. If status is `published` and this is blank, the server uses the save time.
                    </span>
                    {fieldErrors.publishedAt && <span class="text-sm text-[var(--muted)]">{fieldErrors.publishedAt}</span>}
                  </label>

                  <label class="flex flex-col gap-2 text-sm font-medium text-[var(--fg)] md:col-span-2">
                    <span>Body Markdown</span>
                    <textarea
                      name="bodyMarkdown"
                      rows={16}
                      class="rounded-[var(--radius-lg)] border border-[var(--border)] bg-[var(--surface-subtle)] px-4 py-3 font-mono text-sm leading-6"
                    >
                      {values.bodyMarkdown}
                    </textarea>
                    {fieldErrors.bodyMarkdown && <span class="text-sm text-[var(--muted)]">{fieldErrors.bodyMarkdown}</span>}
                  </label>

                  <label class="flex flex-col gap-2 text-sm font-medium text-[var(--fg)]">
                    <span>Cover image URL</span>
                    <input
                      name="coverImageUrl"
                      type="url"
                      value={values.coverImageUrl}
                      class="rounded-[var(--radius-lg)] border border-[var(--border)] bg-[var(--surface-subtle)] px-4 py-3 text-base"
                    />
                    {fieldErrors.coverImageUrl && <span class="text-sm text-[var(--muted)]">{fieldErrors.coverImageUrl}</span>}
                  </label>

                  <label class="flex flex-col gap-2 text-sm font-medium text-[var(--fg)]">
                    <span>Cover image alt</span>
                    <input
                      name="coverImageAlt"
                      type="text"
                      value={values.coverImageAlt}
                      class="rounded-[var(--radius-lg)] border border-[var(--border)] bg-[var(--surface-subtle)] px-4 py-3 text-base"
                    />
                  </label>
                </div>

                <div class="ui-cta-group flex-col items-stretch gap-3 sm:flex-row sm:items-start sm:gap-2">
                  <button
                    type="submit"
                    class="ui-button-link ui-button-link--primary w-full sm:w-auto"
                  >
                    Save Post
                  </button>

                  <a
                    href="/admin/blog"
                    class="ui-button-link ui-button-link--ghost w-full sm:w-auto"
                  >
                    Back to Blog Admin
                  </a>
                </div>
              </Form>
            </div>
          </Container>
        </Section>
      </main>
    </PageShell>
  )
})
