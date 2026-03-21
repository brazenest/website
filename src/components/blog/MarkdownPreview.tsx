import { component$ } from '@builder.io/qwik'
import { ArticleProse } from '~/components/content/ArticleProse'
import { cn } from '~/fns/cn'
import { getNormalizedMarkdownTokens, renderMarkdownTokenHtml } from '~/lib/blog/markdown'

export const MarkdownPreview = component$(
  ({ markdown, class: className, currentLine = 1 }: MarkdownPreviewProps) => {
    // Split markdown into lines and track line numbers for each block
    const lines = markdown.split('\n')
    let currentLineNum = 1
    let html = ''
    let processedHtml = ''

    try {
      // Parse markdown with line tracking
      const tokens = getNormalizedMarkdownTokens(markdown)

      for (const token of tokens) {
        // Calculate line span for this token
        const tokenStart = currentLineNum
        const tokenLines = token.raw.split('\n').length
        const tokenEnd = tokenStart + tokenLines - 1

        // Determine if this token contains the current line
        const isActive = currentLine >= tokenStart && currentLine <= tokenEnd
        const lineClass = isActive ? ' [&]:bg-[var(--surface)] [&]:ring-1 [&]:ring-[#3b82f6]/50' : ''

        // Render the token
        const tokenHtml = renderMarkdownTokenHtml(token)
        processedHtml += `<div data-line-start="${tokenStart}" data-line-end="${tokenEnd}" class="markdown-block${lineClass}">${tokenHtml}</div>`

        currentLineNum = tokenEnd + 1
      }

      html = processedHtml || '<p>Error rendering markdown preview</p>'
    } catch (e) {
      console.error('Markdown rendering error:', e)
      html = '<p>Error rendering markdown preview</p>'
    }

    return (
      <div
        class={cn(
          'max-w-none rounded-[var(--radius-lg)] border border-[var(--border)] bg-[var(--surface-subtle)] p-4 text-sm leading-6 text-[var(--fg)]',
          className
        )}
      >
        <ArticleProse
          html={html}
          variant="compact"
          class="overflow-auto [&_.markdown-block]:rounded-[var(--radius-md)] [&_.markdown-block]:transition-colors [&_.markdown-block]:duration-150"
        />
      </div>
    )
  },
)

type MarkdownPreviewProps = {
  markdown: string
  class?: string
  currentLine?: number
}
