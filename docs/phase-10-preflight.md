# Phase 10 Pre-Flight Alignment

**Date**: March 18, 2026  
**Phase**: 10 — Interaction + Polish  
**Subphase**: Pre-Flight Alignment  
**Progress Target**: ~5% complete after this checklist

---

## 1. Soft Content Freeze ✓

**Status**: Established

The current site content as of March 18, 2026 is locked as the working baseline for Phase 10. No major rewrites or content restructuring will occur during interaction polish.

**Guidelines**:

- ✅ Only minor wording fixes are permitted where content is clearly incorrect or materially weak
- ✅ No significant reframes or content strategy changes
- ✅ Prioritize interaction polish over copywriting refinement
- ✅ Treat content as stable infrastructure for design decisions

**Content Baseline** (verified across live site):

- Homepage with side selector (Engineering | Production)
- Engineering section with 3 project case studies
- Production section with 3 case studies
- About page explaining the split and practice philosophy
- Resume, Blog, and Contact pages
- Consistent voice across all pages

---

## 2. Interaction Intent ✓

**Philosophy**: Minimal, Deliberate, Clarity-First

The site's interaction language should feel intentional and purposeful. Every motion should serve comprehension or perceived quality—never spectacle.

**Core Principles**:

1. **Minimal**: Only add motion where it adds clarity or reduces cognitive friction
2. **Deliberate**: Every animation has a clear purpose; avoid reflexive polish
3. **Clarity-First**: Motion supports the reading experience, never competes with it

**What This Means**:

- Interactions reveal information or guide attention, not decorate
- Motion should feel calm and confident, not urgent or flashy
- The site should work perfectly well without animations (progressive enhancement)
- When in doubt, remove the animation and evaluate whether clarity improves

---

## 3. Interaction Guardrails ✓

**Constraints** (apply to all Phase 10 work):

| Constraint                              | Rule                                                                                          | Rationale                                                |
| --------------------------------------- | --------------------------------------------------------------------------------------------- | -------------------------------------------------------- |
| **No animation without purpose**        | Every animation must answer "why?"—if it doesn't support understanding or feedback, remove it | Prevents reflexive polish and maintains clarity          |
| **No motion that delays reading**       | Animations must complete before or during reading, never force users to wait for content      | Reading is the primary task; interactions support it     |
| **No overlapping competing animations** | Only one animation family should occupy a viewport at a time                                  | Multiple simultaneous animations create visual chaos     |
| **No ornamental effects**               | Avoid parallax, skew, blur, or other transforms that reduce readability                       | Ornament undercuts clarity-first philosophy              |
| **No easing that feels sluggish**       | Keep animations snappy and responsive; avoid prolonged delays                                 | Sluggish motion feels unintentional or slow-loading      |
| **Prefer transform & opacity**          | Animate `transform`, `opacity`, and `color`; avoid layout-affecting properties                | Transforms run on GPU; layout animations block rendering |

---

## 4. Priority Interactive Surfaces ✓

**Ranked by Impact** (highest to lowest):

| Priority | Surface                                                               | Type       | Why First                                                                                  |
| -------- | --------------------------------------------------------------------- | ---------- | ------------------------------------------------------------------------------------------ |
| **1**    | Side Selection Cards (Engineering \| Production)                      | Cards      | Fundamental navigation; user's first major choice; sets entire browsing direction          |
| **2**    | Project/Work Cards (case studies)                                     | Cards      | Primary content containers; users interact with these repeatedly across all pages          |
| **3**    | CTAs (buttons: "View Work", "About the Work", "Start a conversation") | Buttons    | Conversion points; clarity of affordance is critical                                       |
| **4**    | Page/Route Transitions                                                | Navigation | Connects distinct views; establishes motion vocabulary for the entire site                 |
| **5**    | Scroll Rhythm & Section Entry                                         | Animation  | Reinforces pacing and hierarchy; supports skimmability but not critical to core experience |

**Lower Priority (Phase 10→11 if time)**:

- Hover states on smaller UI elements (links, tags)
- Micro-interactions (form focus states, loading indicators)
- Ornamental scroll-triggered animations

---

## 5. Device Reality Check ✓

**Completed**: March 18, 2026, 9:21 PM

### Desktop Review (Full Width)

- ✅ Typography hierarchy is clear and scannable
- ✅ Card-based layout for side selection works well
- ✅ Project cards display information logically
- ✅ CTAs are prominent and readable
- ✅ Footer and navigation are accessible
- ✅ Color contrast is strong
- ✅ Whitespace supports readability

### Mobile Review (iPhone 14, 390×844)

- ✅ Layout stacks appropriately
- ✅ Touch targets are adequate for interaction (cards, buttons)
- ✅ Typography scales correctly
- ✅ Navigation menu is accessible and functional
- ✅ No text clipping or overflow issues
- ✅ Cards remain readable on small screens
- ✅ CTAs are appropriately sized for thumb interaction

### Structural Blockers

- ✅ **None identified** — site is ready for interaction polish
- ✅ All core pages are functional and readable
- ✅ No layout regressions found
- ✅ No critical accessibility issues blocking polish work

---

## 6. Early Performance Constraints ✓

**Acceptable Motion Techniques** (in priority order):

| Technique     | ✅ Preferred                    | ❌ Avoid                               | Why                                     |
| ------------- | ------------------------------- | -------------------------------------- | --------------------------------------- |
| **Transform** | ✅ Scale, translate, rotate     | ✗ Width, height, left/right/top/bottom | GPU-accelerated; no repaints            |
| **Opacity**   | ✅ Fade in/out, crossfade       | ✗ Display toggle without fade          | Smooth; performant                      |
| **Color**     | ✅ Gradual color shifts         | ✗ Instant color changes                | Supports mood without motion complexity |
| **Composite** | ✅ Transform + Opacity together | ✗ Transform + layout changes           | Keeps GPU cost predictable              |

**Qwik-Specific Performance Notes**:

- Animations should not trigger unnecessary reactivity re-runs
- Prefer CSS animations over JS-driven animations where possible
- Keep animation durations short (200ms–500ms typically) to avoid feeling sluggish
- Test animations on mobile devices to ensure smooth performance at 60fps

---

## 7. Consistency Patterns ✓

**Repeated Interactive Surfaces Must Share Behavior**:

### Card Hover/Press Language (applies to: side cards, project cards, media cards)

**One unified pattern across all cards**:

- On hover (desktop): Subtle visual lift + shadow expand
- On press (mobile/touch): Color shift + scale
- On focus (keyboard): Clear focus ring + light background tint
- Duration: 200ms (snappy, responsive feel)
- Easing: Cubic-bezier for natural feel

### CTA Interaction Language (applies to: all buttons/links with arrow semantics)

**One unified pattern for primary CTAs**:

- On hover: Color shift + subtle forward motion (small translate-x)
- On press: Color shift + slight scale-down for click feedback
- On focus: Focus ring + background tint
- Duration: 150ms (quick, confident)
- Arrow icon should move with button (or animate independently)

### Page/Route Transition Family

**One unified motion vocabulary for all route changes**:

- Outgoing page: Fade out + subtle upward motion
- Incoming page: Fade in + content enters from subtle scroll position
- Duration: 300ms (deliberate, not instant; not slow)
- Overlapping: Outgoing completes before incoming starts

### Scroll Rhythm (section entry behavior)

**Consistent pattern when sections enter viewport**:

- Option A (preferred for this site): Subtle opacity fade-in as section becomes visible
- Option B: Light translate-up as section enters
- Never both A+B at the same time (overlapping animations violate guardrails)
- Duration: 400ms (longer fade feels intentional, not urgent)

**Constraint**: All repeated surfaces use their designated pattern. No one-off behaviors for isolated components.

---

## 8. Phase 10 Success Criteria ✓

**By the end of Phase 10, the site must feel**:

| Criteria         | Definition                                                                      | Validation                                                             |
| ---------------- | ------------------------------------------------------------------------------- | ---------------------------------------------------------------------- |
| **Responsive**   | Every interaction replies instantly; no janky or delayed feedback               | Test on mobile and desktop; verify 60fps                               |
| **Intentional**  | Every animation serves a clear purpose; nothing feels reflexive                 | Review: Can I justify each animation in one sentence?                  |
| **Calm**         | No jarring motion; easing feels natural; overall mood is confident but measured | Compare to high-quality reference sites; avoid aggressive acceleration |
| **High-Quality** | Interactions feel polished and professional; suggest deep authorship            | Small details matter: easing, timing, overlap, consistency             |

**Explicitly Reject**:

- ❌ Flashy motion (spinning, complex paths, distortion effects)
- ❌ Over-animation (too many simultaneous animations, animations that feel gratuitous)
- ❌ Distracting transitions (motion that pulls focus away from content)
- ❌ Ornamental effects (parallax, blur, complex 3D transforms, decorative flourishes)

---

## 9. Decisions Locked for Phase 10 ✓

The following decisions are now locked and serve as the reference point for all remaining Phase 10 tasks:

| Decision                   | Locked Value                                | Context                           |
| -------------------------- | ------------------------------------------- | --------------------------------- |
| **Content Scope**          | Current live content as of 3/18/26          | No major rewrites during polish   |
| **Interaction Philosophy** | Minimal, Deliberate, Clarity-First          | Shapes all animation choices      |
| **Priority Surface #1**    | Side Selection Cards                        | Highest iteration impact          |
| **Priority Surface #2**    | Project/Work Cards                          | Most-used interactive element     |
| **Priority Surface #3**    | CTAs (buttons)                              | Conversion and clarity            |
| **Priority Surface #4**    | Page Transitions                            | Navigation feel                   |
| **Priority Surface #5**    | Scroll Rhythm                               | Pacing and flow                   |
| **Motion Vocabulary**      | One pattern per surface                     | Consistency across repetition     |
| **Performance Constraint** | Transform + Opacity preferred               | Qwik compatibility + smooth 60fps |
| **Success Feel**           | Responsive, Intentional, Calm, High-Quality | Guides polish refinement          |
| **Design Philosophy**      | Restraint as a craft tool                   | Clarity over novelty              |

---

## 10. Next Steps

**Phase 10 Sequence** (following this pre-flight alignment):

1. **Define Interaction System** ← Next task
   - Create reusable animation composition patterns
   - Define token-based duration and easing values
   - Document animation lifecycle (mount → hover → press → unmount)

2. **Implement Card Interactions** ← Priority Surface #1–2
   - Side selection card hover/press states
   - Project card hover/press states
   - Unified card animation language

3. **Refine CTA Behaviors** ← Priority Surface #3
   - Button hover/press/focus states
   - Arrow icon motion family
   - Consistent affordance across all CTAs

4. **Build Page Transitions** ← Priority Surface #4
   - Route change fade + motion pattern
   - Unify transition feel across all page changes
   - Test on slow networks (perceived performance)

5. **Add Scroll Rhythm** ← Priority Surface #5
   - Section entry animations
   - Scroll-triggered fades/slides
   - Ensure rhythm supports skimmability, not competes with it

6. **Polish & Refinement**
   - Micro-interactions and edge cases
   - Accessibility compliance (prefer-reduced-motion)
   - Performance audit on mobile devices

---

## Approval

**Phase 10 Pre-Flight Alignment**: ✅ **APPROVED**

- Content baseline locked
- Interaction philosophy defined
- Motion guardrails established
- Priority surfaces ranked
- Device reality check completed (no blockers)
- Performance constraints set
- Consistency patterns documented
- Success criteria clearly defined

**Ready to proceed with Phase 10 implementation.**

---

**Document Version**: 1.0  
**Last Updated**: March 18, 2026, 9:25 PM  
**By**: Alden (pre-flight review)
