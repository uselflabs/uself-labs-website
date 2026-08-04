import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/constants";

/**
 * AI crawlers are allowed on purpose so agents (ChatGPT, Claude, Perplexity,
 * Google AI Overviews) can read and cite this site correctly. See
 * lib/seo/schema.ts and app/llms.txt for the rest of the AEO setup.
 */
export default function robots(): MetadataRoute.Robots {
  const aiAgents = [
    "GPTBot",
    "OAI-SearchBot",
    "ChatGPT-User",
    "ClaudeBot",
    "Claude-User",
    "anthropic-ai",
    "PerplexityBot",
    "Google-Extended",
    "Applebot-Extended",
    "Bingbot",
    "CCBot",
  ];

  return {
    rules: [
      { userAgent: "*", allow: "/" },
      ...aiAgents.map((userAgent) => ({ userAgent, allow: "/" })),
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
