import type { Metadata } from "next";
import { isLocale, type Locale } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { absoluteUrl, buildAlternates } from "@/lib/i18n/urls";
import { breadcrumbSchema, webPageSchema } from "@/lib/seo/schema";
import { JsonLd } from "@/components/json-ld";
import { LegalDocument } from "@/components/sections/legal-document";

const PATH = "/terms";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  if (!isLocale(lang)) return {};
  const { terms } = getDictionary(lang).legal;
  return {
    title: terms.title,
    description: terms.intro,
    alternates: {
      canonical: absoluteUrl(lang, PATH),
      languages: buildAlternates(PATH),
    },
  };
}

export default async function TermsPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (!isLocale(lang)) return null;
  const locale = lang as Locale;
  const { legal, nav } = getDictionary(locale);
  const doc = legal.terms;

  return (
    <>
      <JsonLd
        data={webPageSchema(locale, {
          name: doc.title,
          description: doc.intro,
          path: PATH,
        })}
      />
      <JsonLd
        data={breadcrumbSchema(locale, [
          { name: nav.home, path: "" },
          { name: doc.title, path: PATH },
        ])}
      />

      <LegalDocument
        locale={locale}
        doc={doc}
        lastUpdatedLabel={legal.lastUpdatedLabel}
        tocLabel={legal.tocLabel}
      />
    </>
  );
}
