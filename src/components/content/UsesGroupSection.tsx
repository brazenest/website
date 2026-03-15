import { component$ } from "@builder.io/qwik";
import { Entry } from "~/components/content";
import { PageList, PageListItem, PageSection } from "~/components/layout";
import type { UsesGroup } from "~/lib/content";

type UsesGroupSectionProps = {
  group: UsesGroup;
};

export const UsesGroupSection = component$<UsesGroupSectionProps>(({ group }) => {
  return (
    <PageSection title={group.title} titleId={`uses-${group.title.toLowerCase()}`}>
      <PageList>
        {group.items.map((item) => (
          <PageListItem key={`${group.title}-${item.name}`}>
            <Entry>
              <header class="entry-header flex flex-col gap-[var(--space-2)]">
                <h3 class="entry-title text-[clamp(1.25rem,3vw,1.6rem)] leading-[1.08] tracking-[-0.028em]">
                  {item.name}
                </h3>
              </header>
              <p class="entry-summary text-[var(--color-text-soft)] leading-[1.7]">{item.description}</p>
              {item.note && (
                <p class="entry-meta text-[var(--color-text-muted)] font-[var(--font-mono)] text-[0.78rem] tracking-[0.06em] uppercase">
                  {item.note}
                </p>
              )}
            </Entry>
          </PageListItem>
        ))}
      </PageList>
    </PageSection>
  );
});
