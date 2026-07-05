import { component$, useSignal } from "@builder.io/qwik";
import { ButtonLink } from "~/components/ui/ButtonLink";
import { cn } from "~/fns/cn";

const MOBILE_LINK_CLASS =
  "rounded-[var(--radius-lg)] py-3 text-sm font-medium text-[var(--muted)] transition-colors duration-[var(--motion-duration-quick)] ease-[var(--motion-easing-quick)] hover:text-[var(--fg)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--focus)] focus-visible:ring-offset-2 focus-visible:text-[var(--fg)]";

export const MobileMenu = component$(() => {
  const isOpen = useSignal(false);

  return (
    <div class="md:hidden">
      <button
        type="button"
        aria-controls="mobile-navigation"
        aria-expanded={isOpen.value ? "true" : "false"}
        aria-label={
          isOpen.value ? "Close navigation menu" : "Open navigation menu"
        }
        class="inline-flex h-10 w-10 items-center justify-center rounded-[var(--radius-lg)] border border-[var(--border)] text-[var(--fg)] transition-colors duration-[var(--motion-duration-quick)] ease-[var(--motion-easing-quick)] hover:bg-[var(--surface-subtle)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--focus)] focus-visible:ring-offset-2"
        onClick$={() => {
          isOpen.value = !isOpen.value;
        }}
      >
        <span class="sr-only">{isOpen.value ? "Close menu" : "Open menu"}</span>
        <span aria-hidden="true" class="relative h-4 w-5">
          <span
            class={cn(
              "absolute left-0 top-1 block h-0.5 w-5 rounded-full bg-current transition-transform duration-[var(--motion-duration-quick)] ease-[var(--motion-easing-quick)]",
              isOpen.value ? "translate-y-[5px] rotate-45" : "",
            )}
          />
          <span
            class={cn(
              "absolute bottom-1 left-0 block h-0.5 w-5 rounded-full bg-current transition-transform duration-[var(--motion-duration-quick)] ease-[var(--motion-easing-quick)]",
              isOpen.value ? "-translate-y-[5px] -rotate-45" : "",
            )}
          />
        </span>
      </button>

      <div
        id="mobile-navigation"
        aria-hidden={!isOpen.value}
        class={cn(
          "absolute left-0 right-0 top-full border-b border-[var(--border)] bg-[var(--bg)]",
          isOpen.value ? "block" : "hidden",
        )}
      >
        <nav
          aria-label="Mobile"
          class="mx-auto flex max-w-[80rem] flex-col px-4 py-4 md:px-8"
        >
          <a href="/" class={MOBILE_LINK_CLASS}>Home</a>
          <a href="/for-hire" class={MOBILE_LINK_CLASS}>For Hire</a>
          <a href="/engineering" class={MOBILE_LINK_CLASS}>Engineering</a>
          <a href="/production" class={MOBILE_LINK_CLASS}>Production</a>
          <a href="/blog" class={MOBILE_LINK_CLASS}>Blog</a>
          <a href="/about" class={MOBILE_LINK_CLASS}>About</a>
          <a href="/contact" class={MOBILE_LINK_CLASS}>Contact</a>
          <div class="border-t border-[var(--border)] pt-4">
            <ButtonLink
              href="/contact"
              label="Work With Me"
              variant="primary"
              class="w-full"
            />
          </div>
        </nav>
      </div>
    </div>
  );
});
