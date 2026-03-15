import { component$ } from "@builder.io/qwik";
import { Link, type DocumentHead } from "@builder.io/qwik-city";
import {
  DeferredMediaFigure,
  PageCallToAction,
  PageIntro,
} from "~/components/content";
import { PageLayout, Section } from "~/components/layout";
import {
  ActionLink,
  LinkList,
  SocialLinkItem,
  TechnologyItemComponent,
} from "~/components/ui";
import {
  getAboutPageContent,
  getCurrentProjects,
  getSiteSettings,
  getSocialLinks,
  getTechnologyItems,
} from "~/lib/content";
import { createPageHead } from "~/lib/seo";

export default component$(() => {
  const aboutPageContent = getAboutPageContent();
  const settings = getSiteSettings();
  const currentProjects = getCurrentProjects();
  const technologies = getTechnologyItems();
  const socials = getSocialLinks();
  const renderProseParagraph = (paragraph: string) => (
    <p
      key={paragraph}
      class="prose-copy"
      dangerouslySetInnerHTML={paragraph}
    />
  );
  const renderProseSection = ({
    heading,
    paragraphs,
  }: (typeof aboutPageContent.philosophy)[number]) => (
    <section key={heading} class="prose-section">
      <h3 class="prose-subheading">{heading}</h3>
      <div class="grid gap-[var(--space-3)]">
        {paragraphs.map(renderProseParagraph)}
      </div>
    </section>
  );

  return (
    <PageLayout articleClass="about-page">
      <PageIntro
        eyebrow="About"
        title="Code, camera, and the overlap between them."
        description="The short version: I build product-grade interfaces, think visually, and care a lot about how structure shapes what people feel."
        backgroundImage={aboutPageContent.heroImage}
      >
        <div class="page-actions flex flex-wrap gap-[var(--space-3)]">
          <ActionLink href={settings.resumeHref} variant="secondary" newTab>
            Resume PDF
          </ActionLink>
          <ActionLink href={settings.contactHref} variant="tertiary">
            {settings.contactLabel}
          </ActionLink>
        </div>
      </PageIntro>

      <section
        class="page-section page-section--split flex flex-col gap-[var(--space-5)] overflow-hidden p-[var(--space-5)] sm:gap-[var(--space-6)] sm:p-[var(--space-6)] max-w-7xl mx-auto"
        aria-labelledby="about-introduction"
      >
        <h2 id="about-introduction" class="section-title">
          A deliberately hybrid background.
        </h2>
        <div class="page-section__grid grid gap-[var(--space-5)]">
          <DeferredMediaFigure
            asset={aboutPageContent.portraitImage}
            class="about-media about-media--portrait"
            placeholderLabel="Loading portrait"
          />
          <div class="page-prose page-prose--measure grid gap-[var(--space-3)] max-w-[var(--prose-width)]">
            {aboutPageContent.introduction.map(renderProseParagraph)}
          </div>
        </div>
      </section>

      <section
        class="page-section page-section--split page-section--media-wide flex flex-col gap-[var(--space-5)] overflow-hidden p-[var(--space-5)] sm:gap-[var(--space-6)] sm:p-[var(--space-6)] max-w-7xl mx-auto"
        aria-labelledby="about-philosophy"
      >
        <h2 id="about-philosophy" class="section-title">
          How I think about the work.
        </h2>
        <div class="page-section__grid grid gap-[var(--space-5)]">
          <DeferredMediaFigure
            asset={aboutPageContent.storyImage}
            class="about-media"
            placeholderLabel="Loading story image"
          />
          <div class="page-prose page-prose--measure page-prose--sections grid max-w-[var(--prose-width)]">
            {aboutPageContent.philosophy.map(renderProseSection)}
          </div>
        </div>
      </section>

      <section
        class="page-section about-panel about-panel--focus flex flex-col gap-[var(--space-5)] sm:gap-[var(--space-6)]"
        aria-labelledby="about-focus"
      >
        <div class="about-panel__header section-stack section-stack--compact">
          <h2 id="about-focus" class="section-title">
            Current focus
          </h2>
          <p class="section-note about-panel__note">
            {settings.role} / {settings.location} / {settings.availability}
          </p>
        </div>

        <div class="about-focus-grid">
          <Section class="about-column" compact>
            <h3 class="entry-kicker text-[var(--color-text)] text-base font-semibold tracking-[-0.01em]">
              Projects
            </h3>
            <LinkList class="about-link-list">
              {currentProjects.map((project) => (
                <li
                  key={project.slug}
                  class="link-list-item flex flex-col gap-[0.65rem] p-[1rem_1.05rem]"
                >
                  <Link href="/projects" class="link-list-label">
                    {project.title}
                  </Link>
                  <span class="meta-text font-mono">{project.summary}</span>
                </li>
              ))}
            </LinkList>
          </Section>

          <Section class="about-column" compact>
            <h3 class="entry-kicker text-[var(--color-text)] text-base font-semibold tracking-[-0.01em]">
              Technologies
            </h3>
            <LinkList class="about-link-list">
              {technologies.map((item) => (
                <TechnologyItemComponent key={item.name} item={item} />
              ))}
            </LinkList>
          </Section>
        </div>
      </section>

      <section
        class="page-section about-panel about-panel--elsewhere flex flex-col gap-[var(--space-5)] sm:gap-[var(--space-6)]"
        aria-labelledby="about-elsewhere"
      >
        <div class="about-panel__header section-stack section-stack--compact">
          <h2 id="about-elsewhere" class="section-title">
            Elsewhere
          </h2>
        </div>
        <LinkList grid class="about-link-list about-link-list--grid">
          {socials.map((link) => (
            <SocialLinkItem key={`${link.label}-${link.handle}`} link={link} />
          ))}
        </LinkList>
      </section>

      <PageCallToAction
        eyebrow="Work together"
        title="Interested in the practical side of all this?"
        description="This page is the philosophy. The projects and resume show how that way of thinking turns into shipped work. If you are hiring, building something, or just want to compare notes, reach out."
        primaryAction={{
          href: settings.contactHref,
          label: settings.contactLabel,
        }}
        secondaryAction={{
          href: "/projects",
          label: "Browse projects",
        }}
        note={`${settings.location} / ${settings.availability}`}
      />
    </PageLayout>
  );
});

export const head: DocumentHead = createPageHead(
  "About",
  "Background, philosophy, and current focus for Alden Gillespy's v3 personal site.",
);
