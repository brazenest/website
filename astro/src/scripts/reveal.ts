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

  // A RELOAD gets NO cross-document view transition. A reload "transitions" the page into a
  // copy of itself: the browser freezes the old frame while the new document renders, which
  // stalls the content by ~1s and reads as a broken load. Skip it so a reload paints straight
  // away — genuine page-to-page navigations still transition. (Registered before the
  // reduced-motion return so it always applies; `pageswap` fires on THIS page as it leaves.)
  window.addEventListener('pageswap', (e) => {
    const ev = e as unknown as {
      viewTransition?: { skipTransition(): void }
      activation?: { navigationType?: string }
    }
    if (ev.viewTransition && ev.activation?.navigationType === 'reload') ev.viewTransition.skipTransition()
  })

  const root = document.documentElement
  if (!root.classList.contains('anim')) return

  const revealEls = Array.from(document.querySelectorAll<HTMLElement>('[data-reveal]'))

  // Prime count-up targets: stash the final value, show padded zeros until counted.
  for (const el of document.querySelectorAll<HTMLElement>('[data-countup]')) {
    const raw = (el.textContent ?? '').trim()
    if (!/^\d+$/.test(raw)) continue
    el.dataset.countTo = raw
    el.dataset.countPad = String(raw.length)
    el.textContent = '0'.repeat(raw.length)
  }

  // Count-up runs on its OWN viewport trigger, decoupled from the entrance reveal: each
  // stat counts as it scrolls into view. So the numbers animate when they ENTER the
  // viewport (never while off-screen), and a page/view transition can't swallow the count
  // the way it would if it fired with the load entrance — by the time you scroll to the
  // stats, any transition is long finished.
  const countEls = Array.from(document.querySelectorAll<HTMLElement>('[data-countup]')).filter(
    (el) => el.dataset.countTo,
  )
  if (countEls.length) {
    if ('IntersectionObserver' in window) {
      const cio = new IntersectionObserver(
        (entries) => {
          for (const e of entries) {
            if (e.isIntersecting) {
              countUp(e.target as HTMLElement)
              cio.unobserve(e.target)
            }
          }
        },
        { threshold: 0.35 },
      )
      countEls.forEach((el) => cio.observe(el))
    } else {
      countEls.forEach(countUp)
    }
  }

  const reveal = (el: HTMLElement) => {
    el.classList.add('is-in')
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
  // Split now: below-the-fold waits for the observer; above-the-fold is the load
  // entrance. Snapshot which are in view BEFORE anything reveals.
  const inView: HTMLElement[] = []
  for (const el of revealEls) {
    const r = el.getBoundingClientRect()
    // In view OR already scrolled past (bottom <= 0 — e.g. a scroll-restored reload or a
    // back-navigation): both count as the entrance / already "seen". Only genuinely
    // below-the-fold content waits for the observer so it plays as you scroll to it.
    if (r.top < window.innerHeight) inView.push(el)
    else io.observe(el)
  }

  let played = false
  const playEntrance = () => {
    if (played) return
    played = true
    inView.forEach(reveal)
  }

  // WHEN the entrance plays matters on Chromium. With native cross-document view
  // transitions (@view-transition), a navigation/reload freezes the incoming page into
  // a snapshot and cross-fades it; revealing synchronously bakes the rise INTO that
  // snapshot, so the motion is never seen (Firefox has no such transition, so it always
  // played there — hence "works on FF, not Chromium"). Fix: where the transition exists
  // (feature-detected via the `pagereveal` event), play AFTER it finishes, on the live
  // page. Elsewhere, play next frame — which also guarantees the hidden state paints once
  // so the CSS transition actually fires.
  if ('onpagereveal' in window) {
    window.addEventListener(
      'pagereveal',
      (e) => {
        const vt = (e as unknown as { viewTransition?: { finished: Promise<void> } }).viewTransition
        if (vt) vt.finished.then(playEntrance, playEntrance)
        else requestAnimationFrame(() => requestAnimationFrame(playEntrance))
      },
      { once: true },
    )
  } else {
    requestAnimationFrame(() => requestAnimationFrame(playEntrance))
  }

  // Failsafe: if the entrance never played (e.g. a `pagereveal` that never arrives), reveal
  // the entrance set so nothing above the fold is stranded hidden. Scoped to `inView` on
  // PURPOSE — below-the-fold elements must keep waiting for the observer, or this would fade
  // them in off-screen and they'd never play their scroll reveal.
  window.setTimeout(() => {
    if (!played) inView.forEach(reveal)
  }, 1600)
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
