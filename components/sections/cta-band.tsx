import Link from "next/link";
import { ArrowRight } from "@phosphor-icons/react/dist/ssr";
import type { Locale } from "@/lib/i18n/config";
import { Reveal } from "@/components/reveal";

export function CtaBand({
  locale,
  headline,
  body,
  cta,
}: {
  locale: Locale;
  headline: string;
  body: string;
  cta: string;
}) {
  return (
    <section
      className="relative overflow-hidden border-t border-border"
      style={{
        background:
          "linear-gradient(135deg, color-mix(in srgb, var(--accent-cyan) 16%, var(--surface)), var(--surface) 45%, color-mix(in srgb, var(--accent-solid) 22%, var(--surface)))",
      }}
    >
      <div className="mx-auto max-w-3xl px-4 py-20 text-center sm:px-6 lg:py-28">
        <Reveal>
          <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
            {headline}
          </h2>
          <p className="mx-auto mt-4 max-w-[52ch] text-base leading-relaxed text-text-muted">
            {body}
          </p>
          <Link
            href={`/${locale}/contact`}
            className="btn-tactile mt-8 inline-flex items-center gap-2 rounded-full bg-accent-solid px-6 py-3 text-sm font-semibold text-text-primary shadow-lg shadow-accent/25 transition-all hover:bg-accent-solid-hover"
          >
            {cta}
            <ArrowRight size={16} weight="bold" aria-hidden />
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
