import { component$ } from "@builder.io/qwik";
import { Link } from "@builder.io/qwik-city";
import { footerLinks } from "~/lib/content";
import { SiteContainer } from "./SiteContainer";

export const SiteFooter = component$(() => {
  return (
    <footer class="site-footer">
      <SiteContainer>
        <div class="site-footer__inner">
          <p>Minimal personal index for work, writing, and current projects.</p>

          <nav class="site-footer__links" aria-label="Footer">
            {footerLinks.map((item) => {
              return item.external ? (
                <a
                  key={item.href}
                  href={item.href}
                  class="site-footer__link"
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  {item.label}
                </a>
              ) : (
                <Link key={item.href} href={item.href} class="site-footer__link">
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
