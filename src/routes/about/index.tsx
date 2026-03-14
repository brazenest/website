import { component$ } from "@builder.io/qwik";
import { Link, type DocumentHead } from "@builder.io/qwik-city";
import { PageLayout } from "~/components/layout";
import { DeferredMediaFigure, PageIntro } from "~/components/content";
import { ActionLink, LinkList, SocialLinkItem, TechnologyItemComponent } from "~/components/ui";
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

  return (
    <PageLayout articleClass="flex flex-col gap-[var(--space-7)]">
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
          class="page-section page-section--split"
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
              {aboutPageContent.introduction.map((paragraph) => (
                <p key={paragraph} class="prose-copy">
                  {paragraph}
                </p>
              ))}
            </div>
          </div>
        </section>

        <section
          class="page-section page-section--split page-section--media-wide"
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
            <div class="page-prose page-prose--measure grid gap-[var(--space-3)] max-w-[var(--prose-width)]">
              {aboutPageContent.philosophy.map((paragraph) => (
                <p key={paragraph} class="prose-copy">
                  {paragraph}
                </p>
              ))}
            </div>
          </div>
        </section>

        <section class="page-section" aria-labelledby="about-focus">
          <h2 id="about-focus" class="section-title">
            Current focus
          </h2>
          <p class="section-note">
            {settings.role} / {settings.location} / {settings.availability}
          </p>

          <div class="about-focus-grid">
              <Section compact>
                <h3 class="entry-kicker text-[var(--color-text)] text-base font-semibold tracking-[-0.01em]">Projects</h3>
                <LinkList>
                  {currentProjects.map((project) => (
                    <li key={project.slug} class="link-list-item">
                      <Link href="/projects" class="link-list-label">
                        {project.title}
                      </Link>
                      <span class="meta-text font-mono">{project.summary}</span>
                    </li>
                  ))}
                </LinkList>
              </Section>
            <Section compact>
              <h3 class="entry-kicker text-[var(--color-text)] text-base font-semibold tracking-[-0.01em]">Technologies</h3>
              <LinkList>
                {technologies.map((item) => (
                  <TechnologyItemComponent key={item.name} item={item} />
                ))}
              </LinkList>
            </Section>
          </div>
        </section>

        <section class="page-section" aria-labelledby="about-elsewhere">
          <h2 id="about-elsewhere" class="section-title">
            Elsewhere
          </h2>
          <LinkList grid>
            {socials.map((link) => (
              <SocialLinkItem key={`${link.label}-${link.handle}`} link={link} />
            ))}
          </LinkList>
        </section>
      </PageLayout>
  );
});

export const head: DocumentHead = createPageHead(
  "About",
  "Background, philosophy, and current focus for Alden Gillespy's v3 personal site.",
);
