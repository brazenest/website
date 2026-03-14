import type { DocumentHead } from "@builder.io/qwik-city";
import { siteConfig } from "~/lib/config";

export const buildTitle = (pageTitle?: string) => {
  return pageTitle ? `${pageTitle} | ${siteConfig.title}` : siteConfig.title;
};

export const createPageHead = (
  pageTitle: string | undefined,
  description: string,
): DocumentHead => {
  return {
    title: buildTitle(pageTitle),
    meta: [
      {
        name: "description",
        content: description,
      },
    ],
  };
};
