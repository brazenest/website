import { component$ } from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";
import { PlaceholderPage } from "~/components/content";
import { createPageHead } from "~/lib/seo";

export default component$(() => {
  return (
    <PlaceholderPage
      eyebrow="About"
      title="A quieter, clearer introduction is on the way."
      description="This page will become the personal context layer for v3: current focus, background, and the through-line behind the work."
    />
  );
});

export const head: DocumentHead = createPageHead(
  "About",
  "About page placeholder for the personal site v3 rewrite.",
);
