/**
 * Builds the chat bot's knowledge pack from the Payload export (astro/src/data/*.json).
 *
 * Run after `pnpm run export` (it's wired into the root `predeploy`):
 *   pnpm run chat:knowledge
 *
 * Writes two files, both generated — never edit them by hand:
 *   chat-worker/src/knowledge.generated.ts  — the reference text the model answers from
 *   astro/src/data/chat-links.json          — the link allow-list the chat UI enforces
 *
 * ONE source for both, so the bot can never be told about a page the site doesn't have,
 * and the UI never renders a link the bot wasn't told about.
 *
 * What goes in is ONLY what the export already publishes. The export drops unverified
 * education rows and draft posts; the About seed already omits the facts still held back
 * for verification. Nothing here adds facts — it only reshapes published copy into text.
 * The phone number is deliberately left out: the bot points people to /contact instead.
 */
import { readFileSync, writeFileSync } from 'node:fs'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const here = dirname(fileURLToPath(import.meta.url))
const DATA = resolve(here, '../../astro/src/data')
const OUT_TS = resolve(here, '../src/knowledge.generated.ts')
const OUT_LINKS = resolve(DATA, 'chat-links.json')

const read = (name: string) => JSON.parse(readFileSync(resolve(DATA, `${name}.json`), 'utf8'))
const about = read('about')
const resume = read('resume')
const caseStudies: any[] = read('case-studies')
const ventures: any[] = read('ventures')
const films: any[] = read('films')
const posts: any[] = read('posts')
const siteMeta = read('site-meta')
const categories: any[] = read('blog-categories')

// ---------------------------------------------------------------------------------------------
// Lexical rich text → Markdown (links kept, so the model sees where a post itself points).
// ---------------------------------------------------------------------------------------------
type Node = { type: string; text?: string; tag?: string; listType?: string; children?: Node[]; url?: string; fields?: { url?: string } }

function md(nodes: Node[] | undefined, depth = 0): string {
  return (nodes ?? []).map((n) => mdNode(n, depth)).join('')
}
function mdNode(n: Node, depth: number): string {
  switch (n.type) {
    case 'text':
      return n.text ?? ''
    case 'linebreak':
      return '\n'
    case 'link':
    case 'autolink':
      return `[${md(n.children, depth)}](${n.fields?.url || n.url || ''})`
    case 'paragraph': {
      const t = md(n.children, depth).trim()
      return t ? `${t}\n\n` : ''
    }
    case 'heading':
      return `### ${md(n.children, depth).trim()}\n\n`
    case 'quote':
      return `> ${md(n.children, depth).trim()}\n\n`
    case 'list':
      return (n.children ?? []).map((li, i) => {
        const only = li.children?.length === 1 ? li.children[0] : undefined
        if (only?.type === 'list') return mdNode(only, depth + 1)
        const bullet = n.listType === 'number' ? `${i + 1}.` : '-'
        return `${'  '.repeat(depth)}${bullet} ${md(li.children, depth).trim()}\n`
      }).join('') + (depth === 0 ? '\n' : '')
    case 'horizontalrule':
    case 'horizontalRule':
      return '---\n\n'
    default:
      return md(n.children, depth)
  }
}
const rich = (v: any) => (v?.root ? md((v.root as Node).children).trim() : '')
const clean = (s: string) => s.replace(/\n{3,}/g, '\n\n').trim()

// ---------------------------------------------------------------------------------------------
// The link allow-list. `work` is the venture whose colour the chat UI shifts to when the
// bot links that page — the site's colour engine, carried into the conversation.
// ---------------------------------------------------------------------------------------------
interface ChatLink { href: string; title: string; work?: string }
const links: ChatLink[] = [
  { href: '/', title: 'Home (this chat)' },
  { href: '/engineering', title: 'Engineering — all case studies' },
  { href: '/media', title: 'Media — films and photography', work: 'shadowcat' },
  { href: '/blog', title: 'Blog — all posts' },
  { href: '/about', title: 'About Alden' },
  { href: '/resume', title: 'Résumé (web)' },
  { href: '/resume.pdf', title: 'Résumé (PDF download)' },
  { href: '/contact', title: 'Contact form — hiring, projects, commissions' },
]
const ventureName = Object.fromEntries(ventures.map((v) => [v.slug, v.name]))
for (const c of caseStudies) if (c.venture) links.push({ href: `/engineering/${c.venture}`, title: `${ventureName[c.venture] ?? c.venture} — engineering case study`, work: c.venture })
for (const f of films) if (f.venture) links.push({ href: `/media/${f.venture}`, title: `${f.title} — film`, work: f.venture })
const published = posts.filter((p) => p.publishedAt).sort((a, b) => +new Date(b.publishedAt) - +new Date(a.publishedAt))
for (const p of published) links.push({ href: `/blog/posts/${p.slug}`, title: `Blog: ${p.title}`, work: p.relatedVenture ?? undefined })
for (const v of ventures) for (const l of v.links ?? []) links.push({ href: l.url, title: `${v.name} — ${l.label}`, work: v.slug })
for (const s of siteMeta.social ?? []) if (!links.some((l) => l.href === s.url)) links.push({ href: s.url, title: s.label })

// ---------------------------------------------------------------------------------------------
// The reference text.
// ---------------------------------------------------------------------------------------------
const out: string[] = []
const h = (t: string) => out.push(`\n## ${t}\n`)

h('Site pages (the ONLY URLs you may link)')
out.push(links.map((l) => `- ${l.href} — ${l.title}`).join('\n'))

h('At a glance')
out.push(`Name: ${resume.name}. ${resume.headline ?? ''}. Based in ${about.location ?? resume.location}.`)
out.push(siteMeta.proofNumbers.map((p: any) => `- ${p.value}: ${p.label}`).join('\n'))
if (about.now?.text) out.push(`\nWhat Alden is doing now: ${about.now.text}`)
out.push(`\nContact: the form at /contact (best), or email ${siteMeta.contactEmail}. LinkedIn and GitHub are listed above.`)

h('About (from /about)')
if (about.intro) out.push(about.intro)
out.push(rich(about.bio))
for (const d of about.disciplines ?? []) out.push(`\n### Discipline: ${d.label}${d.tagline ? ` — ${d.tagline}` : ''}\n${d.points.map((p: string) => `- ${p}`).join('\n')}`)
out.push('\n### Principles')
for (const p of about.principles ?? []) out.push(`- **${p.title}** ${p.body ?? ''}`)

h('Résumé (from /resume)')
if (resume.summary) out.push(resume.summary)
for (const e of resume.experience) {
  out.push(`\n### ${e.title} — ${e.organization}${e.timeframe ? ` (${e.timeframe})` : ''}`)
  if (e.context) out.push(e.context)
  out.push(e.bullets.map((b: string) => `- ${b}`).join('\n'))
}
out.push('\n### Ventures')
for (const v of resume.ventures) out.push(`- ${v.name}${v.category ? ` (${v.category})` : ''}${v.status ? ` — ${v.status}` : ''}${v.tagline ? `: ${v.tagline}` : ''}`)
out.push('\n### Skills')
for (const s of resume.skills) out.push(`- ${s.title}: ${s.items.join(', ')}`)
if (resume.education?.length) {
  out.push('\n### Education')
  for (const e of resume.education) out.push(`- ${e.credential}${e.institution ? `, ${e.institution}` : ''}${e.timeframe ? ` (${e.timeframe})` : ''}`)
}

h('Ventures and brands')
out.push('Radiant Ventures is Alden\'s holding company for the products he builds and runs. Shadowcat Pictures is his separate production company (films and photography).')
for (const v of ventures.filter((v) => v.slug !== 'house')) {
  const page = caseStudies.some((c) => c.venture === v.slug) ? `/engineering/${v.slug}` : films.some((f) => f.venture === v.slug) ? `/media/${v.slug}` : null
  out.push(`- ${v.name} (${v.zone})${v.tagline ? ` — ${v.tagline}` : ''}${page ? ` Page: ${page}.` : ''}${v.links?.length ? ` External: ${v.links.map((l: any) => l.url).join(', ')}.` : ''}`)
}

h('Engineering case studies')
for (const c of caseStudies) {
  const name = ventureName[c.venture] ?? c.venture
  out.push(`\n### ${name} — /engineering/${c.venture}`)
  out.push([c.role && `Role: ${c.role}`, c.timeline && `Timeline: ${c.timeline}`, c.status && `Status: ${c.status}`].filter(Boolean).join(' · '))
  if (c.hook) out.push(c.hook)
  if (c.stack?.length) out.push(`Stack: ${c.stack.join(', ')}`)
  if (c.problem) out.push(`**The problem.** ${c.problem.drop ?? ''} ${rich(c.problem.body)}`)
  for (const b of c.built ?? []) out.push(`- **${b.lead}** ${b.body}`)
  if (c.queryTrace?.steps?.length) {
    out.push(`**How a query flows${c.queryTrace.query ? ` (example: "${c.queryTrace.query}")` : ''}:**`)
    for (const s of c.queryTrace.steps) out.push(`${s.no}. ${s.name} — ${rich(s.description)}`)
  }
  for (const d of c.decisions ?? []) out.push(`**Decision: ${d.question}** ${rich(d.answer)}`)
  if (c.interface?.mode === 'nda') out.push(`Interface: under NDA. ${c.interface.note ?? ''}`)
  if (c.results?.length) out.push(`Results: ${c.results.map((r: any) => `${r.value} ${r.label}`).join('; ')}${c.resultsCaveat ? ` (${c.resultsCaveat})` : ''}`)
}

h('Films')
for (const f of films) {
  out.push(`\n### ${f.title} — /media/${f.venture}`)
  out.push([f.year, f.runtime, f.camera && `shot on ${f.camera}`].filter(Boolean).join(' · '))
  if (f.logline) out.push(f.logline)
  if (f.credits?.length) out.push(`Credits: ${f.credits.map((c: any) => `${c.role}: ${c.name}`).join('; ')}`)
  if (f.services?.length) out.push(`Services offered: ${f.services.map((s: any) => `${s.title} (${s.note})`).join('; ')}`)
}

h('Blog posts (newest first; full text)')
const catLabel = Object.fromEntries(categories.map((c) => [c.value, c.label]))
for (const p of published) {
  out.push(`\n### ${p.title} — /blog/posts/${p.slug}`)
  out.push(`Published ${p.publishedAt.slice(0, 10)}${p.category ? ` · ${catLabel[p.category] ?? p.category}` : ''}${p.readTime ? ` · ${p.readTime} min read` : ''}`)
  if (p.excerpt) out.push(`Summary: ${p.excerpt}`)
  out.push(rich(p.body))
}

const knowledge = clean(out.join('\n'))

writeFileSync(
  OUT_TS,
  `/* AUTO-GENERATED by chat-worker/scripts/build-knowledge.ts from the Payload export — do not edit. */\n` +
    `export const KNOWLEDGE = ${JSON.stringify(knowledge)}\n`,
)
writeFileSync(OUT_LINKS, JSON.stringify(links, null, 2) + '\n')
console.log(`knowledge: ${knowledge.length.toLocaleString()} chars (~${Math.round(knowledge.length / 4).toLocaleString()} tokens), ${links.length} links`)
