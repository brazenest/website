import type { ProductionProject } from '~/types/content'

export const bellagioFountainFilmProject: ProductionProject = {
  id: 'bellagio-fountain-film',
  title: 'Bellagio Fountain Film',
  slug: 'bellagio-fountain-film',
  description:
    'A cinematic visual project centered on composition, timing, and the editorial rhythm of a live fountain performance.',
  media: [
    {
      type: 'image',
      src: '/media/production/bellagio-fountain-still-01.jpg',
      alt: 'Wide cinematic still of the Bellagio fountains at night',
    },
  ],
  sections: [
    {
      title: 'Overview',
      content:
        'This project explores how framing, timing, and repetition can transform a familiar public spectacle into a more cinematic visual experience.',
    },
    {
      title: 'Process',
      content:
        'The work focused on shot selection, visual rhythm, and sequencing choices that supported atmosphere without overcomplicating the material.',
    },
    {
      title: 'Execution',
      content:
        'Production and editing decisions emphasized clarity, pacing, and restraint so the visual movement of the fountains remained the central subject.',
    },
    {
      title: 'Outcome',
      content:
        'The result is a stronger visual narrative built from observation, timing, and editorial control rather than heavy stylistic effects.',
    },
  ],
  seo: {
    title: 'Bellagio Fountain Film',
    description:
      'Production case study for a cinematic fountain film focused on composition, rhythm, and visual storytelling.',
  },
}