import type { UsesItem } from "./model";

export const usesGroupOrder = ["Hardware", "Software", "Workflow"] as const;

export const usesItems: UsesItem[] = [
  {
    group: "Hardware",
    name: "Primary development machine",
    description:
      "A compact workstation setup used for day-to-day engineering, writing, editing, and site iteration.",
    note: "The exact hardware list can graduate into richer structured records later.",
  },
  {
    group: "Hardware",
    name: "Canon EOS 800D",
    description:
      "A reliable camera body that still represents the cinematic side of the workflow on the current site and in case-study material.",
    note: "Frequently paired with tripod and ND filters for location shooting.",
  },
  {
    group: "Software",
    name: "VS Code",
    description:
      "Primary editor for the Qwik app, React product work, scripts, and most writing drafts.",
  },
  {
    group: "Software",
    name: "Figma",
    description:
      "Used for visual direction, layout decisions, and testing information architecture before implementation.",
  },
  {
    group: "Software",
    name: "Adobe Premiere Pro",
    description:
      "Still part of the production stack for editing, pacing, and color decisions that feed the cinematic side of the work.",
  },
  {
    group: "Software",
    name: "PostgreSQL + psql",
    description:
      "The data baseline when the content model needs to graduate from local files.",
  },
  {
    group: "Workflow",
    name: "Typed content files first",
    description:
      "Content starts in explicit TypeScript records before it gets promoted into routes, APIs, or a future CMS.",
  },
  {
    group: "Workflow",
    name: "Storyboarding before polish",
    description:
      "The same sequencing mindset used in editing carries over to product flows, homepage structure, and route composition.",
  },
  {
    group: "Workflow",
    name: "Frequent pruning",
    description:
      "Regularly cutting extra words, extra UI, and extra abstractions so the site stays compact.",
  },
];
