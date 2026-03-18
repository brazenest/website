import type { BlogPost, BlogPostSide } from '~/types/content'

const BLOG_SIDE_LABEL: Record<BlogPostSide, string> = {
  engineering: 'Side 1 · Engineering',
  production: 'Side 2 · Production',
  bridge: 'Bridge · Cross-disciplinary',
}

const compareByNewest = (left: BlogPost, right: BlogPost) => {
  return new Date(right.date).getTime() - new Date(left.date).getTime()
}

const rawBlogPosts: BlogPost[] = [
  {
    title: 'Designing for Revision in Schema-Driven Systems',
    slug: 'designing-for-revision-in-schema-driven-systems',
    date: '2026-03-18',
    summary:
      'A draft on why schema-driven platforms need revision paths designed into the system from the start, not added after authoring complexity appears.',
    side: 'engineering',
    published: false,
    sections: [
      {
        title: 'Revision is not an edge case',
        paragraphs: [
          'Most content systems are described as publishing systems, but the real operating load usually comes from revision. Requirements shift, teams learn in public, and releases need to absorb new information without collapsing their own structure.',
        ],
      },
      {
        title: 'Version boundaries need intent',
        paragraphs: [
          'This piece will focus on versioned schema evolution, authoring guardrails, and what it means to make drafts, previews, and releases behave like first-class states instead of informal conventions.',
        ],
      },
      {
        title: 'Why this matters operationally',
        paragraphs: [
          'The goal is to show how revision-friendly systems reduce launch anxiety, make ownership clearer, and keep engineering energy focused on platform capability instead of repetitive rescue work.',
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
      'A draft on planning coverage for multiple formats without letting the project dissolve into generic footage that can be cut a hundred ways but says nothing clearly.',
    side: 'production',
    published: false,
    sections: [
      {
        title: 'Coverage for formats is not the same as coverage for story',
        paragraphs: [
          'This piece will look at how vertical, square, and horizontal delivery requirements change framing plans, and how to preserve narrative clarity while still creating enough flexibility for post-production.',
        ],
      },
      {
        title: 'Safe framing still needs intention',
        paragraphs: [
          'The core argument is that multi-format production should not turn every setup into neutral filler. The challenge is to design modular coverage that survives reframing while still carrying point of view, rhythm, and emphasis.',
        ],
      },
      {
        title: 'Operational planning protects the final cut',
        paragraphs: [
          'The draft will connect production planning to editorial outcomes, especially how early decisions about movement, orientation, and transition options reduce revision churn later.',
        ],
      },
    ],
  },
]

export const blogPosts: BlogPost[] = [...rawBlogPosts].sort(compareByNewest)

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