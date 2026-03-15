import { component$ } from "@builder.io/qwik";
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
        <header class="entry-header flex flex-col gap-[var(--space-2)]">
          <p class="entry-meta text-[var(--color-text-muted)] font-[var(--font-mono)] text-[0.78rem] tracking-[0.08em] uppercase">
            {item.category}
          </p>
          <h3 class="entry-title text-[clamp(1.25rem,3vw,1.6rem)] leading-[1.08] tracking-[-0.028em]">
            {item.name}
          </h3>
        </header>
        <p class="entry-summary text-[var(--color-text-soft)] leading-[1.7]">{item.note}</p>
      </Entry>
    </PageListItem>
  );
});
