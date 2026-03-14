import { Slot, component$ } from "@builder.io/qwik";

type SiteContainerProps = {
  class?: string;
};

export const SiteContainer = component$<SiteContainerProps>(({ class: className }) => {
  const classes = className ? `site-container w-[min(calc(100%-2rem),var(--site-width))] mx-auto ${className}` : "site-container w-[min(calc(100%-2rem),var(--site-width))] mx-auto";

  return (
    <div class={classes}>
      <Slot />
    </div>
  );
});
