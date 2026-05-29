import type { ContactPageContent } from "~/types/content";

export const contactPageContent: ContactPageContent = {
  eyebrow: "Contact",
  title: "Tell me what you are working on.",
  intro:
    "If you are launching, rebuilding, or trying to make an existing site feel more like the work behind it, send the context. I take on website builds, redesigns, technical cleanup, and production work.",
  bridge:
    "You do not need to know whether the right next step is copy, design, engineering, SEO, or media. A simple note about where things stand is enough to begin.",
  contactPanel: {
    eyebrow: "Best first step",
    heading: "Send the current state and where you want to go.",
    description:
      "Email is the easiest way to start. A short note about the project, the timeline, and what you are hoping to improve gives me enough to respond usefully.",
    methods: [
      {
        label: "Email",
        value: "ag@aldengillespy.com",
        href: "mailto:ag@aldengillespy.com?subject=Website%20Project%20Inquiry",
        description:
          "Best for project briefs, website analysis requests, and collaboration notes.",
      },
      {
        label: "LinkedIn",
        value: "linkedin.com/in/alden-gillespy",
        href: "https://www.linkedin.com/in/alden-gillespy/",
        description:
          "Useful for professional context and background before reaching out.",
      },
      {
        label: "GitHub",
        value: "github.com/brazenest",
        href: "https://github.com/brazenest",
        description:
          "Engineering samples, experiments, and implementation history.",
      },
      {
        label: "YouTube",
        value: "youtube.com/@SHADOWCATpictures",
        href: "https://youtube.com/@SHADOWCATpictures",
        description: "Production work, visual samples, and edit-driven pieces.",
      },
    ],
  },
  inquiryTypes: {
    heading: "Good reasons to reach out",
    intro:
      "The best messages are simple and specific. A few honest details are usually more helpful than a polished brief.",
    items: [
      {
        title: "Website projects",
        description:
          "Launches and redesigns for independent professionals, service businesses, and small teams that need a clearer, faster, more useful site.",
      },
      {
        title: "Website teardowns and audits",
        description:
          "A practical review of what is working, what is confusing, and what could improve across performance, structure, content, SEO, and visual presentation.",
      },
      {
        title: "Production work",
        description:
          "Founder profiles, service explainers, interviews, campaign assets, and visual material that helps people understand the work more quickly.",
      },
      {
        title: "Cross-disciplinary collaborations",
        description:
          "Projects where product, content, and communication overlap, and the work benefits from one person who can reason through both system and story.",
      },
    ],
  },
  includeItems: {
    heading: "What to include",
    intro:
      "A little context upfront helps me understand your situation quickly and reply with something concrete.",
    items: [
      {
        title: "Your situation or current state",
        description:
          "What you are building, selling, or trying to fix. For teardowns, include the current website URL and what prompted the request.",
      },
      {
        title: "Your specific goals",
        description:
          "The outcome you want: better inquiries, a clearer offer, faster launch, better SEO, improved media, or a cleaner technical base.",
      },
      {
        title: "Timeline and constraints",
        description:
          "Deadlines, budget range, technical requirements, approval process, or any fixed constraints that shape the work.",
      },
      {
        title: "Why you're reaching out now",
        description:
          "A sentence on what changed recently helps me understand urgency. For packages, mention the tier that seems closest. For teardowns, mention what feels off.",
      },
    ],
  },
  nextSteps: {
    heading: "What happens next",
    intro:
      "After you reach out, I review for fit, scope, and timing. If it looks aligned, I will reply with a useful next step.",
    items: [
      {
        title: "Initial review",
        description:
          "I look at the project type, where things stand, what you are hoping to improve, and whether there is a good timing fit.",
      },
      {
        title: "Reply with questions or next step",
        description:
          "If aligned, I will ask clarifying questions, share availability, or suggest a focused conversation.",
      },
      {
        title: "Scope alignment or analysis",
        description:
          "For projects, we map deliverables and timeline. For teardowns, we define what to analyze and how the findings should be delivered.",
      },
    ],
    note: "You will get a direct reply from me. No automation, no canned intake sequence.",
  },
  cta: {
    eyebrow: "Ready to start",
    heading: "Send a note and I will take a look.",
    description:
      "A few lines about your situation, goals, and timeline are enough to start a focused conversation.",
    buttons: [
      {
        label: "Email Your Inquiry",
        href: "mailto:ag@aldengillespy.com?subject=Website%20Project%20Inquiry",
        variant: "primary",
      },
      {
        label: "View Packages",
        href: "/packages",
        variant: "secondary",
      },
    ],
    footnote:
      "If you are not sure whether you need a full project or a teardown, send the context anyway. We can sort out the right path from there.",
  },
} as const;
