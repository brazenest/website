import { Slot, component$ } from "@builder.io/qwik";
import { SiteContainer } from "./SiteContainer";
import { SiteFooter } from "./SiteFooter";
import { SiteHeader } from "./SiteHeader";

export const SiteShell = component$(() => {
  return (
    <div class="site-shell">
      <a href="#content" class="skip-link">
        Skip to content
      </a>
      <SiteHeader />
      <main id="content" class="site-main">
        <SiteContainer>
          <Slot />
        </SiteContainer>
      </main>
      <SiteFooter />
    </div>
  );
});
