import { input, select, confirm } from "@inquirer/prompts";
import { writeFileSync, mkdirSync, cpSync, existsSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

interface ProjectConfig {
  name: string;
  description: string;
  author: string;
  license: string;
  repository?: string;
}

async function main(): Promise<void> {
  console.log("🚀 Welcome to Web Extension Creator!\n");

  try {
    // Get project details from user
    const projectName = await input({
      message: "What is your project name?",
      default: "my-web-extension",
      validate: (input: string) => {
        if (!input.trim()) {
          return "Project name cannot be empty";
        }
        if (!/^[a-z0-9-]+$/.test(input)) {
          return "Project name can only contain lowercase letters, numbers, and hyphens";
        }
        return true;
      },
    });

    const description = await input({
      message: "What is your project description?",
      default: "A web extension built with React and TypeScript",
    });

    const author = await input({
      message: "What is your name (author)?",
      default: "Your Name",
    });

    const license = await select({
      message: "Choose a license:",
      choices: [
        { name: "MIT", value: "MIT" },
        { name: "Apache-2.0", value: "Apache-2.0" },
        { name: "GPL-3.0", value: "GPL-3.0" },
        { name: "UNLICENSED", value: "UNLICENSED" },
      ],
      default: "MIT",
    });

    const repository = await input({
      message: "GitHub repository URL (optional):",
      default: "",
    });

    const config: ProjectConfig = {
      name: projectName,
      description,
      author,
      license,
      repository: repository || undefined,
    };

    await createProject(config);
  } catch (error: any) {
    if (error.isTtyError) {
      console.error(
        "❌ Prompt couldn't be rendered in the current environment"
      );
    } else {
      console.error("❌ An error occurred:", error.message);
    }
    process.exit(1);
  }
}

async function createProject(config: ProjectConfig): Promise<void> {
  // Create project directory
  const projectPath = join(process.cwd(), config.name);

  if (existsSync(projectPath)) {
    const overwrite = await confirm({
      message: `Directory "${config.name}" already exists. Do you want to overwrite it?`,
      default: false,
    });

    if (!overwrite) {
      console.log("❌ Project creation cancelled.");
      process.exit(0);
    }
  }

  console.log(`\n📁 Creating project in: ${projectPath}`);
  mkdirSync(projectPath, { recursive: true });

  // Copy template files
  const templatePath = join(__dirname, "..");
  const filesToCopy = [
    "src",
    "e2e-tests",
    "scripts",
    "eslint.config.js",
    "knip.config.ts",
    "playwright.config.ts",
    "postcss.config.mjs",
    "tailwind.config.js",
    "tsconfig.json",
    "Dockerfile",
    "docker-compose.yml",
    ".gitignore",
  ];

  console.log("📋 Copying template files...");
  for (const file of filesToCopy) {
    const sourcePath = join(templatePath, file);
    const destPath = join(projectPath, file);

    if (existsSync(sourcePath)) {
      cpSync(sourcePath, destPath, { recursive: true });
    }
  }

  // Create custom package.json
  const packageJson = createPackageJson(config);

  // Write package.json
  writeFileSync(
    join(projectPath, "package.json"),
    JSON.stringify(packageJson, null, 2) + "\n"
  );

  // Create README.md
  const readmeContent = createReadme(config);
  writeFileSync(join(projectPath, "README.md"), readmeContent);

  console.log("\n✅ Project created successfully!");
  console.log(`\n📝 Next steps:`);
  console.log(`   cd ${config.name}`);
  console.log(`   yarn install`);
  console.log(`   yarn start`);
  console.log(`\n🎉 Happy coding!`);
}

function createPackageJson(config: ProjectConfig): any {
  return {
    name: config.name,
    version: "1.0.0",
    description: config.description,
    license: config.license,
    engines: {
      node: ">22.7.0",
    },
    ...(config.repository && {
      repository: {
        type: "git",
        url: config.repository,
      },
    }),
    watch: {
      dev: {
        patterns: ["src"],
        extensions: "ts,tsx,html",
      },
    },
    scripts: {
      start: "dotenv -e .env.local node scripts/esbuild.config.ts",
      build: "dotenv -e .env node scripts/esbuild.config.ts",
      lint: "eslint --cache --no-error-on-unmatched-pattern --ext ts,tsx {src,scripts}",
      "lint:fix": "yarn lint --fix",
      format: "prettier --no-editorconfig src/**/*.* --check",
      "format:fix": "prettier --no-editorconfig src/**/*.* --write",
      "test:e2e": "playwright test",
      "test:docker": "docker compose up playwright-tests --build",
      "test:docker:update-snapshots":
        "docker compose run --rm playwright-tests yarn test:e2e --update-snapshots",
      "prettier:fix":
        "prettier --no-editorconfig src/'**/*.{ts,tsx,js,css,html,md}' --write",
      knip: "knip",
    },
    type: "module",
    dependencies: {
      "@heroui/react": "^2.8.2",
      "@iconify/react": "^6.0.0",
      "chart.js": "4.4.0",
      "framer-motion": "^12.23.12",
      react: "18.2.0",
      "react-dom": "18.2.0",
    },
    devDependencies: {
      "@craftamap/esbuild-plugin-html": "0.6.1",
      "@playwright/test": "^1.55.0",
      "@types/chrome": "^0.1.11",
      "@types/node": "^24.4.0",
      "@types/react": "18.2.37",
      "@types/react-dom": "18.2.15",
      "@typescript-eslint/eslint-plugin": "^8.0.0",
      "@typescript-eslint/parser": "^8.0.0",
      autoprefixer: "10.4.16",
      "dotenv-cli": "7.2.1",
      esbuild: "0.18.0",
      "esbuild-plugin-clean": "1.0.1",
      "esbuild-plugin-copy": "2.1.1",
      "esbuild-style-plugin": "1.6.3",
      eslint: "9.35.0",
      "eslint-plugin-react": "^7.37.2",
      "eslint-plugin-react-hooks": "^5.0.0",
      "eslint-plugin-unicorn": "^61.0.2",
      knip: "^5.63.1",
      postcss: "^8.5.6",
      prettier: "2.8.3",
      tailwindcss: "^3.4.0",
      typescript: "^5.9.2",
    },
    packageManager:
      "yarn@4.9.3+sha512.8295ee814f6b253e16f516416481b481a215ed03ef1ae38524d108084872560a9ed75aeb23b91ab64222062ac4149a594150ae538c2a9536fdbcefd4e49b11cc",
  };
}

function createReadme(config: ProjectConfig): string {
  return `# ${config.name}

${config.description}

## Getting Started

1. Install dependencies:
   \`\`\`bash
   yarn install
   \`\`\`

2. Start development server:
   \`\`\`bash
   yarn start
   \`\`\`

3. Build for production:
   \`\`\`bash
   yarn build
   \`\`\`

## Development

- \`yarn start\` - Start development server with hot reload
- \`yarn build\` - Build for production
- \`yarn lint\` - Run ESLint
- \`yarn test:e2e\` - Run end-to-end tests

## License

${config.license}
`;
}

main();
