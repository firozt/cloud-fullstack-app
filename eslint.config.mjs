import { defineConfig } from "eslint/config";
import js from "@eslint/js";
import globals from "globals";

export default defineConfig([
  { files: ["**/*.js"], plugins: { js }, extends: ["js/recommended"] },
  {
    files: ["cypress/**/*.js"],
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.mocha,
        cy: "readonly",
        Cypress: "readonly",
        expect: "readonly",
        assert: "readonly",
        chai: "readonly",
      },
    },
  },
  {
    files: ["cypress.config.js"],
    languageOptions: {
      globals: {
        ...globals.node,
      },
    },
  },
  {
    languageOptions: {
      globals: {
        ...globals.browser,
      },
    },
    rules: {
      "no-unused-vars": ["error", { argsIgnorePattern: "^_" }],
      "no-undef": "error",
    },
  },
]);
