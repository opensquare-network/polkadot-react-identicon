import { defineConfig } from "tsup";

export default defineConfig({
  clean: true,
  entry: ["src/lib"],
  format: ["cjs", "esm"],
  treeshake: true,
  legacyOutput: true,
  loader: {
    '.js': 'jsx'
  }
});

