/**
 * Minimal Payload lexical richText → HTML serializer. No @payloadcms/richtext-lexical
 * dependency (BUILD.md §1: Payload is build-time only, never a runtime dependency of the
 * static site). Covers the node types Payload's default editor produces: paragraph, text
 * (bold/italic/underline/strikethrough/code), linebreak, and link.
 */
type LexicalNode = {
  type: string
  text?: string
  format?: number | string
  children?: LexicalNode[]
  url?: string
  fields?: { url?: string }
}

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
}

const FORMAT_BOLD = 1
const FORMAT_ITALIC = 2
const FORMAT_STRIKETHROUGH = 4
const FORMAT_UNDERLINE = 8
const FORMAT_CODE = 16

function renderText(node: LexicalNode): string {
  let html = escapeHtml(node.text || '')
  const format = typeof node.format === 'number' ? node.format : 0
  if (format & FORMAT_CODE) html = `<code>${html}</code>`
  if (format & FORMAT_BOLD) html = `<strong>${html}</strong>`
  if (format & FORMAT_ITALIC) html = `<em>${html}</em>`
  if (format & FORMAT_UNDERLINE) html = `<u>${html}</u>`
  if (format & FORMAT_STRIKETHROUGH) html = `<s>${html}</s>`
  return html
}

function renderChildren(children: LexicalNode[] | undefined): string {
  return (children || []).map(renderNode).join('')
}

function renderNode(node: LexicalNode): string {
  switch (node.type) {
    case 'text':
      return renderText(node)
    case 'linebreak':
      return '<br />'
    case 'link': {
      const href = node.fields?.url || node.url || '#'
      return `<a href="${escapeHtml(href)}">${renderChildren(node.children)}</a>`
    }
    case 'paragraph':
      return `<p>${renderChildren(node.children)}</p>`
    default:
      // Unknown/unhandled node type (heading, list, quote, ...) — render children so text
      // content still surfaces rather than silently disappearing.
      return renderChildren(node.children)
  }
}

/** Renders a Payload richText value ({root: {...}} | null) to an HTML string. */
export function renderRichText(value: { root: unknown } | null | undefined): string {
  if (!value || !value.root) return ''
  const root = value.root as LexicalNode
  return renderChildren(root.children)
}
