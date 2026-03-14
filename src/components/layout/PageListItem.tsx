import { Slot, component$ } from "@builder.io/qwik";

type PageListItemProps = {
  class?: string;
};

export const PageListItem = component$<PageListItemProps>(({ class: className }) => {
  return (
    <li class={`page-list-item ${className || ""}`.trim()}>
      <Slot />
    </li>
  );
});