import Image from "next/image";
import { ArrowSquareOut, Check } from "@phosphor-icons/react/dist/ssr";
import type { Dictionary } from "@/lib/i18n/dictionaries";
import { APPS_BY_ID } from "@/lib/apps";
import { Reveal } from "@/components/reveal";

type App = Dictionary["work"]["apps"][number];

export function AppDetailList({
  apps,
  playLabel,
  screenshotsLabel,
  highlightsLabel,
}: {
  apps: App[];
  playLabel: string;
  screenshotsLabel: string;
  highlightsLabel: string;
}) {
  return (
    <div className="divide-y divide-border">
      {apps.map((app, index) => (
        <AppDetail
          key={app.id}
          app={app}
          eager={index === 0}
          playLabel={playLabel}
          screenshotsLabel={screenshotsLabel}
          highlightsLabel={highlightsLabel}
        />
      ))}
    </div>
  );
}

function AppDetail({
  app,
  eager,
  playLabel,
  screenshotsLabel,
  highlightsLabel,
}: {
  app: App;
  eager: boolean;
  playLabel: string;
  screenshotsLabel: string;
  highlightsLabel: string;
}) {
  const asset = APPS_BY_ID[app.id];

  return (
    <section id={app.id} className="scroll-mt-20">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
        <Reveal>
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-[1fr_1.15fr] lg:gap-14">
            <div>
              <div className="flex items-center gap-4">
                <Image
                  src={asset.icon.src}
                  alt=""
                  width={56}
                  height={56}
                  priority={eager}
                  className="h-14 w-14 shrink-0 rounded-[22%] border border-border"
                />
                <div>
                  <p className="text-xs font-medium text-accent">
                    {app.category}
                  </p>
                  <h2 className="mt-1 text-xl font-semibold text-text-primary">
                    {app.name}
                  </h2>
                </div>
              </div>

              <p className="mt-6 max-w-[56ch] text-base leading-relaxed text-text-primary">
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
                      className="mt-0.5 shrink-0 text-accent"
                      aria-hidden
                    />
                    {highlight}
                  </li>
                ))}
              </ul>

              <a
                href={asset.playUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-8 inline-flex items-center gap-2 rounded-full border border-border-strong px-5 py-2.5 text-sm font-semibold text-text-primary transition-colors hover:border-accent hover:text-accent active:scale-[0.98]"
              >
                {playLabel}
                <ArrowSquareOut size={16} weight="bold" aria-hidden />
              </a>
            </div>

            <div>
              <h3 className="sr-only">{screenshotsLabel}</h3>
              <ul className="grid grid-cols-3 gap-3 sm:gap-4">
                {asset.screenshots.map((shot, i) => (
                  <li
                    key={shot.src}
                    className="overflow-hidden rounded-xl border border-border bg-surface-raised"
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
