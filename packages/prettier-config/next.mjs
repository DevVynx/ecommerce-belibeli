import baseConfig from "./base.mjs";

/** @typedef {import('prettier').Config} PrettierConfig */

/** @type { PrettierConfig } */

const config = {
  ...baseConfig,
  plugins: ["prettier-plugin-tailwindcss"],
};

export default config;
