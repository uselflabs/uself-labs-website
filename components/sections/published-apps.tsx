import Image from "next/image";
import Link from "next/link";
import {
  ArrowUpRight,
  GooglePlayLogo,
  Globe,
  Check,
} from "@phosphor-icons/react/dist/ssr";
import type { Locale } from "@/lib/i18n/config";
import type { Dictionary } from "@/lib/i18n/dictionaries";
import { APPS_BY_ID, type PublishedApp } from "@/lib/apps";
import { Reveal } from "@/components/reveal";

type AppDictionary = Dictionary["work"]["apps"][number];

export function PublishedApps({
  locale,
  selectedWork,
  apps,
  playLabel,
  playLabelCompact,
  webLabel,
  webLabelCompact,
  detailsLabel,
}: {
  locale: Locale;
  selectedWork: Dictionary["home"]["selectedWork"];
  apps: Dictionary["work"]["apps"];
  playLabel?: string;
  playLabelCompact?: string;
  webLabel?: string;
  webLabelCompact?: string;
  detailsLabel?: string;
}) {
  if (apps.length === 0) return null;

  const featured = apps[0];
  const featuredAsset = APPS_BY_ID[featured.id];
  const restApps = apps.slice(1);

  const fallbackDetails = locale === "vi" ? "Xem chi tiết" : "View details";
  const resolvedDetails = detailsLabel || fallbackDetails;
  const resolvedPlay = playLabel || "Google Play";
  const resolvedPlayCompact = playLabelCompact || "Google Play";
  const resolvedWeb = webLabel || "Website";
  const resolvedWebCompact = webLabelCompact || "Website";
  const resolvedBadge =
    selectedWork.featuredBadge ||
    (locale === "vi" ? "Mới phát hành" : "New Release");

  return (
    <section className="border-y border-border bg-surface-raised/60">
      <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
        <Reveal>
          <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
            <div>
              <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
                {selectedWork.heading}
              </h2>
              <p className="mt-3 max-w-[60ch] text-base leading-relaxed text-text-muted">
                {selectedWork.lead}
              </p>
            </div>
            <Link
              href={`/${locale}/work`}
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-accent transition-colors hover:text-accent-cyan"
            >
              {selectedWork.viewAll}
              <ArrowUpRight size={16} weight="bold" aria-hidden />
            </Link>
          </div>
        </Reveal>

        {/* Bento Grid Showcase */}
        <div className="mt-12 flex flex-col gap-6">
          {/* Bento Flagship Hero Tile: pulso */}
          {featured && featuredAsset && (
            <Reveal delay={0.05}>
              <FeaturedAppTile
                locale={locale}
                app={featured}
                asset={featuredAsset}
                badge={resolvedBadge}
                playLabel={resolvedPlay}
                webLabel={resolvedWeb}
                detailsLabel={resolvedDetails}
              />
            </Reveal>
          )}

          {/* Remaining Apps in 2x2 Bento Grid */}
          <ul className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {restApps.map((app, index) => {
              const asset = APPS_BY_ID[app.id];
              return (
                <Reveal key={app.id} delay={(index + 1) * 0.07}>
                  <li className="h-full">
                    <SubAppCard
                      locale={locale}
                      app={app}
                      asset={asset}
                      playLabel={resolvedPlay}
                      playLabelCompact={resolvedPlayCompact}
                      webLabel={resolvedWeb}
                      webLabelCompact={resolvedWebCompact}
                      detailsLabel={resolvedDetails}
                    />
                  </li>
                </Reveal>
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
}

function FeaturedAppTile({
  locale,
  app,
  asset,
  badge,
  playLabel,
  webLabel,
  detailsLabel,
}: {
  locale: Locale;
  app: AppDictionary;
  asset: PublishedApp;
  badge: string;
  playLabel: string;
  webLabel: string;
  detailsLabel: string;
}) {
  return (
    <div className="card-hover-glow group relative overflow-hidden rounded-2xl border border-amber-500/30 bg-surface/90 p-6 backdrop-blur transition-all hover:border-amber-400/60 hover:shadow-2xl hover:shadow-amber-950/20 sm:p-8">
      <div
        aria-hidden
        className="absolute -right-16 -top-16 h-64 w-64 rounded-full bg-amber-500/10 blur-3xl"
      />

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1.15fr_1fr] lg:items-center">
        {/* Media banner */}
        <Link
          href={`/${locale}/work#${app.id}`}
          aria-label={`${app.name} - ${detailsLabel}`}
          className="relative block aspect-[16/9] w-full overflow-hidden rounded-xl border border-border-strong bg-surface-raised shadow-md"
        >
          <Image
            src={asset.feature.src}
            alt={app.name}
            fill
            priority
            sizes="(min-width: 1024px) 50vw, 100vw"
            className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-surface/80 via-transparent to-transparent" />
          <span className="absolute left-3 top-3 rounded-full border border-amber-500/40 bg-surface/90 px-3 py-1 text-xs font-semibold text-amber-300 backdrop-blur">
            {badge}
          </span>
          <span className="absolute bottom-3 right-3 rounded-full border border-border bg-surface/85 px-2.5 py-0.5 text-xs font-medium text-text-muted backdrop-blur">
            {app.category}
          </span>
        </Link>

        {/* App info & Direct actions */}
        <div className="flex h-full flex-col justify-between">
          <div>
            <div className="flex items-center gap-4">
              <Image
                src={asset.icon.src}
                alt=""
                width={56}
                height={56}
                priority
                className="h-14 w-14 shrink-0 rounded-[22%] border border-amber-500/40 shadow-lg shadow-black/40"
              />
              <div className="min-w-0">
                <Link
                  href={`/${locale}/work#${app.id}`}
                  className="block focus-visible:outline-none"
                >
                  <h3 className="truncate text-xl font-bold tracking-tight text-text-primary transition-colors group-hover:text-amber-300">
                    {app.name}
                  </h3>
                </Link>
                <p className="truncate font-mono text-xs text-text-muted">
                  {asset.packageName}
                </p>
              </div>
            </div>

            <p className="mt-4 text-sm font-medium leading-relaxed text-text-primary">
              {app.tagline}
            </p>
            <p className="mt-2 text-xs leading-relaxed text-text-muted">
              {app.description}
            </p>

            {/* Highlights */}
            <ul className="mt-4 flex flex-col gap-2">
              {app.highlights.slice(0, 3).map((hl) => (
                <li
                  key={hl}
                  className="flex items-center gap-2 text-xs text-text-muted"
                >
                  <Check
                    size={14}
                    weight="bold"
                    className="shrink-0 text-amber-400"
                    aria-hidden
                  />
                  <span>{hl}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Direct Store Action Bar */}
          <div className="mt-6 flex flex-wrap items-center gap-3 border-t border-border/70 pt-5">
            <a
              href={asset.playUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${playLabel}: ${app.name}`}
              className="btn-tactile inline-flex items-center gap-2 rounded-full bg-accent-solid px-4 py-2 text-xs font-semibold text-text-primary shadow-md shadow-accent/20 transition-all hover:bg-accent-solid-hover"
            >
              <GooglePlayLogo size={16} weight="regular" aria-hidden />
              <span>{playLabel}</span>
            </a>

            {asset.webUrl && (
              <a
                href={asset.webUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${webLabel}: ${app.name}`}
                className="btn-tactile inline-flex items-center gap-1.5 rounded-full border border-border-strong bg-surface-card px-3.5 py-2 text-xs font-semibold text-text-primary transition-all hover:border-amber-400 hover:text-amber-300"
              >
                <Globe size={15} weight="regular" aria-hidden />
                <span>{webLabel}</span>
              </a>
            )}

            <Link
              href={`/${locale}/work#${app.id}`}
              className="ml-auto inline-flex items-center gap-1 text-xs font-semibold text-text-muted transition-colors hover:text-accent-cyan"
            >
              <span>{detailsLabel}</span>
              <ArrowUpRight size={14} weight="bold" aria-hidden />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

function SubAppCard({
  locale,
  app,
  asset,
  playLabel,
  playLabelCompact,
  webLabel,
  webLabelCompact,
  detailsLabel,
}: {
  locale: Locale;
  app: AppDictionary;
  asset: PublishedApp;
  playLabel: string;
  playLabelCompact: string;
  webLabel: string;
  webLabelCompact: string;
  detailsLabel: string;
}) {
  return (
    <div className="card-hover-glow group flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-surface/90 transition-all hover:border-border-strong hover:bg-surface-card">
      {/* Feature Image Banner */}
      <Link
        href={`/${locale}/work#${app.id}`}
        aria-label={`${app.name} - ${detailsLabel}`}
        className="relative block aspect-[16/8] overflow-hidden bg-surface-raised"
      >
        <Image
          src={asset.feature.src}
          alt={app.name}
          fill
          sizes="(min-width: 768px) 50vw, 100vw"
          className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-surface via-transparent to-transparent opacity-80" />
        <span className="absolute bottom-3 right-3 rounded-full border border-border bg-surface/85 px-2.5 py-0.5 text-xs font-medium text-text-muted backdrop-blur">
          {app.category}
        </span>
      </Link>

      {/* Content */}
      <div className="flex flex-1 flex-col p-6">
        <div className="flex items-center gap-3.5">
          <Image
            src={asset.icon.src}
            alt=""
            width={48}
            height={48}
            className="h-12 w-12 shrink-0 rounded-[22%] border border-border shadow-md"
          />
          <div className="min-w-0">
            <Link
              href={`/${locale}/work#${app.id}`}
              className="block focus-visible:outline-none"
            >
              <h3 className="truncate text-base font-semibold text-text-primary transition-colors group-hover:text-accent-cyan">
                {app.name}
              </h3>
            </Link>
            <p className="truncate font-mono text-xs text-text-muted">
              {asset.packageName}
            </p>
          </div>
        </div>

        <p className="mt-4 text-sm leading-relaxed text-text-muted">
          {app.tagline}
        </p>

        {/* Direct Store Actions Footer */}
        <div className="mt-auto flex items-center justify-between border-t border-border/70 pt-4">
          <div className="flex items-center gap-2">
            <a
              href={asset.playUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${playLabel}: ${app.name}`}
              className="btn-tactile inline-flex items-center gap-1.5 rounded-full border border-border-strong bg-surface-raised/80 px-3 py-1.5 text-xs font-medium text-text-primary transition-all hover:border-accent hover:text-accent-cyan"
            >
              <GooglePlayLogo size={14} weight="regular" aria-hidden />
              <span>{playLabelCompact}</span>
            </a>

            {asset.webUrl && (
              <a
                href={asset.webUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${webLabel}: ${app.name}`}
                className="btn-tactile inline-flex items-center gap-1 rounded-full border border-border-strong bg-surface-raised/80 px-2.5 py-1.5 text-xs font-medium text-text-primary transition-all hover:border-accent hover:text-accent-cyan"
              >
                <Globe size={14} weight="regular" aria-hidden />
                <span>{webLabelCompact}</span>
              </a>
            )}
          </div>

          <Link
            href={`/${locale}/work#${app.id}`}
            className="inline-flex items-center gap-1 text-xs font-semibold text-text-muted transition-colors hover:text-accent"
          >
            <span>{detailsLabel}</span>
            <ArrowUpRight size={14} weight="bold" aria-hidden />
          </Link>
        </div>
      </div>
    </div>
  );
}

