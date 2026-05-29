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

function toYouTubeEmbedUrl(src: string) {
  try {
    const url = new URL(src)
    const host = url.hostname.replace(/^www\./, '')

    if (host === 'youtube.com' || host === 'm.youtube.com') {
      if (url.pathname === '/watch') {
        const videoId = url.searchParams.get('v')

        if (videoId) {
          return `https://www.youtube-nocookie.com/embed/${videoId}`
        }
      }

      if (url.pathname.startsWith('/embed/')) {
        return src
      }
    }

    if (host === 'youtu.be') {
      const videoId = url.pathname.replace(/^\//, '')

      if (videoId) {
        return `https://www.youtube-nocookie.com/embed/${videoId}`
      }
    }
  } catch {
    return null
  }

  return null
}

export const ResponsiveVideo = component$(
  ({ src, poster, class: className = '', width = 1600, height = 900 }: ResponsiveVideoProps) => {
    const youTubeEmbedUrl = toYouTubeEmbedUrl(src)

    if (youTubeEmbedUrl) {
      return (
        <iframe
          src={youTubeEmbedUrl}
          title="Embedded video player"
          width={width}
          height={height}
          loading="lazy"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullscreen
          referrerPolicy="strict-origin-when-cross-origin"
          class={`h-full w-full border-0 ${className}`}
        />
      )
    }

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
