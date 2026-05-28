type MarkdownToken = {
  raw: string
  html: string
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
}

function renderInlineMarkdown(value: string): string {
  return escapeHtml(value)
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*(.+?)\*/g, '<em>$1</em>')
    .replace(/`([^`]+)`/g, '<code>$1</code>')
    .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2">$1</a>')
}

function renderBlock(raw: string): string {
  const lines = raw.split('\n')
  const first = lines[0]?.trim() ?? ''

  if (first.startsWith('### ')) {
    return `<h3>${renderInlineMarkdown(first.slice(4))}</h3>`
  }

  if (first.startsWith('## ')) {
    return `<h2>${renderInlineMarkdown(first.slice(3))}</h2>`
  }

  if (first.startsWith('# ')) {
    return `<h1>${renderInlineMarkdown(first.slice(2))}</h1>`
  }

  if (lines.every((line) => line.trim().startsWith('- '))) {
    const items = lines
      .map((line) => line.trim().slice(2))
      .map((item) => `<li>${renderInlineMarkdown(item)}</li>`)
      .join('')

    return `<ul>${items}</ul>`
  }

  if (first.startsWith('```') && raw.trimEnd().endsWith('```')) {
    const code = lines.slice(1, -1).join('\n')
    return `<pre><code>${escapeHtml(code)}</code></pre>`
  }

  return `<p>${lines.map(renderInlineMarkdown).join('<br />')}</p>`
}

export function getNormalizedMarkdownTokens(markdown: string): MarkdownToken[] {
  return markdown
    .replace(/\r\n?/g, '\n')
    .split(/\n{2,}/)
    .map((block) => block.trim())
    .filter(Boolean)
    .map((raw) => ({
      raw,
      html: renderBlock(raw),
    }))
}

export function renderMarkdownTokenHtml(token: MarkdownToken): string {
  return token.html
}

export function getMarkdownParagraphs(markdown: string): string[] {
  return markdown
    .replace(/\r\n?/g, '\n')
    .split(/\n{2,}/)
    .map((block) => block.trim())
    .filter(Boolean)
}
