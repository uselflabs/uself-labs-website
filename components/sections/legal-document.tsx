import type { Locale } from "@/lib/i18n/config";
import type { Dictionary } from "@/lib/i18n/dictionaries";

type LegalDoc = Dictionary["legal"]["privacy"];

/**
 * Shared layout for the Privacy Policy and Terms of Service. Long-form text,
 * so it skips the Reveal animation and keeps a narrow reading measure.
 */
export function LegalDocument({
  locale,
  doc,
  lastUpdatedLabel,
  tocLabel,
}: {
  locale: Locale;
  doc: LegalDoc;
  lastUpdatedLabel: string;
  tocLabel: string;
}) {
  const updated = new Intl.DateTimeFormat(locale === "vi" ? "vi-VN" : "en-US", {
    dateStyle: "long",
    timeZone: "UTC",
  }).format(new Date(doc.lastUpdated));

  return (
    <>
      <section className="border-b border-border">
        <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
          <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">
            {doc.title}
          </h1>
          <p className="mt-5 max-w-[60ch] text-lg leading-relaxed text-text-muted">
            {doc.intro}
          </p>
          <p className="mt-6 text-sm text-text-faint">
            {lastUpdatedLabel}:{" "}
            <time dateTime={doc.lastUpdated}>{updated}</time>
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
        <nav
          aria-label={tocLabel}
          className="rounded-[var(--radius-lg)] border border-border bg-surface-raised p-6"
        >
          <h2 className="text-sm font-semibold text-text-primary">{tocLabel}</h2>
          <ol className="mt-4 grid list-decimal gap-2 pl-5 text-sm text-text-muted marker:text-text-faint sm:grid-cols-2">
            {doc.sections.map((section) => (
              <li key={section.id}>
                <a
                  href={`#${section.id}`}
                  className="transition-colors hover:text-text-primary"
                >
                  {section.heading}
                </a>
              </li>
            ))}
          </ol>
        </nav>

        <div className="mt-12 flex flex-col gap-10">
          {doc.sections.map((section, index) => (
            <section key={section.id} id={section.id}>
              <h2 className="text-xl font-semibold tracking-tight">
                <span className="mr-2 font-mono text-text-faint">
                  {index + 1}.
                </span>
                {section.heading}
              </h2>
              {section.paragraphs?.map((paragraph) => (
                <p
                  key={paragraph}
                  className="mt-4 leading-relaxed text-text-muted"
                >
                  {paragraph}
                </p>
              ))}
              {section.items && (
                <ul className="mt-4 flex list-disc flex-col gap-2 pl-5 leading-relaxed text-text-muted marker:text-accent">
                  {section.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              )}
            </section>
          ))}
        </div>
      </div>
    </>
  );
}
