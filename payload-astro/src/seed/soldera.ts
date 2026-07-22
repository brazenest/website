import { richText } from './lexical'

/**
 * Soldera case study — DRAFT.
 *
 * Problem/built copy is expanded from the approved home-page description; results are kept
 * qualitative (the product is in build). Query-trace, decision-log and architecture diagram
 * are omitted rather than invented — author them in Payload when the real details are ready.
 * The ⚠ items are placeholders to confirm/replace.
 */
export const solderaCaseStudySeed = {
  role: 'Founder, architect, designer, sole engineer',
  timeline: '2025 — present',
  status: 'In build',
  hook: "Selling something online is ten minutes of writing nobody wants to do. Soldera does it from a photo.",
  // ⚠ draft stack — confirm/replace in Payload.
  stack: [
    { value: 'TypeScript' },
    { value: 'React' },
    { value: 'Node' },
    { value: 'Postgres' },
    { value: 'Vision model' },
    { value: 'LLM' },
  ],
  identityNote: 'Deep magenta ground, a hot-pink signal, Geist. The colour of this page.',
  problem: {
    drop: 'Everyone has a closet, a garage, a shelf of things worth money — and no patience for writing the listings.',
    body: richText([
      "Every marketplace wants the same tax up front: a title, a description, the right category, a condition, and a price you had to go and research yourself. It's enough friction that most people never bother, and the thing just sits there. Soldera removes the writing entirely — photograph the item and it produces a listing that's ready to post.",
    ]),
  },
  built: [
    {
      lead: 'A vision pipeline',
      body: 'that identifies the item, its brand and its condition from a photo, without the seller typing a word.',
    },
    {
      lead: 'A listing writer',
      body: 'that turns that into a real title, description and category — in the voice a marketplace rewards, not a wall of keywords.',
    },
    {
      lead: 'A pricing model',
      body: 'that reads comparable sales and the item’s condition and proposes a price you can accept or nudge.',
    },
    {
      lead: 'One-tap publish',
      body: 'so the finished listing goes where the buyers are, instead of into a draft folder you never return to.',
    },
  ],
  results: [
    { value: '1', label: 'photo in — title, copy and price out' },
    { value: '0', label: 'listings a seller has to write by hand' },
    { value: '1', label: 'engineer, from vision pipeline to interface' },
  ],
  resultsCaveat:
    'Soldera is still in build, so these describe the shape of the product rather than production metrics. Real numbers replace them as it ships.',
}
