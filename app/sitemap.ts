import type { MetadataRoute } from "next";
import { locales } from "@/lib/i18n/config";
import { absoluteUrl, buildAlternates } from "@/lib/i18n/urls";
import { NAV_ROUTES } from "@/lib/constants";

export default function sitemap(): MetadataRoute.Sitemap {
  // NAV_ROUTES is the single source of truth for which pages exist, so the
  // sitemap can never advertise a route that was removed from the nav.
  return locales.flatMap((locale) =>
    NAV_ROUTES.map((route) => ({
      url: absoluteUrl(locale, route.path),
      alternates: { languages: buildAlternates(route.path) },
    })),
  );
}
