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
  const CANON: Record<string, string> = { neutral: 'light', engineering: 'light', media: 'dark' }

  let userChose = false
  let hoverWork: string | null = null // the cursor outranks the scroll
  let scrollWork = 'house'
  let scrollZone = 'neutral'

  function apply() {
    const w = hoverWork || scrollWork
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
    if (!userChose) root.setAttribute('data-mode', CANON[scrollZone])

    // the innermost thing carrying a work, at the middle of the screen, wins
    const mid = window.scrollY + window.innerHeight * 0.45
    let w = cur.el.dataset.work || 'house'
    document.querySelectorAll<HTMLElement>('[data-work]').forEach((el) => {
      const r = el.getBoundingClientRect()
      const t = r.top + window.scrollY
      if (mid >= t && mid < t + r.height) w = el.dataset.work as string
    })
    scrollWork = w
    apply()
  }

  // hover any work — a chip, a block, a row, a rail segment — and the WHOLE site re-tints.
  function wire() {
    document.querySelectorAll<HTMLElement>('.chip, .work, .index .row, .rail a').forEach((el) => {
      const w = el.dataset.w || el.dataset.work
      if (!w) return
      el.addEventListener('mouseenter', () => {
        hoverWork = w
        apply()
      })
      el.addEventListener('mouseleave', () => {
        hoverWork = null
        apply()
      })
    })
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

  const modeBtn = document.getElementById('mode')
  if (modeBtn) {
    modeBtn.addEventListener('click', () => {
      userChose = true
      root.setAttribute('data-mode', root.getAttribute('data-mode') === 'light' ? 'dark' : 'light')
    })
  }

  // multi-page nav highlight: mark the link whose route matches the current path.
  const path = window.location.pathname.replace(/\/$/, '') || '/'
  navs.forEach((a) =>
    a.dataset.route === path ? a.setAttribute('aria-current', 'page') : a.removeAttribute('aria-current'),
  )

  measure()
  observe()
  wire()
  sync()
  window.addEventListener('load', () => {
    measure()
    sync()
  })
}
