import { component$ } from "@builder.io/qwik";
import { SiteMark } from "~/components/brand/SiteMark";
import { Container } from "~/components/ui/Container";
import { ButtonLink } from "~/components/ui/ButtonLink";
import { MobileMenu } from "~/components/nav/MobileMenu";

const NAV_LINK_CLASS =
  "text-sm font-medium text-[var(--muted)] transition-colors duration-[var(--motion-duration-quick)] ease-[var(--motion-easing-quick)] hover:text-[var(--fg)] focus-visible:rounded-[var(--radius-lg)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--focus)] focus-visible:ring-offset-2 focus-visible:text-[var(--fg)]";

export const Header = component$(() => {
  return (
    <header class="sticky top-0 z-40 border-b border-[var(--border)] bg-[var(--bg)]/90 backdrop-blur-sm">
      <a
        href="#main-content"
        class="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-[var(--radius-lg)] focus:bg-[var(--bg)] focus:px-3 focus:py-2 focus:text-sm focus:font-medium focus:text-[var(--fg)] focus:ring-2 focus:ring-[var(--focus)]"
      >
        Skip to content
      </a>

      <Container>
        <div class="relative flex h-16 items-center justify-between gap-6">
          <a
            href="/"
            class="inline-flex items-center gap-2 text-sm font-semibold tracking-tight transition-colors duration-[var(--motion-duration-quick)] ease-[var(--motion-easing-quick)] hover:text-[var(--muted)] focus-visible:rounded-[var(--radius-lg)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--focus)] focus-visible:ring-offset-2"
          >
            <SiteMark class="h-7 w-7 shrink-0" />
            <span>Alden Gillespy</span>
          </a>

          <nav aria-label="Primary" class="hidden items-center gap-5 md:flex">
            <a href="/" class={NAV_LINK_CLASS}>Home</a>
            <a href="/for-hire" class={NAV_LINK_CLASS}>For Hire</a>
            <a href="/blog" class={NAV_LINK_CLASS}>Blog</a>
            <a href="/about" class={NAV_LINK_CLASS}>About</a>
            <a href="/contact" class={NAV_LINK_CLASS}>Contact</a>
          </nav>

          <div class="hidden items-center gap-3 md:flex">
            <ButtonLink
              href="/contact"
              label="Work With Me"
              variant="primary"
              size="sm"
              class="shadow-[0_14px_30px_-20px_var(--card-glow)]"
            />
          </div>

          <MobileMenu />
        </div>
      </Container>
    </header>
  );
});
