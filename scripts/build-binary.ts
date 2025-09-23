#!/usr/bin/env node
import * as esbuild from "esbuild";

const config: esbuild.BuildOptions = {
  platform: "node",
  target: "node18",
  format: "esm",
  bundle: true,
  entryPoints: ["./bin/create-web-extension.ts"],
  outfile: "./bin/create-web-extension.js",
  minify: false,
  sourcemap: false,
  external: ["@inquirer/prompts"],
  banner: {
    js: "#!/usr/bin/env node\n",
  },
  define: {
    "process.env.NODE_ENV": `"${process.env.NODE_ENV || "production"}"`,
  },
};

async function buildBinary(): Promise<void> {
  try {
    console.log("🔨 Building binary...");
    await esbuild.build(config);
    console.log("✅ Binary built successfully!");
  } catch (error) {
    console.error("❌ Build failed:", error);
    process.exit(1);
  }
}

await buildBinary();
