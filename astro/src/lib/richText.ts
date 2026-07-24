/**
 * Minimal Payload lexical richText → HTML serializer. No @payloadcms/richtext-lexical
 * dependency (BUILD.md §1: Payload is build-time only, never a runtime dependency of the
 * static site). Covers every node type the default editor produces and the blog archive
 * actually contains: paragraph, heading, list/listitem, quote, horizontalrule, linebreak,
 * link, and text (bold/italic/underline/strikethrough/code).
 */
type LexicalNode = {
  type: string
  text?: string
  tag?: string
  format?: number | string
  listType?: 'bullet' | 'number' | 'check'
  start?: number
  checked?: boolean
  children?: LexicalNode[]
  url?: string
  fields?: { url?: string; newTab?: boolean }
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
const FORMAT_SUBSCRIPT = 32
const FORMAT_SUPERSCRIPT = 64

function renderText(node: LexicalNode): string {
  let html = escapeHtml(node.text || '')
  const format = typeof node.format === 'number' ? node.format : 0
  if (format & FORMAT_CODE) html = `<code>${html}</code>`
  if (format & FORMAT_BOLD) html = `<strong>${html}</strong>`
  if (format & FORMAT_ITALIC) html = `<em>${html}</em>`
  if (format & FORMAT_UNDERLINE) html = `<u>${html}</u>`
  if (format & FORMAT_STRIKETHROUGH) html = `<s>${html}</s>`
  if (format & FORMAT_SUBSCRIPT) html = `<sub>${html}</sub>`
  if (format & FORMAT_SUPERSCRIPT) html = `<sup>${html}</sup>`
  return html
}

function renderChildren(children: LexicalNode[] | undefined): string {
  return (children || []).map(renderNode).join('')
}

/** Block alignment is a string format ('center' | 'right' | …) on block nodes. */
function alignAttr(node: LexicalNode): string {
  return typeof node.format === 'string' && node.format ? ` style="text-align:${node.format}"` : ''
}

function renderNode(node: LexicalNode): string {
  switch (node.type) {
    case 'text':
      return renderText(node)
    case 'linebreak':
      return '<br />'
    case 'link':
    case 'autolink': {
      const href = node.fields?.url || node.url || '#'
      const external = /^https?:\/\//.test(href)
      const rel = external ? ' target="_blank" rel="noopener noreferrer"' : ''
      return `<a href="${escapeHtml(href)}"${rel}>${renderChildren(node.children)}</a>`
    }
    case 'paragraph': {
      // Lexical emits an empty paragraph for a blank line; skip it rather than shipping <p></p>.
      const inner = renderChildren(node.children)
      return inner ? `<p${alignAttr(node)}>${inner}</p>` : ''
    }
    case 'heading': {
      // Post titles own <h1>, so a body heading never outranks h2.
      const tag = /^h[1-6]$/.test(node.tag || '') ? node.tag! : 'h2'
      const safe = tag === 'h1' ? 'h2' : tag
      return `<${safe}${alignAttr(node)}>${renderChildren(node.children)}</${safe}>`
    }
    case 'quote':
      return `<blockquote${alignAttr(node)}>${renderChildren(node.children)}</blockquote>`
    case 'list': {
      if (node.listType === 'number') {
        const start = node.start && node.start !== 1 ? ` start="${node.start}"` : ''
        return `<ol${start}>${renderChildren(node.children)}</ol>`
      }
      const cls = node.listType === 'check' ? ' class="check"' : ''
      return `<ul${cls}>${renderChildren(node.children)}</ul>`
    }
    case 'listitem': {
      // A nested list arrives as a listitem whose only child is a list — unwrap it so the
      // markup stays valid (<ul> inside <li>, never a stray <li><li>).
      const onlyChild = node.children?.length === 1 ? node.children[0] : undefined
      if (onlyChild?.type === 'list') return renderNode(onlyChild)
      const checked = typeof node.checked === 'boolean' ? ` class="check__item" data-checked="${node.checked}"` : ''
      return `<li${checked}>${renderChildren(node.children)}</li>`
    }
    case 'horizontalrule':
    case 'horizontalRule':
      return '<hr />'
    default:
      // Unknown/unhandled node type — render children so text content still surfaces
      // rather than silently disappearing.
      return renderChildren(node.children)
  }
}

/** Renders a Payload richText value ({root: {...}} | null) to an HTML string. */
export function renderRichText(value: { root: unknown } | null | undefined): string {
  if (!value || !value.root) return ''
  const root = value.root as LexicalNode
  return renderChildren(root.children)
}
