import {
  Resource,
  component$,
  useResource$,
  useSignal,
  useVisibleTask$,
} from "@builder.io/qwik";
import type { MediaAsset } from "~/lib/content";
import { MediaFigure } from "./MediaFigure";

type DeferredMediaFigureProps = {
  asset: MediaAsset;
  class?: string;
  eager?: boolean;
  placeholderLabel?: string;
};

const MediaPlaceholder = component$<DeferredMediaFigureProps>(
  ({ asset, class: className, placeholderLabel }) => {
    const classes = ["media-figure flex flex-col gap-[var(--space-3)]", className].filter(Boolean).join(" ");

    return (
      <figure class={classes} aria-busy="true">
        <div
          class="media-frame media-frame--placeholder relative overflow-hidden"
          style={{ aspectRatio: `${asset.width} / ${asset.height}` }}
        >
          <span class="media-shimmer" aria-hidden="true" />
          <span class="media-placeholder-label text-[var(--color-text-muted)] font-[var(--font-mono)] text-[0.74rem] tracking-[0.08em] uppercase">
            {placeholderLabel ?? "Loading image"}
          </span>
        </div>
        {asset.caption && <figcaption class="media-caption">{asset.caption}</figcaption>}
      </figure>
    );
  },
);

export const DeferredMediaFigure = component$<DeferredMediaFigureProps>(
  ({ asset, class: className, eager, placeholderLabel }) => {
    const isVisible = useSignal(false);

    // eslint-disable-next-line qwik/no-use-visible-task
    useVisibleTask$(() => {
      isVisible.value = true;
    });

    const assetResource = useResource$<MediaAsset | null>(async ({ track }) => {
      const shouldLoad = track(() => isVisible.value);

      if (!shouldLoad) {
        return null;
      }

      await new Promise((resolve) => setTimeout(resolve, 0));

      return asset;
    });

    return (
      <Resource
        value={assetResource}
        onPending={() => (
          <MediaPlaceholder
            asset={asset}
            class={className}
            placeholderLabel={placeholderLabel}
          />
        )}
        onResolved={(resolvedAsset) =>
          resolvedAsset ? (
            <MediaFigure asset={resolvedAsset} class={className} eager={eager} />
          ) : (
            <MediaPlaceholder
              asset={asset}
              class={className}
              placeholderLabel={placeholderLabel}
            />
          )
        }
      />
    );
  },
);
