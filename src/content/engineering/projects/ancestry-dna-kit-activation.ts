import type { EngineeringProject } from '~/types/content'

export const ancestryDnaKitActivationProject: EngineeringProject = {
  id: 'ancestry-dna-kit-activation',
  title: 'Ancestry DNA Kit Activation',
  slug: 'ancestry-dna-kit-activation',
  description:
    'A high-trust activation flow rebuilt around explicit state, predictable validation, and calm interaction design so a sensitive consumer process could scale without confusion.',
  techStack: ['React', 'TypeScript', 'Redux', 'Node', 'Kotlin'],
  sections: [
    {
      title: 'Overview',
      paragraphs: [
        'This project centered on a consumer DNA kit activation flow, where trust and clarity matter as much as completion rate. Users were being asked to complete a sensitive task involving identity, consent, and biological data. That is not a neutral interface problem. Every inconsistency in layout, validation, or messaging increases uncertainty at exactly the moment the system most needs to feel dependable.',
        'I redesigned the activation experience across the frontend system, validation patterns, and interaction model so the product behaved like a calm, predictable guide rather than a stack of disconnected forms. The work sits at the intersection of frontend architecture and product systems design: state clarity, input reliability, and emotional pacing all had to work together.',
      ],
    },
    {
      title: 'Context',
      paragraphs: [
        'The legacy flow had grown organically. Different steps used different UI conventions, error handling was uneven, and the structure of the experience did not consistently support reassurance or recovery. That kind of inconsistency becomes more damaging in a sensitive flow than in a casual one because users interpret product uncertainty as process risk.',
        'The system also had to perform at very high scale. The solution could not depend on hand-holding or edge-case exceptions managed manually. It needed reusable patterns that would hold up across large activation volume while staying legible to people moving through the flow for the first and only time.',
      ],
    },
    {
      title: 'Problem',
      paragraphs: [
        'The core issue was not simply that the screens looked inconsistent. The deeper problem was that the flow did not communicate state clearly enough. Users needed to know where they were, what was expected next, what had gone wrong if validation failed, and how to recover without feeling punished.',
        'Without explicit state modeling, the interface behaved like a linear checklist even when the real user experience involved hesitation, clarification, and correction. That mismatch between system behavior and human context created friction, support burden, and avoidable uncertainty.',
      ],
    },
    {
      title: 'Approach',
      paragraphs: [
        'I treated activation as a state-driven system rather than a sequence of screens. Each step needed clear entry conditions, predictable validation surfaces, and a stable action lane so users could understand the current state and the next safe move without re-learning the interface.',
        'Design decisions reinforced that principle. Inputs were grouped consistently, helper copy appeared only when it reduced uncertainty, and motion was used conservatively to support comprehension rather than speed. The objective was to make the product feel calm and explicit, not persuasive or flashy.',
      ],
    },
    {
      title: 'Execution',
      items: [
        'Rebuilt the activation flow around reusable UI primitives for headers, input groups, validation, and primary actions',
        'Standardized inline validation behavior so errors appeared where users expected them and stayed recoverable',
        'Clarified progress signaling with a stable orientation pattern instead of abrupt screen-to-screen jumps',
        'Reduced emotional noise by tightening copy, removing inconsistent interactions, and decelerating transitions',
        'Aligned frontend state handling with backend expectations so validation and recovery paths behaved consistently',
      ],
    },
    {
      title: 'Outcome',
      paragraphs: [
        'The result was a more coherent activation system that felt trustworthy under pressure. Users could understand their progress, recover from mistakes without losing confidence, and complete the flow with less friction. The interface did more work quietly: guiding, orienting, and validating without making the process feel heavier.',
        'At the engineering level, the flow became easier to maintain because the product no longer relied on one-off screens and mixed conventions. Stable patterns supported high-volume operation better than the legacy design because clarity was built into the system instead of added case by case.',
      ],
    },
    {
      title: 'Reflection',
      paragraphs: [
        'The lasting lesson from this project is that high-trust flows need explicit state design. Users do not just need correct validation. They need a product that makes progress, error, and recovery understandable without drama.',
        'If I were evolving the system again, I would push even earlier for state-model visibility in the design process so flow logic and interaction patterns remain aligned from the first implementation onward.',
      ],
    },
  ],
  image: '/media/engineering/ancestry-dna-kit-activation.svg',
  seo: {
    title: 'Ancestry DNA Kit Activation',
    description:
      'Engineering case study for a high-trust activation flow focused on state clarity, predictable validation, and calm interaction design at scale.',
  },
}