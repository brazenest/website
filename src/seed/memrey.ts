import { richText } from './lexical'

/** Transcribed verbatim from v6/v6-engine-r2.html lines 789-961 (Memrey case study). */
export const memreyCaseStudySeed = {
  role: 'Founder, architect, designer, sole engineer',
  timeline: '2025 — present',
  status: 'Investor demo shipped',
  hook: "Forty years of photographs, and no way to find the one you're thinking of. I built the thing that fixes that.",
  stack: [
    { value: 'TypeScript' },
    { value: 'React' },
    { value: 'Node' },
    { value: 'Python' },
    { value: 'Postgres' },
    { value: 'pgvector' },
    { value: 'S3' },
    { value: 'CLIP' },
    { value: 'Whisper' },
  ],
  identityNote: 'Daybreak — deep plum ground, warm rising sun, Fraunces. The colour of this page.',
  problem: {
    drop: 'Every family has a hard drive with thirty thousand photographs on it, and nobody has ever looked at photograph number 14,206.',
    body: richText([
      "The archive exists. The memory doesn't. Consumer photo tools solved storage a decade ago and then stopped. They can find you a dog, a beach, a screenshot. They cannot find you the afternoon my dad taught me to drive, because that isn't a label — it's a memory, and memories are made of people, places, weather, time of day, and the thing that happened right before and right after.",
    ]),
  },
  built: [
    {
      lead: 'An ingest pipeline',
      body: 'that swallows decades of mixed media — phone dumps, scanned prints, tape rips — without asking anyone to organise anything first.',
    },
    {
      lead: 'A memory graph',
      body: 'instead of a tag list. People, places, events and time are first-class entities with relationships, so a query can travel between them.',
    },
    {
      lead: 'Natural-language retrieval',
      body: 'over embeddings, grounded against that graph, so a vague human question returns a specific, correct set of frames.',
    },
    {
      lead: 'An interface my dad can use.',
      body: 'The whole thing lives or dies on whether a sixty-eight-year-old can type a sentence and get their life back.',
    },
  ],
  queryTrace: {
    query: 'the afternoon my dad taught me to drive',
    steps: [
      {
        no: '01',
        name: 'Parse',
        description: richText(['Pull the entities out of a sentence nobody wrote for a machine.']),
        io: 'person → "dad"\nevent → learning to drive\ntime → afternoon',
      },
      {
        no: '02',
        name: 'Graph',
        description: richText([
          'Resolve them against the memory graph. This is the step every other photo tool skips.',
        ]),
        io: '"dad" → person_14 · 1,204 frames\ndriving → 3 candidate events\nafternoon → 14:00–18:00',
      },
      {
        no: '03',
        name: 'Vector',
        description: richText(['Search the embeddings for anything that looks like the sentence.']),
        io: '812 candidates ≥ 0.31 cosine\n(cars, roads, lots — several wrong decades)',
      },
      {
        no: '04',
        name: 'Ground',
        description: richText([
          'Rerank the vector hits against the graph. Keep only frames with person_14, inside the window, at one of the three events.',
        ]),
        io: '4 frames · 1 event\n12 Jul 2006 · 15:42–16:10',
      },
    ],
    resultCount: '4 frames',
    resultTime: '0.4s',
    failureNote: richText([
      'It gets this right when the person is in the graph. It gets it wrong when the memory belongs to whoever was behind the camera — the one person who is never in the photograph. I haven\'t solved that one yet.',
    ]),
  },
  decisions: [
    {
      question: 'Why not just embed everything and search the vectors?',
      answer: richText([
        "Because embeddings return photos that look like what you asked for. A memory isn't a similarity, it's a relationship. Vectors find you a beach. The graph finds you that beach, with those people, on that day.",
      ]),
    },
    {
      question: 'Why not a dedicated graph database?',
      answer: richText([
        'Because one engineer cannot operate two databases. Postgres with pgvector holds the graph and the vectors in one place, with one backup and one failure mode. The right architecture is the one you can still run at 2am.',
      ]),
    },
    {
      question: 'Why not fine-tune a model on the corpus?',
      answer: richText([
        "Because a family archive is thirty thousand photographs, not thirty million. There is nothing in it CLIP doesn't already know. The value was never in the model — it's in the graph I built around it.",
      ]),
    },
  ],
  results: [
    { value: '5', label: 'canonical demo scenarios shipped to investors' },
    { value: '1', label: 'engineer, from architecture to wordmark' },
    { value: '<1s', label: 'median retrieval over the demo corpus' },
    { value: '0', label: 'tags a user has to write, ever' },
  ],
  resultsCaveat:
    "These are the numbers I can stand behind today. When the beta opens I'll replace them with the ones that matter — corpus size, recall, and how often the first result is the right one.",
}
