import { component$ } from "@builder.io/qwik";
import { Card } from "~/components/ui/Card";
import { Container } from "~/components/ui/Container";
import { LinkText } from "~/components/ui/LinkText";
import { Section } from "~/components/ui/Section";
import { blogPageContent } from "~/content/blog";
import {
  formatBlogDate,
  getBlogSideLabel,
  type PublishedBlogListItem,
} from "~/lib/blog/presentation";

/**
 * Below-the-fold section: Published blog posts list
 * Deferred load on /blog route
 */
export const PublishedBlogList = component$(
  ({ posts }: PublishedBlogListProps) => {
    return (
      <Section spacing="compact">
        <Container width="wide">
          <section
            class="grid gap-6 lg:grid-cols-[minmax(0,14rem)_minmax(0,1fr)] lg:gap-10"
            aria-labelledby="blog-published"
          >
            <div class="flex flex-col gap-2">
              <h2
                id="blog-published"
                class="text-2xl font-semibold tracking-tight md:text-3xl"
              >
                {blogPageContent.published.heading}
              </h2>

              <p class="max-w-[28ch] text-sm leading-6 text-[var(--muted)] md:text-base">
                {blogPageContent.published.intro}
              </p>
            </div>

            <ul class="flex flex-col gap-4 md:gap-6">
              {posts.map((post) => (
                <li key={post.slug}>
                  <Card
                    href={`/blog/${post.slug}`}
                    interactive
                    padding="spacious"
                    class="touch-manipulation focus-visible:border-[var(--link-color)]"
                  >
                    <article class="grid gap-5 md:grid-cols-[minmax(11rem,13rem)_minmax(0,1fr)] md:items-start md:gap-8">
                      <div class="flex flex-col gap-2">
                        <p class="text-xs font-medium uppercase tracking-[0.12em] text-[var(--muted)]">
                          {getBlogSideLabel(post.side)}
                        </p>

                        <p class="text-sm leading-6 text-[var(--muted)] md:text-base">
                          {formatBlogDate(post.publishedDate)}
                        </p>
                      </div>

                      <div class="flex flex-col gap-3">
                        {post.coverImageUrl && (
                          <img
                            src={post.coverImageUrl}
                            alt={post.coverImageAlt || post.title}
                            class="w-full rounded-[var(--radius-lg)] border border-[var(--border)] object-cover"
                            width={672}
                            height={336}
                          />
                        )}

                        <h3 class="text-xl font-semibold tracking-tight transition-colors duration-[var(--motion-duration-quick)] ease-[var(--motion-easing-quick)] group-hover:text-[var(--state-hover-accent)] md:text-2xl">
                          {post.title}
                        </h3>

                        <p class="max-w-[68ch] text-base leading-7 text-[var(--muted)] md:text-lg">
                          {post.summary}
                        </p>

                        <div class="pt-1">
                          <LinkText
                            label={`Read: ${post.title}`}
                            showArrow
                            class="w-fit"
                          />
                        </div>
                      </div>
                    </article>
                  </Card>
                </li>
              ))}
            </ul>
          </section>
        </Container>
      </Section>
    );
  },
);

type PublishedBlogListProps = {
  posts: PublishedBlogListItem[];
};
