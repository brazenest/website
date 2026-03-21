import { Lexer, Parser, Renderer, type Token, type Tokens, type TokensList } from 'marked'

export function getMarkdownParagraphs(markdown: string): string[] {
  return markdown
    .split(/\n{2,}/)
    .map((paragraph) => paragraph.trim())
    .filter(Boolean)
}

function escapeHtml(value: string) {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;')
}

function cloneTokensList(tokens: TokensList): TokensList {
  const cloned = [...tokens] as TokensList
  cloned.links = { ...tokens.links }
  return cloned
}

function normalizeInlineTokens(tokens: Token[]): Token[] {
  return tokens.map((token) => {
    if ('tokens' in token && Array.isArray(token.tokens)) {
      return {
        ...token,
        tokens: normalizeInlineTokens(token.tokens),
      }
    }

    return token
  })
}

function paragraphContainsOnlyImage(token: Tokens.Paragraph) {
  if (token.tokens.length !== 1) {
    return false
  }

  return token.tokens[0]?.type === 'image'
}

function normalizeBlockTokens(tokens: Token[]): Token[] {
  return tokens.map((token) => {
    switch (token.type) {
      case 'heading': {
        return {
          ...token,
          depth: token.depth === 1 ? 2 : token.depth,
          tokens: normalizeInlineTokens(token.tokens ?? []),
        }
      }
      case 'blockquote': {
        return {
          ...token,
          tokens: normalizeBlockTokens(token.tokens ?? []),
        }
      }
      case 'list': {
        return {
          ...token,
          items: token.items.map((item: Tokens.ListItem) => ({
            ...item,
            tokens: normalizeBlockTokens(item.tokens),
          })),
        }
      }
      case 'paragraph': {
        return {
          ...token,
          tokens: normalizeInlineTokens(token.tokens ?? []),
        }
      }
      case 'table': {
        return {
          ...token,
          header: token.header.map((cell: Tokens.TableCell) => ({
            ...cell,
            tokens: normalizeInlineTokens(cell.tokens),
          })),
          rows: token.rows.map((row: Tokens.TableCell[]) => row.map((cell: Tokens.TableCell) => ({
            ...cell,
            tokens: normalizeInlineTokens(cell.tokens),
          }))),
        }
      }
      case 'html': {
        return {
          ...token,
          text: escapeHtml(token.text),
        }
      }
      case 'text': {
        return Array.isArray(token.tokens)
          ? {
            ...token,
            tokens: normalizeInlineTokens(token.tokens),
          }
          : token
      }
      default:
        return token
    }
  })
}

function createMarkdownRenderer() {
  const renderer = new Renderer()

  renderer.html = ({ text }) => escapeHtml(text)

  renderer.heading = ({ tokens, depth }) => {
    const normalizedDepth = depth === 1 ? 2 : depth
    return `<h${normalizedDepth}>${renderer.parser.parseInline(tokens)}</h${normalizedDepth}>\n`
  }

  renderer.paragraph = (token) => {
    if (paragraphContainsOnlyImage(token)) {
      const imageToken = token.tokens[0] as Tokens.Image
      const imageHtml = renderer.image(imageToken)
      const caption = imageToken.title
        ? `<figcaption>${escapeHtml(imageToken.title)}</figcaption>`
        : ''

      return `<figure>${imageHtml}${caption}</figure>\n`
    }

    return `<p>${renderer.parser.parseInline(token.tokens)}</p>\n`
  }

  renderer.table = (token) => {
    let header = ''
    for (const cell of token.header) {
      header += renderer.tablecell(cell)
    }

    let body = ''
    for (const row of token.rows) {
      let cells = ''
      for (const cell of row) {
        cells += renderer.tablecell(cell)
      }
      body += renderer.tablerow({ text: cells })
    }

    const thead = `<thead>${renderer.tablerow({ text: header })}</thead>`
    const tbody = body ? `<tbody>${body}</tbody>` : ''

    return `<div class="article-prose__table-wrap"><table>${thead}${tbody}</table></div>\n`
  }

  return renderer
}

function getMarkdownParserOptions() {
  return {
    async: false,
    breaks: false,
    gfm: true,
    renderer: createMarkdownRenderer(),
  } as const
}

export function getNormalizedMarkdownTokens(markdown: string): TokensList {
  const tokens = Lexer.lex(markdown, {
    async: false,
    breaks: false,
    gfm: true,
  })

  const normalized = cloneTokensList(tokens)
  normalized.splice(0, normalized.length, ...normalizeBlockTokens(tokens))

  return normalized
}

export function renderMarkdownHtml(markdown: string): string {
  return Parser.parse(getNormalizedMarkdownTokens(markdown), getMarkdownParserOptions()) as string
}

export function renderMarkdownTokenHtml(token: Token): string {
  return Parser.parse([token], getMarkdownParserOptions()) as string
}