export const SITE_URL = "https://uselflabs.com";

export const SITE_NAME = "USelf Labs";

/** The only stacking context on the site is the sticky header. */
export const Z = { nav: 40 } as const;

export const NAV_ROUTES = [
  { key: "home", path: "" },
  { key: "services", path: "/services" },
  { key: "work", path: "/work" },
  { key: "about", path: "/about" },
  { key: "contact", path: "/contact" },
] as const;

/** Linked from the footer only, but still listed in the sitemap. */
export const LEGAL_ROUTES = [
  { key: "privacy", path: "/privacy" },
  { key: "terms", path: "/terms" },
] as const;
