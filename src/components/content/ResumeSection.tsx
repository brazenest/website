import { component$ } from "@builder.io/qwik";
import { Entry } from "~/components/content";
import { PageList, PageListItem, PageSection } from "~/components/layout";
import type { ResumeSection } from "~/lib/content";

type ResumeSectionProps = {
  section: ResumeSection;
};

export const ResumeSection = component$<ResumeSectionProps>(({ section }) => {
  return (
    <PageSection title={section.title} titleId={`resume-${section.title.toLowerCase().replace(/\s+/g, "-")}`}>
      <PageList ordered>
        {section.items.map((entry) => (
          <PageListItem key={`${section.title}-${entry.title}`}>
            <Entry>
              <header class="entry-header">
                <p class="entry-meta">
                  {entry.start} - {entry.end ?? "Present"} / {entry.location}
                </p>
                <h3 class="entry-title">{entry.title}</h3>
                <p class="entry-kicker text-[var(--color-text)] text-base font-semibold tracking-[-0.01em]">{entry.organization}</p>
              </header>
              <p class="entry-summary">{entry.summary}</p>
              <ul class="copy-list grid gap-[0.55rem] pl-[1.1rem] text-[var(--color-text-soft)]">
                {entry.bullets.map((bullet) => (
                  <li key={bullet}>{bullet}</li>
                ))}
              </ul>
            </Entry>
          </PageListItem>
        ))}
      </PageList>
    </PageSection>
  );
});