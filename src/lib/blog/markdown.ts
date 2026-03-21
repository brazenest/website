import { marked } from 'marked'

export function getMarkdownParagraphs(markdown: string): string[] {
  return markdown
    .split(/\n{2,}/)
    .map((paragraph) => paragraph.trim())
    .filter(Boolean)
}

export function renderMarkdownHtml(markdown: string): string {
  return marked.parse(markdown, { async: false }) as string
}