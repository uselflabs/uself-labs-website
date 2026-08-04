import type { Metadata } from "next";
import { isLocale, type Locale } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { absoluteUrl, buildAlternates } from "@/lib/i18n/urls";
import {
  breadcrumbSchema,
  faqSchema,
  serviceSchema,
  webPageSchema,
} from "@/lib/seo/schema";
import { JsonLd } from "@/components/json-ld";
import { PageHeader } from "@/components/sections/page-header";
import { ServicesList } from "@/components/sections/services-list";
import { Faq } from "@/components/sections/faq";
import { CtaBand } from "@/components/sections/cta-band";

const PATH = "/services";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  if (!isLocale(lang)) return {};
  const dictionary = getDictionary(lang);
  return {
    title: dictionary.services.hero.headline,
    description: dictionary.services.hero.intro,
    alternates: {
      canonical: absoluteUrl(lang, PATH),
      languages: buildAlternates(PATH),
    },
  };
}

export default async function ServicesPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (!isLocale(lang)) return null;
  const locale = lang as Locale;
  const dictionary = getDictionary(locale);
  const { services, nav, common } = dictionary;

  return (
    <>
      <JsonLd
        data={webPageSchema(locale, {
          name: services.hero.headline,
          description: services.hero.intro,
          path: PATH,
        })}
      />
      <JsonLd
        data={breadcrumbSchema(locale, [
          { name: nav.home, path: "" },
          { name: nav.services, path: PATH },
        ])}
      />
      {services.list.map((service) => (
        <JsonLd
          key={service.id}
          data={serviceSchema(locale, service)}
        />
      ))}
      <JsonLd data={faqSchema(services.faq.items)} />

      <PageHeader
        headline={services.hero.headline}
        intro={services.hero.intro}
      />
      <ServicesList items={services.list} />
      <Faq faq={services.faq} />
      <CtaBand
        locale={locale}
        headline={services.ctaBand.headline}
        body={services.ctaBand.body}
        cta={common.ctaPrimary}
      />
    </>
  );
}
