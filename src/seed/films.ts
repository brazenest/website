/**
 * Shadowcat film — "Con Te Partiro (Time To Say Goodbye)". Mirrors the Payload record so a
 * re-seed won't revert it to a placeholder (the film was finalised in the admin, then
 * exported). The hero frame and stills are frames pulled from the film itself
 * (src/seed/assets/shadowcat) and uploaded by the seed — see shadowcatFilmImages.
 */
export const shadowcatFilmSeed = {
  title: 'Con Te Partiro (Time To Say Goodbye)',
  logline:
    '1000s of rotating lights beneath moving streams of water perform to a timeless duet featuring Andrea Bocelli and Sarah Brightman.',
  year: '2024',
  runtime: '5 min',
  camera: 'Canon EOS Rebel t7i',
  youtubeId: '7v3GNwprM8Q',
  credits: [
    { role: 'Director', name: 'Alden Gillespy' },
    { role: 'Cinematography', name: 'Alden Gillespy' },
    { role: 'Editor', name: 'Alden Gillespy' },
    { role: 'Colour', name: 'Alden Gillespy' },
  ],
  services: [
    { title: 'Narrative short film', note: 'Script through delivery, including the score' },
    { title: 'Portrait & documentary photography', note: 'Available for commission' },
    { title: 'Brand films for founders', note: "The kind that don't look like brand films" },
    { title: 'Broadcast identity & sound', note: 'The BOLT — imaging, sound and brand, all made in-house' },
  ],
}

/** Frames from the film (1920×1080), uploaded by the seed into heroImage / stills. */
export const shadowcatFilmImages = {
  hero: { file: 'shadowcat/con-te-partiro-hero.jpg', alt: 'The Bellagio at night behind a full arc of fountains' },
  stills: [
    { file: 'shadowcat/con-te-partiro-still-01.jpg', alt: 'Fountain jets crossing in a lattice of light' },
    { file: 'shadowcat/con-te-partiro-still-02.jpg', alt: 'Twin arches of water framing the lake' },
    { file: 'shadowcat/con-te-partiro-still-03.jpg', alt: 'A wave of mist sweeping across the lake' },
    { file: 'shadowcat/con-te-partiro-still-04.jpg', alt: 'A glowing curtain of water in front of the hotel' },
    { file: 'shadowcat/con-te-partiro-still-05.jpg', alt: 'A central tower of water rising at the climax' },
    { file: 'shadowcat/con-te-partiro-still-06.jpg', alt: 'Columns of water bursting skyward' },
  ],
}
