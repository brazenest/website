/**
 * Shadowcat film — "Con Te Partiro (Time To Say Goodbye)". Mirrors the Payload record so a
 * re-seed won't revert it to a placeholder (the film was finalised in the admin, then
 * exported). The heroImage is an admin upload (mqdefault.jpg) the seed can't recreate (§8.3);
 * the page renders the YouTube facade from youtubeId regardless.
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
  // heroImage: admin upload (mqdefault.jpg) — not recreated by the seed (§8.3).
  services: [
    { title: 'Narrative short film', note: 'Script through delivery, including the score' },
    { title: 'Portrait & documentary photography', note: 'Available for commission' },
    { title: 'Brand films for founders', note: "The kind that don't look like brand films" },
    { title: 'Broadcast identity & sound', note: 'Three stations, all of it made in-house' },
  ],
}
