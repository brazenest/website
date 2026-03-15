import type { AboutPageContent, HomePageContent } from "./model";

export const homePageContent: HomePageContent = {
  heroImage: {
    src: "/assets/images/profile/IMG_1603.JPG",
    alt: "Alden Gillespy outdoors against a cloudy sky.",
    width: 2400,
    height: 1600,
  },
};

export const aboutPageContent: AboutPageContent = {
  heroImage: {
    src: "/assets/images/ChatGPT Image Mar 15, 2026, 12_02_02 AM.png",
    alt: "An AI-generated image representing personal background and hybrid creative-technical work.",
    width: 1920,
    height: 1080,
  },
  portraitImage: {
    src: "/assets/images/me-coffeeshop-cropped_Original.png",
    alt: "Alden Gillespy seated in a coffeeshop.",
    width: 957,
    height: 690,
    caption: "A coffeeshop portrait for the about page.",
  },
  storyImage: {
    src: "/assets/images/ChatGPT Image Mar 15, 2026, 12_04_41 AM.png",
    alt: "Collage representing software engineering and video production.",
    width: 1024,
    height: 1536,
    caption: "Engineering, design, and production in the same frame.",
  },
  introduction: [
    "As a young student of creativity, I studied Computer Science at the University of Florida and later earned a Film and Video Production degree from Full Sail University. Those two identities collided early and never separated.",
    "I've worked as a full-stack engineer on high-visibility projects, including a consumer-scale onboarding flow used by millions annually. I've also spent years shooting, editing, and producing videos designed to communicate ideas visually and memorably.",
    "Outside of work, you'll find me experimenting with cameras, writing about design, or solving interesting technical problems.",
  ],
  philosophy: [
    {
      heading: "Start with the real friction",
      paragraphs: [
        "The first thing I look for is <strong>where the friction actually lives</strong>. I tend to think from the user's point of view first, then work backward into architecture, states, and interface decisions that can support a cleaner experience. That bias toward clarity runs through the <a href=\"/projects\">project work</a> on this site.",
      ],
    },
    {
      heading: "Build systems that stay usable",
      paragraphs: [
        "That is why I care so much about <strong>front-end systems</strong>. I like interfaces that feel deliberate, but visual quality doesn't last if the structure is brittle. Reusable patterns, typed content, and maintainable data flow make good decisions repeatable. If something looks polished but is hard to extend, the job isn't finished. That durability mindset shapes the <a href=\"/blog\">writing and system work</a> behind this site.",
      ],
    },
    {
      heading: "Use visual thinking practically",
      paragraphs: [
        "My film background shapes my work practically. Editing teaches rhythm. Cinematography teaches attention and frame composition. In product work, this shows as pacing, hierarchy, and restraint. The visual side is clearer in my <a href=\"/photos\">photo work</a>, but influences interface decisions.",
      ],
    },
    {
      heading: "Work at the overlap",
      paragraphs: [
        "I don't separate technical and creative work. Engineering gives me reliability and scale concerns. Production gives tone and emotional clarity. <strong>The overlap is where I excel.</strong> I'm most useful when products need solid implementation and a clear experience vision. The resume has the short version; this site the long record.",
      ],
    },
  ],
};
