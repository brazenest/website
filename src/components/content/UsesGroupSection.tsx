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
              <header class="entry-header">
                <h3 class="entry-title">{item.name}</h3>
              </header>
              <p class="entry-summary">{item.description}</p>
              {item.note && <p class="entry-meta">{item.note}</p>}
            </Entry>
          </PageListItem>
        ))}
      </PageList>
    </PageSection>
  );
});