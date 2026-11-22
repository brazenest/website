/**
 * The chat home (v7). The conversation is the site's navigation: answers stream in from the
 * chat Worker, every on-site link is checked against the build-time allow-list, and the
 * colour engine follows the conversation — link a venture's page and the whole site takes
 * on that venture's colour, the rail segment lights, exactly as scrolling does elsewhere.
 *
 * Privacy: the transcript container carries `ph-no-capture`, so session replays never record
 * what a visitor typed or was told. Analytics gets counts only (`chat:asked`), never text.
 */
import links from '../data/chat-links.json'
import { CHAT_ENDPOINT, CHAT_LIMITS } from '../config/chat'

type Turn = { role: 'user' | 'assistant'; content: string }
type Link = { href: string; title: string; work?: string }

const ALLOWED = new Map<string, Link>((links as Link[]).map((l) => [l.href, l]))
const STORE = 'ag-chat'

export function initChat() {
  const root = document.documentElement
  const app = document.getElementById('chat')
  const log = document.getElementById('chat-log')
  const form = document.getElementById('chat-form') as HTMLFormElement | null
  const input = document.getElementById('chat-input') as HTMLTextAreaElement | null
  const send = document.getElementById('chat-send') as HTMLButtonElement | null
  const reset = document.getElementById('chat-reset') as HTMLButtonElement | null
  if (!app || !log || !form || !input || !send) return
  const box = input

  let turns: Turn[] = load()
  let busy = false
  let controller: AbortController | null = null

  app.setAttribute('data-ready', '')
  if (turns.length) {
    for (const t of turns) renderTurn(t, true)
    app.setAttribute('data-active', '')
    retintFrom(turns)
  }

  // ---- input ---------------------------------------------------------------------------
  const grow = () => {
    input.style.height = 'auto'
    input.style.height = `${Math.min(input.scrollHeight, 180)}px`
    send.disabled = busy || !input.value.trim()
  }
  input.addEventListener('input', grow)
  input.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' && !e.shiftKey && !e.isComposing) {
      e.preventDefault()
      form.requestSubmit()
    }
  })
  form.addEventListener('submit', (e) => {
    e.preventDefault()
    ask(input.value)
  })
  grow()

  // Suggested questions, and the rail: a venture segment asks about that venture instead of
  // leaving the conversation.
  document.addEventListener('click', (e) => {
    const el = (e.target as Element).closest<HTMLElement>('[data-ask], .rail a[data-name]')
    if (!el) return
    const q = el.dataset.ask ?? `Tell me about ${el.dataset.name}.`
    e.preventDefault()
    // The visitor picked a venture: take on its colour now, before the answer arrives.
    const w = el.dataset.w ?? el.dataset.work
    if (w && w !== 'house') setWork(w)
    ask(q, el.hasAttribute('data-ask') ? 'suggestion' : 'rail')
  })

  reset?.addEventListener('click', () => {
    controller?.abort()
    turns = []
    save()
    log.replaceChildren()
    app.removeAttribute('data-active')
    setWork('house')
    busy = false
    grow()
    input.focus()
  })

  // /#bolt (the rail on every other page links here for ventures with no page of their own)
  const askFromHash = (onLoad: boolean) => {
    const slug = decodeURIComponent(location.hash.slice(1))
    const seg = slug && document.querySelector<HTMLElement>(`.rail a[data-w="${CSS.escape(slug)}"]`)
    if (!seg) return
    history.replaceState(null, '', location.pathname)
    setWork(slug)
    // On load, don't pile a question onto a conversation the visitor came back to.
    if (!onLoad || !turns.length) ask(`Tell me about ${seg.dataset.name}.`, 'rail')
  }
  askFromHash(true)
  addEventListener('hashchange', () => askFromHash(false))

  // ---- conversation --------------------------------------------------------------------
  async function ask(raw: string, source: 'typed' | 'suggestion' | 'rail' = 'typed') {
    const q = raw.trim().slice(0, CHAT_LIMITS.maxUserChars)
    if (!q || busy) return
    if (turns.length + 1 > CHAT_LIMITS.maxMessages) {
      renderNotice('This conversation is full. Start a new one, or [get in touch with Alden](/contact) directly.')
      return
    }
    busy = true
    box.value = ''
    grow()
    app!.setAttribute('data-active', '')

    const userTurn: Turn = { role: 'user', content: q }
    turns.push(userTurn)
    renderTurn(userTurn)
    const bubble = renderTurn({ role: 'assistant', content: '' })
    bubble.setAttribute('data-pending', '')
    // Screen readers: hold announcements while the answer streams, then read it once.
    log!.setAttribute('aria-busy', 'true')
    scrollDown(true)
    document.dispatchEvent(new CustomEvent('chat:asked', { detail: { turn: turns.length, source } }))

    let text = ''
    let failed: string | null = null
    controller = new AbortController()
    try {
      const res = await fetch(CHAT_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: turns }),
        signal: controller.signal,
      })
      if (!res.ok || !res.body) {
        const err = await res.json().catch(() => ({}))
        throw new Error((err as { error?: string }).error || `http_${res.status}`)
      }
      const reader = res.body.pipeThrough(new TextDecoderStream()).getReader()
      let buf = ''
      for (;;) {
        const { value, done } = await reader.read()
        if (done) break
        buf += value
        let i: number
        while ((i = buf.indexOf('\n\n')) >= 0) {
          const line = buf.slice(0, i)
          buf = buf.slice(i + 2)
          if (!line.startsWith('data: ')) continue
          const msg = JSON.parse(line.slice(6)) as { t?: string; done?: boolean; error?: string }
          if (msg.error) throw new Error(msg.error)
          if (msg.t) {
            text += msg.t
            bubble.removeAttribute('data-pending')
            paint(bubble, text)
            scrollDown()
          }
        }
      }
    } catch (err) {
      failed = (err as Error).name === 'AbortError' ? 'aborted' : (err as Error).message
    }

    bubble.removeAttribute('data-pending')
    log!.removeAttribute('aria-busy')
    if (failed && failed !== 'aborted') {
      // Keep any partial answer visible but out of the history, and let them retry.
      turns.pop()
      if (!text) bubble.remove()
      renderNotice(errorCopy(failed))
      box.value = q
    } else if (text) {
      turns.push({ role: 'assistant', content: text })
      paint(bubble, text, true)
      save()
    }
    busy = false
    controller = null
    grow()
    scrollDown()
    if (matchMedia('(pointer:fine)').matches) box.focus()
  }

  // ---- rendering -----------------------------------------------------------------------
  function renderTurn(t: Turn, restoring = false): HTMLElement {
    const el = document.createElement('div')
    el.className = `msg msg--${t.role}`
    if (t.role === 'user') el.textContent = t.content
    else paint(el, t.content, restoring)
    log!.append(el)
    return el
  }

  function renderNotice(md: string) {
    const el = document.createElement('div')
    el.className = 'msg msg--notice'
    el.innerHTML = renderMarkdown(md).html
    log!.append(el)
    scrollDown(true)
  }

  /** Re-render the whole answer on each delta (answers are short); `final` adds the page chips. */
  function paint(el: HTMLElement, md: string, final = false) {
    const { html, linked } = renderMarkdown(md)
    el.innerHTML = `<div class="msg__body">${html}</div>`
    const lastWork = [...linked].reverse().find((l) => l.work)?.work
    if (lastWork) setWork(lastWork)
    if (final && linked.length) {
      const onsite = dedupe(linked)
      const chips = document.createElement('div')
      chips.className = 'msg__links'
      for (const l of onsite) {
        const a = document.createElement('a')
        a.href = l.href
        a.className = 'pagechip'
        if (l.work) a.setAttribute('data-work', l.work)
        if (/^https?:/.test(l.href)) Object.assign(a, { target: '_blank', rel: 'noopener noreferrer' })
        a.innerHTML = `<span>${escapeHtml(l.title)}</span><i aria-hidden="true">${/^https?:/.test(l.href) ? '↗' : '→'}</i>`
        chips.append(a)
      }
      el.append(chips)
    }
  }

  function retintFrom(ts: Turn[]) {
    for (const t of ts) if (t.role === 'assistant') {
      const w = [...renderMarkdown(t.content).linked].reverse().find((l) => l.work)?.work
      if (w) setWork(w)
    }
  }

  function setWork(w: string) {
    root.setAttribute('data-work', w)
    document.querySelectorAll<HTMLElement>('.rail a').forEach((a) =>
      a.dataset.w === w ? a.setAttribute('data-on', '') : a.removeAttribute('data-on'),
    )
  }

  function scrollDown(force = false) {
    const nearBottom = window.innerHeight + window.scrollY >= document.body.scrollHeight - 160
    if (force || nearBottom) window.scrollTo({ top: document.body.scrollHeight, behavior: force ? 'smooth' : 'auto' })
  }

  function load(): Turn[] {
    try {
      const v = JSON.parse(sessionStorage.getItem(STORE) || '[]')
      return Array.isArray(v) && v.every((t) => t && typeof t.content === 'string') ? v : []
    } catch {
      return []
    }
  }
  function save() {
    try {
      sessionStorage.setItem(STORE, JSON.stringify(turns))
    } catch {
      /* private mode: the conversation just won't survive a reload */
    }
  }
}

function errorCopy(code: string): string {
  if (code === 'rate_limited') return "That's a lot of questions at once. Give it a minute and try again."
  if (code === 'conversation_too_long') return 'This conversation is full. Start a new one, or [get in touch with Alden](/contact).'
  return "The guide couldn't answer just now. Try again in a moment, or browse [Engineering](/engineering), [Media](/media) and [the résumé](/resume)."
}

function dedupe(ls: Link[]): Link[] {
  const seen = new Set<string>()
  return ls.filter((l) => l.href !== '/' && !seen.has(l.href) && seen.add(l.href))
}

function escapeHtml(s: string): string {
  return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;')
}

/**
 * A deliberately tiny Markdown subset: paragraphs, "- " / "1. " lists, **bold**, *italic*,
 * `code`, and [links](href). Everything is escaped first, so the model can never inject
 * markup. A link renders only if its href is on the allow-list; otherwise just its text.
 * Exported for tests.
 */
export function renderMarkdown(md: string): { html: string; linked: Link[] } {
  const linked: Link[] = []
  const inline = (s: string) =>
    escapeHtml(s)
      .replace(/\[([^\]]+)\]\(([^)\s]+)\)/g, (_, text: string, href: string) => {
        const raw = href.replace(/&amp;/g, '&')
        const l = ALLOWED.get(raw) ?? ALLOWED.get(raw.replace(/\/$/, '') || '/')
        if (!l) return text
        linked.push(l)
        const ext = /^https?:/.test(l.href)
        return `<a href="${escapeHtml(l.href)}"${l.work ? ` data-work="${l.work}"` : ''}${ext ? ' target="_blank" rel="noopener noreferrer"' : ''}>${text}</a>`
      })
      .replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>')
      .replace(/(^|[^*])\*([^*\s][^*]*)\*/g, '$1<em>$2</em>')
      .replace(/`([^`]+)`/g, '<code>$1</code>')

  const out: string[] = []
  let list: { tag: 'ul' | 'ol'; items: string[] } | null = null
  let para: string[] = []
  const flushPara = () => {
    if (para.length) out.push(`<p>${inline(para.join(' '))}</p>`)
    para = []
  }
  const flushList = () => {
    if (list) out.push(`<${list.tag}>${list.items.map((i) => `<li>${inline(i)}</li>`).join('')}</${list.tag}>`)
    list = null
  }
  for (const line of md.split('\n')) {
    const bullet = /^\s*[-*•]\s+(.*)$/.exec(line)
    const num = /^\s*\d+[.)]\s+(.*)$/.exec(line)
    if (bullet || num) {
      flushPara()
      const tag = bullet ? 'ul' : 'ol'
      if (list && list.tag !== tag) flushList()
      list ??= { tag, items: [] }
      list.items.push((bullet ?? num)![1])
    } else if (!line.trim()) {
      flushPara()
      flushList()
    } else {
      flushList()
      para.push(line.replace(/^#+\s*/, '').trim())
    }
  }
  flushPara()
  flushList()
  return { html: out.join(''), linked }
}
