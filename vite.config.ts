import { defineConfig } from "vite-plus";

export default defineConfig({
  staged: {
    "*": "vp check --fix",
  },
  // Agent tooling (skills, local settings) is vendored content, not project
  // source. Formatting it is noise, and it must not fail CI if committed.
  fmt: {
    ignorePatterns: ["**/.agents/**", "**/.claude/**"],
  },
  lint: {
    // Setting `plugins` here would replace oxlint's default set (eslint,
    // typescript, unicorn, oxc). Leave it unset and only add plugins in
    // overrides, where the list extends the defaults.
    options: {
      typeAware: true,
      typeCheck: true,
    },
    ignorePatterns: ["**/dist/**", "**/coverage/**", "**/.agents/**", "**/.claude/**"],
    overrides: [
      {
        files: ["**/*.test.ts", "**/*.spec.ts"],
        plugins: ["vitest"],
      },
    ],
  },
  test: {
    passWithNoTests: true,
  },
  pack: {
    dts: true,
    sourcemap: true,
  },
  run: {
    cache: true,
  },
});
