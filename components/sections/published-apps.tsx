import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "@phosphor-icons/react/dist/ssr";
import type { Locale } from "@/lib/i18n/config";
import type { Dictionary } from "@/lib/i18n/dictionaries";
import { APPS_BY_ID } from "@/lib/apps";
import { Reveal } from "@/components/reveal";

export function PublishedApps({
  locale,
  selectedWork,
  apps,
}: {
  locale: Locale;
  selectedWork: Dictionary["home"]["selectedWork"];
  apps: Dictionary["work"]["apps"];
}) {
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

        <ul className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2">
          {apps.map((app, index) => {
            const asset = APPS_BY_ID[app.id];
            return (
              <Reveal key={app.id} delay={index * 0.07}>
                <li className="h-full">
                  <Link
                    href={`/${locale}/work#${app.id}`}
                    className="card-hover-glow group flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-surface/90 transition-all hover:border-border-strong hover:bg-surface-card"
                  >
                    <div className="relative aspect-[16/8] overflow-hidden bg-surface-raised">
                      <Image
                        src={asset.feature.src}
                        alt=""
                        fill
                        sizes="(min-width: 768px) 50vw, 100vw"
                        className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-surface via-transparent to-transparent opacity-80" />
                      <span className="absolute bottom-3 right-3 rounded-full border border-border bg-surface/85 px-2.5 py-0.5 text-xs font-medium text-text-muted backdrop-blur">
                        {app.category}
                      </span>
                    </div>

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
                          <h3 className="truncate text-base font-semibold text-text-primary transition-colors group-hover:text-accent-cyan">
                            {app.name}
                          </h3>
                          <p className="truncate text-xs text-text-muted">
                            {asset.packageName}
                          </p>
                        </div>
                      </div>
                      <p className="mt-4 text-sm leading-relaxed text-text-muted">
                        {app.tagline}
                      </p>
                    </div>
                  </Link>
                </li>
              </Reveal>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
