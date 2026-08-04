import type { Metadata } from "next";
import { isLocale, type Locale } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { absoluteUrl, buildAlternates } from "@/lib/i18n/urls";
import { breadcrumbSchema, webPageSchema } from "@/lib/seo/schema";
import { JsonLd } from "@/components/json-ld";
import { PageHeader } from "@/components/sections/page-header";
import { AboutStory } from "@/components/sections/about-story";
import { AboutValues } from "@/components/sections/about-values";
import { CtaBand } from "@/components/sections/cta-band";

const PATH = "/about";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  if (!isLocale(lang)) return {};
  const dictionary = getDictionary(lang);
  return {
    title: dictionary.about.hero.headline,
    description: dictionary.about.hero.intro,
    alternates: {
      canonical: absoluteUrl(lang, PATH),
      languages: buildAlternates(PATH),
    },
  };
}

export default async function AboutPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (!isLocale(lang)) return null;
  const locale = lang as Locale;
  const dictionary = getDictionary(locale);
  const { about, nav, common, home } = dictionary;

  return (
    <>
      <JsonLd
        data={webPageSchema(locale, {
          name: about.hero.headline,
          description: about.hero.intro,
          path: PATH,
        })}
      />
      <JsonLd
        data={breadcrumbSchema(locale, [
          { name: nav.home, path: "" },
          { name: nav.about, path: PATH },
        ])}
      />

      <PageHeader headline={about.hero.headline} intro={about.hero.intro} />
      <AboutStory story={about.story} />
      <AboutValues values={about.values} />
      <CtaBand
        locale={locale}
        headline={home.ctaBand.headline}
        body={home.ctaBand.body}
        cta={common.ctaPrimary}
      />
    </>
  );
}
