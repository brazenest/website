import { component$, useTask$ } from '@builder.io/qwik'
import { marked } from 'marked'
import { cn } from '~/fns/cn'

export const MarkdownPreview = component$(
  ({ markdown, class: className, currentLine = 1 }: MarkdownPreviewProps) => {
    // Split markdown into lines and track line numbers for each block
    const lines = markdown.split('\n')
    let currentLineNum = 1
    let html = ''
    let processedHtml = ''

    try {
      // Parse markdown with line tracking
      const tokens = marked.lexer(markdown)

      for (const token of tokens) {
        // Calculate line span for this token
        const tokenStart = currentLineNum
        const tokenLines = token.raw.split('\n').length
        const tokenEnd = tokenStart + tokenLines - 1

        // Determine if this token contains the current line
        const isActive = currentLine >= tokenStart && currentLine <= tokenEnd
        const lineClass = isActive ? ' [&]:bg-[var(--surface)] [&]:ring-1 [&]:ring-[#3b82f6]/50' : ''

        // Render the token
        const tokenHtml = marked.parser([token])
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
        <div
          dangerouslySetInnerHTML={html}
          class={cn(
            'space-y-3 overflow-auto',
            '[&_.markdown-block]:transition-colors [&_.markdown-block]:duration-150',
            '[&_h1]:text-lg [&_h1]:font-semibold [&_h1]:mb-2 [&_h1]:mt-4 [&_h1]:first:mt-0',
            '[&_h2]:text-base [&_h2]:font-semibold [&_h2]:mb-2 [&_h2]:mt-3 [&_h2]:first:mt-0',
            '[&_h3]:text-sm [&_h3]:font-semibold [&_h3]:mb-2 [&_h3]:mt-3',
            '[&_p]:m-0 [&_p]:mb-3 [&_p]:last:mb-0',
            '[&_ul]:mb-3 [&_ul]:ml-4 [&_ul]:list-disc',
            '[&_li]:mb-1',
            '[&_code]:rounded [&_code]:bg-[var(--surface)] [&_code]:px-1.5 [&_code]:py-0.5 [&_code]:font-mono [&_code]:text-[0.85em]',
            '[&_a]:text-blue-600 [&_a]:underline [&_a]:hover:text-blue-700',
            '[&_blockquote]:border-l-2 [&_blockquote]:border-[var(--border)] [&_blockquote]:pl-3 [&_blockquote]:text-[var(--muted)]'
          )}
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
