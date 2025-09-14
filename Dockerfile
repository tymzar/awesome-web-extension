# Use the official Playwright image with Node.js
FROM mcr.microsoft.com/playwright:v1.40.0-focal

# Set working directory
WORKDIR /app

# Enable Corepack for correct Yarn version
RUN corepack enable

# Copy package files
COPY package.json yarn.lock ./

# Install dependencies
RUN yarn install --frozen-lockfile

# Verify installation
RUN yarn --version && node --version

# Copy source code
COPY . .

# Reinstall dependencies after copying all files
RUN yarn install --frozen-lockfile

# Set environment variables for build
ENV NODE_ENV=production

# Build the extension using yarn dlx to run tsx
RUN yarn dlx tsx scripts/esbuild.config.ts

# Install Playwright browsers
RUN npx playwright install chromium

# Set environment variables for headless mode
ENV CI=true
ENV HEADLESS=true

# Expose port for Playwright report (optional)
EXPOSE 9323

# Default command to run tests
CMD ["yarn", "test:e2e"]
