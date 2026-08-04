import { SITE_URL } from "@/lib/constants";
import { locales, type Locale } from "./config";

/**
 * `path` is the part after the locale segment, e.g. "/services" or "" for home.
 */
export function absoluteUrl(locale: Locale, path: string = ""): string {
  return `${SITE_URL}/${locale}${path}`;
}

export function buildAlternates(path: string = "") {
  const languages: Record<string, string> = {};
  for (const locale of locales) {
    languages[locale] = absoluteUrl(locale, path);
  }
  // English is the broadest-reach fallback for readers with no matching locale.
  languages["x-default"] = absoluteUrl("en", path);
  return languages;
}

export function localeToOgLocale(locale: Locale): string {
  return locale === "vi" ? "vi_VN" : "en_US";
}

export function otherLocale(locale: Locale): Locale {
  return locale === "vi" ? "en" : "vi";
}

/**
 * Given a pathname like "/vi/services", return "/en/services" (used by the lang toggle).
 */
export function swapLocaleInPathname(pathname: string, target: Locale): string {
  const segments = pathname.split("/");
  segments[1] = target;
  return segments.join("/") || `/${target}`;
}
