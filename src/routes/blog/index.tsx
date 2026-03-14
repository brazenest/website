import { component$ } from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";
import { PageLayout, PageList, PageSection } from "~/components/layout";
import { PageIntro, BlogPostItem } from "~/components/content";
import { getBlogPostMetas } from "~/lib/content";
import { createPageHead } from "~/lib/seo";

export default component$(() => {
  const posts = getBlogPostMetas();

  return (
    <PageLayout>
      <PageIntro
        eyebrow="Blog"
        title="Writing shells, not a finished archive yet."
        description="The blog now has real metadata and a list structure, even though individual post routes are intentionally still waiting."
      />

      <PageSection title="Post list" titleId="blog-list">
        <PageList ordered class="list-none grid gap-[var(--space-4)] p-0">
          {posts.map((post) => (
            <BlogPostItem key={post.slug} post={post} />
          ))}
        </PageList>
      </PageSection>

      <PageSection title="Next" titleId="blog-direction">
        <div class="page-prose">
          <p class="prose-copy">
            Detail routes and full post bodies will come after the content
            model settles, but the archive shell is now part of the same data
            system as the rest of the site.
          </p>
        </div>
      </PageSection>
    </PageLayout>
  );
});

export const head: DocumentHead = createPageHead(
  "Blog",
  "A starter blog list rendered from typed metadata records in the shared v3 content layer.",
);
