type MarkdownToken = {
  raw: string
  html: string
}

const markdownImagePattern = /^!\[([^\]]*)\]\((\S+?)(?:\s+"([^"]+)")?\)$/

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
}

function escapeAttribute(value: string): string {
  return escapeHtml(value).replace(/`/g, '&#96;')
}

function renderInlineMarkdown(value: string): string {
  return escapeHtml(value)
    .replace(/!\[([^\]]*)\]\((\S+?)(?:\s+&quot;([^&]+)&quot;)?\)/g, (_match, alt, src, title) => {
      const titleAttribute = title ? ` title="${escapeAttribute(title)}"` : ''

      return `<img src="${escapeAttribute(src)}" alt="${escapeAttribute(alt)}"${titleAttribute} />`
    })
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

  if (first.startsWith('## ') || first.startsWith('# ')) {
    const heading = first.startsWith('## ') ? first.slice(3) : first.slice(2)

    return `<h2>${renderInlineMarkdown(heading)}</h2>`
  }

  if (/^-{3,}$/.test(first)) {
    return '<hr />'
  }

  if (first.startsWith('>')) {
    const quote = lines
      .map((line) => line.replace(/^>\s?/, ''))
      .join('\n')
      .trim()

    return `<blockquote>${getNormalizedMarkdownTokens(quote)
      .map(renderMarkdownTokenHtml)
      .join('')}</blockquote>`
  }

  if (lines.every((line) => line.trim().startsWith('- '))) {
    const items = lines
      .map((line) => line.trim().slice(2))
      .map((item) => `<li>${renderInlineMarkdown(item)}</li>`)
      .join('')

    return `<ul>${items}</ul>`
  }

  if (lines.every((line) => /^\d+\.\s+/.test(line.trim()))) {
    const items = lines
      .map((line) => line.trim().replace(/^\d+\.\s+/, ''))
      .map((item) => `<li>${renderInlineMarkdown(item)}</li>`)
      .join('')

    return `<ol>${items}</ol>`
  }

  if (first.startsWith('```') && raw.trimEnd().endsWith('```')) {
    const code = lines.slice(1, -1).join('\n')
    return `<pre><code>${escapeHtml(code)}</code></pre>`
  }

  const standaloneImage = first.match(markdownImagePattern)

  if (standaloneImage) {
    const [, alt, src, title] = standaloneImage
    const caption = title ? `<figcaption>${escapeHtml(title)}</figcaption>` : ''

    return `<figure><img src="${escapeAttribute(src)}" alt="${escapeAttribute(alt)}" />${caption}</figure>`
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

export function renderMarkdownToHtml(markdown: string): string {
  return getNormalizedMarkdownTokens(markdown).map(renderMarkdownTokenHtml).join('')
}

export function getMarkdownParagraphs(markdown: string): string[] {
  return markdown
    .replace(/\r\n?/g, '\n')
    .split(/\n{2,}/)
    .map((block) => block.trim())
    .filter(Boolean)
}
