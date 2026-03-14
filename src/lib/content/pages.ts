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
    src: "/assets/images/7583870720_IMG_0312.JPG",
    alt: "Colorful floral installations hanging beneath a warm yellow domed ceiling.",
    width: 6000,
    height: 4000,
    caption: "A floral dome detail repurposed as an about-page hero.",
  },
  portraitImage: {
    src: "/assets/images/profile/IMG_1603.JPG",
    alt: "Alden Gillespy outdoors against a cloudy sky.",
    width: 2400,
    height: 1600,
    caption: "A current portrait image from the live site.",
  },
  storyImage: {
    src: "/assets/images/about-me/more-description-image.jpg",
    alt: "Collage representing software engineering and video production.",
    width: 800,
    height: 1200,
    caption: "Engineering, design, and production in the same frame.",
  },
  introduction: [
    "As a young student of creativity, I studied Computer Science at the University of Florida and later earned a Film and Video Production degree from Full Sail University. Those two identities collided early and never separated.",
    "I've worked as a full-stack engineer on high-visibility projects, including a consumer-scale onboarding flow used by millions annually. I've also spent years shooting, editing, and producing videos designed to communicate ideas visually and memorably.",
    "Outside of work, you'll usually find me experimenting with camera setups, writing about product and design, or solving problems no one asked me to solve because that's often where the interesting systems work begins.",
  ],
  philosophy: [
    "Whether I'm engineering a product or producing a video, my philosophy stays the same: clarity over complexity, craft over shortcuts, and emotion over decoration. Code should feel as intentional as narrative editing.",
    "I believe the best digital products feel less like software and more like stories you move through. Every transition, every interaction, and every frame should serve a purpose.",
    "I don't see design, engineering, and storytelling as separate disciplines, but as parts of the same system. Strategy informs structure, structure informs visuals, and visuals reinforce meaning.",
  ],
};
