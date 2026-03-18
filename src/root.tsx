import { component$, useStyles$ } from "@builder.io/qwik";
import { QwikCityProvider, RouterOutlet, useDocumentHead } from "@builder.io/qwik-city";
import { } from "~/types/ui";
import "./global.css";

import fontInterStyles from "@fontsource-variable/inter?inline";
import fontSpaceGroteskStyles from "@fontsource-variable/space-grotesk?inline";

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

export const DocumentRouterHead = component$(() => {
  const head = useDocumentHead();

  return (
    <>
      <title>{head.title || "Personal Site v3"}</title>
      {head.meta.map((meta) => (
        <meta key={meta.key} {...meta} />
      ))}
      {head.links.map((link) => (
        <link key={link.key} {...link} />
      ))}
      {head.styles.map((style) => (
        <style key={style.key} {...style.props} dangerouslySetInnerHTML={style.style} />
      ))}
      {head.scripts.map((script) => (
        <script key={script.key} {...script.props} dangerouslySetInnerHTML={script.script} />
      ))}
    </>
  );
});
