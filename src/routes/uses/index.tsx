import { component$ } from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";
import { PageLayout, PageList, PageSection } from "~/components/layout";
import { PageIntro, TechnologyListItem, UsesGroupSection } from "~/components/content";
import { getTechnologyItems, getUsesGroups } from "~/lib/content";
import { createPageHead } from "~/lib/seo";

export default component$(() => {
  const technologies = getTechnologyItems();
  const usesGroups = getUsesGroups();

  return (
    <PageLayout>
      <PageIntro
        eyebrow="Uses"
        title="Tools, workflow, and defaults."
        description="This is the first grouped pass of the uses page: the technologies behind the app and the small decisions that shape the day-to-day setup."
      />

      <PageSection title="Current technologies" titleId="uses-technologies">
        <PageList ordered>
          {technologies.map((item) => (
            <TechnologyListItem key={item.name} item={item} />
          ))}
        </PageList>
      </PageSection>

      {usesGroups.map((group) => (
        <UsesGroupSection key={group.title} group={group} />
      ))}
    </PageLayout>
  );
});

export const head: DocumentHead = createPageHead(
  "Uses",
  "Grouped tools, workflow notes, and current technology choices for the v3 site.",
);
