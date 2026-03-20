import type { ProductionProject } from '~/types/content'

export const bellagioFountainFilmProject: ProductionProject = {
  id: 'bellagio-fountain-film',
  title: 'Bellagio Fountain Film',
  slug: 'bellagio-fountain-film',
  description:
    'A night exterior short built around a live fountain performance, using disciplined framing and editorial pacing to turn an unpredictable public spectacle into a coherent visual sequence.',
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
        'This piece was designed as a compact observational film. Instead of treating the fountains as a montage backdrop, the goal was to shape a clear visual arc with intent: establish place, build rhythm, and land a controlled finish.',
    },
    {
      title: 'Context',
      content:
        'The location is visually rich but operationally difficult: dense crowds, shifting light levels, and no control over the choreography timing. The challenge was not access to spectacle; it was extracting narrative clarity from a constantly changing live environment.',
    },
    {
      title: 'Role and Scope',
      content:
        'I handled end-to-end production: concept framing, shot planning, on-location camera operation, and final edit. The work centered on directing attention through composition and sequencing rather than relying on heavy post effects.',
    },
    {
      title: 'Production Challenge',
      content:
        'Because the performance cadence was unpredictable, coverage had to be adaptable. I needed enough variation to shape progression in the edit while keeping orientation stable so viewers never lost spatial context.',
    },
    {
      title: 'Framing and Coverage Decisions',
      content:
        'I built coverage in deliberate layers: wide anchors for geography, medium shots for motion phrasing, and detail captures for texture and reflection. This created editorial flexibility while preserving continuity across timing changes and audience movement in frame.',
    },
    {
      title: 'Editorial Judgment',
      content:
        'In post, I cut for temporal rhythm rather than speed. Shot transitions were timed to preserve flow between fountain beats, with restrained color and contrast adjustments that supported mood without overpowering the natural light behavior of the scene.',
    },
    {
      title: 'Why It Mattered',
      content:
        'The finished piece demonstrates practical production control under live constraints: adaptive coverage, clear visual hierarchy, and edit decisions that make a familiar location feel authored rather than incidental.',
    },
  ],
  image: '/media/production/bellagio-fountain-still-01.jpg',
  seo: {
    title: 'Bellagio Fountain Film',
    description:
      'Production case study for a live-performance short focused on framing strategy, adaptive coverage, and editorial rhythm under real-world constraints.',
  },
}