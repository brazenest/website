import { Slot, component$ } from "@builder.io/qwik";

type LinkListProps = {
  class?: string;
  grid?: boolean;
};

export const LinkList = component$<LinkListProps>(({ class: className, grid = false }) => {
  const classes = grid
    ? `link-list link-list--grid list-none grid gap-[var(--space-3)] p-0 sm:gap-[var(--space-4)] ${className || ""}`.trim()
    : `link-list list-none grid gap-[var(--space-3)] p-0 sm:gap-[var(--space-4)] ${className || ""}`.trim();

  return (
    <ul class={classes}>
      <Slot />
    </ul>
  );
});
