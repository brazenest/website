import { component$ } from "@builder.io/qwik";
import { Link, type DocumentHead } from "@builder.io/qwik-city";
import { SectionEyebrow } from "~/components/ui";
import { databaseLayerStatus } from "~/lib/db";
import { homeLinkGroups } from "~/lib/content";
import { createPageHead, siteConfig } from "~/lib/seo";

export default component$(() => {
  return (
    <section class="grid gap-12 lg:grid-cols-[minmax(0,1.25fr)_minmax(18rem,0.95fr)] lg:items-start">
      <div class="space-y-8">
        <SectionEyebrow label="Personal site v3" />

        <div class="space-y-5">
          <h1 class="max-w-3xl text-5xl sm:text-6xl">
            Hi, I&apos;m Alden. This is the clean slate for the next version of
            my site.
          </h1>
          <p class="max-w-2xl text-lg leading-8 subtle-text sm:text-xl">
            A lighter Qwik foundation for writing, selected work, and the
            practical parts of my online home. The polish can come later; the
            structure is here now.
          </p>
        </div>

        <div class="flex flex-wrap gap-3">
          <Link href="/projects" class="button-primary">
            Explore the v3 placeholder
          </Link>
          <Link href="/about" class="button-secondary">
            Read the direction
          </Link>
        </div>

        <div class="max-w-2xl rounded-[1.5rem] border px-5 py-4 subtle-text">
          <p>{databaseLayerStatus}</p>
        </div>
      </div>

      <aside class="space-y-4">
        <SectionEyebrow label="Link groups" />
        <div class="grid gap-4">
          {homeLinkGroups.map((group) => (
            <section
              key={group.title}
              class="rounded-[1.5rem] border p-4 sm:p-5"
            >
              <h2 class="text-lg font-semibold">{group.title}</h2>
              <div class="mt-4 grid gap-3">
                {group.links.map((link) => (
                  <Link key={link.href} href={link.href} class="link-card">
                    <div class="flex items-center justify-between gap-4">
                      <span class="font-medium">{link.label}</span>
                      <span class="text-sm subtle-text">/{link.href.replace(/^\//, "") || ""}</span>
                    </div>
                    <p class="mt-2 text-sm leading-6 subtle-text">{link.note}</p>
                  </Link>
                ))}
              </div>
            </section>
          ))}
        </div>
      </aside>
    </section>
  );
});

export const head: DocumentHead = createPageHead(
  undefined,
  siteConfig.description,
);
