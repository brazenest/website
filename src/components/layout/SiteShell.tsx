import { Slot, component$ } from "@builder.io/qwik";
import { SiteContainer } from "./SiteContainer";
import { SiteFooter } from "./SiteFooter";
import { SiteHeader } from "./SiteHeader";

export const SiteShell = component$(() => {
  return (
    <div class="site-shell min-h-screen flex flex-col relative isolate">
      <a href="#content" class="skip-link">
        Skip to content
      </a>
      <SiteHeader />
      <main id="content" class="site-main flex-1 py-[clamp(2.5rem,4vw,4rem)_var(--space-8)]">
        <SiteContainer>
          <Slot />
        </SiteContainer>
      </main>
      <SiteFooter />
    </div>
  );
});
