import { component$ } from "@builder.io/qwik";
import { Link, type DocumentHead } from "@builder.io/qwik-city";
import { ContactPlaceholder } from "~/components/contact";
import { ContentWidth } from "~/components/layout";
import { ActionLink, SectionEyebrow } from "~/components/ui";
import { siteConfig } from "~/lib/config";
import {
  homeIndexGroups,
  homeSecondaryCtas,
  type HomeIndexItem,
} from "~/lib/content";
import { createPageHead } from "~/lib/seo";

const renderHomeIndexItem = (item: HomeIndexItem) => {
  const key = `${item.label}-${item.note}`;

  if (!item.href) {
    return (
      <li key={key} class="home-index-item">
        <span class="home-index-link">{item.label}</span>
        <span class="home-index-note">{item.note}</span>
      </li>
    );
  }

  if (item.external || item.href.startsWith("http")) {
    return (
      <li key={key} class="home-index-item">
        <a
          href={item.href}
          class="home-index-link"
          rel="noopener noreferrer"
          target="_blank"
        >
          {item.label}
        </a>
        <span class="home-index-note">{item.note}</span>
      </li>
    );
  }

  return (
    <li key={key} class="home-index-item">
      <Link href={item.href} class="home-index-link">
        {item.label}
      </Link>
      <span class="home-index-note">{item.note}</span>
    </li>
  );
};

export default component$(() => {
  return (
    <ContentWidth>
      <article class="home-page" id="top">
        <header class="home-hero" aria-labelledby="greeting-headline">
          <SectionEyebrow label="Personal index" />

          <div class="section-stack section-stack--compact">
            <h1 id="greeting-headline" class="home-title">
              Hi, I&apos;m Alden Gillespy.
            </h1>
            <p class="home-lede">
              I build thoughtful software, write about the process, and keep a
              compact public record of the projects I&apos;m making.
            </p>
          </div>

          <div class="home-actions">
            <ActionLink href="#contact" variant="primary">
              Contact
            </ActionLink>
          </div>

          <nav class="home-secondary-actions" aria-label="Secondary">
            {homeSecondaryCtas.map((item) => (
              <ActionLink key={item.href} href={item.href} variant="secondary">
                {item.label}
              </ActionLink>
            ))}
          </nav>
        </header>

        <section class="home-index" aria-labelledby="index-heading">
          <div class="section-stack section-stack--compact">
            <SectionEyebrow label="Start here" />
            <h2 id="index-heading" class="section-title">
              A compact map of the site.
            </h2>
          </div>

          <div class="home-index-groups">
            {homeIndexGroups.map((group) => (
              <section key={group.title} class="home-index-group">
                <h3 class="home-index-title">{group.title}</h3>
                <ul class="home-index-list">
                  {group.items.map((item) => renderHomeIndexItem(item))}
                </ul>
              </section>
            ))}
          </div>
        </section>

        <section class="home-blurb" aria-labelledby="blurb-heading">
          <div class="section-stack section-stack--compact">
            <SectionEyebrow label="About" />
            <h2 id="blurb-heading" class="section-title">
              This is the short version.
            </h2>
            <p class="prose-copy">
              I care about clarity over noise, durable systems over novelty,
              and personal sites that feel closer to an index than a pitch
              deck. v3 is intentionally spare: enough context to show the work,
              the writing, and what I&apos;m focused on right now.
            </p>
          </div>
        </section>

        <section id="contact" class="home-contact" aria-labelledby="contact-heading">
          <SectionEyebrow label="Contact" />
          <h2 id="contact-heading" class="section-title">
            If the work overlaps with something you&apos;re building, reach out.
          </h2>
          <p class="prose-copy">
            The dedicated contact flow is still being rebuilt for v3, but this
            is the intended handoff point and the homepage CTA now lands here.
          </p>
          <ContactPlaceholder />
          <ActionLink
            href="https://github.com/brazenest"
            variant="tertiary"
            newTab
          >
            Find the public work on GitHub
          </ActionLink>
        </section>
      </article>
    </ContentWidth>
  );
});

export const head: DocumentHead = createPageHead(
  undefined,
  siteConfig.description,
);
