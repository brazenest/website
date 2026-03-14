import { component$ } from "@builder.io/qwik";
import { DeferredMediaFigure } from "~/components/content";
import type { PhotoItem } from "~/lib/content";

type PhotoGalleryCardProps = {
  photo: PhotoItem;
  catalogTitle: string;
  eager?: boolean;
};

export const PhotoGalleryCard = component$<PhotoGalleryCardProps>(({ photo, catalogTitle, eager = false }) => {
  return (
    <li class="photo-gallery-grid__item">
      <article class="photo-gallery-card">
        <DeferredMediaFigure
          asset={photo.image}
          class="photo-gallery-card__media"
          eager={eager}
          placeholderLabel={`Loading ${photo.title}`}
        />
        <div class="photo-gallery-card__body">
          <p class="entry-meta">
            {catalogTitle} / {photo.location} / {photo.year}
          </p>
          <h3 class="entry-title">{photo.title}</h3>
          {photo.note && <p class="entry-summary">{photo.note}</p>}
        </div>
      </article>
    </li>
  );
});