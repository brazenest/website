import js from "@eslint/js";
import globals from "globals";
import tseslint from "typescript-eslint";
import { globalIgnores } from "eslint/config";
import { qwikEslint9Plugin } from "eslint-plugin-qwik";

const ignores = [
  "**/*.log",
  "**/.DS_Store",
  "**/.history",
  "**/.yarn",
  "**/build",
  "**/dist",
  "**/dist-dev",
  "**/node_modules",
  "**/.cache",
  "**/.rollup.cache",
  "**/package-lock.json",
  "**/pnpm-lock.yaml",
  "**/tsconfig.tsbuildinfo",
  "**/yarn.lock",
  "app/**",
  "components/**",
  "data/**",
  "functions/**",
  "hooks/**",
  "lib/**",
  "types/**",
];

export default tseslint.config(
  globalIgnores(ignores),
  js.configs.recommended,
  tseslint.configs.recommended,
  qwikEslint9Plugin.configs.recommended,
  {
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
        ...globals.es2021,
        ...globals.serviceworker,
      },
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
  },
  {
    rules: {
      "@typescript-eslint/no-explicit-any": "off",
    },
  },
);
