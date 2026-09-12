import Image from "next/image";
import { GooglePlayLogo, Check, Globe } from "@phosphor-icons/react/dist/ssr";
import type { Dictionary } from "@/lib/i18n/dictionaries";
import { APPS_BY_ID } from "@/lib/apps";
import { Reveal } from "@/components/reveal";

type App = Dictionary["work"]["apps"][number];

export function AppDetailList({
  apps,
  playLabel,
  webLabel,
  screenshotsLabel,
  highlightsLabel,
}: {
  apps: App[];
  playLabel: string;
  webLabel?: string;
  screenshotsLabel: string;
  highlightsLabel: string;
}) {
  return (
    <div>
      {/* Bento Quick-Navigation Shelf */}
      <section className="border-b border-border bg-surface-raised/40 py-6 backdrop-blur">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-3 lg:grid-cols-5">
            {apps.map((app) => {
              const asset = APPS_BY_ID[app.id];
              const isPulso = app.id === "pulso";
              return (
                <a
                  key={app.id}
                  href={`#${app.id}`}
                  className={`btn-tactile group flex items-center gap-3 rounded-xl border p-2.5 transition-all ${
                    isPulso
                      ? "border-amber-500/40 bg-surface-card/90 hover:border-amber-400 hover:shadow-md hover:shadow-amber-950/20"
                      : "border-border bg-surface/70 hover:border-border-strong hover:bg-surface-card"
                  }`}
                >
                  <Image
                    src={asset.icon.src}
                    alt=""
                    width={asset.icon.width}
                    height={asset.icon.height}
                    sizes="40px"
                    className={`h-10 w-10 shrink-0 rounded-[22%] border shadow-sm transition-transform duration-300 group-hover:scale-105 ${
                      isPulso ? "border-amber-500/50" : "border-border"
                    }`}
                  />
                  <div className="min-w-0">
                    <div className="flex items-center gap-1.5">
                      <p
                        className={`truncate text-xs font-semibold transition-colors ${
                          isPulso
                            ? "text-text-primary group-hover:text-amber-300"
                            : "text-text-primary group-hover:text-accent-cyan"
                        }`}
                      >
                        {app.name.split(":")[0]}
                      </p>
                      {isPulso && (
                        <span className="shrink-0 rounded bg-amber-500/20 px-1 py-0.5 text-[9px] font-bold text-amber-300">
                          NEW
                        </span>
                      )}
                    </div>
                    <p className="truncate text-[11px] text-text-muted">
                      {app.category}
                    </p>
                  </div>
                </a>
              );
            })}
          </div>
        </div>
      </section>

      {/* App Details List */}
      <div className="divide-y divide-border">
        {apps.map((app, index) => (
          <AppDetail
            key={app.id}
            app={app}
            eager={index === 0}
            playLabel={playLabel}
            webLabel={webLabel}
            screenshotsLabel={screenshotsLabel}
            highlightsLabel={highlightsLabel}
          />
        ))}
      </div>
    </div>
  );
}

function AppDetail({
  app,
  eager,
  playLabel,
  webLabel,
  screenshotsLabel,
  highlightsLabel,
}: {
  app: App;
  eager: boolean;
  playLabel: string;
  webLabel?: string;
  screenshotsLabel: string;
  highlightsLabel: string;
}) {
  const asset = APPS_BY_ID[app.id];
  const isPulso = app.id === "pulso";

  return (
    <section id={app.id} className="scroll-mt-24">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
        <Reveal>
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-[1fr_1.15fr] lg:gap-16">
            <div>
              <div className="flex items-center gap-4">
                <Image
                  src={asset.icon.src}
                  alt=""
                  width={64}
                  height={64}
                  priority={eager}
                  className={`h-16 w-16 shrink-0 rounded-[22%] border shadow-lg shadow-black/40 ${
                    isPulso ? "border-amber-500/50" : "border-border"
                  }`}
                />
                <div>
                  <div className="flex items-center gap-2">
                    <span
                      className={`rounded-full px-2.5 py-0.5 text-xs font-semibold ${
                        isPulso
                          ? "border border-amber-500/30 bg-amber-500/15 text-amber-300"
                          : "bg-accent/15 text-accent-cyan"
                      }`}
                    >
                      {app.category}
                    </span>
                    {isPulso && (
                      <span className="rounded-full border border-amber-500/40 bg-amber-500/20 px-2 py-0.5 text-[10px] font-bold text-amber-300">
                        NEW RELEASE
                      </span>
                    )}
                  </div>
                  <h2 className="mt-1.5 text-2xl font-bold tracking-tight text-text-primary">
                    {app.name}
                  </h2>
                </div>
              </div>

              <p className="mt-6 max-w-[56ch] text-base font-medium leading-relaxed text-text-primary">
                {app.tagline}
              </p>
              <p className="mt-4 max-w-[62ch] text-sm leading-relaxed text-text-muted">
                {app.description}
              </p>

              <h3 className="mt-8 text-sm font-semibold text-text-primary">
                {highlightsLabel}
              </h3>
              <ul className="mt-3 flex flex-col gap-2.5">
                {app.highlights.map((highlight) => (
                  <li
                    key={highlight}
                    className="flex gap-2.5 text-sm leading-relaxed text-text-muted"
                  >
                    <Check
                      size={16}
                      weight="bold"
                      className={`mt-0.5 shrink-0 ${
                        isPulso ? "text-amber-400" : "text-accent-cyan"
                      }`}
                      aria-hidden
                    />
                    <span>{highlight}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-8 flex flex-wrap items-center gap-3.5">
                <a
                  href={asset.playUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-tactile inline-flex items-center gap-2 rounded-full bg-accent-solid px-5 py-2.5 text-sm font-semibold text-text-primary shadow-md shadow-accent/20 transition-all hover:bg-accent-solid-hover"
                >
                  <GooglePlayLogo size={18} weight="regular" aria-hidden />
                  <span>{playLabel}</span>
                </a>

                {asset.webUrl && (
                  <a
                    href={asset.webUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`btn-tactile inline-flex items-center gap-2 rounded-full border bg-surface-card px-5 py-2.5 text-sm font-semibold text-text-primary transition-all ${
                      isPulso
                        ? "border-amber-500/40 hover:border-amber-400 hover:text-amber-300"
                        : "border-border-strong hover:border-accent hover:text-accent-cyan"
                    }`}
                  >
                    <Globe size={18} weight="regular" aria-hidden />
                    <span>{webLabel || "Website"}</span>
                  </a>
                )}
              </div>
            </div>

            <div>
              <h3 className="sr-only">{screenshotsLabel}</h3>
              <ul className="grid grid-cols-3 gap-3 sm:gap-4">
                {asset.screenshots.slice(0, 3).map((shot, i) => (
                  <li
                    key={shot.src}
                    className="overflow-hidden rounded-2xl border border-border bg-surface-raised shadow-md transition-transform duration-300 hover:scale-[1.02]"
                    style={{ aspectRatio: asset.screenshotAspect }}
                  >
                    <Image
                      src={shot.src}
                      alt={`${app.name}, ${screenshotsLabel.toLowerCase()} ${i + 1}`}
                      width={shot.width}
                      height={shot.height}
                      loading={eager ? "eager" : "lazy"}
                      sizes="(min-width: 1024px) 220px, 30vw"
                      className="h-full w-full object-cover"
                    />
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
