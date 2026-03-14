import type { Project } from "./model";

export const projects: Project[] = [
  {
    slug: "personal-site-v3",
    title: "Personal site v3",
    summary:
      "Rebuilding aldengillespy.com as a typed, image-aware personal index that can later move cleanly into a database or CMS-backed system.",
    status: "Current",
    year: "2026",
    role: "Design + development",
    stack: ["Qwik", "TypeScript", "Content modeling"],
    image: {
      src: "/assets/images/home-page/hero-engineering-dark-2.png",
      alt: "Abstract blue engineering artwork used in the current site hero.",
      width: 1536,
      height: 1024,
      caption: "The visual direction from the current site is being folded into v3.",
    },
  },
  {
    slug: "writing-pipeline-refresh",
    title: "Writing pipeline refresh",
    summary:
      "Turning notes, essays, blog metadata, and site copy into a durable structure that can move between files, APIs, and a future CMS.",
    status: "Current",
    year: "2026",
    role: "Content structure + tooling",
    stack: ["Metadata", "Publishing", "Information architecture"],
    image: {
      src: "/assets/images/home/blog-thumbnail.jpg",
      alt: "A collage-style blog thumbnail from the current production site.",
      width: 800,
      height: 533,
      caption: "Starter writing structure pulled closer to the actual public site.",
    },
  },
  {
    slug: "timeshare-search-rentals",
    title: "Timeshare search rentals",
    summary:
      "A high-clarity booking and search experience for dense inventory and high-variation property data.",
    status: "Featured",
    year: "2025",
    role: "Product + engineering",
    stack: ["Search UX", "Next.js", "TypeScript"],
    image: {
      src: "/assets/images/work/timeshare-search-rentals/hero.webp",
      alt: "Hero image for the Timeshare Search and Rentals case study.",
      width: 1600,
      height: 900,
      caption: "Dense inventory made easier to scan, filter, and compare.",
    },
  },
  {
    slug: "ancestry-dna-activation",
    title: "Ancestry DNA activation",
    summary:
      "A scalable, resilient React and Node onboarding flow used by millions, redesigned to reduce friction from kit to activated account.",
    status: "Featured",
    year: "2025",
    role: "Flow design + implementation",
    stack: ["React", "TypeScript", "Node"],
    image: {
      src: "/assets/images/work/ancestry-dna-activation/hero.png",
      alt: "Hero image for the Ancestry DNA Kit Activation case study.",
      width: 1564,
      height: 671,
      caption: "High-visibility activation work from the live portfolio.",
    },
  },
  {
    slug: "shadowcat-bellagio-fountains",
    title: "Shadowcat: Bellagio fountains",
    summary:
      "Cinematic direction, camera, edit, and color for a long-tail video series that still shapes how I think about pacing and presentation on the web.",
    status: "Featured",
    year: "2024",
    role: "Direction + edit",
    stack: ["Direction", "Camera", "Edit", "Color"],
    image: {
      src: "/assets/images/work/shadowcat-bellagio-fountains/hero.png",
      alt: "Nighttime Bellagio fountains hero frame from the SHADOWCAT Pictures series.",
      width: 1536,
      height: 1024,
      caption: "A cinematic case study carried over from the current site.",
    },
  },
];
