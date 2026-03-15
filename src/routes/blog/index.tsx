import { component$ } from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";
import { PageLayout, PageList, PageSection } from "~/components/layout";
import { BlogPostItem, PageCallToAction, PageIntro } from "~/components/content";
import { getBlogPostMetas, getSiteSettings } from "~/lib/content";
import { createPageHead } from "~/lib/seo";

export default component$(() => {
  const posts = getBlogPostMetas();
  const settings = getSiteSettings();

  return (
    <PageLayout articleClass="mx-auto w-full max-w-7xl">
      <PageIntro
        eyebrow="Blog"
        title="Thoughts on code, design, and building things."
        description="A collection of essays, tutorials, and reflections on software development, user experience, and the creative process behind digital products."
        backgroundImage={{
          src: "/assets/images/ChatGPT Image Mar 14, 2026, 11_57_25 PM.png",
          alt: "An AI-generated image representing writing and blogging.",
          width: 1920,
          height: 1080,
        }}
      />

      <PageSection title="Post list" titleId="blog-list">
        <PageList ordered class="list-none grid gap-[var(--space-4)] p-0">
          {posts.map((post) => (
            <BlogPostItem key={post.slug} post={post} />
          ))}
        </PageList>
      </PageSection>

      <PageSection title="What's coming" titleId="blog-direction">
        <div class="page-prose">
          <p class="prose-copy">
            New posts are added regularly, covering topics from React best practices to design system architecture. Check back for the latest insights on modern web development and design thinking.
          </p>
        </div>
      </PageSection>

      <PageCallToAction
        eyebrow="Explore more"
        title="Dive into the work."
        description="The writing reflects the same principles that guide my development work. Check out the projects for real-world applications, or visit the about page to learn more about my approach."
        primaryAction={{
          href: "/projects",
          label: "Browse projects",
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
  "Blog",
  "A starter blog list rendered from typed metadata records in the shared v3 content layer.",
);
