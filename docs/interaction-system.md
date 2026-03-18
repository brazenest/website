# Interaction System Definition & Patterns

**Date**: March 18, 2026  
**Phase**: 10 — Interaction + Polish  
**Subphase**: Interaction System Definition  
**Reference**: Phase 10 Pre-Flight Alignment ([docs/phase-10-preflight.md](phase-10-preflight.md))

---

## 1. Core Interaction Types

All interactions on the site fall into four categories:

| Type                        | Purpose                               | Examples                                      | Motion Profile                        |
| --------------------------- | ------------------------------------- | --------------------------------------------- | ------------------------------------- |
| **Card Interactions**       | Enable exploration of grouped content | Side cards, project cards, media cards        | Quick lift or scale + subtle shadow   |
| **CTA Interactions**        | Signal affordance and confirm clicks  | Buttons, primary links                        | Color shift + optional forward motion |
| **Navigation Transitions**  | Connect page-level views              | Route changes, layout swaps                   | Fade + minimal vertical motion        |
| **Passive Scroll Behavior** | Support reading rhythm                | Section entry fades, scroll-triggered reveals | Subtle, long-duration fade            |

**Constraint**: Interactions must not mix categories within a single viewport. A card hover must not overlap with a scrolling animation, etc.

---

## 2. Card Interaction Pattern

**Applies to**:

- `SideCard.tsx` (side selection cards)
- `ProjectCard.tsx` (engineering case study cards)
- `MediaCard.tsx` (production case study cards)
- `Card.tsx` base component (all card-based compositions)

**Design Intent**:

- Cards are the primary interactive surface; their behavior establishes the motion vocabulary for the whole site
- They should feel responsive and directly manipulable (not distant or decorative)
- Desktop hover and mobile press feedback should feel coordinated, not separate

### Default State

- **Visual**: Cards have clear visual separateness (border, subtle background tint, or shadow)
- **Affordance**: Card is clearly interactive without hover (no "reveal on hover" surprises)
- **Constraint**: No animation in default state; card is at rest

### Hover State (Desktop)

**Trigger**: `@media (hover: hover)` and mouse over card

**Animation**:

- **What changes**: Transform (scale or translate-y) + shadow expansion
- **Scale approach** (recommended):
  - Apply `transform: scale(1.02)` + `box-shadow: var(--shadow-lg)` on card hover
  - Transform origin: center or `top left` depending on card position
- **Translate approach** (alternative):
  - Apply `transform: translateY(-4px)` + shadow expansion
  - Creates "lift" sensation without resize

**Timing**:

- **Duration**: 200ms
- **Easing**: `cubic-bezier(0.2, 0.3, 0.3, 1)` (smooth, responsive acceleration)
- **Delay**: 0ms (instant response)

**Child Elements**:

- Text/content inside card does not need separate animation
- Links inside card inherit card's hover state (no independent animation)

### Active/Press State (Mobile & Desktop)

**Trigger**: Mouse click or touch press on card

**Animation**:

- **What changes**: Transform (scale-down) or color shift
- **Scale approach**:
  - Apply `transform: scale(0.98)` when pressed
  - Creates "compression" feedback
- **Color approach** (alternative):
  - Shift card background to `var(--surface-2)` or add subtle tint
  - More conservative; works on all devices

**Timing**:

- **Duration**: 100ms (snappy, immediate feedback)
- **Easing**: `ease-out`
- **Delay**: 0ms

**Constraint**: Active state should be brief and resolve quickly (on click, not sustained on drag)

### Focus State (Keyboard Navigation)

**Trigger**: Tab focus on card or `a` element inside card

**Animation**:

- **What changes**: Add clear focus ring + subtle background highlight
- **Visual**:
  - Focus ring: `2px solid var(--focus)` (typically `--color-neutral-700`)
  - Background: Subtle tint (e.g., `bg-neutral-50` or theme-specific color)

**Timing**:

- **Duration**: Instant (no animation)
- **Constraint**: Focus must be clearly visible without delay

### Interaction Flow (Card Lifecycle)

```
[Default]
   ↓ mouse over
[Hover] (200ms cubic-bezier)
   ↓ click
[Press] (100ms ease-out) → navigate
---
[Default]
   ↓ tab focus
[Focus Ring] (instant)
   ↓ click or Enter
[Press] (100ms ease-out) → navigate
```

---

## 3. CTA Interaction Pattern

**Applies to**:

- `ButtonLink.tsx` (primary buttons)
- Any `<a>` with `.ui-button-link` class
- Primary CTAs across the site ("View Work", "Start a conversation", etc.)

**Design Intent**:

- CTAs must feel confident and clickable without relying on hover
- Distinction between primary/secondary variants (color, intensity)
- Motion should feel inviting without being pushy

### Default State

- **Visual**: Button is visually prominent with solid color or clear border
- **Affordance**: Button shape and color make it obviously clickable
- **Constraint**: No animation; button is at rest

### Hover State (Desktop)

**Trigger**: `@media (hover: hover)` and mouse over button

**Animation for Primary Buttons**:

- **Option A (Color Brightness)**:
  - Shift background color 10% brighter
  - Or shift text color to lighter/more saturated shade
  - Example: `background: color-mix(in srgb, currentColor 110%, white)`
- **Option B (Forward Motion)**:
  - Combine color shift with `transform: translateX(2px)`
  - Arrow icon (if present) animates slightly forward
  - Creates sense of "ready to go"
- **Recommended**: Start with Option A (simpler, more universally compatible)

**Timing**:

- **Duration**: 150ms (faster than cards—CTAs should feel snappy)
- **Easing**: `cubic-bezier(0.3, 0.3, 0.3, 1)` (quick response)
- **Delay**: 0ms

**Animation for Secondary Buttons**:

- More restrained version of primary
- Shift color minimally or adjust opacity
- Same timing (150ms) for consistency

### Active/Press State (Mobile & Desktop)

**Trigger**: Mouse click or touch press on button

**Animation**:

- **What changes**: Scale-down or color shift
- **Scale approach**:
  - Apply `transform: scale(0.95)` on press
  - Creates tactile "click" feedback
- **Color approach** (alternative):
  - Darken or desaturate color slightly
  - More minimal feedback

**Timing**:

- **Duration**: 100ms (immediate, snappy)
- **Easing**: `ease-out`
- **Delay**: 0ms

### Focus State (Keyboard Navigation)

**Trigger**: Tab focus on button or `a` element

**Animation**:

- **What changes**: Add focus ring + optional background tint
- **Visual**:
  - Focus ring: `2px solid var(--focus)` with offset
  - Background: Subtle background highlight if not already colored

**Timing**:

- **Duration**: Instant
- **Constraint**: Focus must be visible without delay

### Arrow Icon Animation (If Present)

**Applies to**: CTAs with trailing arrow icon (→ or similar)

**Option 1 (Static)**:

- Arrow moves with button on hover/press (no independent animation)
- Simplest approach; maintains clarity

**Option 2 (Subtle Slide)**:

- Arrow shifts right by 2-3px on button hover
- Only if button background shifts left minimally
- Must not create visual noise

**Recommended**: Option 1 (arrow moves with button, no independent animation)

---

## 4. Transition Language

**Applies to**:

- Route changes (page-level navigation)
- Layout or view transitions
- Any full-screen or major content swap

**Design Intent**:

- Transitions should feel intentional and connected (not jarring)
- They establish the motion vocabulary for navigation
- Minimal complexity; prefer fade over complex multi-stage animations

### Transition Pattern for Route Changes

**Outgoing Page Animation**:

- **Duration**: 300ms total
- **What changes**: `opacity: 1 → 0` + optional `transform: translateY(-8px)`
- **Easing**: `cubic-bezier(0.3, 0.3, 0.3, 1)` (smooth exit)

**Incoming Page Animation**:

- **Delay**: Starts after outgoing page completes (300ms delay)
- **Duration**: 300ms
- **What changes**: `opacity: 0 → 1` + optional content enters from scroll position
- **Easing**: Same cubic-bezier

**Total Transition Time**: 600ms (300ms out + 300ms in)

**Alternative (Crossfade, Faster)**:

- Outgoing and incoming overlap completely
- Duration: 300ms total (both animations in parallel)
- Both use opacity fade
- Feels more contemporary; less "sequential"
- **Recommended** if site feels sluggish

### Constraint

- **No overlapping animations**: While page transition occurs, no other animations (cards, buttons) should change state
- **Content must be readable**: Incoming page content must appear before user can interact with it (no re-render delays)

---

## 5. Scroll Rhythm & Passive Behavior

**Design Intent**:

- Animations that trigger during scroll should be subtle and support reading rhythm
- They reinforce hierarchy without competing for attention
- Keep implementation simple (prefer CSS `:in-view` or Intersection Observer, not frame-by-frame JS)

### Section Entry Fade

**When**: Section or card enters viewport during scroll

**Animation**:

- **What changes**: `opacity: 0 → 1`
- **Duration**: 400ms (longer than interaction animations; feels intentional, not urgent)
- **Easing**: `ease-out`
- **Delay**: Optional stagger per card in section (50-100ms between items)

### Constraint

- **Single animation per section**: Don't combine fade + translate + scale on same section entry
- **Non-blocking**: Scroll must never pause or stutter while animation plays
- **Accessibility**: Respect `prefers-reduced-motion` and disable animation if set

---

## 6. Timing & Feel Reference

**Global Motion Tokens** (define in CSS Custom Properties):

```css
:root {
  /* Durations */
  --motion-duration-micro: 75ms; /* Micro-interactions, focus/blur */
  --motion-duration-quick: 150ms; /* CTAs, buttons, quick feedback */
  --motion-duration-standard: 200ms; /* Cards, hover states */
  --motion-duration-transition: 300ms; /* Page transitions, route changes */
  --motion-duration-slow: 400ms; /* Scroll reveals, subtle fades */

  /* Easing */
  --motion-easing-quick: cubic-bezier(0.3, 0.3, 0.3, 1);
  --motion-easing-standard: cubic-bezier(0.2, 0.3, 0.3, 1);
  --motion-easing-smooth: cubic-bezier(0.1, 0.1, 0.3, 1);
  --motion-easing-ease-out: ease-out;
  --motion-easing-ease-in-out: cubic-bezier(0.4, 0, 0.2, 1);
}
```

**Feel Expectations**:

- **Quick (75–150ms)**: Reactions feel snappy and confident; focus on feedback
- **Standard (200ms)**: Explorations feel responsive; hover states should feel natural
- **Transitions (300ms)**: Route changes feel deliberate; gives user time to track movement
- **Slow (400ms)**: Reveals feel intentional; reading rhythm is supported, not rushed

**No Animation Should**:

- Feel sluggish (> 500ms for standard interactions)
- Feel twitchy (< 50ms for interactions with easing)
- Use heavy easing that bounces or overshoots

---

## 7. Motion Constraints & Allowed Techniques

**Allowed Animations** (GPU-friendly):

1. **`transform` changes**:
   - `translate()` (move element)
   - `scale()` (resize element)
   - `rotate()` (spin element)
   - Runs on GPU; no layout recalculation
2. **`opacity` changes**:
   - Fade in/out
   - Crossfades between states
   - Very performant
3. **`color` changes**:
   - Shift background, text, or border color
   - Performant; supports mood without motion complexity
4. **`box-shadow` changes**:
   - Expand or contract shadow
   - Adds depth without layout shift
   - Slightly more expensive than `transform` but acceptable

**Forbidden Animations** (expensive, avoid):

- ❌ `width`, `height`, `left`, `right` (trigger layout recalculation)
- ❌ `display`, `position` (cause reflow)
- ❌ `filter: blur()`, `filter: drop-shadow()` (expensive paint operations)
- ❌ `clip-path` changes (can cause performance issues on mobile)
- ❌ `scroll` behavior animations (browser handles; don't replicate)

**Constraint**: All Phase 10 animations must use only allowed techniques. If a desired effect requires forbidden properties, reframe or simplify the interaction.

---

## 8. Consistency Rules

**Golden Rules for Phase 10**:

1. **Same interaction = Same behavior everywhere**
   - All cards hover the same way (same duration, easing, scale/translate)
   - All primary CTAs hover the same way
   - No exceptions unless documented and approved

2. **No component-specific custom animations**
   - Card hover is not different in engineering section vs. production section
   - Button hover is not different on about page vs. contact page
   - If a unique animation is needed, it must be explicitly justified and tracked

3. **No mixing multiple interaction styles on the same page**
   - Don't use both "scale on hover" and "translate on hover" for different card types
   - Don't use both "fade opacity" and "scale" on section entry
   - Pick one animation family per interaction type and stick with it

4. **Stagger only where intentional**
   - If cards in a grid stagger on entry, stagger is documented and consistent
   - If buttons in a list don't stagger, that's intentional (no stagger by default)
   - Stagger duration is documented globally (not per-component)

5. **No ambient/always-on animations**
   - Every animation requires a trigger (hover, focus, scroll, navigation)
   - No idle animations that play on page load just for visual interest
   - Motion is always responsive to user action or clear milestone

---

## 9. Component-to-Pattern Mapping

| Component             | File                                         | Interaction Type | Pattern                                        | Status                                       |
| --------------------- | -------------------------------------------- | ---------------- | ---------------------------------------------- | -------------------------------------------- |
| **SideCard**          | `src/components/side/SideCard.tsx`           | Card             | Card Pattern (§2)                              | Pending Implementation                       |
| **ProjectCard**       | `src/components/engineering/ProjectCard.tsx` | Card             | Card Pattern (§2)                              | Pending Implementation                       |
| **MediaCard**         | `src/components/production/MediaCard.tsx`    | Card             | Card Pattern (§2)                              | Pending Implementation                       |
| **ButtonLink**        | `src/components/ui/ButtonLink.tsx`           | CTA              | CTA Pattern (§3)                               | Pending Implementation                       |
| **Card (base)**       | `src/components/ui/Card.tsx`                 | Card             | Card Pattern (§2)                              | Pending Implementation (provides foundation) |
| **LinkText**          | `src/components/ui/LinkText.tsx`             | Link             | Secondary CTA or Text Link (minimal animation) | Lower Priority                               |
| **Route Transitions** | `src/root.tsx` or layout level               | Navigation       | Transition Pattern (§4)                        | Pending Implementation                       |
| **Scroll Reveals**    | Various sections                             | Passive          | Scroll Rhythm (§5)                             | Lower Priority (Phase 10→11 if time)         |

---

## 10. Implementation Checklist

### Before Implementation

- [ ] Motion tokens are added to `src/styles/theme.css`
- [ ] Animation classes are defined in global CSS or Tailwind config
- [ ] Easing values are standardized and shareable
- [ ] Duration values are standardized and documented
- [ ] This document is reviewed and approved

### Card Implementation (Priority 1)

- [ ] Card hover state: scale 1.02 + shadow expansion (200ms)
- [ ] Card press state: scale 0.98 (100ms) or background shift
- [ ] Card focus state: focus ring + subtle highlight (instant)
- [ ] Verify: All three card types (Side, Project, Media) use same pattern
- [ ] Test on mobile (no hover; only press + focus)
- [ ] Test on keyboard navigation (tab focus clearly visible)

### CTA Implementation (Priority 2)

- [ ] Button hover state: color shift (150ms) or color + translate
- [ ] Button press state: scale 0.95 (100ms) or color shift
- [ ] Button focus state: focus ring (instant)
- [ ] Verify: Primary and secondary buttons use consistent timing
- [ ] Test arrow icon motion (moves with button, or subtle slide)
- [ ] Test keyboard navigation (clear focus, enter/space trigger press)

### Transition Implementation (Priority 3)

- [ ] Outgoing page animation: opacity fade + optional lift (300ms)
- [ ] Incoming page animation: opacity fade + optional enter (300ms after out)
- [ ] OR: Crossfade approach (both fade in parallel, 300ms total)
- [ ] Test on all routes (home → engineering, engineering → production, etc.)
- [ ] Verify content loads before animation completes

### Scroll Reveals (Priority 4, if time)

- [ ] Section entry fade: opacity 0→1 (400ms ease-out)
- [ ] Optional stagger per card in section
- [ ] Respect `prefers-reduced-motion` setting
- [ ] Test on mobile (smooth scroll, no performance issues)

### Testing & Validation

- [ ] All animations smooth on desktop (60fps)
- [ ] All animations smooth on mobile (no lag or jank)
- [ ] Animations respect `prefers-reduced-motion` preference
- [ ] Keyboard navigation works alongside animations
- [ ] No animation runs simultaneously with competing animation
- [ ] Animation durations feel natural (not sluggish, not twitchy)

---

## 11. Performance Considerations

**Qwik-Specific Notes**:

- Animations should not trigger unnecessary reactive updates
- Prefer CSS animations over JS-driven animations
- Use Qwik's `onMouseEnter$` / `onMouseLeave$` for class toggling if needed (more efficient than `:hover` selector)
- Intersection Observer for scroll animations is acceptable (low overhead)

**Mobile Performance**:

- Test animations on real devices (not just browser emulation)
- Aim for 60fps; acceptable range is 50–60fps (not 30fps or lower)
- Avoid animating position + size simultaneously on mobile (use `transform` instead)
- Consider GPU layer promotion if animation jank appears (e.g., `will-change: transform`)

**Accessibility**:

- All animations must respect `@media (prefers-reduced-motion: reduce)` or user preference
- Default behavior when animations are disabled should be functional (no broken states)
- Focus indicators must be visible and persistent (no animation obscuring focus)

---

## 12. Success Criteria for Interaction System

By the end of Phase 10, the site should demonstrate:

| Criteria           | Validation                                                                            |
| ------------------ | ------------------------------------------------------------------------------------- |
| **Consistency**    | All cards behave the same way; all buttons behave the same way; no one-off animations |
| **Responsiveness** | Every interaction replies instantly when triggered; no lag or delay                   |
| **Clarity**        | Motion supports reading and navigation; never competes for attention                  |
| **Performance**    | Animations run at 60fps on desktop and mobile without jank                            |
| **Accessibility**  | Focus indicators are clear; animations respect `prefers-reduced-motion`               |
| **Intentionality** | Each animation can be justified in one sentence; no reflexive polish                  |

---

## 13. Reference: Interaction System at a Glance

| Interaction      | Duration | Easing                         | Scale/Transform                 | Notes                                            |
| ---------------- | -------- | ------------------------------ | ------------------------------- | ------------------------------------------------ |
| Card Hover       | 200ms    | cubic-bezier(0.2, 0.3, 0.3, 1) | scale 1.02 or translateY(-4px)  | Add shadow expansion                             |
| Card Press       | 100ms    | ease-out                       | scale 0.98 or background shift  | Quick feedback                                   |
| Card Focus       | instant  | —                              | focus ring + bg tint            | No animation needed                              |
| Button Hover     | 150ms    | cubic-bezier(0.3, 0.3, 0.3, 1) | color shift ± translate 2px     | Optional forward motion                          |
| Button Press     | 100ms    | ease-out                       | scale 0.95 or color shift       | Tactile feedback                                 |
| Button Focus     | instant  | —                              | focus ring + bg tint            | No animation needed                              |
| Route Transition | 300ms    | cubic-bezier(0.3, 0.3, 0.3, 1) | fade opacity ± translateY(-8px) | Out then in, or crossfade                        |
| Scroll Reveal    | 400ms    | ease-out                       | fade opacity                    | Stagger optional, respect prefers-reduced-motion |

---

## Next Steps

**Phase 10.3 — Card Interaction Implementation**

- Implement card hover/press/focus states in `Card.tsx` base component
- Verify all three card types (Side, Project, Media) inherit consistent behavior
- Add motion tokens to theme CSS
- Test on desktop and mobile

**Phase 10.4 — CTA Interaction Implementation**

- Implement button hover/press/focus states in `ButtonLink.tsx`
- Ensure consistency across all CTA variants
- Test keyboard navigation

**Phase 10.5 — Transition Implementation**

- Implement route transition animations at layout/root level
- Test across all routes
- Validate performance

---

**Document Version**: 1.0  
**Last Updated**: March 18, 2026  
**By**: Alden (System Definition)

**Approval Status**: ✅ **READY FOR IMPLEMENTATION**

This document defines the complete interaction system. All patterns, timings, and constraints are locked. Implementation can proceed with confidence that decisions are documented and consistent.
