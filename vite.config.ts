import { defineConfig, type UserConfig } from "vite";
import { qwikVite } from "@builder.io/qwik/optimizer";
import { qwikCity } from "@builder.io/qwik-city/vite";
import tailwindcss from "@tailwindcss/vite";
import tsconfigPaths from "vite-tsconfig-paths";
import pkg from "./package.json";

type PackageDeps = Record<string, string>;

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
      tsconfigPaths({ root: "." }),
      tailwindcss(),
    ],
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

function errorOnDuplicateDeps(
  devDeps: PackageDeps,
  runtimeDeps: PackageDeps,
) {
  const duplicated = Object.keys(devDeps).filter((dep) => runtimeDeps[dep]);
  const qwikPackages = Object.keys(runtimeDeps).filter((dep) => /qwik/i.test(dep));

  if (qwikPackages.length > 0) {
    throw new Error(`Move Qwik packages ${qwikPackages.join(", ")} to devDependencies.`);
  }

  if (duplicated.length > 0) {
    throw new Error(
      `The dependency "${duplicated.join(", ")}" is listed in both dependencies and devDependencies.`,
    );
  }
}
