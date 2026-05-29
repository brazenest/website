import { component$ } from '@builder.io/qwik'
import { Form, routeAction$, type DocumentHead } from '@builder.io/qwik-city'
import { BlogPostAdminForm } from '~/components/blog/BlogPostAdminForm'
import { PageShell } from '~/components/layout/PageShell'
import { Container } from '~/components/ui/Container'
import { Section } from '~/components/ui/Section'
import {
  DEFAULT_BLOG_POST_FORM_VALUES,
  parseBlogPostFormInput,
  type BlogPostFormFailure,
} from '~/lib/blog/admin/blogPostForm'
import { createBlogPost } from '~/lib/blog/admin/createBlogPost'

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

export const useCreateBlogPost = routeAction$(async (_, requestEvent) => {
  const formData = await requestEvent.parseBody()
  const parsed = parseBlogPostFormInput(formData)

  if ('success' in parsed) {
    return parsed
  }

  try {
    const post = await createBlogPost(parsed.input)
    throw requestEvent.redirect(302, `/admin/blog/${post.id}`)
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
  const createBlogPostAction = useCreateBlogPost()
  const actionValue = createBlogPostAction.value
  const values = actionValue?.success === false ? actionValue.values : DEFAULT_BLOG_POST_FORM_VALUES
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
                  Strings are normalized server-side before save, and invalid image or publication fields are rejected.
                </p>
              </div>

              <Form action={createBlogPostAction} class="flex flex-col gap-6">
                {actionValue?.success === false && actionValue.formError && (
                  <div class="rounded-[var(--radius-xl)] border border-[var(--border)] bg-[var(--surface-subtle)] px-4 py-3 text-sm leading-6 text-[var(--fg)]">
                    {actionValue.formError}
                  </div>
                )}

                <BlogPostAdminForm
                  values={values}
                  fieldErrors={fieldErrors}
                  submitLabel="Save Post"
                  cancelHref="/admin/blog"
                />
              </Form>
            </div>
          </Container>
        </Section>
      </main>
    </PageShell>
  )
})
