import baseConfig from "@repo/eslint-config/base";

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
