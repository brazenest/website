import { richText } from './lexical'

/**
 * Rotavox case study.
 *
 * Content aligned to the live product at https://rotavox.com ("Program your sound" — a
 * music scheduler that replaces AutoDJ with real rotation). Status reflects the site's own
 * language (in development / early access), NOT "in production". The query-trace, decision-
 * log and architecture diagram are intentionally omitted rather than invented — author them
 * in Payload when ready. ⚠ the stack is still a draft to confirm/replace.
 */
export const rotavoxCaseStudySeed = {
  role: 'Founder, architect, designer, sole engineer',
  timeline: '2024 — present',
  status: 'Early access — rotavox.com',
  hook: 'Most internet radio still runs on shuffle. Rotavox schedules it the way a real station does — deliberately.',
  // ⚠ draft stack — confirm/replace in Payload.
  stack: [
    { value: 'TypeScript' },
    { value: 'React' },
    { value: 'Node' },
    { value: 'Postgres' },
  ],
  identityNote: 'Deep pine ground, a mint signal, Geist. The colour of this page.',
  problem: {
    drop: "AutoDJ isn't programming. It's shuffle with a nicer name — and it's what most internet radio is stuck running on.",
    body: richText([
      'Real stations don\'t shuffle. They run format clocks, they keep the same artists and titles apart, they change the sound by daypart, and they rotate a library across gold, recurrent and current pools with intent. That kind of scheduling has always lived in expensive, aging desktop software. Rotavox brings it to the platforms independent broadcasters actually run — starting with RadioDJ — as software that feels like this decade.',
    ]),
  },
  built: [
    {
      lead: 'Format clocks',
      body: 'a visual hour layout — lay out exactly what airs, and when, for every hour of the week.',
    },
    {
      lead: 'Separation rules',
      body: 'enforced artist, title and tempo separation, so nothing you care about repeats too soon.',
    },
    {
      lead: 'Dayparting',
      body: 'a distinct clock per time period, so the morning never sounds like the middle of the night.',
    },
    {
      lead: 'Category rotation',
      body: 'gold, recurrent and current pools, rotated on purpose instead of left to random.',
    },
    {
      lead: 'History-aware scheduling',
      body: 'every placement reads what already aired across the surrounding hours and days, and a dry-run preview lets you see the schedule before it airs.',
    },
    {
      lead: 'Platform integration',
      body: 'works with RadioDJ today; LibreTime and more platforms are on the roadmap.',
    },
  ],
  results: [
    { value: '3', label: 'rotation pools — gold, recurrent, current' },
    { value: '0', label: 'random shuffle in a Rotavox schedule' },
    { value: '1', label: 'engineer, from the scheduler to rotavox.com' },
  ],
  resultsCaveat:
    'Rotavox is in early access — sign up at rotavox.com. Real usage numbers replace these as it opens up.',
}
