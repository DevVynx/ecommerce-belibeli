import nextConfig from "@repo/eslint-config/next";

export default [
  ...nextConfig,
  {
    ignores: [
      "node_modules",
      ".next",
      ".turbo",
      "dist",
      "*.config.js",
      "*.config.ts",
      "next-env.d.ts",
    ],
  },
];
