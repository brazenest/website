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
          <p class="entry-meta flex flex-wrap items-center gap-x-[0.45rem] gap-y-[0.2rem] text-[var(--color-text-muted)] font-[var(--font-mono)] text-[0.74rem] leading-[1.45] tracking-[0.07em] uppercase">
            <span>{catalogTitle}</span>
            <span class="opacity-45" aria-hidden="true">
              /
            </span>
            <span>{photo.location}</span>
            <span class="opacity-45" aria-hidden="true">
              /
            </span>
            <span>{photo.year}</span>
          </p>
          <h3 class="entry-title photo-card__title">{photo.title}</h3>
          {photo.note && <p class="entry-summary photo-card__note">{photo.note}</p>}
        </div>
      </article>
    </li>
  );
});
