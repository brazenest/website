import { Slot, component$ } from "@builder.io/qwik";

type EntryProps = {
  class?: string;
  compact?: boolean;
};

export const Entry = component$<EntryProps>(({ class: className, compact = true }) => {
  const stackClass = compact ? "section-stack section-stack--compact" : "section-stack";

  return (
    <article class={`${stackClass} ${className || ""}`.trim()}>
      <Slot />
    </article>
  );
});