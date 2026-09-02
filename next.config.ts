import type { NextConfig } from "next";

/**
 * All imagery is served from `public/` (app assets in `public/apps`, brand
 * marks in `public/brands`), so no remote image hosts need allow-listing.
 */
const nextConfig: NextConfig = {
  output: "standalone",

  /**
   * No runtime image optimization. Every file in `public/` is already WebP/PNG
   * pre-resized to the size it actually renders at (see `lib/apps.ts`), so the
   * only thing `/_next/image` added was a sharp decode -> resize -> re-encode
   * per request.
   *
   * That mattered on the home server: assets are referenced by string path,
   * not static import, so nothing was content-hashed and Cloudflare skips
   * query-string URLs like `/_next/image?url=...` by default. Every crawler
   * hitting /work fired ~25 parallel multi-megapixel transforms straight at
   * the origin, and the on-disk cache under `.next/cache/images` is wiped on
   * every container restart. Serving the files directly makes them match
   * Caddy's `@publicAssets` rule instead (max-age=604800).
   *
   * Trade-off: no per-viewport srcset. Keep `public/` assets sized for their
   * largest render (3x DPI) and re-run the resize when replacing one.
   */
  images: { unoptimized: true },

  /**
   * Version-skew protection. The home server pulls `:latest` on a 5-minute
   * cron, so a tab left open across a deploy would otherwise call a Server
   * Action ID the new build no longer knows about. With an id baked in per
   * build (git SHA, passed as the `NEXT_DEPLOYMENT_ID` build-arg), Next sends
   * `x-nextjs-deployment-id` on responses and the client hard-navigates on a
   * mismatch instead of erroring.
   */
  deploymentId: process.env.NEXT_DEPLOYMENT_ID,
};

export default nextConfig;
