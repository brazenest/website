import type { BlogPostSide, StaticBlogPost } from '~/types/content'

const BLOG_SIDE_LABEL: Record<BlogPostSide, string> = {
  engineering: 'Side 1 · Engineering',
  production: 'Side 2 · Production',
  bridge: 'Bridge · Cross-disciplinary',
}

const compareByNewest = (left: StaticBlogPost, right: StaticBlogPost) => {
  return new Date(right.date).getTime() - new Date(left.date).getTime()
}

const rawBlogPosts: StaticBlogPost[] = [
  {
    title: 'Designing for Revision in Schema-Driven Systems',
    slug: 'designing-for-revision-in-schema-driven-systems',
    date: '2026-03-18',
    summary:
      'Schema-driven platforms are often designed around the publishing moment, but the real operating pressure arrives later, during revision. Getting the revision model right from the start determines whether the system stays composable as requirements grow.',
    side: 'engineering',
    published: false,
    sections: [
      {
        title: 'Revision is not an edge case',
        paragraphs: [
          'Most content systems are described as publishing systems, but the real operating load usually comes from revision. Requirements shift, teams learn in public, and releases need to absorb new information without collapsing their own structure.',
          'The clearest sign a system was not designed for revision is when updating live content requires a workaround instead of a workflow. That friction accumulates quietly until routine changes become expensive coordination problems that drain team trust in the platform itself.',
        ],
      },
      {
        title: 'Version boundaries need intent',
        paragraphs: [
          'Draft, preview, and published are not just labels on a content object. They are different contracts with different audiences, different permission scopes, and different expectations about stability. When those distinctions are left implicit, teams build workarounds around the gaps and call the result process.',
          'Versioned schema evolution requires making early commitments about which fields are stable, which can change without notice, and what constitutes a breaking change. Systems that defer those decisions eventually discover the cost mid-release, when a live version needs to coexist with an in-progress revision that violates a rule no one wrote down.',
        ],
      },
      {
        title: 'Why this matters operationally',
        paragraphs: [
          'When revision workflows are explicit and safe, the launch window is not a source of anxiety. Editors know what they are changing. Reviewers know what they are approving. Engineers know what state the content is in and can reason about side effects before they become incidents.',
          'The operational payoff is focus. When the revision model is reliable, engineering capacity goes toward platform capability rather than toward repetitive correction work. Teams get to move forward instead of defending ground they already shipped.',
        ],
      },
    ],
  },
  {
    title: 'Canonical Inputs Before Clever Interfaces',
    slug: 'canonical-inputs-before-clever-interfaces',
    date: '2026-03-12',
    summary:
      'Messy search and form behavior usually starts before the UI. The durable move is to normalize ambiguity at the system boundary so every downstream decision starts from the same contract.',
    side: 'engineering',
    published: true,
    sections: [
      {
        title: 'Ambiguity enters earlier than teams expect',
        paragraphs: [
          'Users and upstream systems rarely hand you clean inputs. Dates are partial, locations are inconsistently named, and business logic depends on assumptions that were never written down. Teams often try to absorb that instability in the interface layer, which makes the UI look helpful while quietly exporting inconsistency to every other part of the system.',
          'That approach feels fast at first, but it produces a product where every new feature re-litigates the same ambiguity. Search rules drift. Filters behave differently across screens. Integrations become negotiations instead of contracts.',
        ],
      },
      {
        title: 'Normalize at the edge, not in the middle',
        paragraphs: [
          'The better move is to treat the system boundary as the place where ambiguity gets resolved into a canonical representation. Parse early. Validate explicitly. Name the contract carefully. Once downstream layers receive one stable model, the rest of the architecture gets simpler on purpose.',
          'This does not remove complexity. It relocates complexity to the place where it can be inspected, tested, and improved without infecting every route, component, and query shape in the codebase.',
        ],
      },
      {
        title: 'Clarity at the boundary increases product speed',
        paragraphs: [
          'Canonical inputs are not just an engineering preference. They let product teams add filters, integrations, and new surfaces without rewriting the meaning of the system every time scope expands.',
          'The point is not purity. The point is preserving predictable behavior under growth so the next feature starts from structure rather than from cleanup.',
        ],
      },
    ],
  },
  {
    title: 'What Shot Lists and System Diagrams Have in Common',
    slug: 'what-shot-lists-and-system-diagrams-have-in-common',
    date: '2026-02-24',
    summary:
      'Shot planning and architecture diagrams solve the same problem: choose enough structure early that execution stays flexible later.',
    side: 'bridge',
    published: true,
    sections: [
      {
        title: 'Both are preconditions for clarity',
        paragraphs: [
          'A shot list is not creativity replaced by paperwork. A system diagram is not thinking replaced by boxes and arrows. In both cases, the structure exists to make later decisions legible when time gets tight and the work becomes less forgiving.',
          'The shared discipline is this: decide what must remain stable, what can flex, and what kind of failure is unacceptable once execution begins.',
        ],
      },
      {
        title: 'Flexibility is designed before it is needed',
        paragraphs: [
          'In production, adaptable coverage lets the edit survive location changes, timing problems, or a better narrative beat discovered on set. In engineering, thoughtful boundaries let a product survive new requirements without forcing a rewrite of its core assumptions.',
          'What looks like flexibility later is usually evidence of structure earlier. Teams only get real room to maneuver when someone designed for revision before the pressure arrived.',
        ],
      },
      {
        title: 'Restraint is part of the craft',
        paragraphs: [
          'The disciplines also share a bias toward restraint. Not every project needs more abstraction. Not every sequence needs more coverage. Sometimes the strongest move is to define a smaller, clearer system that leaves less room for noise.',
          'That is one reason the two sides of this site belong together. Both reward clear intent, careful sequencing, and structures that continue to make sense after the first handoff.',
        ],
      },
    ],
  },
  {
    title: 'Editorial Pacing Is an Operational Decision',
    slug: 'editorial-pacing-is-an-operational-decision',
    date: '2026-02-08',
    summary:
      'In short-form and launch pieces, pacing is not just an aesthetic preference. It determines comprehension, emotional control, and whether the message survives the constraints of delivery.',
    side: 'production',
    published: true,
    sections: [
      {
        title: 'Rhythm controls comprehension before it controls style',
        paragraphs: [
          'Editors often talk about pacing as mood, but the first job of pacing is comprehension. Viewers need enough time to recognize what matters, register the transition, and understand why one beat follows another. If the rhythm obscures that sequence, the piece can feel energetic while still failing to communicate.',
          'Pacing is also where the quality of the coverage becomes visible. If an editor has to cut faster to compensate for thin coverage, the energy is borrowed from clarity. The viewer keeps up with the rhythm, but the arc stops landing.',
        ],
      },
      {
        title: 'Coverage planning creates editorial options',
        paragraphs: [
          'Good pacing is rarely rescued in the timeline by instinct alone. It usually comes from coverage that was designed to give the edit clear options: anchors for orientation, mediums for phrasing, and details for compression, emphasis, or release.',
          'When those layers are missing, the edit is forced to manufacture momentum instead of shaping it. That usually leads to noise, not control.',
        ],
      },
      {
        title: 'Tone survives through disciplined choices',
        paragraphs: [
          'Pacing also decides whether tone remains coherent across formats. A launch film, a founder piece, and a short social cut may need different tempos, but they still need to feel like the same authored work.',
          'That consistency comes from discipline: holding on important frames long enough, trimming redundancy early, and resisting the urge to confuse speed with conviction.',
        ],
      },
    ],
  },
  {
    title: 'One Shoot, Many Deliverables Without Losing Intent',
    slug: 'one-shoot-many-deliverables-without-losing-intent',
    date: '2026-03-05',
    summary:
      'Designing coverage around multiple format deliverables creates a specific authorship problem: the temptation to shoot for maximum flexibility usually produces footage that reframes safely but says nothing with conviction. The right frame for multi-format work is story-first coverage, with reframing built in second.',
    side: 'production',
    published: false,
    sections: [
      {
        title: 'Coverage for formats is not the same as coverage for story',
        paragraphs: [
          'Multi-format production creates a specific kind of pressure: design every setup for maximum reframing flexibility, shoot wide for safety, and trust post-production to find the narrative in neutral footage. This produces deliverables efficiently. It rarely produces work that feels authored.',
          'The difference between format-first coverage and story-first coverage is intent at the moment of setup. Format coverage asks what can be reframed into a vertical or a square without losing usability. Story coverage asks what must remain in the frame for the idea to survive any cut.',
        ],
      },
      {
        title: 'Safe framing still needs intention',
        paragraphs: [
          'Working within format constraints does not require surrendering point of view. Vertical and square crops expose different parts of the frame, but they do not require removing rhythm, emphasis, or editorial control from the setup itself.',
          'The practical move is to plan framing around narrative beats first, then identify the safe zones for reframing second. When those decisions are made at the shoot stage, the coverage serves both the story and the delivery requirement rather than trading one against the other.',
        ],
      },
      {
        title: 'Operational planning protects the final cut',
        paragraphs: [
          'The connection between acquisition planning and editorial outcome is tight in multi-format production. Decisions about movement, orientation, and transition options made during the shoot directly determine what the editor can build in the timeline.',
          'That means the most consequential editing choices in a multi-format project are actually planning decisions. Coverage built with clear transition options, intentional movement, and defined anchor frames gives the edit room to shape the work rather than rescue it.',
        ],
      },
    ],
  },
]

export const blogPosts: StaticBlogPost[] = [...rawBlogPosts].sort(compareByNewest)

export const publishedBlogPosts = blogPosts.filter((post) => post.published)

export const draftBlogPosts = blogPosts.filter((post) => !post.published)

export const formatBlogDate = (date: string) => {
  return new Intl.DateTimeFormat('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  }).format(new Date(`${date}T00:00:00`))
}

export const getBlogSideLabel = (side: BlogPostSide) => {
  return BLOG_SIDE_LABEL[side]
}

export const getBlogPostBySlug = (slug: string) => {
  return blogPosts.find((post) => post.slug === slug)
}

export const getPublishedBlogPostBySlug = (slug: string) => {
  const post = getBlogPostBySlug(slug)

  if (!post?.published) {
    return undefined
  }

  return post
}