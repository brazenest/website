import { fileURLToPath } from "node:url";
import { defineConfig, type UserConfig } from "vite";
import { qwikVite } from "@builder.io/qwik/optimizer";
import { qwikCity } from "@builder.io/qwik-city/vite";
import tailwindcss from "@tailwindcss/vite";
import tsconfigPaths from "vite-tsconfig-paths";
import pkg from "./package.json";

type PackageDeps = Record<string, string>;

const workspaceRoot = fileURLToPath(new URL(".", import.meta.url));
const v3AppRoot = fileURLToPath(new URL("./src", import.meta.url));
const v3Tsconfig = fileURLToPath(new URL("./tsconfig.json", import.meta.url));

const { dependencies = {}, devDependencies = {} } = pkg as {
  dependencies?: PackageDeps;
  devDependencies?: PackageDeps;
};

errorOnDuplicateDeps(devDependencies, dependencies);

export default defineConfig((): UserConfig => {
  return {
    plugins: [
      qwikCity(),
      qwikVite(),
      // Only the root v3 tsconfig participates in path resolution.
      tsconfigPaths({ projects: [v3Tsconfig], root: workspaceRoot }),
      // Tailwind for the active Qwik app is wired here; legacy Next config stays in next-app/.
      tailwindcss(),
    ],
    resolve: {
      alias: {
        "~": v3AppRoot,
        "@": v3AppRoot,
      },
    },
    optimizeDeps: {
      exclude: [],
    },
    server: {
      headers: {
        "Cache-Control": "public, max-age=0",
      },
    },
    preview: {
      headers: {
        "Cache-Control": "public, max-age=600",
      },
    },
  };
});

function errorOnDuplicateDeps(devDeps: PackageDeps, runtimeDeps: PackageDeps) {
  const duplicated = Object.keys(devDeps).filter((dep) => runtimeDeps[dep]);
  const qwikPackages = Object.keys(runtimeDeps).filter((dep) =>
    /qwik/i.test(dep),
  );

  if (qwikPackages.length > 0) {
    throw new Error(
      `Move Qwik packages ${qwikPackages.join(", ")} to devDependencies.`,
    );
  }

  if (duplicated.length > 0) {
    throw new Error(
      `The dependency "${duplicated.join(", ")}" is listed in both dependencies and devDependencies.`,
    );
  }
}
