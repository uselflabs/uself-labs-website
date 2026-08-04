# ============================================================
# USelfLabs Landing Page — Production Dockerfile
# Multi-stage build for Next.js standalone output
# Target: ghcr.io • Port: 3000
# ============================================================

# ------------------------------------
# Stage 1: Install dependencies only
# ------------------------------------
FROM node:24-alpine AS deps

# Check https://github.com/nodejs/docker-node/tree/b4117f9333da4138b03a546ec926ef50a31506c3#nodealpine
# for understanding why libc6-compat might be needed
RUN apk add --no-cache libc6-compat

WORKDIR /app

# Copy dependency manifests only — maximizes layer cache hits
COPY package.json package-lock.json ./

# Clean install — frozen lockfile for reproducible builds
RUN npm ci --ignore-scripts

# ------------------------------------
# Stage 2: Build the application
# ------------------------------------
FROM node:24-alpine AS builder

WORKDIR /app

# Copy dependencies from stage 1
COPY --from=deps /app/node_modules ./node_modules

# Copy source code
COPY . .

# Disable Next.js telemetry during build
ENV NEXT_TELEMETRY_DISABLED=1

# Build Next.js standalone output
RUN npm run build

# ------------------------------------
# Stage 3: Production runner
# ------------------------------------
FROM node:24-alpine AS runner

WORKDIR /app

# Drop the bundled npm CLI — the standalone server runs via `node server.js`
# and never invokes npm, but npm's own dependency tree (tar, brace-expansion,
# sigstore, …) accounts for every CVE reported against this image.
RUN rm -rf /usr/local/lib/node_modules/npm \
    /usr/local/bin/npm \
    /usr/local/bin/npx

# Production environment
ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

# Set the application port
ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

# Create non-root user for security
RUN addgroup --system --gid 1001 nodejs && \
    adduser --system --uid 1001 nextjs

# Copy public assets (static files served directly)
COPY --from=builder /app/public ./public

# Set correct permissions for prerender cache
RUN mkdir .next && chown nextjs:nodejs .next

# Copy standalone server and static assets
# The standalone output includes a minimal server.js
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

# Switch to non-root user
USER nextjs

# Expose the application port
EXPOSE 3000

# Health check for container orchestration
HEALTHCHECK --interval=30s --timeout=5s --start-period=10s --retries=3 \
    CMD wget --no-verbose --tries=1 --spider http://localhost:3000/ || exit 1

# Start the standalone Next.js server
CMD ["node", "server.js"]
