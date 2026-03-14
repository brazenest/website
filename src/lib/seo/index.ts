import type { DocumentHead } from "@builder.io/qwik-city";

export const siteConfig = {
  title: "Alden Gillespy",
  description:
    "A clean Qwik-based foundation for the next version of Alden Gillespy's personal site.",
};

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
