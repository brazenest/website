import type { EngineeringProject } from '~/types/content'

export const rotavoxProject: EngineeringProject = {
  id: 'rotavox',
  title: 'Rotavox',
  slug: 'rotavox',
  description:
    'A music scheduling and automation platform for radio, built to serve the independent and Internet stations that legacy broadcast software prices out or ignores.',
  techStack: ['TypeScript', 'React', 'Node.js', 'MySQL', 'Cloudflare'],
  sections: [
    {
      title: 'Overview',
      paragraphs: [
        'Rotavox is a music scheduling and automation platform for radio. It targets the widest gap in the market first — independent and Internet stations running open automation like RadioDJ — and scales toward a complete, modern suite that can eventually serve terrestrial broadcast. The product competes first on price and then on being a genuinely better whole-package system than the incumbents.',
        'The core of the product is a scheduling engine that turns a station\'s music library and programming intent into a dependable, hour-by-hour log. The work sits at the intersection of constraint solving, data integration, and interface design: the hard part is making disciplined radio scheduling feel approachable for stations that cannot afford enterprise tooling.',
      ],
    },
    {
      title: 'Context',
      paragraphs: [
        'Professional music scheduling has long been dominated by expensive, dated desktop software built for large terrestrial groups. Independent operators and the growing world of Internet radio are left choosing between tools that are too costly, too primitive, or disconnected from the automation systems they already run.',
        'That gap is the opportunity. There is a large, underserved base of stations that want real rotations, artist and title separation, and dayparting, but need it at a price and in a form that fits a modern, browser-based workflow.',
      ],
    },
    {
      title: 'Problem',
      paragraphs: [
        'Music scheduling is a constraint-satisfaction problem wearing a friendly interface. Rotations, category balance, artist and title separation, tempo and era flow, and daypart-specific clocks all have to be satisfied at once, repeatedly, without producing logs that feel mechanical or repetitive to listeners.',
        'On top of the scheduling logic, the product has to integrate cleanly with the automation stations already use, stay affordable to operate, and remain architecturally ready to expand from Internet stations toward terrestrial requirements without a rewrite.',
      ],
    },
    {
      title: 'Approach',
      paragraphs: [
        'I modeled the scheduling domain explicitly — categories, clocks, rotation rules, and separation constraints as first-class concepts — so the behavior stays predictable and tunable rather than buried in ad hoc logic. The engine is designed to be readable and correctable, because station operators need to understand and trust why a song landed where it did.',
        'Around that engine I built a browser-based management experience and an integration path into RadioDJ\'s data model, so a station can adopt Rotavox without abandoning the automation it already runs. The architecture keeps the scheduling core independent of any one playout system so new integrations can be added over time.',
      ],
    },
    {
      title: 'Execution',
      items: [
        'Designed a rules-driven scheduling engine handling rotations, category balance, and artist/title separation across daypart-specific clocks',
        'Built integration with the RadioDJ (MySQL) data model so stations can adopt Rotavox alongside their existing automation',
        'Created a browser-based interface for managing libraries, categories, and clocks without desktop software',
        'Kept the scheduling core decoupled from any single playout system to allow future integrations and a path toward terrestrial broadcast',
        'Stood up The BOLT (part of the ClubFM network) as a live proving ground for the scheduling and automation loop',
      ],
    },
    {
      title: 'Outcome',
      paragraphs: [
        'Rotavox powers real programming today through The BOLT, which serves as its live testbed. Running an actual station on the platform keeps the scheduling engine honest: it has to produce logs that sound good on air, not just satisfy constraints on paper.',
        'The result is an affordable entry point into disciplined music scheduling for stations that legacy tools leave behind, with an architecture positioned to grow into a full automation suite.',
      ],
    },
    {
      title: 'Reflection',
      paragraphs: [
        'Building Rotavox reinforced that the differentiator is not just the scheduling math — it is making that math legible and trustworthy for operators who are not broadcast engineers. Clarity in the model is the product.',
        'The next stretch is deepening automation beyond scheduling and hardening the platform for terrestrial requirements, so Rotavox can move from an affordable alternative to a complete, modern standard.',
      ],
    },
  ],
  seo: {
    title: 'Rotavox',
    description:
      'Engineering case study for Rotavox, a music scheduling and automation platform for independent and Internet radio built around a rules-driven scheduling engine.',
  },
}
