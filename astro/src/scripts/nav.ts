/**
 * The mobile nav panel (v6.2). Progressive enhancement over the CSS in engine.css:
 * without JS the hamburger simply never opens, and the links stay reachable because the
 * panel's own markup is still in the document — so this file only ever ADDS behaviour.
 *
 * The panel is the SAME .nav element that is a plain header row on desktop; below the
 * breakpoint CSS repositions it. That means there is exactly one #mode button on the page,
 * and the colour engine's getElementById('mode') keeps working untouched.
 */

/** Must match the MOBILE NAV breakpoint in engine.css. */
const BREAKPOINT = '(max-width:1024px)'

export function initNav() {
  const header = document.getElementById('top')
  const panel = document.getElementById('nav')
  const btn = document.getElementById('navbtn')
  if (!header || !panel || !btn) return

  const mq = window.matchMedia(BREAKPOINT)
  // Everything the panel overlays. Made inert while open so Tab and screen-reader
  // navigation stay inside the menu — a real trap, without hand-rolling focus cycling.
  const behind = () =>
    [document.getElementById('main'), document.querySelector('.foot'), document.getElementById('rail')].filter(
      (el): el is HTMLElement => !!el,
    )

  let open = false

  function setOpen(next: boolean) {
    if (next === open) return
    open = next
    header!.toggleAttribute('data-open', open)
    btn!.setAttribute('aria-expanded', String(open))
    document.documentElement.classList.toggle('nav-open', open)
    behind().forEach((el) => el.toggleAttribute('inert', open))

    if (open) {
      // Focus the first link so a keyboard user lands inside the panel they just opened.
      panel!.querySelector<HTMLElement>('a,button')?.focus()
    }
  }

  /** Close and hand focus back to the control that opened it. */
  function close(refocus = false) {
    if (!open) return
    setOpen(false)
    if (refocus) btn!.focus()
  }

  btn.addEventListener('click', () => setOpen(!open))

  // Escape closes and returns focus — the expected contract for any disclosure.
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') close(true)
  })

  // A tap outside the panel (and outside the button, which toggles on its own) closes it.
  document.addEventListener('pointerdown', (e) => {
    if (!open) return
    const t = e.target as Node
    if (!panel.contains(t) && !btn.contains(t)) close()
  })

  // In-page links (the "#" anchors) don't reload the document, so nothing would otherwise
  // dismiss the panel. Full navigations close it as a side effect of the page unloading —
  // closing here too keeps the transition from painting an open menu on the way out.
  panel.addEventListener('click', (e) => {
    if ((e.target as HTMLElement).closest('a')) close()
  })

  // Crossing back into the desktop layout must not leave the page inert + scroll-locked
  // with an invisible "open" panel.
  mq.addEventListener('change', (e) => {
    if (!e.matches) close()
  })

  // Restoring from the bfcache replays the old DOM; make sure it isn't a locked one.
  window.addEventListener('pageshow', (e) => {
    if ((e as PageTransitionEvent).persisted) close()
  })
}
