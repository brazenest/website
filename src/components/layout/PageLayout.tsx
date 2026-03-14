import { Slot, component$ } from "@builder.io/qwik";
import { ContentWidth } from "~/components/layout";

type PageLayoutProps = {
  variant?: "page" | "wide";
  articleClass?: string;
};

export const PageLayout = component$<PageLayoutProps>(({ variant = "page", articleClass }) => {
  return (
    <ContentWidth variant={variant}>
      <article class={`page-shell page-shell--wide ${articleClass || ""}`.trim()}>
        <Slot />
      </article>
    </ContentWidth>
  );
});