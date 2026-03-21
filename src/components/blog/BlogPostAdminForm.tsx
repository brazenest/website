import { Slot, component$, useSignal, $ } from '@builder.io/qwik'
import { cn } from '~/fns/cn'
import { MarkdownPreview } from './MarkdownPreview'
import {
  BLOG_POST_SIDE_OPTIONS,
  BLOG_POST_STATUS_OPTIONS,
  type BlogPostFormFieldErrors,
} from '~/lib/blog/admin/blogPostForm'
import type { BlogPostFormValues } from '~/types/content'

export const BlogPostAdminForm = component$(
  ({
    values,
    fieldErrors,
    submitLabel,
    cancelHref,
    helperText,
  }: BlogPostAdminFormProps) => {
    const showPreview = useSignal(false)
    const currentLine = useSignal(1)

    return (
      <div class="flex flex-col gap-6">
        {helperText && (
          <p class="max-w-[66ch] text-base leading-7 text-[var(--muted)] md:text-lg">
            {helperText}
          </p>
        )}

        <div class="grid gap-5 md:grid-cols-2">
          <FieldLabel label="Title" error={fieldErrors.title}>
            <input
              name="title"
              type="text"
              value={values.title}
              class={getFieldClass()}
            />
          </FieldLabel>

          <FieldLabel label="Slug" error={fieldErrors.slug}>
            <input
              name="slug"
              type="text"
              value={values.slug}
              class={getFieldClass()}
            />
          </FieldLabel>

          <FieldLabel label="Summary" error={fieldErrors.summary} class="md:col-span-2">
            <textarea
              name="summary"
              rows={3}
              class={getFieldClass()}
            >
              {values.summary}
            </textarea>
          </FieldLabel>

          <FieldLabel label="Side" error={fieldErrors.side}>
            <select
              name="side"
              value={values.side}
              class={getFieldClass()}
            >
              {BLOG_POST_SIDE_OPTIONS.map((side) => (
                <option key={side} value={side} selected={values.side === side}>{side}</option>
              ))}
            </select>
          </FieldLabel>

          <FieldLabel label="Status" error={fieldErrors.status}>
            <select
              name="status"
              value={values.status}
              class={getFieldClass()}
            >
              {BLOG_POST_STATUS_OPTIONS.map((status) => (
                <option key={status} value={status} selected={values.status === status}>{status}</option>
              ))}
            </select>
          </FieldLabel>

          <FieldLabel label="Published at" error={fieldErrors.publishedAt} class="md:col-span-2">
            <input
              name="publishedAt"
              type="datetime-local"
              value={values.publishedAt}
              class={getFieldClass()}
            />
            <span class="text-sm leading-6 text-[var(--muted)]">
              Optional. If status is `published` and this is blank, the server uses the existing publication time or the current save time.
            </span>
          </FieldLabel>

          <FieldLabel label="Body Markdown" error={fieldErrors.bodyMarkdown} class="md:col-span-2">
            <div class="flex items-center justify-between">
              <span class="text-xs font-medium text-[var(--muted)]">
                {showPreview.value ? 'Preview' : 'Edit'}
              </span>
              <button
                type="button"
                onClick$={() => (showPreview.value = !showPreview.value)}
                class="rounded-md border border-[var(--border)] bg-[var(--surface-subtle)] px-3 py-1.5 text-xs font-medium text-[var(--fg)] transition-colors hover:bg-[var(--surface)] active:bg-[var(--surface)]"
              >
                {showPreview.value ? 'Edit' : 'Preview'}
              </button>
            </div>
            {showPreview.value ? (
              <MarkdownPreview markdown={values.bodyMarkdown} currentLine={currentLine.value} />
            ) : (
              <textarea
                name="bodyMarkdown"
                rows={16}
                onInput$={$((event: Event) => {
                  const textarea = event.target as HTMLTextAreaElement
                  const text = textarea.value
                  const selectionStart = textarea.selectionStart
                  const lineNum = text.substring(0, selectionStart).split('\n').length
                  currentLine.value = lineNum
                })}
                class={cn(getFieldClass(), 'font-mono text-sm leading-6')}
              >
                {values.bodyMarkdown}
              </textarea>
            )}
          </FieldLabel>

          <FieldLabel label="Cover image URL" error={fieldErrors.coverImageUrl}>
            <input
              name="coverImageUrl"
              type="url"
              value={values.coverImageUrl}
              class={getFieldClass()}
            />
          </FieldLabel>

          <FieldLabel label="Cover image alt" error={fieldErrors.coverImageAlt}>
            <input
              name="coverImageAlt"
              type="text"
              value={values.coverImageAlt}
              class={getFieldClass()}
            />
          </FieldLabel>
        </div>

        <div class="ui-cta-group flex-col items-stretch gap-3 sm:flex-row sm:items-start sm:gap-2">
          <button
            type="submit"
            class="ui-button-link ui-button-link--primary w-full sm:w-auto"
          >
            {submitLabel}
          </button>

          <a
            href={cancelHref}
            class="ui-button-link ui-button-link--ghost w-full sm:w-auto"
          >
            Back to Blog Admin
          </a>
        </div>
      </div>
    )
  },
)

const getFieldClass = () => {
  return 'rounded-[var(--radius-lg)] border border-[var(--border)] bg-[var(--surface-subtle)] px-4 py-3 text-base'
}

const FieldLabel = component$(({ label, error, class: className }: FieldLabelProps) => {
  return (
    <label class={cn('flex flex-col gap-2 text-sm font-medium text-[var(--fg)]', className)}>
      <span>{label}</span>
      <Slot />
      {error && <span class="text-sm text-[var(--muted)]">{error}</span>}
    </label>
  )
})

type BlogPostAdminFormProps = {
  values: BlogPostFormValues
  fieldErrors: BlogPostFormFieldErrors
  submitLabel: string
  cancelHref: string
  helperText?: string
}

type FieldLabelProps = {
  label: string
  error?: string
  class?: string
}
