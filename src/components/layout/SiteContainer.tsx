import { Slot, component$ } from "@builder.io/qwik";

type SiteContainerProps = {
  class?: string;
};

export const SiteContainer = component$<SiteContainerProps>(({ class: className }) => {
  const classes = className ? `site-container ${className}` : "site-container";

  return (
    <div class={classes}>
      <Slot />
    </div>
  );
});
