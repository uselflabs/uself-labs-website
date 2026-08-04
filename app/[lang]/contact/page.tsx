import type { Metadata } from "next";
import { isLocale, type Locale } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { absoluteUrl, buildAlternates } from "@/lib/i18n/urls";
import { breadcrumbSchema, webPageSchema } from "@/lib/seo/schema";
import { JsonLd } from "@/components/json-ld";
import { PageHeader } from "@/components/sections/page-header";
import { ContactForm } from "@/components/sections/contact-form";
import { ContactInfo } from "@/components/sections/contact-info";

const PATH = "/contact";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  if (!isLocale(lang)) return {};
  const dictionary = getDictionary(lang);
  return {
    title: dictionary.contact.hero.headline,
    description: dictionary.contact.hero.intro,
    alternates: {
      canonical: absoluteUrl(lang, PATH),
      languages: buildAlternates(PATH),
    },
  };
}

export default async function ContactPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (!isLocale(lang)) return null;
  const locale = lang as Locale;
  const dictionary = getDictionary(locale);
  const { contact, nav } = dictionary;

  return (
    <>
      <JsonLd
        data={webPageSchema(locale, {
          name: contact.hero.headline,
          description: contact.hero.intro,
          path: PATH,
        })}
      />
      <JsonLd
        data={breadcrumbSchema(locale, [
          { name: nav.home, path: "" },
          { name: nav.contact, path: PATH },
        ])}
      />

      <PageHeader headline={contact.hero.headline} intro={contact.hero.intro} />

      <section className="mx-auto max-w-5xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-[1.3fr_1fr]">
          <ContactForm locale={locale} form={contact.form} />
          <ContactInfo info={contact.info} />
        </div>
      </section>
    </>
  );
}
