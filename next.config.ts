import type { NextConfig } from "next";

/**
 * All imagery is served from `public/` (app assets in `public/apps`, brand
 * marks in `public/brands`), so no remote image hosts need allow-listing.
 */
const nextConfig: NextConfig = {
  output: "standalone",

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
