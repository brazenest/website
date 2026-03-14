import { component$ } from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";
import { PlaceholderPage } from "~/components/content";
import { createPageHead } from "~/lib/seo";

export default component$(() => {
  return (
    <PlaceholderPage
      eyebrow="Resume"
      title="Resume details will be refreshed here."
      description="This route will evolve into a concise resume snapshot with links out to fuller work history and supporting material."
    />
  );
});

export const head: DocumentHead = createPageHead(
  "Resume",
  "Resume placeholder for the personal site v3 rewrite.",
);
