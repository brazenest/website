import { createQwikCity } from "@builder.io/qwik-city/middleware/node";
import fastifyStatic from "@fastify/static";
import qwikCityPlan from "@qwik-city-plan";
import type { FastifyPluginAsync } from "fastify";
import fastifyPlugin from "fastify-plugin";
import { existsSync } from "node:fs";

import render from "../entry.ssr";

export interface FastifyQwikOptions {
  distDir: string;
  buildDir: string;
  assetsDir: string;
}

const { router, notFound } = createQwikCity({ render, qwikCityPlan });

const DYNAMIC_EXACT_ROUTES = ["/robots.txt", "/sitemap.xml"] as const;

const qwikPlugin: FastifyPluginAsync<FastifyQwikOptions> = async (
  fastify,
  options,
) => {
  const { buildDir, distDir, assetsDir } = options;

  for (const route of DYNAMIC_EXACT_ROUTES) {
    fastify.all(route, async (request, response) => {
      await router(request.raw, response.raw, (err) => fastify.log.error(err));
    });
  }

  if (existsSync(buildDir)) {
    fastify.register(fastifyStatic, {
      root: buildDir,
      prefix: "/build",
      immutable: true,
      maxAge: "1y",
      decorateReply: false,
    });
  }

  if (existsSync(assetsDir)) {
    fastify.register(fastifyStatic, {
      root: assetsDir,
      prefix: "/assets",
      immutable: true,
      maxAge: "1y",
    });
  }

  fastify.register(fastifyStatic, {
    root: distDir,
    redirect: false,
    decorateReply: false,
  });

  fastify.removeAllContentTypeParsers();

  fastify.setNotFoundHandler(async (request, response) => {
    await router(request.raw, response.raw, (err) => fastify.log.error(err));
    await notFound(request.raw, response.raw, (err) => fastify.log.error(err));
  });
};

export default fastifyPlugin(qwikPlugin, { fastify: ">=4.0.0 <6.0.0" });
