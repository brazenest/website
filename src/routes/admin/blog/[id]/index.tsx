import { component$ } from '@builder.io/qwik'
import { Form, routeAction$, routeLoader$, useLocation, type DocumentHead } from '@builder.io/qwik-city'
import { BlogPostAdminForm } from '~/components/blog/BlogPostAdminForm'
import { PageShell } from '~/components/layout/PageShell'
import { Container } from '~/components/ui/Container'
import { Section } from '~/components/ui/Section'
import {
  DEFAULT_BLOG_POST_FORM_VALUES,
  getBlogPostFormValuesFromRecord,
  parseBlogPostFormInput,
  type BlogPostFormFailure,
} from '~/lib/blog/admin/blogPostForm'
import { getAdminBlogPostById } from '~/lib/blog/admin/getAdminBlogPostById'
import { updateBlogPost } from '~/lib/blog/admin/updateBlogPost'

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

export const useAdminBlogPost = routeLoader$(async ({ params }) => {
  return getAdminBlogPostById(params.id)
})

export const useUpdateBlogPost = routeAction$(async (_, requestEvent) => {
  const existingPost = await getAdminBlogPostById(requestEvent.params.id)

  if (!existingPost) {
    return {
      success: false,
      formError: 'The requested post could not be found.',
      fieldErrors: {},
      values: DEFAULT_BLOG_POST_FORM_VALUES,
    } satisfies BlogPostFormFailure
  }

  const formData = await requestEvent.parseBody()
  const parsed = parseBlogPostFormInput(formData, {
    existingPublishedAt: existingPost.publishedAt,
  })

  if ('success' in parsed) {
    return parsed
  }

  try {
    const post = await updateBlogPost({
      ...parsed.input,
      id: existingPost.id,
    })

    if (!post) {
      return {
        success: false,
        formError: 'The post could not be updated because it no longer exists.',
        fieldErrors: {},
        values: parsed.values,
      } satisfies BlogPostFormFailure
    }

    throw requestEvent.redirect(302, `/admin/blog/${post.id}?saved=1`)
  } catch (error) {
    const databaseError = error as { code?: string }

    if (databaseError.code === '23505') {
      return {
        success: false,
        formError: 'Slug must be unique. Choose a different slug and try again.',
        fieldErrors: {
          slug: 'This slug is already in use.',
        },
        values: parsed.values,
      } satisfies BlogPostFormFailure
    }

    return {
      success: false,
      formError: 'Unable to save the post right now. Try again.',
      fieldErrors: {},
      values: parsed.values,
    } satisfies BlogPostFormFailure
  }
})

export default component$(() => {
  const location = useLocation()
  const post = useAdminBlogPost()
  const updateBlogPostAction = useUpdateBlogPost()
  const actionValue = updateBlogPostAction.value

  if (!post.value) {
    return (
      <PageShell theme="neutral">
        <main id="main-content" class="flex-1 scroll-mt-24">
          <Section spacing="spacious">
            <Container width="content">
              <div class="flex flex-col gap-6 rounded-[var(--radius-2xl)] border border-[var(--border)] bg-[var(--surface)] p-6 md:p-8">
                <div class="flex flex-col gap-3">
                  <p class="ui-meta-label">
                    Edit Post
                  </p>

                  <h1 class="text-4xl font-semibold tracking-tight leading-tight md:text-5xl">
                    Post not found.
                  </h1>

                  <p class="max-w-[66ch] text-base leading-7 text-[var(--muted)] md:text-lg">
                    The requested `blog_posts.id` record does not exist or is no longer available.
                  </p>
                </div>

                <div class="ui-cta-group flex-col items-stretch gap-3 sm:flex-row sm:items-start sm:gap-2">
                  <a href="/admin/blog" class="ui-button-link ui-button-link--primary w-full sm:w-auto">
                    Back to Blog Admin
                  </a>
                </div>
              </div>
            </Container>
          </Section>
        </main>
      </PageShell>
    )
  }

  const values = actionValue?.success === false
    ? actionValue.values
    : getBlogPostFormValuesFromRecord(post.value)
  const fieldErrors = actionValue?.success === false ? actionValue.fieldErrors : {}
  const showSavedMessage = location.url.searchParams.get('saved') === '1'

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
                  Edit existing blog post.
                </h1>

                <p class="max-w-[66ch] text-base leading-7 text-[var(--muted)] md:text-lg">
                  This route is bound to `blog_posts.id` so launch content can be updated without direct SQL edits.
                </p>
              </div>

              <div class="rounded-[var(--radius-xl)] border border-[var(--border)] bg-[var(--surface-subtle)] p-5 md:p-6">
                <div class="flex flex-col gap-1 text-sm leading-6 text-[var(--muted)] md:flex-row md:flex-wrap md:gap-x-6">
                  <span>ID: {post.value.id}</span>
                  <span>Status: {post.value.status}</span>
                  <span>Published: {post.value.publishedAt ?? 'Draft only'}</span>
                  <span>Updated: {post.value.updatedAt ?? 'Never'}</span>
                </div>
              </div>

              <Form action={updateBlogPostAction} class="flex flex-col gap-6">
                {showSavedMessage && (
                  <div class="rounded-[var(--radius-xl)] border border-[var(--border)] bg-[var(--surface-subtle)] px-4 py-3 text-sm leading-6 text-[var(--fg)]">
                    Post saved.
                  </div>
                )}

                {actionValue?.success === false && actionValue.formError && (
                  <div class="rounded-[var(--radius-xl)] border border-[var(--border)] bg-[var(--surface-subtle)] px-4 py-3 text-sm leading-6 text-[var(--fg)]">
                    {actionValue.formError}
                  </div>
                )}

                <BlogPostAdminForm
                  values={values}
                  fieldErrors={fieldErrors}
                  submitLabel="Update Post"
                  cancelHref="/admin/blog"
                  helperText="Update the launch fields only. Inputs are normalized server-side, and draft or published behavior stays tied to status plus published_at."
                />
              </Form>
            </div>
          </Container>
        </Section>
      </main>
    </PageShell>
  )
})
