import { richText } from './lexical'

/**
 * Andacity case study.
 *
 * Content drawn from the real project (github: @sunthetic/andacity, v0.6.0) — a discovery-first travel planner across destinations, hotels, flights and cars,
 * built on Qwik/QwikCity at the edge over a Fastify + Drizzle/Postgres core. The stack is
 * real. Query-trace, decision-log and architecture diagram are omitted rather than invented
 * — author in Payload when ready. NOT in production: andacity.com currently hosts the
 * development build (expected to move to dev.andacity.com, with an early-access signup page
 * taking over the apex), so the page makes no "live" claim and links nowhere yet.
 */
export const andacityCaseStudySeed = {
  role: 'Founder, architect, designer, sole engineer',
  timeline: '2025 — present',
  status: 'In development',
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
  resultsCaveat: null,
  interface: {
    mode: 'show' as const,
    note: 'Hard crops of the dev build at dev.andacity.com — one search, then flights and cars resolved to the same canonical places and itinerary.',
  },
}

/** Dev-build screenshots (src/seed/assets/andacity), uploaded by the seed and wired into `screens`.
 *  The first is the lead image on the home and /engineering cards. */
export const andacityScreenFiles = [
  { file: 'andacity/andacity-home.png', alt: 'Home — one search for flights, hotels, cars and destinations' },
  { file: 'andacity/andacity-flight-results.png', alt: 'Flight results — Denver to New York, every total including taxes and fees' },
  { file: 'andacity/andacity-flight-itinerary.png', alt: 'A flight itinerary — one canonical entity, resolved from provider inventory' },
  { file: 'andacity/andacity-car-results.png', alt: 'Car rentals at DEN — filtered, ranked, and priced as a full total' },
]
