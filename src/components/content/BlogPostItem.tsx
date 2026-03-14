import { component$ } from "@builder.io/qwik";
import { Entry } from "~/components/content";
import { PageListItem } from "~/components/layout";
import type { BlogPostMeta } from "~/lib/content";

type BlogPostItemProps = {
  post: BlogPostMeta;
};

export const BlogPostItem = component$<BlogPostItemProps>(({ post }) => {
  return (
    <PageListItem class="flex flex-col gap-[var(--space-3)]">
      <Entry>
        <header class="entry-header flex flex-col gap-[var(--space-2)]">
          <p class="entry-meta text-[var(--color-text-muted)] font-[var(--font-mono)] text-[0.78rem] tracking-[0.08em] uppercase">
            {post.status} / <time dateTime={post.publishedOn}>{post.publishedOn}</time>
          </p>
          <h3 class="entry-title text-[clamp(1.35rem,4vw,1.9rem)] leading-[1.04]">{post.title}</h3>
        </header>
        <p class="entry-summary text-[var(--color-text-soft)] leading-[1.7]">{post.summary}</p>
      </Entry>
    </PageListItem>
  );
});