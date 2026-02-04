import baseConfig from "./base.js";
import reactPlugin from "eslint-plugin-react";
import jsxA11yPlugin from "eslint-plugin-jsx-a11y";
import reactHooksPlugin from "eslint-plugin-react-hooks";
import globals from "globals";

export default [
  ...baseConfig, // Importa sua base (TS, Prettier, Sorting)

  {
    // 1. Configurações de arquivos
    files: ["**/*.{js,jsx,ts,tsx}"],

    // 2. Configurações de ambiente para Browser/React
    languageOptions: {
      // Permite usar variáveis globais do navegador (window, document, etc.)
      globals: {
        ...globals.browser,
      },
    },

    // 3. Configurações do React
    settings: {
      react: { version: "detect" },
    },

    // 4. Plugins
    plugins: {
      react: reactPlugin,
      "jsx-a11y": jsxA11yPlugin,
      "react-hooks": reactHooksPlugin,
    },

    // 5. Regras
    rules: {
      // React essencial
      "react/jsx-key": "error",
      "react/react-in-jsx-scope": "off",
      "react/prop-types": "off",
      // Hooks — só o que quebra app
      "react-hooks/rules-of-hooks": "error",
      "react-hooks/exhaustive-deps": "off",

      // Imports
      "simple-import-sort/imports": "error",
      "simple-import-sort/exports": "error",

      // Código morto
      "@typescript-eslint/no-unused-vars": [
        "error",
        {
          argsIgnorePattern: "^_",
          varsIgnorePattern: "^_",
          caughtErrorsIgnorePattern: "^_",
        },
      ],
    },
  },
];
