import type { Package } from "~/types/content";

export const packages: Package[] = [
  {
    id: "foundation",
    title: "Foundation",
    slug: "foundation",
    description:
      "A focused site for getting established online with a clear offer, a strong first impression, performance fundamentals, and a clean inquiry path.",
    forWho:
      "People launching or rebuilding a professional presence who need something clear, polished, and easy to maintain.",
    includes: [
      "Positioning and offer clarity",
      "Performance-optimized website foundation",
      "Mobile-first service page structure",
      "Homepage, work, and inquiry sections",
      "Basic visual system and credibility cues",
      "Search console setup and SEO fundamentals",
      "Contact or inquiry flow",
    ],
    outcome:
      "A professional web presence that explains what you do, why it matters, and how someone can take the next step.",
    ctaLabel: "Discuss Foundation Package",
    ctaHref: "/contact",
  },
  {
    id: "growth",
    title: "Growth",
    slug: "growth",
    description:
      "A deeper site for an active practice: clearer service pages, better work samples, useful content structure, and smoother inquiry paths.",
    forWho:
      "Established service businesses, consultants, clinics, studios, and local operators who want the site to support more of the sales conversation.",
    includes: [
      "Everything in Foundation",
      "Expanded service and audience pages",
      "Conversion-focused information architecture",
      "Case studies, testimonials, or selected work",
      "Local or niche SEO structure",
      "Analytics and performance monitoring",
      "Resources or insight section",
      "Lead capture and qualification workflow",
    ],
    outcome:
      "A site that explains the work clearly, supports search visibility, and gives interested visitors more context before they reach out.",
    ctaLabel: "Discuss Growth Package",
    ctaHref: "/contact",
    highlight: true,
  },
  {
    id: "authority",
    title: "Authority",
    slug: "authority",
    description:
      "A fuller platform for expert-led work: stronger positioning, richer case studies, content architecture, media support, and long-term room to publish.",
    forWho:
      "Professionals and founder-led teams who have more to say, more to show, and a real need for the site to keep evolving.",
    includes: [
      "Everything in Growth",
      "Positioning and message system",
      "Strategic SEO roadmap",
      "Advanced case study or work platform",
      "Media and visual storytelling assets",
      "Content system for ongoing publishing",
      "Advanced analytics and conversion review",
      "Long-term iteration partnership",
    ],
    outcome:
      "A durable digital home for your work: clear enough for new visitors, deep enough for people who want details, and flexible enough to keep improving.",
    ctaLabel: "Discuss Authority Package",
    ctaHref: "/contact",
  },
];
