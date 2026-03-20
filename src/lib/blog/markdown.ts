export function getMarkdownParagraphs(markdown: string): string[] {
  return markdown
    .split(/\n{2,}/)
    .map((paragraph) => paragraph.trim())
    .filter(Boolean)
}