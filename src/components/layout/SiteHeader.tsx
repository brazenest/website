import { component$ } from "@builder.io/qwik";
import { Link, useLocation } from "@builder.io/qwik-city";
import { siteConfig } from "~/lib/config";
import { primaryNav } from "~/lib/content";
import { SiteContainer } from "./SiteContainer";

export const SiteHeader = component$(() => {
  const location = useLocation();
  const navItems = primaryNav.filter((item) => item.href !== "/");

  return (
    <header class="site-header">
      <SiteContainer>
        <div class="site-header__inner">
          <Link href="/" class="site-brand">
            <span class="site-brand__name">{siteConfig.title}</span>
            <span class="site-brand__tag">Software, writing, selected work</span>
          </Link>

          <nav class="site-nav" aria-label="Primary">
            {navItems.map((item) => {
              const isActive =
                location.url.pathname === item.href ||
                location.url.pathname.startsWith(`${item.href}/`);

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  class="site-nav-link"
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
