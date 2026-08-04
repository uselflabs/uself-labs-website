import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "@phosphor-icons/react/dist/ssr";
import type { Locale } from "@/lib/i18n/config";
import type { Dictionary } from "@/lib/i18n/dictionaries";
import { APPS_BY_ID } from "@/lib/apps";
import { Reveal } from "@/components/reveal";

export function Hero({
  locale,
  hero,
  subtext,
  ctaPrimary,
  ctaSecondary,
  apps,
}: {
  locale: Locale;
  hero: Dictionary["home"]["hero"];
  subtext: string;
  ctaPrimary: string;
  ctaSecondary: string;
  apps: Dictionary["work"]["apps"];
}) {
  return (
    <section className="relative overflow-hidden">
      <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-14 px-4 pb-20 pt-14 sm:px-6 lg:grid-cols-[1fr_0.85fr] lg:gap-16 lg:pb-24 lg:pt-20 xl:px-8">
        <Reveal>
          <h1 className="text-4xl font-semibold tracking-tight text-balance sm:text-5xl lg:text-[3.4rem] lg:leading-[1.05]">
            {hero.headline}
          </h1>
          <p className="mt-6 max-w-[46ch] text-base leading-relaxed text-text-muted">
            {subtext}
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-4">
            <Link
              href={`/${locale}/contact`}
              className="inline-flex items-center gap-2 rounded-full bg-accent-solid px-5 py-3 text-sm font-semibold text-text-primary transition-colors hover:bg-accent-solid-hover active:scale-[0.98]"
            >
              {ctaPrimary}
              <ArrowRight size={16} weight="bold" aria-hidden />
            </Link>
            <Link
              href={`/${locale}/work`}
              className="inline-flex items-center gap-2 rounded-full border border-border-strong px-5 py-3 text-sm font-semibold text-text-primary transition-colors hover:border-accent hover:text-accent active:scale-[0.98]"
            >
              {ctaSecondary}
            </Link>
          </div>
        </Reveal>

        {/*
          App icons rather than screenshots: at this size a screenshot is
          unreadable and reads as decoration, while an icon is designed to be
          recognisable small. Marks and names only, so this stays visibly
          distinct from the product cards further down the page.
        */}
        <Reveal delay={0.12}>
          <div className="relative">
            <div
              aria-hidden
              className="absolute inset-x-0 inset-y-2 rounded-[40px] opacity-25 blur-3xl"
              style={{
                background:
                  "linear-gradient(135deg, var(--accent-cyan), var(--accent) 55%, var(--accent-solid-hover))",
              }}
            />
            <ul
              aria-label={hero.appsLabel}
              className="relative grid grid-cols-3 gap-4 sm:gap-6"
            >
              {apps.map((app, index) => {
                const asset = APPS_BY_ID[app.id];
                return (
                  <li key={app.id} className="flex flex-col items-center gap-3">
                    <Image
                      src={asset.icon.src}
                      alt=""
                      width={asset.icon.width}
                      height={asset.icon.height}
                      priority
                      sizes="(min-width: 1024px) 150px, 28vw"
                      className="aspect-square w-full rounded-[22%] border border-border-strong shadow-xl shadow-black/40"
                    />
                    <p className="text-center text-xs font-medium leading-snug text-text-muted">
                      {app.name.split(":")[0]}
                    </p>
                  </li>
                );
              })}
            </ul>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
