import { component$, useStyles$ } from "@builder.io/qwik";
import { QwikCityProvider, RouterOutlet, useDocumentHead } from "@builder.io/qwik-city";
import { } from "~/types/ui";
import "./global.css";

import fontInterStyles from "@fontsource-variable/inter?inline";
import fontSpaceGroteskStyles from "@fontsource-variable/space-grotesk?inline";
import { buildPersonStructuredData, buildWebSiteStructuredData } from "~/fns/seo/buildStructuredData";
import { StructuredData } from "~/components/seo/StructuredData";

export default component$(() => {

  useStyles$(fontInterStyles);
  useStyles$(fontSpaceGroteskStyles);

  return (
    <QwikCityProvider>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
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
      <title>{head.title || 'Personal Site v3'}</title>

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
        <style key={style.key} {...style.props} dangerouslySetInnerHTML={style.style} />
      ))}

      {/* Structured data and other scripts */}
      {head.scripts.map((script) => (
        <script key={script.key} {...script.props} dangerouslySetInnerHTML={script.script} />
      ))}

      {/* Global structured data: Person and WebSite schemas */}
      {/* These are emitted site-wide for SEO and schema.org indexing */}
      <StructuredData
        data={[buildPersonStructuredData(), buildWebSiteStructuredData()]}
      />
    </>
  );
});
