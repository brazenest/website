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
    <section
      class={`page-section flex flex-col gap-[var(--space-5)] overflow-hidden p-[var(--space-5)] sm:gap-[var(--space-6)] sm:p-[var(--space-6)] ${className || ""}`.trim()}
      aria-labelledby={finalTitleId}
    >
      {title && (
        <h2 id={finalTitleId} class={`section-title ${titleClass || ""}`.trim()}>
          {title}
        </h2>
      )}
      <Slot />
    </section>
  );
});
