import { Slot, component$ } from "@builder.io/qwik";
import { SiteShell } from "~/components/layout";

export default component$(() => {
  return (
    <SiteShell>
      <Slot />
    </SiteShell>
  );
});
