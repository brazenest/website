import { component$ } from "@builder.io/qwik";
import { Link } from "@builder.io/qwik-city";
import { getFooterLinks, getSiteSettings } from "~/lib/content";
import { SiteContainer } from "./SiteContainer";

export const SiteFooter = component$(() => {
  const settings = getSiteSettings();
  const footerLinks = getFooterLinks();

  return (
    <footer class="site-footer">
      <SiteContainer>
        <div class="site-footer__inner flex flex-col gap-[var(--space-4)]">
          <p>{settings.footerNote}</p>

          <nav class="site-footer__links flex flex-wrap gap-[0.75rem_1rem]" aria-label="Footer">
            {footerLinks.map((item) => {
              return item.external ? (
                <a
                  key={item.href}
                  href={item.href}
                  class="site-footer__link text-[var(--color-text-muted)] text-[0.78rem] tracking-[0.08em] uppercase"
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  {item.label}
                </a>
              ) : (
                <Link key={item.href} href={item.href} class="site-footer__link text-[var(--color-text-muted)] text-[0.78rem] tracking-[0.08em] uppercase">
                  {item.label}
                </Link>
              );
            })}
          </nav>
        </div>
      </SiteContainer>
    </footer>
  );
});
