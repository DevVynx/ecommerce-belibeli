import baseConfig from "@repo/eslint-config/base.js";

export default [
  ...baseConfig,
  {
    ignores: [
      "node_modules",
      "dist",
      ".turbo",
      "prisma/generated",
      "*.config.js",
      "*.config.ts",
    ],
  },
];
