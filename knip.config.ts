import type { KnipConfig } from "knip";

const config: KnipConfig = {
  entry: ["src/**/*.{ts,tsx}", "scripts/**/*.{ts,tsx}"],
  project: ["src/**/*.{ts,tsx}", "scripts/**/*.{ts,tsx}"],
  playwright: true,
  rules: {
    binaries: "error",
    classMembers: "error",
    dependencies: "error",
    devDependencies: "warn",
    duplicates: "error",
    enumMembers: "error",
    exports: "error",
    files: "error",
    nsExports: "error",
    nsTypes: "error",
    types: "error",
    unlisted: "error",
    unresolved: "error",
  },
};

export default config;
