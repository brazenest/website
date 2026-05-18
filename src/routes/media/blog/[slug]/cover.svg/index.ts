import { type RequestHandler } from "@builder.io/qwik-city";
import { renderBlogCoverSvg } from "~/lib/blog/cover-art";

function applySvgHeaders(headers: Headers) {
  headers.set("Content-Type", "image/svg+xml; charset=utf-8");
  headers.set("Cache-Control", "public, max-age=3600");
}

export const onGet: RequestHandler = async ({ params, headers, send }) => {
  applySvgHeaders(headers);

  throw send(200, renderBlogCoverSvg(params.slug));
};

export const onHead: RequestHandler = async ({ headers, send }) => {
  applySvgHeaders(headers);

  throw send(200, "");
};
