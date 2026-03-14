import { component$ } from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";
import { PageIntro, PhotoCatalogCard, PhotoGalleryCard } from "~/components/content";
import { PageLayout, PageSection } from "~/components/layout";
import { getPhotoCatalogs, getPhotos } from "~/lib/content";
import { createPageHead } from "~/lib/seo";

export default component$(() => {
  const catalogs = getPhotoCatalogs();
  const photos = getPhotos();
  const catalogLookup = new Map(catalogs.map((catalog) => [catalog.slug, catalog]));
  const heroCatalog = catalogs[0];

  return (
    <PageLayout>
      <PageIntro
        eyebrow="Photos"
        title="Personal photos and starter catalogs."
        description="A dedicated place for still frames, collection-level organization, and image-first work that should not be buried inside the rest of the site."
        backgroundImage={heroCatalog?.coverImage}
      >
        <p class="section-note">
          Separate high-level section / portable content data / room to grow
        </p>
      </PageIntro>

      <PageSection
        title="Catalogs"
        titleId="photo-catalogs"
        titleClass="text-[clamp(1.7rem,5vw,2.5rem)] leading-[1.02] max-w-[18ch]"
        class="flex flex-col gap-[var(--space-4)] overflow-hidden p-[var(--space-5)]"
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
        class="flex flex-col gap-[var(--space-4)] overflow-hidden p-[var(--space-5)]"
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
    </PageLayout>
  );
});

export const head: DocumentHead = createPageHead(
  "Photos",
  "Alden Gillespy's photo catalogs and selected personal frames rendered from the shared v3 content layer.",
);
