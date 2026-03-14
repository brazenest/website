import { component$ } from "@builder.io/qwik";
import { Entry } from "~/components/content";
import { Entry } from "~/components/content";
import { PageListItem } from "~/components/layout";
import type { TechnologyItem } from "~/lib/content";

type TechnologyListItemProps = {
  item: TechnologyItem;
};

export const TechnologyListItem = component$<TechnologyListItemProps>(({ item }) => {
  return (
    <PageListItem>
      <Entry>
        <header class="entry-header">
          <p class="entry-meta">{item.category}</p>
          <h3 class="entry-title">{item.name}</h3>
        </header>
        <p class="entry-summary">{item.note}</p>
      </Entry>
    </PageListItem>
  );
});