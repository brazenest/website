import { richText } from './lexical'

/**
 * Andacity case study.
 *
 * Content drawn from the real project (github: @sunthetic/andacity, live at andacity.com,
 * v0.6.0) — a discovery-first travel planner across destinations, hotels, flights and cars,
 * built on Qwik/QwikCity at the edge over a Fastify + Drizzle/Postgres core. The stack is
 * real. Query-trace, decision-log and architecture diagram are omitted rather than invented
 * — author in Payload when ready. ⚠ confirm the status wording (Live vs public beta).
 */
export const andacityCaseStudySeed = {
  role: 'Founder, architect, designer, sole engineer',
  timeline: '2024 — present',
  status: 'Live — andacity.com',
  hook: 'Booking a flight is easy. Deciding what the trip should be is the part every travel site leaves to you.',
  stack: [
    { value: 'TypeScript' },
    { value: 'Qwik' },
    { value: 'QwikCity' },
    { value: 'Fastify' },
    { value: 'Drizzle' },
    { value: 'Postgres' },
    { value: 'Zod' },
    { value: 'Cloudflare' },
  ],
  identityNote: 'Deep navy ground, an azure signal, Geist. The colour of this page.',
  problem: {
    drop: 'Flights, hotels, cars and destinations each live behind their own search box — and the traveller is left to be the integration layer.',
    body: richText([
      "Planning a trip means twelve tabs, a spreadsheet, and a lot of copy-paste, because no tool treats the trip itself as the thing you're building — only the individual bookings. Andacity is discovery-first: you plan the trip, and the destinations, hotels, flights and cars assemble around it, as one object you can save, share and come back to.",
    ]),
  },
  built: [
    {
      lead: 'A search mode per vertical',
      body: 'destinations, hotels, flights and cars — each tuned to how you actually shop for it, but sharing one result / entity / trip grammar so nothing feels bolted on.',
    },
    {
      lead: 'The trip as a first-class object',
      body: 'add-to-trip from anywhere; the trip persists, revalidates, and holds the whole plan together instead of scattering it across bookings.',
    },
    {
      lead: 'Shareable, canonical routes',
      body: 'every search, place and trip has a clean URL that survives being sent to someone — the plan travels with the link.',
    },
    {
      lead: 'Entity resolution across verticals',
      body: 'one canonical identity for a place, hotel or airport everywhere in the app, so results line up instead of contradicting each other.',
    },
    {
      lead: 'Guided booking with a trust panel',
      body: 'a booking surface that shows what is happening and why, rather than a black-box checkout.',
    },
    {
      lead: 'Edge-rendered, run by one person',
      body: 'Qwik/QwikCity on Cloudflare over a Fastify + Postgres core — fast enough to feel instant, small enough to operate solo.',
    },
  ],
  results: [
    { value: '4', label: 'travel verticals unified — destinations, hotels, flights, cars' },
    { value: '0', label: 'tabs and spreadsheets to plan a trip' },
    { value: '1', label: 'engineer, from the edge render to the database' },
  ],
  resultsCaveat:
    'Andacity is live at andacity.com (v0.6.0) and still moving fast — real usage and conversion numbers replace these as it grows.',
}
