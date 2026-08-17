import { Robot, Lightning, Browsers, Wrench } from "@phosphor-icons/react/dist/ssr";
// Type-only import, erased at compile time, so no client runtime is pulled in.
import type { Icon } from "@phosphor-icons/react";
import type { Dictionary } from "@/lib/i18n/dictionaries";
import { Reveal } from "@/components/reveal";

const DOMAIN_ICONS: Record<string, Icon> = {
  "ai-agents": Robot,
  "backend-services": Lightning,
  "fullstack-creative": Browsers,
  "developer-tooling": Wrench,
};

export function Domains({
  domains,
}: {
  domains: Dictionary["home"]["domains"];
}) {
  return (
    <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
      <Reveal>
        <h2 className="max-w-[24ch] text-3xl font-semibold tracking-tight sm:text-4xl">
          {domains.heading}
        </h2>
      </Reveal>

      {/* 4 items, 4 cells: 2x2 grid with rich subtle lighting */}
      <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2">
        {domains.items.map((item, index) => {
          const DomainIcon = DOMAIN_ICONS[item.id];
          const accented = index === 0;
          return (
            <Reveal key={item.id} delay={index * 0.06}>
              <article
                className={`card-hover-glow flex h-full flex-col gap-4 rounded-2xl border p-7 lg:p-8 transition-all ${
                  accented
                    ? "border-accent/40 bg-gradient-to-br from-accent/15 via-surface-card to-surface-raised shadow-lg shadow-accent/5"
                    : "border-border bg-surface-raised/80 hover:bg-surface-card"
                }`}
              >
                <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-border bg-surface shadow-sm">
                  <DomainIcon
                    size={22}
                    weight="bold"
                    className={accented ? "text-accent-cyan" : "text-accent"}
                    aria-hidden
                  />
                </div>
                <h3 className="text-lg font-semibold text-text-primary">
                  {item.title}
                </h3>
                <p className="max-w-[54ch] text-sm leading-relaxed text-text-muted">
                  {item.body}
                </p>
              </article>
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}
