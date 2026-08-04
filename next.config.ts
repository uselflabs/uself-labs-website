import type { NextConfig } from "next";

/**
 * All imagery is served from `public/` (app assets in `public/apps`, brand
 * marks in `public/brands`), so no remote image hosts need allow-listing.
 */
const nextConfig: NextConfig = {
  output: "standalone",
};

export default nextConfig;
