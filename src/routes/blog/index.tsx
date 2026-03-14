import { component$ } from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";
import { PlaceholderPage } from "~/components/content";
import { createPageHead } from "~/lib/seo";

export default component$(() => {
  return (
    <PlaceholderPage
      eyebrow="Blog"
      title="Writing will come online in this section."
      description="The blog foundation is intentionally empty for now, with room for notes, essays, and build updates once the content format settles."
    />
  );
});

export const head: DocumentHead = createPageHead(
  "Blog",
  "Blog placeholder for the personal site v3 rewrite.",
);
