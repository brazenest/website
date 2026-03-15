import { component$ } from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";
import { PageLayout, PageList, PageSection } from "~/components/layout";
import {
  PageCallToAction,
  PageIntro,
  TechnologyListItem,
  UsesGroupSection,
} from "~/components/content";
import {
  getSiteSettings,
  getTechnologyItems,
  getUsesGroups,
} from "~/lib/content";
import { createPageHead } from "~/lib/seo";

export default component$(() => {
  const technologies = getTechnologyItems();
  const usesGroups = getUsesGroups();
  const settings = getSiteSettings();

  return (
    <PageLayout articleClass="mx-auto w-full max-w-7xl">
      <PageIntro
        eyebrow="Uses"
        title="Tools, workflow, and defaults."
        description="This is the first grouped pass of the uses page: the technologies behind the app and the small decisions that shape the day-to-day setup."
        backgroundImage={{
          src: "/assets/images/ChatGPT Image Mar 14, 2026, 11_43_37 PM.png",
          alt: "An AI-generated image representing development tools and workflow setup.",
          width: 1920,
          height: 1080,
        }}
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

      <PageCallToAction
        eyebrow="See it in practice"
        title="The tools matter less than what they enable."
        description="The setup only matters if it supports clearer product decisions, steadier implementation, and better day-to-day work. The project page shows how those defaults play out in practice."
        primaryAction={{
          href: "/projects",
          label: "See the project work",
        }}
        secondaryAction={{
          href: settings.contactHref,
          label: settings.contactLabel,
        }}
      />
    </PageLayout>
  );
});

export const head: DocumentHead = createPageHead(
  "Uses",
  "Grouped tools, workflow notes, and current technology choices for the v3 site.",
);
