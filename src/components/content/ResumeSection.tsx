import { component$ } from "@builder.io/qwik";
import { Entry } from "~/components/content";
import { PageList, PageListItem, PageSection } from "~/components/layout";
import type { ResumeSection as ResumeSectionData } from "~/lib/content";

type ResumeSectionProps = {
  section: ResumeSectionData;
};

export const ResumeSection = component$<ResumeSectionProps>(({ section }) => {
  return (
    <PageSection title={section.title} titleId={`resume-${section.title.toLowerCase().replace(/\s+/g, "-")}`}>
      <PageList ordered>
        {section.items.map((entry) => (
          <PageListItem key={`${section.title}-${entry.title}`}>
            <Entry>
              <header class="entry-header flex flex-col gap-[var(--space-2)]">
                <p class="entry-meta text-[var(--color-text-muted)] font-[var(--font-mono)] text-[0.78rem] tracking-[0.08em] uppercase">
                  {entry.start} - {entry.end ?? "Present"} / {entry.location}
                </p>
                <h3 class="entry-title text-[clamp(1.3rem,3.6vw,1.75rem)] leading-[1.06] tracking-[-0.03em]">
                  {entry.title}
                </h3>
                <p class="entry-kicker text-[var(--color-text)] text-base font-semibold tracking-[-0.01em]">{entry.organization}</p>
              </header>
              <p class="entry-summary text-[var(--color-text-soft)] leading-[1.7]">{entry.summary}</p>
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
