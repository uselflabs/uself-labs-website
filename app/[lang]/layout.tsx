import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { notFound } from "next/navigation";
import "../globals.css";
import { locales, isLocale, type Locale } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { getPositioning } from "@/lib/seo/positioning";
import { absoluteUrl, buildAlternates, localeToOgLocale, otherLocale } from "@/lib/i18n/urls";
import { SITE_NAME, SITE_URL } from "@/lib/constants";
import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";
import { JsonLd } from "@/components/json-ld";
import { organizationSchema, websiteSchema } from "@/lib/seo/schema";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin", "vietnamese"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin", "vietnamese"],
});

export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  if (!isLocale(lang)) return {};

  const description = getPositioning(lang);
  const dictionary = getDictionary(lang);

  return {
    metadataBase: new URL(SITE_URL),
    title: {
      default: dictionary.meta.defaultTitle,
      template: dictionary.meta.titleTemplate,
    },
    description,
    applicationName: SITE_NAME,
    authors: [{ name: SITE_NAME, url: SITE_URL }],
    keywords: [
      "AI coding agents",
      "Model Context Protocol",
      "Backend microservices",
      "Fullstack web development",
      "Mobile games",
      "Puzzena logic puzzles",
      "Binary puzzle",
      "Tents and trees",
      "Shikaku",
      "Nonogram picross",
      "USelf Labs",
      "Software lab Vietnam",
    ],
    alternates: {
      canonical: absoluteUrl(lang),
      languages: buildAlternates(),
    },
    openGraph: {
      title: dictionary.meta.defaultTitle,
      description,
      url: absoluteUrl(lang),
      siteName: SITE_NAME,
      locale: localeToOgLocale(lang),
      alternateLocale: localeToOgLocale(otherLocale(lang)),
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: dictionary.meta.defaultTitle,
      description,
    },
  };
}

/** Matches --surface so mobile browser chrome blends with the page. */
export const viewport: Viewport = {
  themeColor: "#06060f",
  colorScheme: "dark",
};

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();

  const dictionary = getDictionary(lang);

  return (
    <html
      lang={lang}
      className={`${geistSans.variable} ${geistMono.variable} antialiased`}
    >
      <body className="flex min-h-[100dvh] flex-col bg-surface text-text-primary">
        <JsonLd data={organizationSchema(lang)} />
        <JsonLd data={websiteSchema(lang)} />
        <a
          href="#main"
          className="sr-only focus-visible:not-sr-only focus-visible:fixed focus-visible:left-4 focus-visible:top-4 focus-visible:z-50 focus-visible:rounded-full focus-visible:bg-accent-solid focus-visible:px-4 focus-visible:py-2 focus-visible:text-sm focus-visible:font-semibold focus-visible:text-text-primary"
        >
          {dictionary.a11y.skipToContent}
        </a>
        <Nav locale={lang} dictionary={dictionary} />
        <main id="main" className="flex-1">
          {children}
        </main>
        <Footer locale={lang} dictionary={dictionary} />
      </body>
    </html>
  );
}
