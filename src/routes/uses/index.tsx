import { component$ } from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";
import { PlaceholderPage } from "~/components/content";
import { createPageHead } from "~/lib/seo";

export default component$(() => {
  return (
    <PlaceholderPage
      eyebrow="Uses"
      title="Tools, desk setup, and defaults will live here."
      description="The uses page will document the hardware, software, and small workflow details that support the rest of the site."
    />
  );
});

export const head: DocumentHead = createPageHead(
  "Uses",
  "Uses page placeholder for the personal site v3 rewrite.",
);
