import { component$ } from "@builder.io/qwik";
import { type DocumentHead } from "@builder.io/qwik-city";
import { ContactPlaceholder } from "~/components/contact";
import { DeferredMediaFigure } from "~/components/content";
import { ContentWidth } from "~/components/layout";
import { ActionLink, SectionEyebrow, SmartLink } from "~/components/ui";
import {
  getFeaturedPhotos,
  getHomeIndexGroups,
  getHomePageContent,
  getHomeSecondaryCtas,
  getSiteSettings,
  type PhotoItem,
} from "~/lib/content";
import { createPageHead } from "~/lib/seo";

const renderPhotoCard = (photo: PhotoItem, index: number) => {
  return (
    <article key={photo.slug} class="photo-card">
      <DeferredMediaFigure
        asset={photo.image}
        class="photo-card__media"
        eager={index === 0}
        placeholderLabel={`Loading ${photo.title}`}
      />
      <div class="photo-card__body">
        <p class="entry-meta">
          {photo.location} / {photo.year}
        </p>
        <h3 class="photo-card__title">{photo.title}</h3>
        {photo.note && <p class="photo-card__note">{photo.note}</p>}
      </div>
    </article>
  );
};

export default component$(() => {
  const settings = getSiteSettings();
  const homePageContent = getHomePageContent();
  const homeIndexGroups = getHomeIndexGroups();
  const homeSecondaryCtas = getHomeSecondaryCtas();
  const featuredPhotos = getFeaturedPhotos();
  const introHeadlinePhrase = "product-grade";
  const [introHeadlineBefore, introHeadlineAfter] =
    settings.introHeadline.split(introHeadlinePhrase);

  return (
    <ContentWidth variant="page">
      <article class="home-page flex flex-col gap-[var(--space-7)]" id="top">
        <header
          class="home-hero"
          aria-labelledby="greeting-headline"
          style={{ "--home-hero-image": `url(${homePageContent.heroImage.src})` }}
        >
          <div class="home-hero__content">
            <div class="home-hero__copy">
              <SectionEyebrow label="Engineering + visual storytelling" />

              <div class="section-stack section-stack--compact">
                <p class="home-kicker">
                  {settings.personName} / {settings.location}
                </p>
                <h1 id="greeting-headline" class="home-title">
                  {introHeadlineAfter !== undefined ? (
                    <>
                      {introHeadlineBefore}
                      <span class="whitespace-nowrap">{introHeadlinePhrase}</span>
                      {introHeadlineAfter}
                    </>
                  ) : (
                    settings.introHeadline
                  )}
                </h1>
                <p class="home-lede">{settings.positioning}</p>
                <p class="home-support">{settings.availability}</p>
              </div>
            </div>

            <div class="home-actions">
              <ActionLink href={settings.contactHref} variant="primary">
                {settings.contactLabel}
              </ActionLink>
                            {homeSecondaryCtas.map((item) => (
                <ActionLink key={item.href} href={item.href} variant="secondary">
                  {item.label}
                </ActionLink>
              ))}
            </div>

            <nav class="home-secondary-actions" aria-label="Secondary">

            </nav>

            <dl class="home-signal-grid">
              <div class="home-signal">
                <dt class="home-signal__label">Focus</dt>
                <dd class="home-signal__value">Front-end systems</dd>
              </div>
              <div class="home-signal">
                <dt class="home-signal__label">Base</dt>
                <dd class="home-signal__value">{settings.location}</dd>
              </div>
              <div class="home-signal">
                <dt class="home-signal__label">Mode</dt>
                <dd class="home-signal__value">Engineering + cinematic work</dd>
              </div>
            </dl>
          </div>
        </header>

        <section class="home-index flex flex-col gap-[var(--space-5)]" aria-labelledby="index-heading">
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
                  {group.items.map((item) => {
                    const key = `${item.label}-${item.note}`;
                    return (
                      <li key={key} class="home-index-item">
                        <SmartLink
                          href={item.href}
                          external={item.external}
                          class="home-index-link"
                        >
                          {item.label}
                        </SmartLink>
                        <span class="home-index-note">{item.note}</span>
                      </li>
                    );
                  })}
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
            <p class="prose-copy">{settings.aboutBlurb}</p>
          </div>
        </section>

        <section class="home-photos" aria-labelledby="photos-heading">
          <div class="home-photos__intro">
            <SectionEyebrow label="Selected photos" />
            <h2 id="photos-heading" class="section-title">
              A few frames from the cinematic side of the work.
            </h2>
            <p class="prose-copy">
              More stills and photo work will come later, but the homepage now
              has a dedicated place for image-first work instead of treating it
              like an afterthought.
            </p>
            <ActionLink href="/photos" variant="tertiary">
              Open the photo catalogs
            </ActionLink>
          </div>

          <div class="photo-rail" aria-label="Selected photos">
            {featuredPhotos.map((photo, index) => renderPhotoCard(photo, index))}
          </div>
        </section>

        <section id="contact" class="home-contact" aria-labelledby="contact-heading">
          <SectionEyebrow label="Contact" />
          <h2 id="contact-heading" class="section-title">
            {settings.contactPromptHeading}
          </h2>
          <p class="prose-copy">{settings.contactPromptBody}</p>
          <ContactPlaceholder />
          <div class="home-actions">
            <ActionLink href={settings.contactHref} variant="secondary">
              {settings.contactLabel}
            </ActionLink>
            <ActionLink
              href="https://github.com/brazenest"
              variant="tertiary"
              newTab
            >
              Find the public work on GitHub
            </ActionLink>
          </div>
        </section>
      </article>
    </ContentWidth>
  );
});

export const head: DocumentHead = createPageHead(
  undefined,
  getSiteSettings().description,
);
