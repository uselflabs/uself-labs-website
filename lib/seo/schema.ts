import { SITE_NAME, SITE_URL } from "@/lib/constants";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { getPositioning } from "@/lib/seo/positioning";
import { absoluteUrl } from "@/lib/i18n/urls";
import { APPS_BY_ID, GITHUB_URL, PLAY_DEVELOPER_URL } from "@/lib/apps";
import type { Locale } from "@/lib/i18n/config";
import type { Dictionary } from "@/lib/i18n/dictionaries";

export const ORGANIZATION_ID = `${SITE_URL}/#organization`;
export const WEBSITE_ID = `${SITE_URL}/#website`;

/**
 * Every claim here is verifiable from the linked GitHub profile or Google Play
 * developer page. `foundingDate` and a street address are deliberately absent
 * rather than guessed, since wrong structured data is worse than none.
 */
export function organizationSchema(locale: Locale) {
  const dictionary = getDictionary(locale);
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": ORGANIZATION_ID,
    name: SITE_NAME,
    alternateName: "USelf",
    url: SITE_URL,
    logo: `${SITE_URL}/logo.png`,
    description: getPositioning(locale),
    email: dictionary.footer.email,
    address: {
      "@type": "PostalAddress",
      addressCountry: "VN",
    },
    sameAs: [
      GITHUB_URL,
      PLAY_DEVELOPER_URL,
      "https://puzzena.uselflabs.com/",
    ],
    knowsAbout: [
      "AI coding agents",
      "Model Context Protocol",
      "Backend microservices",
      "Fullstack web development",
      "Mobile apps and games",
      "Developer tooling and automation",
      "Logic puzzles and deductive reasoning algorithms",
    ],
  };
}

export function websiteSchema(locale: Locale) {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": WEBSITE_ID,
    name: SITE_NAME,
    url: SITE_URL,
    inLanguage: ["vi", "en"],
    publisher: { "@id": ORGANIZATION_ID },
  };
}

export function serviceSchema(
  locale: Locale,
  service: { id: string; title: string; description: string },
) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    serviceType: service.title,
    description: service.description,
    provider: { "@id": ORGANIZATION_ID },
    areaServed: "VN",
    url: `${absoluteUrl(locale, "/services")}#${service.id}`,
  };
}

export function faqSchema(items: { question: string; answer: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: { "@type": "Answer", text: item.answer },
    })),
  };
}

export function breadcrumbSchema(
  locale: Locale,
  trail: { name: string; path: string }[],
) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: trail.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: absoluteUrl(locale, item.path),
    })),
  };
}

/**
 * Describes a real app published on Google Play. `url`/`installUrl` point at
 * the live listing so every field here is checkable against the store.
 */
export function softwareApplicationSchema(
  locale: Locale,
  app: Dictionary["work"]["apps"][number],
) {
  const asset = APPS_BY_ID[app.id];
  const isGame = asset.kind === "game";

  const categoryMap: Record<string, string> = {
    puzzena: "PuzzleApplication",
    "dream-courier": "RolePlayingApplication",
    "1000-lives": "SimulationApplication",
    velora: "LifestyleApplication",
  };

  const genreMap: Record<string, string[]> = {
    puzzena: ["Puzzle", "Logic Game", "Brain Teaser", "Picross", "Binairo", "Nonogram"],
    "dream-courier": ["Role Playing", "Idle RPG", "Cozy Game", "Adventure"],
    "1000-lives": ["Simulation", "Card Game", "Life Simulator"],
    velora: ["Lifestyle", "Astrology", "Horoscope", "Tarot"],
  };

  return {
    "@context": "https://schema.org",
    "@type": isGame ? "MobileApplication" : "SoftwareApplication",
    name: app.name,
    description: app.tagline,
    applicationCategory: categoryMap[app.id] || (isGame ? "GameApplication" : "SoftwareApplication"),
    operatingSystem: "Android",
    genre: genreMap[app.id] || (isGame ? ["Game"] : ["Application"]),
    contentRating: "Everyone",
    url: asset.webUrl || asset.playUrl,
    installUrl: asset.playUrl,
    downloadUrl: asset.playUrl,
    sameAs: asset.webUrl ? [asset.playUrl, asset.webUrl] : [asset.playUrl],
    image: `${SITE_URL}${asset.icon.src}`,
    screenshot: asset.screenshots.map((s) => `${SITE_URL}${s.src}`),
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
      availability: "https://schema.org/InStock",
    },
    featureList: app.highlights,
    publisher: { "@id": ORGANIZATION_ID },
    author: { "@id": ORGANIZATION_ID },
    inLanguage: locale,
  };
}

export function webPageSchema(
  locale: Locale,
  page: { name: string; description: string; path: string },
) {
  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: page.name,
    description: page.description,
    url: absoluteUrl(locale, page.path),
    inLanguage: locale,
    isPartOf: { "@id": WEBSITE_ID },
    about: { "@id": ORGANIZATION_ID },
  };
}
