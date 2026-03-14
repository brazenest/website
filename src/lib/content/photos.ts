import type { PhotoCatalog, PhotoItem } from "./model";

export const photoCatalogs: PhotoCatalog[] = [
  {
    slug: "bellagio-fountains",
    title: "Bellagio fountains",
    years: "2024",
    note:
      "Night studies and fountain frames built around the SHADOWCAT Pictures Bellagio series.",
    coverImage: {
      src: "/assets/images/work/shadowcat-bellagio-fountains/hero.png",
      alt: "Bellagio fountains at night with colored water and surrounding lights.",
      width: 1920,
      height: 1080,
    },
  },
  {
    slug: "city-and-travel",
    title: "City and travel studies",
    years: "2024",
    note:
      "Wider urban frames collected around production trips, architecture, and evening light.",
    coverImage: {
      src: "/assets/images/lasvegas-evening-skyline.jpg",
      alt: "Evening skyline of Las Vegas with mountains in the distance.",
      width: 5999,
      height: 2633,
    },
  },
  {
    slug: "personal-observations",
    title: "Personal observations",
    years: "2024-2026",
    note:
      "Portraits, interiors, and texture-heavy frames that feel closer to a visual notebook.",
    coverImage: {
      src: "/assets/images/7583870720_IMG_0312.JPG",
      alt: "Colorful floral installations hanging beneath a warm yellow domed ceiling.",
      width: 6000,
      height: 4000,
    },
  },
];

export const photos: PhotoItem[] = [
  {
    slug: "bellagio-opening-frame",
    catalog: "bellagio-fountains",
    title: "Bellagio opening frame",
    location: "Las Vegas, NV",
    year: "2024",
    note: "A first establishing frame from the Bellagio series.",
    featured: true,
    image: {
      src: "/assets/images/work/shadowcat-bellagio-fountains/gallery/frame-01.png",
      alt: "Bellagio fountains at night with the Las Vegas skyline behind them.",
      width: 1920,
      height: 1080,
    },
  },
  {
    slug: "bellagio-gold-break",
    catalog: "bellagio-fountains",
    title: "Bellagio gold break",
    location: "Las Vegas, NV",
    year: "2024",
    note: "A warmer interval that leans into glow, pacing, and negative space.",
    image: {
      src: "/assets/images/work/shadowcat-bellagio-fountains/gallery/frame-03.png",
      alt: "Bellagio fountains lit warmly at night with a dark skyline behind them.",
      width: 1920,
      height: 1080,
    },
  },
  {
    slug: "bellagio-red-interval",
    catalog: "bellagio-fountains",
    title: "Bellagio red interval",
    location: "Las Vegas, NV",
    year: "2024",
    note: "A color-driven frame study from the same series.",
    featured: true,
    image: {
      src: "/assets/images/work/shadowcat-bellagio-fountains/gallery/frame-04.png",
      alt: "Bellagio fountains lit in warm tones during a nighttime performance.",
      width: 1920,
      height: 1080,
    },
  },
  {
    slug: "bellagio-blue-arc",
    catalog: "bellagio-fountains",
    title: "Bellagio blue arc",
    location: "Las Vegas, NV",
    year: "2024",
    note: "Built around pacing, symmetry, and contrast.",
    image: {
      src: "/assets/images/work/shadowcat-bellagio-fountains/gallery/frame-06.png",
      alt: "Blue-lit Bellagio fountain arcs against the night skyline.",
      width: 1920,
      height: 1080,
    },
  },
  {
    slug: "bellagio-midnight-finale",
    catalog: "bellagio-fountains",
    title: "Bellagio midnight finale",
    location: "Las Vegas, NV",
    year: "2024",
    note: "A later-frame composition that pushes the series closer to abstraction.",
    image: {
      src: "/assets/images/work/shadowcat-bellagio-fountains/gallery/frame-10.png",
      alt: "Bellagio fountains exploding upward in bright light at night.",
      width: 1920,
      height: 1080,
    },
  },
  {
    slug: "vegas-evening-skyline",
    catalog: "city-and-travel",
    title: "Las Vegas evening skyline",
    location: "Las Vegas, NV",
    year: "2024",
    note: "A wider city study that sits near the edge of the motion work.",
    featured: true,
    image: {
      src: "/assets/images/lasvegas-evening-skyline.jpg",
      alt: "Evening skyline of Las Vegas with mountains in the distance.",
      width: 5999,
      height: 2633,
    },
  },
  {
    slug: "floral-dome-study",
    catalog: "personal-observations",
    title: "Floral dome study",
    location: "Las Vegas, NV",
    year: "2024",
    note: "A ceiling detail that feels halfway between architecture and stage design.",
    featured: true,
    image: {
      src: "/assets/images/7583870720_IMG_0312.JPG",
      alt: "Colorful floral installations hanging beneath a warm yellow domed ceiling.",
      width: 6000,
      height: 4000,
    },
  },
  {
    slug: "sky-portrait",
    catalog: "personal-observations",
    title: "Sky portrait",
    location: "Salt Lake City, UT",
    year: "2026",
    note: "A simple portrait frame with enough sky to let the composition breathe.",
    image: {
      src: "/assets/images/profile/IMG_1603.JPG",
      alt: "Alden Gillespy outdoors against a bright sky with clouds.",
      width: 2400,
      height: 1600,
    },
  },
];
