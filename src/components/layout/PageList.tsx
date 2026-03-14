import { Slot, component$ } from "@builder.io/qwik";

type PageListProps = {
  ordered?: boolean;
  class?: string;
};

export const PageList = component$<PageListProps>(({ ordered = false, class: className }) => {
  const Tag = ordered ? "ol" : "ul";

  return (
    <Tag class={`page-list ${className || ""}`.trim()}>
      <Slot />
    </Tag>
  );
});