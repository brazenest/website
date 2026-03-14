import { component$, isDev } from "@builder.io/qwik";
import { QwikCityProvider, RouterOutlet } from "@builder.io/qwik-city";
import { RouterHead } from "~/components/router-head/router-head";

import "~/styles/global.css";

export default component$(() => {
  return (
    <QwikCityProvider>
      <head>
        <meta charSet="utf-8" />
        <meta name="color-scheme" content="light dark" />
        {!isDev && (
          <link
            rel="manifest"
            href={`${import.meta.env.BASE_URL}manifest.json`}
          />
        )}
        <RouterHead />
      </head>
      <body>
        <RouterOutlet />
      </body>
    </QwikCityProvider>
  );
});
