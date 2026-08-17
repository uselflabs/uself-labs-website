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
      <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-12 px-4 pb-20 pt-12 sm:px-6 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16 lg:pb-28 lg:pt-16 xl:px-8">
        <Reveal>
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-border-strong bg-surface-raised/80 px-3.5 py-1 text-xs font-medium text-text-muted backdrop-blur">
            <span className="h-1.5 w-1.5 rounded-full bg-accent-cyan" aria-hidden />
            <span>AI Systems & Independent Products</span>
          </div>

          <h1 className="text-4xl font-semibold tracking-tight text-balance sm:text-5xl lg:text-[3.3rem] lg:leading-[1.08]">
            {hero.headline}
          </h1>
          <p className="mt-6 max-w-[48ch] text-base leading-relaxed text-text-muted">
            {subtext}
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-4">
            <Link
              href={`/${locale}/contact`}
              className="btn-tactile inline-flex items-center gap-2 rounded-full bg-accent-solid px-6 py-3 text-sm font-semibold text-text-primary shadow-lg shadow-accent/20 transition-all hover:bg-accent-solid-hover"
            >
              {ctaPrimary}
              <ArrowRight size={16} weight="bold" aria-hidden />
            </Link>
            <Link
              href={`/${locale}/work`}
              className="btn-tactile inline-flex items-center gap-2 rounded-full border border-border-strong bg-surface-raised/50 px-6 py-3 text-sm font-semibold text-text-primary backdrop-blur transition-all hover:border-accent hover:text-accent"
            >
              {ctaSecondary}
            </Link>
          </div>
        </Reveal>

        {/* 4 published apps in a 2x2 interactive constellation grid */}
        <Reveal delay={0.12}>
          <div className="relative">
            <div
              aria-hidden
              className="absolute -inset-4 rounded-[32px] opacity-20 blur-3xl"
              style={{
                background:
                  "radial-gradient(circle at center, var(--accent-cyan), var(--accent) 50%, transparent 80%)",
              }}
            />
            <div className="relative rounded-2xl border border-border-strong bg-surface-raised/70 p-4 backdrop-blur-xl sm:p-6">
              <div className="mb-4 flex items-center justify-between border-b border-border/80 pb-3">
                <span className="text-xs font-semibold uppercase tracking-wider text-text-muted">
                  {hero.appsLabel}
                </span>
                <span className="rounded-full bg-accent/15 px-2.5 py-0.5 text-[11px] font-medium text-accent-cyan">
                  4 Live Products
                </span>
              </div>

              <ul className="grid grid-cols-2 gap-3 sm:gap-4">
                {apps.map((app) => {
                  const asset = APPS_BY_ID[app.id];
                  return (
                    <li key={app.id}>
                      <Link
                        href={`/${locale}/work#${app.id}`}
                        className="group flex items-center gap-3 rounded-xl border border-border bg-surface/80 p-3 transition-all hover:border-border-strong hover:bg-surface-card hover:shadow-md"
                      >
                        <Image
                          src={asset.icon.src}
                          alt=""
                          width={asset.icon.width}
                          height={asset.icon.height}
                          priority
                          sizes="56px"
                          className="h-12 w-12 shrink-0 rounded-[22%] border border-border-strong shadow-md transition-transform duration-300 group-hover:scale-105"
                        />
                        <div className="min-w-0">
                          <p className="truncate text-xs font-semibold text-text-primary group-hover:text-accent-cyan transition-colors">
                            {app.name.split(":")[0]}
                          </p>
                          <p className="truncate text-[11px] text-text-muted">
                            {app.category}
                          </p>
                        </div>
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
