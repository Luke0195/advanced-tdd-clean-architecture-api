import js from "@eslint/js";
import globals from "globals";
import tseslint from "typescript-eslint";
import { defineConfig } from "eslint/config";

export default defineConfig([
  {
    ignores: ["node_modules", "dist", "coverage"],
  },

  {
    files: ["**/*.{js,mjs,cjs,ts}"],
    plugins: { js },
    extends: ["js/recommended"],
  },

  {
    files: ["**/*.{js,mjs,cjs,ts}"],
    languageOptions: {
      globals: globals.node,
    },
    rules: {
      "@typescript-eslint/no-require-imports": "off",
    },
  },

  {
    files: ["**/*.ts"],
    ...tseslint.configs.recommended,
    rules: {
      ...tseslint.configs.recommended.rules,
      "@typescript-eslint/no-namespace": "off",
    },
  },
]);
