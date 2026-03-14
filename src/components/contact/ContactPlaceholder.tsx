import { component$ } from "@builder.io/qwik";

export const ContactPlaceholder = component$(() => {
  return (
    <section class="placeholder-panel subtle-text">
      A dedicated contact overlay or form will replace this placeholder. For
      now, the homepage contact entry point intentionally lands here while that
      handoff is rebuilt.
    </section>
  );
});
