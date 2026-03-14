import { component$ } from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";
import { PlaceholderPage } from "~/components/content";
import { createPageHead } from "~/lib/seo";

export default component$(() => {
  return (
    <PlaceholderPage
      eyebrow="Projects"
      title="Selected work will land here next."
      description="Projects in v3 will focus on a compact set of case studies, sharper storytelling, and cleaner supporting details."
    />
  );
});

export const head: DocumentHead = createPageHead(
  "Projects",
  "Projects page placeholder for the personal site v3 rewrite.",
);
