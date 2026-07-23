/**
 * The runtime colour engine (BUILD.md §3e, §4). Lifted from the <script> in
 * v6-engine-r2.html with the algorithm preserved EXACTLY. The only adaptation: the source
 * was a hash-routed SPA (.page.is-live), this is multi-page Astro — so the SPA route()/
 * hashchange machinery is dropped and every selector is scoped to the live document instead
 * of `.page.is-live`. A plain client script, not a framework island.
 *
 * Rules that must survive (§3e): hover outranks scroll; the innermost work in view wins;
 * the media zone lights up on arrival; the canonical zone→mode mapping unless the user chose.
 */
export function initEngine() {
  const root = document.documentElement
  const segs = [...document.querySelectorAll<HTMLElement>('.rail a')]
  const groups = [...document.querySelectorAll<HTMLElement>('.rgroup')]
  const navs = [...document.querySelectorAll<HTMLElement>('.menu a[data-route]')]

  let scrollWork = 'house'
  let scrollZone = 'neutral'

  function apply() {
    // Colour follows the SCROLL only — the work whose area has entered the viewport — never
    // the cursor. Hovering a chip/work/rail no longer re-tints the site.
    const w = scrollWork
    root.setAttribute('data-work', w)
    segs.forEach((a) => (a.dataset.w === w ? a.setAttribute('data-on', '') : a.removeAttribute('data-on')))
    groups.forEach((g) =>
      g.dataset.z === scrollZone ? g.setAttribute('data-on', '') : g.removeAttribute('data-on'),
    )
  }

  // the grounds abut. whatever is under the header decides the zone.
  let bounds: { el: HTMLElement; top: number; zone: string }[] = []
  function measure() {
    bounds = [...document.querySelectorAll<HTMLElement>('[data-zone]')].map((el) => ({
      el,
      top: el.getBoundingClientRect().top + window.scrollY,
      zone: el.dataset.zone as string,
    }))
  }
  function sync() {
    if (!bounds.length) return
    const probe = window.scrollY + 74
    let cur = bounds[0]
    for (const b of bounds) {
      if (probe >= b.top) cur = b
    }
    scrollZone = cur.zone
    root.setAttribute('data-zone', scrollZone)
    // NOTE: data-mode (light/dark) is a stable user/system theme now — set once before
    // paint and only changed by the toggle. It is deliberately NOT driven by scroll zone,
    // so dark theme keeps the hero and every zone dark. Only data-zone (colour/fonts/
    // grounds) tracks the scroll here.

    // the innermost thing carrying a work, at the middle of the screen, wins
    const mid = window.scrollY + window.innerHeight * 0.45
    // Zone fallback: a coloured section declares its DEFAULT work via data-zwork (not
    // data-work) so it does NOT pin its own --w-deep — the ground then inherits the live,
    // engine-driven value on <html> and transitions with the work as you scroll.
    let w = cur.el.dataset.work || cur.el.dataset.zwork || 'house'
    document.querySelectorAll<HTMLElement>('[data-work]').forEach((el) => {
      const r = el.getBoundingClientRect()
      const t = r.top + window.scrollY
      if (mid >= t && mid < t + r.height) w = el.dataset.work as string
    })
    scrollWork = w
    apply()
  }

  // the one motion that isn't colour: the media zone's light coming up. light isn't movement.
  let io: IntersectionObserver | undefined
  function observe() {
    if (io) io.disconnect()
    io = new IntersectionObserver(
      (es) => {
        es.forEach((e) => {
          if (e.isIntersecting) e.target.classList.add('lit')
        })
      },
      { rootMargin: '0px 0px -18% 0px', threshold: 0.08 },
    )
    document.querySelectorAll('.z-media').forEach((el) => io!.observe(el))
  }

  let queued = false
  window.addEventListener(
    'scroll',
    () => {
      if (queued) return
      queued = true
      requestAnimationFrame(() => {
        sync()
        queued = false
      })
    },
    { passive: true },
  )
  window.addEventListener('resize', () => {
    measure()
    sync()
  })

  // THEME (light/dark) — a stable user/system preference, persisted with a 7-day
  // expiry keyed off last interaction. The initial value was set pre-paint by the
  // inline script in <head>; here we wire the toggle and OS-change following.
  const THEME_KEY = 'ag-mode'
  const THEME_MAXAGE = 7 * 24 * 3600 * 1000
  function storedMode(): 'light' | 'dark' | null {
    try {
      const raw = localStorage.getItem(THEME_KEY)
      if (!raw) return null
      const o = JSON.parse(raw)
      if ((o.mode === 'light' || o.mode === 'dark') && Date.now() - (+o.ts || 0) <= THEME_MAXAGE) return o.mode
      localStorage.removeItem(THEME_KEY)
    } catch {
      /* ignore */
    }
    return null
  }
  function saveMode(mode: 'light' | 'dark') {
    try {
      localStorage.setItem(THEME_KEY, JSON.stringify({ mode, ts: Date.now() }))
    } catch {
      /* ignore */
    }
  }

  const modeBtn = document.getElementById('mode')
  if (modeBtn) {
    modeBtn.addEventListener('click', () => {
      const next = root.getAttribute('data-mode') === 'dark' ? 'light' : 'dark'
      root.setAttribute('data-mode', next)
      saveMode(next)
    })
  }

  // Follow the OS theme live, but only while the user has no active stored choice.
  const mq = window.matchMedia('(prefers-color-scheme: dark)')
  mq.addEventListener?.('change', (e) => {
    if (storedMode()) return
    root.setAttribute('data-mode', e.matches ? 'dark' : 'light')
  })

  // multi-page nav highlight: mark the link whose route matches the current path.
  const path = window.location.pathname.replace(/\/$/, '') || '/'
  navs.forEach((a) =>
    a.dataset.route === path ? a.setAttribute('aria-current', 'page') : a.removeAttribute('aria-current'),
  )

  measure()
  observe()
  sync()
  window.addEventListener('load', () => {
    measure()
    sync()
  })
}
