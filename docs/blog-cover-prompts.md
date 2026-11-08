# Blog cover prompts

One prompt per post, all built on the same **style recipe** so the thirteen covers read as a set.
Paste the recipe and then the post's subject line into the image tool. Generate at **16:9, 1920×1080 or larger**.

**Upload:** in the admin (`pnpm dev` → localhost:3000/admin), go to Posts → (post) → Cover image. An uploaded cover overrides
the generated pattern everywhere: the blog index, the post page and the social card.

**Crop-safe framing:** the post page shows the cover as a wide 16:5 band, which keeps only the middle ~55% of the
height. The blog index shows it at 16:9. Keep the subject inside the **central horizontal band**, with nothing
important near the top or bottom edge.

## Style recipe (paste first, every time)

> Editorial conceptual still-life photograph for a technology and film journal. A single physical object or small
> arrangement that stands in for the idea, shot in a dark studio against a deep near-black seamless backdrop. Soft
> directional key light from one side, gentle falloff, shallow depth of field, fine film grain. One dominant accent
> colour: **{ACCENT}**. Everything else is neutral charcoal and warm grey. Minimal, calm, generous negative space,
> subject centred in the middle horizontal band of a 16:9 frame. No text, no letters, no numbers, no logos, no
> brand marks, no screens showing UI, no human faces.

Accent colour per category (it matches the colour the site already gives each category):

| Category | {ACCENT} |
|---|---|
| Engineering | electric cobalt blue (#2563EB) |
| Cinematic | warm amber gold (#E2A03C) |
| Process | acid volt yellow-green (#D4FF00), used as a small glowing detail only |
| Other Topics | cool slate blue-grey (#6A7688), used as rim light |

## Subjects

### Engineering (accent: cobalt blue)

1. **Working with ChatGPT, Part 1: authority and specificity.** A brass conductor's baton resting across a sheet of
   blank staff paper; a single thin cobalt light traces the baton's tip.
2. **Working with ChatGPT, Part 2: prompt structure and control.** A ship's helm wheel in miniature, half in shadow,
   its spokes catching cobalt rim light, sitting on a dark slate surface.
3. **Working with ChatGPT, Part 3: attention, contracts, fixing errors at once.** A fountain pen laid precisely across a folded paper contract, a cobalt wax seal pressed at the fold.
4. **React naming conventions.** Rows of identical small wooden drawer labels in a type-case tray, perfectly aligned.
   One label holder is lit cobalt.
5. **Why you need React: contextual awareness.** A cluster of glass marbles on a dark mirror. The marble at the
   centre glows cobalt and tints its neighbours' reflections.
6. **Why TDD: no more guessing at bugs.** A spirit level and a machinist's square set against a cobalt-lit steel
   block, measured before it's cut.

### Cinematic (accent: amber gold)

7. **Say Hello to Shadowcat Pictures.** *Better with a real frame:* pull a still from the Bellagio fountains or the
   Qantas A380 video, the way the Con Te Partiro frames were made. If generating instead: a vintage cinema camera
   lens on black velvet, amber stage light flaring across the glass, droplets of water on the lens hood.

### Process (accent: volt, as a small glowing detail)

8. **Chrome Lighthouse and site performance.** A small lighthouse model on a dark rocky base at night, its lamp
   throwing a thin volt-green beam across fog.
9. **Ditch email: tracking pixels.** A sealed paper envelope on a dark desk with a single tiny volt-green point of
   light glowing through the paper from inside, like a hidden sensor.
10. **OpenType variable fonts in Safari 11.** Metal letterpress sorts, viewed as abstract blocks with no readable
    letters, arranged in a smooth gradient of weights from hairline to black. One block has a volt edge highlight.

### Other Topics (accent: slate, as rim light)

11. **What killed Toys "R" Us? A leveraged buyout.** A plain unbranded wooden toy block tower being pulled down by a
    thin chain attached to a heavy iron weight. Slate rim light.
12. **Does location privacy exist anymore?** An old brass pocket compass on dark felt, with fine concentric ripple
    rings spreading outward from it like radio waves, lit in slate.
13. **Net neutrality: market forces or the FCC?** Two parallel glass tubes with light flowing through them, one wide
    and bright, one pinched to a narrow trickle. Slate-blue light.

## After generating

- Check that the cover isn't too bright or too dark next to the site: aim for a mean luminance of about 0.18 to 0.45.
  Claude can measure this once the files are uploaded.
- Fill in the alt text in the admin with what the image shows, e.g. "A lighthouse beam crossing fog at night".
