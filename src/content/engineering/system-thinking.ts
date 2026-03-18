import type { SystemThinkingItem } from '~/types/content'

export const systemThinkingItems: SystemThinkingItem[] = [
  {
    title: 'Make good decisions repeatable',
    description:
      'Strong systems encode architectural choices into shared conventions — typed models, reusable patterns, explicit boundaries — so the right path is also the easiest one.',
  },
  {
    title: 'Separate concerns explicitly',
    description:
      'I keep content structure, data modeling, and rendering logic distinct. When each layer has one job, complexity stays navigable as a codebase scales.',
  },
  {
    title: 'Optimize for the next change',
    description:
      "The architecture that survives iteration isn't the most clever — it's the one with clear naming, predictable boundaries, and no hidden coupling.",
  },
]
