import { Slot, component$ } from "@builder.io/qwik";

type PageSectionProps = {
  title?: string;
  titleId?: string;
  titleClass?: string;
  class?: string;
};

export const PageSection = component$<PageSectionProps>(({ title, titleId, titleClass, class: className }) => {
  const finalTitleId = titleId || (title ? `section-${title.toLowerCase().replace(/\s+/g, "-")}` : undefined);

  return (
    <section class={`page-section ${className || ""}`.trim()} aria-labelledby={finalTitleId}>
      {title && (
        <h2 id={finalTitleId} class={`section-title ${titleClass || ""}`.trim()}>
          {title}
        </h2>
      )}
      <Slot />
    </section>
  );
});