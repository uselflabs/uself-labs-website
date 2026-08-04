import type { Metadata } from "next";
import { isLocale, type Locale } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { getPositioning } from "@/lib/seo/positioning";
import { absoluteUrl, buildAlternates } from "@/lib/i18n/urls";
import { webPageSchema } from "@/lib/seo/schema";
import { JsonLd } from "@/components/json-ld";
import { Hero } from "@/components/sections/hero";
import { TechStackStrip } from "@/components/sections/tech-stack-strip";
import { Domains } from "@/components/sections/domains";
import { PublishedApps } from "@/components/sections/published-apps";
import { CtaBand } from "@/components/sections/cta-band";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  if (!isLocale(lang)) return {};
  return {
    description: getPositioning(lang),
    alternates: {
      canonical: absoluteUrl(lang),
      languages: buildAlternates(),
    },
  };
}

export default async function HomePage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (!isLocale(lang)) return null;
  const locale = lang as Locale;
  const dictionary = getDictionary(locale);
  const { home, common, work } = dictionary;

  return (
    <>
      <JsonLd
        data={webPageSchema(locale, {
          name: dictionary.meta.defaultTitle,
          description: getPositioning(locale),
          path: "",
        })}
      />
      <Hero
        locale={locale}
        hero={home.hero}
        subtext={getPositioning(locale)}
        ctaPrimary={common.ctaPrimary}
        ctaSecondary={common.ctaSecondary}
        apps={work.apps}
      />
      <TechStackStrip stack={home.stack} />
      <Domains domains={home.domains} />
      <PublishedApps
        locale={locale}
        selectedWork={home.selectedWork}
        apps={work.apps}
      />
      <CtaBand
        locale={locale}
        headline={home.ctaBand.headline}
        body={home.ctaBand.body}
        cta={common.ctaPrimary}
      />
    </>
  );
}
