import type { Metadata } from "next";
import { isLocale, type Locale } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { absoluteUrl, buildAlternates } from "@/lib/i18n/urls";
import {
  breadcrumbSchema,
  softwareApplicationSchema,
  webPageSchema,
} from "@/lib/seo/schema";
import { JsonLd } from "@/components/json-ld";
import { PageHeader } from "@/components/sections/page-header";
import { AppDetailList } from "@/components/sections/app-detail";
import { CtaBand } from "@/components/sections/cta-band";

const PATH = "/work";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  if (!isLocale(lang)) return {};
  const dictionary = getDictionary(lang);
  return {
    title: dictionary.work.hero.headline,
    description: dictionary.work.hero.intro,
    alternates: {
      canonical: absoluteUrl(lang, PATH),
      languages: buildAlternates(PATH),
    },
  };
}

export default async function WorkPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (!isLocale(lang)) return null;
  const locale = lang as Locale;
  const dictionary = getDictionary(locale);
  const { work, nav, common, home } = dictionary;

  return (
    <>
      <JsonLd
        data={webPageSchema(locale, {
          name: work.hero.headline,
          description: work.hero.intro,
          path: PATH,
        })}
      />
      <JsonLd
        data={breadcrumbSchema(locale, [
          { name: nav.home, path: "" },
          { name: nav.work, path: PATH },
        ])}
      />
      {work.apps.map((app) => (
        <JsonLd key={app.id} data={softwareApplicationSchema(locale, app)} />
      ))}

      <PageHeader headline={work.hero.headline} intro={work.hero.intro} />
      <AppDetailList
        apps={work.apps}
        playLabel={common.playLabel}
        screenshotsLabel={work.screenshotsLabel}
        highlightsLabel={work.highlightsLabel}
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
