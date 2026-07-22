/**
 * Entrance motion — restrained scroll/load reveals + a count-up on stat numbers.
 *
 * Progressive enhancement: a tiny inline script in <head> adds `class="anim"` to <html>
 * ONLY when JS runs and prefers-reduced-motion is not set. All the hiding lives under
 * `.anim [data-reveal]` in engine.css, so with no JS or reduced motion the content is
 * simply visible and this module is a no-op. It never leaves anything hidden (failsafe).
 */
export function initReveal(): void {
  // Signal the head-inline failsafe that the module is alive, so it won't un-hide
  // everything. Set unconditionally, before any early return.
  ;(window as unknown as { __revealReady?: boolean }).__revealReady = true

  const root = document.documentElement
  if (!root.classList.contains('anim')) return

  const revealEls = Array.from(document.querySelectorAll<HTMLElement>('[data-reveal]'))

  // Prime count-up targets: stash the final value, show padded zeros until revealed.
  for (const el of document.querySelectorAll<HTMLElement>('[data-countup]')) {
    const raw = (el.textContent ?? '').trim()
    if (!/^\d+$/.test(raw)) continue
    el.dataset.countTo = raw
    el.dataset.countPad = String(raw.length)
    el.textContent = '0'.repeat(raw.length)
  }

  const reveal = (el: HTMLElement) => {
    el.classList.add('is-in')
    if (el.dataset.countTo) countUp(el)
    else for (const c of el.querySelectorAll<HTMLElement>('[data-countup]')) if (c.dataset.countTo) countUp(c)
  }

  if (!('IntersectionObserver' in window) || revealEls.length === 0) {
    revealEls.forEach(reveal)
    return
  }

  const io = new IntersectionObserver(
    (entries) => {
      for (const e of entries) {
        if (e.isIntersecting) {
          reveal(e.target as HTMLElement)
          io.unobserve(e.target)
        }
      }
    },
    { rootMargin: '0px 0px -8% 0px', threshold: 0.1 },
  )
  revealEls.forEach((el) => io.observe(el))

  // Failsafe: never leave content hidden (IO quirks, bfcache restores, etc.).
  window.setTimeout(() => revealEls.forEach((el) => el.classList.contains('is-in') || reveal(el)), 2600)
}

/** Counts an integer stat from 0 → target once, easing out, preserving leading zeros. */
function countUp(el: HTMLElement): void {
  const target = parseInt(el.dataset.countTo ?? '', 10)
  const pad = parseInt(el.dataset.countPad ?? '1', 10)
  if (Number.isNaN(target)) return
  delete el.dataset.countTo // run once

  const DURATION = 900
  const easeOut = (t: number) => 1 - Math.pow(1 - t, 3)
  let start = 0
  const step = (ts: number) => {
    if (!start) start = ts
    const t = Math.min(1, (ts - start) / DURATION)
    el.textContent = String(Math.round(easeOut(t) * target)).padStart(pad, '0')
    if (t < 1) requestAnimationFrame(step)
  }
  requestAnimationFrame(step)
}
