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
