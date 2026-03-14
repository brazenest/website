import { component$ } from "@builder.io/qwik";
import { Link, useLocation } from "@builder.io/qwik-city";
import { getPrimaryNav, getSiteSettings } from "~/lib/content";
import { SiteContainer } from "./SiteContainer";

export const SiteHeader = component$(() => {
  const location = useLocation();
  const settings = getSiteSettings();
  const navItems = getPrimaryNav().filter((item) => item.href !== "/");

  return (
    <header class="site-header">
      <SiteContainer>
        <div class="site-header__inner flex flex-col gap-[var(--space-3)]">
          <Link href="/" class="site-brand inline-flex flex-col gap-[0.12rem]">
            <span class="site-brand__name font-[var(--font-display)] text-[1.16rem] font-bold -tracking-[0.045em] leading-[0.95]">{settings.title}</span>
            <span class="site-brand__tag text-[var(--color-text-muted)] text-[0.78rem] tracking-[0.08em] uppercase">{settings.brandTag}</span>
          </Link>

          <nav class="site-nav flex flex-wrap gap-[0.45rem_0.75rem]" aria-label="Primary">
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
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>
        </div>
      </SiteContainer>
    </header>
  );
});
