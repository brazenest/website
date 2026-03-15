import {
  $,
  component$,
  useOnDocument,
  useSignal,
  useTask$,
  useVisibleTask$,
} from "@builder.io/qwik";
import { Link, useLocation } from "@builder.io/qwik-city";
import { ActionLink } from "~/components/ui";
import { getPrimaryNav, getSiteSettings } from "~/lib/content";
import { SiteContainer } from "./SiteContainer";

export const SiteHeader = component$(() => {
  const location = useLocation();
  const settings = getSiteSettings();
  const navItems = getPrimaryNav().filter((item) => item.href !== "/");
  const isMenuOpen = useSignal(false);

  const closeMenu$ = $(() => {
    isMenuOpen.value = false;
  });

  const toggleMenu$ = $(() => {
    isMenuOpen.value = !isMenuOpen.value;
  });

  useTask$(({ track }) => {
    track(() => location.url.pathname);
    isMenuOpen.value = false;
  });

  useOnDocument(
    "keydown",
    $((event: KeyboardEvent) => {
      if (event.key === "Escape") {
        isMenuOpen.value = false;
      }
    }),
  );

  // eslint-disable-next-line qwik/no-use-visible-task
  useVisibleTask$(({ cleanup }) => {
    const desktopQuery = window.matchMedia("(min-width: 720px)");
    const syncMenuState = (event?: MediaQueryListEvent) => {
      if (event?.matches ?? desktopQuery.matches) {
        isMenuOpen.value = false;
      }
    };

    syncMenuState();
    desktopQuery.addEventListener("change", syncMenuState);
    cleanup(() => desktopQuery.removeEventListener("change", syncMenuState));
  });

  return (
    <header
      class="site-header"
      data-menu-open={isMenuOpen.value ? "true" : "false"}
    >
      <SiteContainer>
        <div class="site-header__inner flex flex-col gap-[var(--space-3)]">
          <div class="site-header__bar">
            <Link
              href="/"
              class="site-brand inline-flex flex-col gap-[0.12rem]"
            >
              <span class="site-brand__name font-[var(--font-display)] text-[1.16rem] font-bold -tracking-[0.045em] leading-[0.95]">
                {settings.title}
              </span>
              <span class="site-brand__tag text-[var(--color-text-muted)] text-[0.78rem] tracking-[0.08em] uppercase">
                {settings.brandTag}
              </span>
            </Link>

            <button
              type="button"
              class="site-nav-toggle"
              aria-controls="site-primary-nav"
              aria-expanded={isMenuOpen.value ? "true" : "false"}
              aria-label={
                isMenuOpen.value
                  ? "Close navigation menu"
                  : "Open navigation menu"
              }
              onClick$={toggleMenu$}
            >
              <span class="site-nav-toggle__label">
                {isMenuOpen.value ? "Close" : "Menu"}
              </span>
              <span class="site-nav-toggle__icon" aria-hidden="true">
                <span class="site-nav-toggle__line" />
                <span class="site-nav-toggle__line" />
                <span class="site-nav-toggle__line" />
              </span>
            </button>
          </div>

          <nav id="site-primary-nav" class="site-nav" aria-label="Primary">
            <div class="site-nav__items">
              {navItems.map((item) => {
                const isActive =
                  location.url.pathname === item.href ||
                  location.url.pathname.startsWith(`${item.href}/`);

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    class="site-nav-link text-[var(--color-text-muted)] text-[0.78rem] tracking-[0.08em] uppercase"
                    data-active={isActive ? "true" : "false"}
                    aria-current={isActive ? "page" : undefined}
                    onClick$={closeMenu$}
                  >
                    {item.label}
                  </Link>
                );
              })}
            </div>
            <ActionLink
              href={settings.contactHref}
              variant="primary"
              class="site-nav-cta"
            >
              Contact
            </ActionLink>
          </nav>
        </div>
      </SiteContainer>
    </header>
  );
});
