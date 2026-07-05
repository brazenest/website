export const aboutPageContent = {
  eyebrow: "About Alden",
  title: "I work across code, camera, and the story a site needs to tell.",
  intro:
    "I am Alden Gillespy, a software engineer and video producer. I build websites, web systems, and visual material for people whose work is already real, but needs a clearer shape online.",
  portrait: {
    src: "/media/about/alden-portrait-aspens.jpg",
    alt: "Portrait of Alden Gillespy outdoors, smiling in a leather jacket against golden autumn aspen leaves.",
    eyebrow: "Alden Gillespy",
    caption: "Software engineer and video producer.",
  },
  narrativeSections: [
    {
      heading: "Who I Am",
      paragraphs: [
        "My work combines software engineering, positioning, and visual production. On one project I may be structuring a fast service website. On another, I may be shaping a founder profile, planning a shoot, or cleaning up the technical layer underneath a growing site.",
        "What connects those environments is care for structure. I like taking a loose idea, finding the center of it, and turning it into something another person can understand, use, and remember.",
      ],
    },
    {
      heading: "One Practice, Several Tools",
      paragraphs: [
        "I do not treat engineering and production as separate lives. They are different ways of solving the same kind of problem: how do you make something complex feel understandable and worth paying attention to?",
        "Engineering is where I make the foundation fast, maintainable, searchable, and reliable. Production is where I make the human side easier to see: better images, cleaner rhythm, and a story that feels specific instead of generic.",
        "Both ask for the same judgment: choose what matters, remove what does not, and leave behind work that makes the next step easier.",
      ],
    },
  ],
  principles: {
    heading: "How I Think About the Work",
    intro:
      "I like work that has energy without losing its manners. The process is practical, but it leaves room for taste.",
    items: [
      {
        title: "Start from the person on the other side",
        description:
          "Before choosing layouts, frameworks, or shot lists, I look at who will visit, what they need to understand, and what would make the next step feel natural.",
      },
      {
        title: "Make tradeoffs explicit",
        description:
          "I explain why decisions were made, from architecture constraints to positioning choices, so the work does not feel arbitrary later.",
      },
      {
        title: "Design for life after launch",
        description:
          "I structure code, content, and media so the site can keep improving after launch instead of becoming a fragile snapshot.",
      },
      {
        title: "Use energy with restraint",
        description:
          "A site can feel young, strong, and alive without yelling. I prefer strong hierarchy, clean movement, useful color, and copy that sounds like a person.",
      },
    ],
  },
  split: {
    heading: "Why Engineering and Production Both Belong Here",
    intro:
      "Many good projects need both a working system and a clearer way to show the people behind it.",
    sides: [
      {
        title: "Engineering",
        description:
          "Fast, maintainable websites and product surfaces with clean architecture, good performance, SEO foundations, and room to grow.",
      },
      {
        title: "Production",
        description:
          "Profile pieces, campaign assets, interviews, and visual material that make the work feel more immediate and human.",
      },
    ],
    bridge:
      "They reinforce each other. Engineering gives the site a durable foundation. Production gives that foundation more life, context, and feeling.",
  },
  cta: {
    eyebrow: "Next",
    heading: "Start wherever the project feels most real.",
    description:
      "Start with packages if you want a clear service path. Browse the work if you want to see how I think across systems, sites, and production.",
    links: [
      {
        label: "View Website Packages",
        href: "/packages",
        variant: "primary",
      },
      {
        label: "Browse Selected Work",
        href: "/work",
        variant: "secondary",
      },
      {
        label: "Start a Project",
        href: "/contact",
        variant: "ghost",
      },
    ],
  },
} as const;
