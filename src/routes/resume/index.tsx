import { component$ } from "@builder.io/qwik";
import { type DocumentHead } from "@builder.io/qwik-city";
import { PageLayout } from "~/components/layout";
import { PageIntro, ResumeSection } from "~/components/content";
import { ActionLink, SmartLink } from "~/components/ui";
import { getResumeSections, getSiteSettings, getSocialLinks } from "~/lib/content";
import { createPageHead } from "~/lib/seo";

export default component$(() => {
  const settings = getSiteSettings();
  const sections = getResumeSections();
  const socials = getSocialLinks();

  return (
    <PageLayout>
      <PageIntro
        eyebrow="Resume"
        title="A compact resume snapshot."
        description="This page is intentionally short, but it is now structured enough to be backed by shared data instead of a one-off placeholder."
      >
        <div class="page-actions">
          <ActionLink href={settings.resumeHref} variant="secondary" newTab>
            Download PDF
          </ActionLink>
          <ActionLink href="/projects" variant="tertiary">
            Browse projects
          </ActionLink>
        </div>
      </PageIntro>

      {sections.map((section) => (
        <ResumeSection key={section.title} section={section} />
      ))}

      <section class="page-section" aria-labelledby="resume-links">
        <h2 id="resume-links" class="section-title">
          Links
        </h2>
        <ul class="link-list link-list--grid">
          {socials.map((link) => {
            const key = `${link.label}-${link.handle}`;
            const label = link.handle ? `${link.label} / ${link.handle}` : link.label;
            return (
              <li key={key} class="link-list-item">
                <SmartLink
                  href={link.href}
                  external={link.external}
                  class="link-list-label"
                >
                  {label}
                </SmartLink>
                <span class="meta-text font-mono">{link.note}</span>
              </li>
            );
          })}
        </ul>
      </section>
    </PageLayout>
  );
});

export const head: DocumentHead = createPageHead(
  "Resume",
  "Structured resume sections rendered from the shared v3 content layer.",
);
