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
    <section className="border-y border-border bg-surface-raised">
      <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
        <Reveal>
          <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
            {selectedWork.heading}
          </h2>
          <p className="mt-4 max-w-[60ch] text-base leading-relaxed text-text-muted">
            {selectedWork.lead}
          </p>
        </Reveal>

        <ul className="mt-10 grid grid-cols-1 gap-5 md:grid-cols-3">
          {apps.map((app, index) => {
            const asset = APPS_BY_ID[app.id];
            return (
              <Reveal key={app.id} delay={index * 0.07}>
                <li className="h-full">
                  <Link
                    href={`/${locale}/work#${app.id}`}
                    className="group flex h-full flex-col overflow-hidden rounded-[10px] border border-border bg-surface transition-colors hover:border-border-strong"
                  >
                    <div className="relative aspect-[1024/500] overflow-hidden">
                      <Image
                        src={asset.feature.src}
                        alt=""
                        fill
                        sizes="(min-width: 768px) 33vw, 100vw"
                        className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                      />
                    </div>
                    <div className="flex flex-1 flex-col p-5">
                      <div className="flex items-center gap-3">
                        <Image
                          src={asset.icon.src}
                          alt=""
                          width={40}
                          height={40}
                          className="h-10 w-10 shrink-0 rounded-[22%] border border-border"
                        />
                        <div className="min-w-0">
                          <h3 className="truncate text-sm font-semibold text-text-primary">
                            {app.name}
                          </h3>
                          <p className="text-xs text-text-muted">
                            {app.category}
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

        <Reveal delay={0.2}>
          <Link
            href={`/${locale}/work`}
            className="mt-8 inline-flex items-center gap-1.5 text-sm font-semibold text-accent transition-colors hover:text-accent-cyan"
          >
            {selectedWork.viewAll}
            <ArrowUpRight size={16} weight="bold" aria-hidden />
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
