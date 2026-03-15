import { component$ } from "@builder.io/qwik";
import { getSiteSettings, getSocialLinks } from "~/lib/content";
import { SocialIcon } from "~/components/ui";
import { SiteContainer } from "./SiteContainer";

export const SiteFooter = component$(() => {
  const settings = getSiteSettings();
  const socialLinks = getSocialLinks().filter((link) => link.href);

  return (
    <footer class="site-footer">
      <SiteContainer>
        <div class="site-footer__inner flex flex-col gap-[var(--space-4)]">
          <p>{settings.footerNote}</p>
          <p class="site-footer__copyright text-sm text-muted">
            &copy; {new Date().getFullYear()} {settings.ownerName}. All rights reserved.
          </p>
          <p class="site-footer__credits text-sm text-muted">
            Built with love in beautiful <a href="https://www.openstreetmap.org/relation/198770" target="_blank" rel="noopener noreferrer">Salt Lake City</a>. Designed and developed by me, with occasional help from AI. Source code available on <a href={settings.githubHref} target="_blank" rel="noopener noreferrer">GitHub</a>.
          </p>

          <nav class="site-footer__socials flex flex-wrap items-center gap-[0.75rem]" aria-label="Social links">
            {socialLinks.map((link) => {
              return (
                <a
                  key={link.href}
                  href={link.href}
                  class="site-footer__social-link"
                  aria-label={`${link.label}${link.handle ? ` / ${link.handle}` : ""}`}
                  rel={link.external ? "noopener noreferrer" : undefined}
                  target={link.external ? "_blank" : undefined}
                  title={`${link.label}${link.handle ? ` / ${link.handle}` : ""}`}
                >
                  <SocialIcon kind={link.label} />
                </a>
              );
            })}
          </nav>
        </div>
      </SiteContainer>
    </footer>
  );
});
