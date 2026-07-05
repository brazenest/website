import { component$, useStyles$ } from "@builder.io/qwik";
import {
  QwikCityProvider,
  RouterOutlet,
  useDocumentHead,
} from "@builder.io/qwik-city";
import "./global.css";

import fontInterStyles from "@fontsource-variable/inter?inline";
import {
  buildPersonStructuredData,
  buildWebSiteStructuredData,
} from "~/fns/seo/buildStructuredData";
import { StructuredData } from "~/components/seo/StructuredData";
import { releaseInfo, releaseLabel } from "~/config/site";

// The site follows the visitor's OS color scheme by default. An explicit choice
// (stored under `key` as 'light' | 'dark') overrides it; 'system' or an absent
// value falls back to `prefers-color-scheme`. This runs inline before paint to
// avoid a flash of the wrong theme, and stays live if the OS theme or the stored
// preference changes. Keep this logic in sync with ColorModeToggle /
// ColorModeDevSetting.
const colorModeScript = `(function(){try{var key='color-mode-dev-setting';var mq=window.matchMedia('(prefers-color-scheme: dark)');var apply=function(){var stored=window.localStorage.getItem(key);var setting=stored==='dark'||stored==='light'||stored==='system'?stored:'system';var mode=setting==='system'?(mq.matches?'dark':'light'):setting;document.documentElement.dataset.colorMode=mode;document.documentElement.style.colorScheme=mode;};apply();mq.addEventListener('change',apply);window.addEventListener('storage',function(event){if(event.key===key){apply();}});}catch(error){document.documentElement.dataset.colorMode='light';document.documentElement.style.colorScheme='light';}})();`;

export default component$(() => {
  useStyles$(fontInterStyles);

  return (
    <QwikCityProvider>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="release-version" content={releaseLabel} />
        <meta name="release-date" content={releaseInfo.releasedOn} />
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
        <script dangerouslySetInnerHTML={colorModeScript} />
        <DocumentRouterHead />
      </head>
      <body>
        <div class="route-transition">
          <RouterOutlet />
        </div>
      </body>
    </QwikCityProvider>
  );
});

/**
 * DocumentRouterHead renders route-resolved metadata into the document head.
 *
 * Metadata flow:
 * 1. Each route exports a `head` constant via metadataToDocumentHead()
 * 2. metadataToDocumentHead() converts SEOMetadata to Qwik's DocumentHead format
 * 3. Qwik City collects all head exports and makes them available via useDocumentHead()
 * 4. This component reads the collected head and renders all meta tags, links, styles, and scripts
 *
 * The rendered metadata includes:
 * - Title and meta description
 * - Canonical URL
 * - Open Graph tags (og:title, og:description, og:type, og:url, og:image, etc.)
 * - Twitter Card tags (twitter:card, twitter:title, twitter:description, twitter:image)
 * - Article metadata (for article-type pages)
 *
 * See: src/fns/seo/metadataToDocumentHead.ts for the conversion logic
 * See: src/types/seo.ts for SEOMetadata type definition
 */
export const DocumentRouterHead = component$(() => {
  const head = useDocumentHead();

  return (
    <>
      {/* Title from route metadata (includes template formatting) */}
      <title>{head.title || "Personal Site v4.3.0"}</title>

      {/* Meta tags: description, canonical, OG, Twitter, article metadata */}
      {head.meta.map((meta) => (
        <meta key={meta.key} {...meta} />
      ))}

      {/* Canonical and other link tags */}
      {head.links.map((link) => (
        <link key={link.key} {...link} />
      ))}

      {/* Embedded styles */}
      {head.styles.map((style) => (
        <style
          key={style.key}
          media={style.props?.media}
          dangerouslySetInnerHTML={style.style}
        />
      ))}

      {/* Structured data and other scripts */}
      {head.scripts.map((script) => (
        <script
          key={script.key}
          id={script.props?.id}
          type={script.props?.type}
          src={script.props?.src}
          nonce={script.props?.nonce}
          async={script.props?.async}
          defer={script.props?.defer}
          integrity={script.props?.integrity}
          crossOrigin={script.props?.crossOrigin}
          referrerPolicy={script.props?.referrerPolicy}
          dangerouslySetInnerHTML={script.script}
        />
      ))}

      {/* Google Analytics */}
      <script
        async
        src="https://www.googletagmanager.com/gtag/js?id=G-DGCKGYKJK8"
      />
      <script
        dangerouslySetInnerHTML={`window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', 'G-DGCKGYKJK8', { send_page_view: true });`}
      />

      {/* Cloudflare Web Analytics */}
      <script
        defer
        src="https://static.cloudflareinsights.com/beacon.min.js"
        data-cf-beacon='{"token":"6697037d4f18409a80738a3f551bc5db"}'
      />

      {/* Global structured data: Person and WebSite schemas */}
      {/* These are emitted site-wide for SEO and schema.org indexing */}
      <StructuredData
        data={[buildPersonStructuredData(), buildWebSiteStructuredData()]}
      />
    </>
  );
});
