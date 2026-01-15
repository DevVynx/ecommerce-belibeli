import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["src/server.ts"],
  outDir: "dist",
  target: "node18",
  platform: "node",
  format: ["cjs"],
  bundle: true,
  splitting: false,
  sourcemap: true,
  clean: true,
});
