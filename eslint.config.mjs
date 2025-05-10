import js from "@eslint/js";
import globals from "globals";
import tseslint from "typescript-eslint";
import { defineConfig } from "eslint/config";

export default defineConfig([
  // Ignorar pastas
  {
    ignores: ["node_modules", "dist", "coverage"]
  },

  // Regras básicas JS
  {
    files: ["**/*.{js,mjs,cjs,ts}"],
    plugins: { js },
    extends: ["js/recommended"]
  },

  // Configuração Node.js e desativação da regra
  {
    files: ["**/*.{js,mjs,cjs,ts}"],
    languageOptions: {
      globals: globals.node
    },
    rules: {
      "@typescript-eslint/no-require-imports": "off"
    }
  },

  // Regras recomendadas do typescript-eslint
  ...tseslint.configs.recommended
]);
