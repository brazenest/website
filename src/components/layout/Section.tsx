import { Slot, component$ } from "@builder.io/qwik";

type SectionProps = {
  class?: string;
  compact?: boolean;
};

export const Section = component$<SectionProps>(({ class: className, compact = false }) => {
  const classes = compact
    ? `section-stack section-stack--compact ${className || ""}`.trim()
    : `section-stack ${className || ""}`.trim();

  return (
    <div class={classes}>
      <Slot />
    </div>
  );
});