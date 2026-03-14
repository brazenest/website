import { component$ } from "@builder.io/qwik";
import { DeferredMediaFigure } from "~/components/content";
import type { PhotoCatalog } from "~/lib/content";

type PhotoCatalogCardProps = {
  catalog: PhotoCatalog;
  eager?: boolean;
};

export const PhotoCatalogCard = component$<PhotoCatalogCardProps>(({ catalog, eager = false }) => {
  return (
    <li class="photo-catalog-grid__item">
      <article class="photo-catalog-card">
        <DeferredMediaFigure
          asset={catalog.coverImage}
          class="photo-catalog-card__media"
          eager={eager}
          placeholderLabel={`Loading ${catalog.title}`}
        />
        <div class="photo-catalog-card__body">
          <p class="entry-meta">{catalog.years}</p>
          <h3 class="entry-title">{catalog.title}</h3>
          <p class="entry-summary">{catalog.note}</p>
        </div>
      </article>
    </li>
  );
});