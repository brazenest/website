/**
 * Markdown repairs applied on the way into Lexical, for the legacy blog archive.
 *
 * `convertMarkdownToLexical` is faithful for almost everything the old articles use —
 * headings, lists, links, inline code, hard breaks and soft-wrapped paragraphs all survive
 * (a soft break inside a paragraph correctly becomes a space). Two things it cannot
 * represent, which this module fixes BEFORE conversion so the damage never reaches the DB:
 *
 * 1. BLOCKQUOTES FLATTEN. Lexical's quote node holds inline children only, and the
 *    converter joins every line inside one blockquote with NO separator — so
 *    "> a\n> \n> b" stores as "ab". 14 of the archive's 24 blockquotes span multiple
 *    lines. Fix: re-emit each paragraph of a blockquote as its own consecutive blockquote,
 *    which yields one quote node per paragraph and keeps the breaks. Soft-wrapped lines
 *    within a paragraph are joined with a space, as markdown intends.
 *
 * 2. REMOTE IMAGES HAVE NO NODE. The default editor's UploadFeature can only point at a
 *    Media document, so `![](https://…)` survives conversion as literal markdown text in
 *    the middle of the prose. Fix: drop it and warn, rather than print `![](…)` at a
 *    reader. To restore one, upload the file to Media and place it in the admin editor.
 *
 * Also strips ``` fence markers found INSIDE a blockquote (the Part 2 ChatGPT transcript
 * wraps its quoted reply in a fence): the default feature set has no code-block node, so
 * the markers would otherwise land as literal "```" text inside the quote.
 */

const QUOTE_LINE = /^\s*>\s?/
const FENCE_LINE = /^\s*```[a-zA-Z0-9]*\s*$/
const STANDALONE_IMAGE = /^!\[([^\]]*)\]\(\s*(\S+?)(?:\s+"[^"]*")?\s*\)$/

export type NormalizeWarning = { kind: 'dropped-image'; detail: string }

function isQuoteBlock(lines: string[]): boolean {
  return lines.some((line) => QUOTE_LINE.test(line)) && lines.every((line) => !line.trim() || QUOTE_LINE.test(line))
}

/** Re-emits a blockquote as one `> ` block per paragraph, so Lexical keeps the breaks. */
function normalizeQuoteBlock(lines: string[]): string {
  const paragraphs: string[][] = []
  let current: string[] = []

  for (const line of lines) {
    const content = line.replace(QUOTE_LINE, '')
    if (FENCE_LINE.test(content)) continue
    if (!content.trim()) {
      if (current.length) paragraphs.push(current)
      current = []
      continue
    }
    current.push(content.trim())
  }
  if (current.length) paragraphs.push(current)

  return paragraphs.map((paragraph) => `> ${paragraph.join(' ')}`).join('\n\n')
}

/**
 * Prepares one legacy article body for `convertMarkdownToLexical`.
 * `onWarn` is called for anything intentionally discarded.
 */
export function normalizeLegacyMarkdown(markdown: string, onWarn?: (warning: NormalizeWarning) => void): string {
  return markdown
    .replace(/\r\n?/g, '\n')
    .split(/\n{2,}/)
    .map((block) => {
      const lines = block.split('\n')

      if (isQuoteBlock(lines)) return normalizeQuoteBlock(lines)

      const image = block.trim().match(STANDALONE_IMAGE)
      if (image) {
        onWarn?.({ kind: 'dropped-image', detail: image[2] })
        return ''
      }

      return block
    })
    .filter((block) => block.trim())
    .join('\n\n')
}
