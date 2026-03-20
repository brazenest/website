import { component$ } from '@builder.io/qwik'

/**
 * Lightweight video component with conservative loading discipline
 *
 * LOADING STRATEGY:
 * - preload="metadata": Load video metadata only (duration, dimensions)
 *   Avoids loading video frames until user interacts
 * - poster: Display image while video loads/before play
 * - No autoplay: User explicitly chooses to play
 * - controls: Standard browser player for accessibility
 *
 * PERFORMANCE:
 * - Explicit width/height: Prevents layout shift
 * - Poster fallback: Graceful degradation if video unavailable
 * - Conservative sizing: Matches media grid expectations (16:9 hero)
 *
 * USAGE:
 * - Hero media on detail pages only (justified primary focal point)
 * - NOT in grid contexts (defer loading)
 * - NOT in secondary section media (keep as poster-only)
 */

export interface ResponsiveVideoProps {
  /** Video file URL (e.g., /media/production/example.mp4) */
  src: string
  /** Poster image URL (shown before/while video loads) */
  poster?: string
  /** CSS class for additional styling */
  class?: string
  /** Width in pixels (defaults to 1600) */
  width?: number
  /** Height in pixels (defaults to 900) */
  height?: number
}

export const ResponsiveVideo = component$(
  ({ src, poster, class: className = '', width = 1600, height = 900 }: ResponsiveVideoProps) => {
    return (
      <video
        src={src}
        poster={poster}
        width={width}
        height={height}
        preload="metadata"
        controls
        class={`h-full w-full object-cover ${className}`}
      >
        <track kind="captions" srclang="en" label="English" />
        Your browser does not support the video tag. Please use the poster image or upgrade your browser.
      </video>
    )
  }
)
