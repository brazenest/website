import { Slot, component$ } from "@builder.io/qwik";

type LinkListProps = {
  class?: string;
  grid?: boolean;
};

export const LinkList = component$<LinkListProps>(({ class: className, grid = false }) => {
  const classes = grid
    ? `link-list link-list--grid ${className || ""}`.trim()
    : `link-list ${className || ""}`.trim();

  return (
    <ul class={classes}>
      <Slot />
    </ul>
  );
});