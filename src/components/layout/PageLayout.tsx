import { Slot, component$ } from "@builder.io/qwik";
import { ContentWidth } from "./ContentWidth";

type PageLayoutProps = {
  variant?: "content" | "page" | "prose";
  articleClass?: string;
};

export const PageLayout = component$<PageLayoutProps>(({ variant = "page", articleClass }) => {
  return (
    <ContentWidth variant={variant}>
      <article
        class={`page-shell page-shell--wide flex flex-col gap-[var(--space-7)] ${articleClass || ""}`.trim()}
      >
        <Slot />
      </article>
    </ContentWidth>
  );
});
