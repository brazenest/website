import { component$ } from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";
import {
  PageCallToAction,
  PageIntro,
  PhotoCatalogCard,
  PhotoGalleryCard,
} from "~/components/content";
import { PageLayout, PageSection } from "~/components/layout";
import { getPhotoCatalogs, getPhotos, getSiteSettings } from "~/lib/content";
import { createPageHead } from "~/lib/seo";

export default component$(() => {
  const catalogs = getPhotoCatalogs();
  const photos = getPhotos();
  const settings = getSiteSettings();
  const catalogLookup = new Map(catalogs.map((catalog) => [catalog.slug, catalog]));
  const heroCatalog = catalogs[0];

  return (
    <PageLayout>
      <PageIntro
        eyebrow="Photos"
        title="Personal photos and starter catalogs."
        description="A dedicated place for still frames, collection-level organization, and image-first work that should not be buried inside the rest of the site."
        backgroundImage={{
          src: "/assets/images/ChatGPT Image Mar 14, 2026, 11_59_52 PM.png",
          alt: "An AI-generated image representing photography and visual storytelling.",
          width: 1920,
          height: 1080,
        }}
        heroTone="inverse"
      >
        <p class="section-note">
          Separate high-level section / portable content data / room to grow
        </p>
      </PageIntro>

      <PageSection
        title="Catalogs"
        titleId="photo-catalogs"
        titleClass="text-[clamp(1.7rem,5vw,2.5rem)] leading-[1.02] max-w-[18ch]"
      >
        <ol class="photo-catalog-grid">
          {catalogs.map((catalog, index) => (
            <PhotoCatalogCard key={catalog.slug} catalog={catalog} eager={index === 0} />
          ))}
        </ol>
      </PageSection>

      <PageSection
        title="Selected frames"
        titleId="photo-frames"
        titleClass="text-[clamp(1.7rem,5vw,2.5rem)] leading-[1.02] max-w-[18ch]"
      >
        <ol class="photo-gallery-grid">
          {photos.map((photo, index) => (
            <PhotoGalleryCard
              key={photo.slug}
              photo={photo}
              catalogTitle={catalogLookup.get(photo.catalog)?.title ?? "Catalog"}
              eager={index < 2}
            />
          ))}
        </ol>
      </PageSection>

      <PageCallToAction
        eyebrow="Elsewhere"
        title="The visual side is part of the same practice."
        description="If the photo work is what pulled you in, the about page and project work show how that visual thinking carries into interface decisions, product structure, and the rest of the site."
        primaryAction={{
          href: "/about",
          label: "Read about the overlap",
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
  "Photos",
  "Alden Gillespy's photo catalogs and selected personal frames rendered from the shared v3 content layer.",
);
