import { component$ } from "@builder.io/qwik";
import type { MediaAsset } from "~/lib/content";

type MediaFigureProps = {
  asset: MediaAsset;
  class?: string;
  eager?: boolean;
};

export const MediaFigure = component$<MediaFigureProps>(
  ({ asset, class: className, eager }) => {
    const classes = ["media-figure flex flex-col gap-[var(--space-3)]", className].filter(Boolean).join(" ");

    return (
      <figure class={classes}>
        <div
          class="media-frame relative overflow-hidden"
          style={{ aspectRatio: `${asset.width} / ${asset.height}` }}
        >
          <img
            src={asset.src}
            alt={asset.alt}
            width={asset.width}
            height={asset.height}
            class="media-image w-full h-full object-cover"
            decoding="async"
            loading={eager ? "eager" : "lazy"}
          />
        </div>
        {asset.caption && <figcaption class="media-caption">{asset.caption}</figcaption>}
      </figure>
    );
  },
);
