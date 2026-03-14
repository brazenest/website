import { component$ } from "@builder.io/qwik";

export const ContactPlaceholder = component$(() => {
  return (
    <section class="placeholder-panel subtle-text text-[var(--color-text-soft)]">
      A richer contact handoff is still coming, but email is now the primary
      route while the dedicated v3 flow is rebuilt.
    </section>
  );
});
