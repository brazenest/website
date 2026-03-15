import { component$ } from "@builder.io/qwik";
import { type DocumentHead } from "@builder.io/qwik-city";
import { PageLayout } from "~/components/layout";
import { PageCallToAction, PageIntro, ResumeSection } from "~/components/content";
import { ActionLink, LinkList, SmartLink } from "~/components/ui";
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
        <div class="page-actions flex flex-wrap gap-[var(--space-3)]">
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

      <section
        class="page-section flex flex-col gap-[var(--space-5)] overflow-hidden p-[var(--space-5)] sm:gap-[var(--space-6)] sm:p-[var(--space-6)]"
        aria-labelledby="resume-links"
      >
        <h2 id="resume-links" class="section-title">
          Links
        </h2>
        <LinkList grid>
          {socials.map((link) => {
            const key = `${link.label}-${link.handle}`;
            const label = link.handle ? `${link.label} / ${link.handle}` : link.label;
            return (
              <li
                key={key}
                class="link-list-item flex flex-col gap-[0.65rem] p-[1rem_1.05rem]"
              >
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
        </LinkList>
      </section>

      <PageCallToAction
        eyebrow="Contact"
        title="If the resume lines up, let's talk."
        description="The PDF is the compressed version and the rest of the site adds context, but if you already know enough and want to talk about a role, collaboration, or contract work, I am easy to reach."
        primaryAction={{
          href: settings.contactHref,
          label: settings.contactLabel,
        }}
        secondaryAction={{
          href: settings.resumeHref,
          label: "Download PDF",
          newTab: true,
        }}
        note={`${settings.location} / ${settings.availability}`}
      />
    </PageLayout>
  );
});

export const head: DocumentHead = createPageHead(
  "Resume",
  "Structured resume sections rendered from the shared v3 content layer.",
);
