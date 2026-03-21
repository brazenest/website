import type { ProductionProject } from '~/types/content'

export const bellagioFountainFilmProject: ProductionProject = {
  id: 'bellagio-fountain-film',
  title: 'Bellagio Fountain Film',
  slug: 'bellagio-fountain-film',
  description:
    'A night exterior short built around a live fountain performance, using disciplined framing and editorial pacing to turn an unpredictable public spectacle into a coherent visual sequence.',
  media: [
    {
      type: 'video',
      src: 'https://www.youtube.com/watch?v=7v3GNwprM8Q',
      alt: 'Bellagio Fountain Film embedded from YouTube',
      poster: '/media/production/bellagio-fountain-film.svg',
    },
  ],
  sections: [
    {
      title: 'Overview',
      content:
        'This piece was designed as a compact observational film. It is a night exterior short focused on extracting narrative clarity from a live spectacle. What makes it notable: the work demonstrates that visual control comes from framing and sequencing choices, not from controlling the environment.',
    },
    {
      title: 'Context',
      content:
        'The location is visually rich but operationally difficult: dense crowds, shifting light levels, and no control over the choreography timing. The audience and performance were constants I could not change. The challenge was not access to spectacle; it was extracting narrative clarity from a constantly changing live environment.',
    },
    {
      title: 'Problem',
      content:
        'In documentary-style work on live events, the core tension is between capturing what happens and shaping what viewers perceive. Without disciplined coverage strategy, the piece becomes a sequence of lucky moments rather than an authored sequence. The specific constraint: one location, one performance per night, limited reshoots.',
    },
    {
      title: 'Approach',
      content:
        'I built coverage in deliberate layers: wide anchors for geography, medium shots for motion phrasing, and detail captures for texture and reflection. This created editorial flexibility while preserving continuity across timing changes and audience movement. The framing strategy prioritized composition and depth over following action, which gave the edit control.',
    },
    {
      title: 'Execution',
      items: [
        'Shot planning organized by visual function (establishing, motion transition, emotional detail) rather than chronological performance order',
        'Coverage built with adaptive timing so editorial pacing could match either fountain beat or narrative arc',
        'Framing locked down enough to be stable, loose enough to accommodate unpredictable audience movement',
        'Editorial rhythm timed to preserve flow between fountain beats, with restrained color and contrast',
        'Detailed shot notes that translated in-camera framing decisions into editorial intent for the edit',
      ],
    },
    {
      title: 'Outcome',
      content:
        'The finished piece demonstrates practical production control under live constraints: the sequence feels authored despite the unpredictability of the environment. Viewers perceive shape and progression even though they are watching a live event. The work is usable as a reference for how to approach location-based visual storytelling where control is perceptual, not environmental.',
    },
    {
      title: 'Reflection',
      content:
        'The strongest learning was that documentary-style shooting does not mean passive observation. Aggressive framing choices, clear shot function, and disciplined interaction with the environment create authored work even when the subject is unpredictable. A second take would invest more time in color work during grade to support mood differentiation between sequence sections.',
    },
  ],
  image: '/media/production/bellagio-fountain-film.svg',
  seo: {
    title: 'Bellagio Fountain Film',
    description:
      'Production case study for a live-performance short focused on framing strategy, adaptive coverage, and editorial rhythm under real-world constraints.',
  },
}