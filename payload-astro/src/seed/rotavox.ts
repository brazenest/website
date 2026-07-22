import { richText } from './lexical'

/**
 * Rotavox case study — DRAFT.
 *
 * The problem/built copy is expanded from the approved home-page description; the results
 * are drawn only from facts already stated there ("a real network running on it every
 * day", "one system, one person"). The query-trace, decision-log and architecture diagram
 * are intentionally omitted rather than invented — author them in Payload (and add a
 * bespoke diagram component) when the real details are ready. The ⚠ items are placeholders
 * to confirm/replace.
 */
export const rotavoxCaseStudySeed = {
  role: 'Founder, architect, designer, sole engineer',
  timeline: '2024 — present',
  status: 'In production — running a live network',
  hook: 'Radio scheduling software is stuck in another decade. I rebuilt it from nothing, and a real network runs on it every day.',
  // ⚠ draft stack — confirm/replace in Payload.
  stack: [
    { value: 'TypeScript' },
    { value: 'React' },
    { value: 'Node' },
    { value: 'Postgres' },
  ],
  identityNote: 'Deep pine ground, a mint signal, Geist. The colour of this page.',
  problem: {
    drop: 'A radio station is a thousand scheduling decisions a day, and most stations still make them in software that feels like it was built in 2004.',
    body: richText([
      "The rotation, the separation rules, the dayparting, the library, the compliance logs — on most stations these live in a handful of aging, disconnected tools that barely talk to each other, and none of which anyone enjoys opening. I wanted one system that held the whole operation, was fast enough to plan a week in an afternoon, and could actually be run by the people who run a station — not just the person who wrote it.",
    ]),
  },
  built: [
    {
      lead: 'A visual planner',
      body: 'that lays out the schedule the way a programmer actually thinks about it — the week at a glance, drag to change, rules enforced as you go.',
    },
    {
      lead: 'A scheduling engine',
      body: 'that handles rotations, separation and dayparting automatically, so the right thing plays at the right time without someone hand-placing every slot.',
    },
    {
      lead: 'A media library',
      body: 'the audio and its metadata in one place, searchable, versioned, and wired straight into the planner and the playout.',
    },
    {
      lead: 'Reporting',
      body: 'what aired, when, and for whom — the record you need for compliance and royalties, generated instead of assembled by hand.',
    },
  ],
  results: [
    { value: '1', label: 'live network running on it, every day' },
    { value: '4', label: 'systems in one — planner, engine, library, reporting' },
    { value: '1', label: 'engineer, from database schema to UI' },
  ],
  resultsCaveat:
    'These are the facts I can point to today. The operational numbers — stations live, hours scheduled, uptime — land here as the page fills out.',
}
