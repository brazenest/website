/*
 * WHAT IS THIS FILE?
 *
 * It's the entry point for the Fastify server when building for production.
 *
 * Learn more about Node.js server integrations here:
 * - https://qwik.dev/docs/deployments/node/
 *
 */
import { type PlatformNode } from "@builder.io/qwik-city/middleware/node";
import "dotenv/config";
import Fastify from "fastify";
import { join } from "node:path";
import { fileURLToPath } from "node:url";
import FastifyQwik from "./plugins/fastify-qwik";
import {
  buildAdminBasicAuthChallenge,
  isAdminRoutePath,
  validateAdminBasicAuthHeader,
} from "./lib/auth/adminBasicAuth";

declare global {
  type QwikCityPlatform = PlatformNode;
}

// Directories where the static assets are located
const distDir = join(fileURLToPath(import.meta.url), "..", "..", "dist");
const buildDir = join(distDir, "build");
const assetsDir = join(distDir, "assets");

// Allow for dynamic port and host
const PORT = parseInt(process.env.PORT ?? "3000");
const HOST = process.env.HOST ?? "0.0.0.0";

const start = async () => {
  // Create the fastify server
  // https://fastify.dev/docs/latest/Guides/Getting-Started/
  const fastify = Fastify({
    logger: true,
  });

  fastify.addHook("onRequest", async (request, reply) => {
    const requestUrl = request.raw.url ?? request.url;
    const pathname = new URL(requestUrl, "http://internal.local").pathname;

    if (!isAdminRoutePath(pathname)) {
      return;
    }

    const validation = validateAdminBasicAuthHeader(
      request.headers.authorization,
      process.env,
    );

    if (validation.ok) {
      return;
    }

    if (validation.reason === "missing-config") {
      request.log.error(
        {
          pathname,
        },
        "Admin basic auth credentials are not configured",
      );

      reply.code(503).type("text/plain; charset=utf-8").send("Admin access is unavailable.");
      return reply;
    }

    reply
      .header("WWW-Authenticate", buildAdminBasicAuthChallenge())
      .code(401)
      .type("text/plain; charset=utf-8")
      .send("Authentication required.");

    return reply;
  });

  // Enable compression for faster asset delivery
  // https://github.com/fastify/fastify-compress
  await fastify.register(import('@fastify/compress'))

  // Handle Qwik City using a plugin
  await fastify.register(FastifyQwik, { distDir, buildDir, assetsDir });

  // Start the fastify server
  await fastify.listen({ port: PORT, host: HOST });
};

start();
