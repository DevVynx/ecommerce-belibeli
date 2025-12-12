import { globalIgnores } from "eslint/config";
import prettierConfig from "eslint-config-prettier";
import simpleImportSort from "eslint-plugin-simple-import-sort";
import globals from "globals";
import tsEslint from "typescript-eslint";

export default [
  globalIgnores([
    "!node_modules/",
    "node_modules/*",
    "!node_modules/mylibrary/",
    "!.gitignore",
  ]),
  {
    files: ["**/*.{js,ts,jsx,tsx}"],
    languageOptions: {
      globals: {
        ...globals.node,
        ...globals.es2021,
      },
      sourceType: "module",
      ecmaVersion: 2022,
      parser: tsEslint.parser,
      parserOptions: {},
    },
    plugins: {
      "@typescript-eslint": tsEslint.plugin,
    },
  },
  ...tsEslint.configs.recommended,
  {
    files: ["**/*.{js,ts,jsx,tsx}"],
    plugins: {
      "simple-import-sort": simpleImportSort,
    },
    rules: {
      "sort-imports": "off",
      "simple-import-sort/imports": "error",
      "simple-import-sort/exports": "error",
    },
  },
  prettierConfig,
];
