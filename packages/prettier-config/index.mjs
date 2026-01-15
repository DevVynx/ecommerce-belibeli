/** @typedef {import('prettier').Config} PrettierConfig */

/** @type { PrettierConfig } */

const config = {
  printWidth: 100,
  tabWidth: 2,
  useTabs: false,
  semi: true,
  singleQuote: false,
  quoteProps: "as-needed",
  jsxSingleQuote: false,
  trailingComma: "es5",
  bracketSpacing: true,
  bracketSameLine: false,
  arrowParens: "always",
  endOfLine: "auto",
  plugins: [require.resolve("prettier-plugin-tailwindcss")],
};

export default config;
