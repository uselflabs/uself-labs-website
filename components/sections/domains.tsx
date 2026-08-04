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

      {/* 4 items, 4 cells: a 2x2 grid where the first cell carries the accent
          tint so the block is not four identical boxes. */}
      <div className="mt-10 grid grid-cols-1 gap-4 md:grid-cols-2">
        {domains.items.map((item, index) => {
          const DomainIcon = DOMAIN_ICONS[item.id];
          const accented = index === 0;
          return (
            <Reveal key={item.id} delay={index * 0.06}>
              <article
                className={`flex h-full flex-col gap-4 rounded-[10px] border p-6 lg:p-8 ${
                  accented
                    ? "border-accent/30 bg-accent/10"
                    : "border-border bg-surface-raised"
                }`}
              >
                <DomainIcon
                  size={24}
                  weight="regular"
                  className={accented ? "text-accent-cyan" : "text-accent"}
                  aria-hidden
                />
                <h3 className="text-lg font-semibold text-text-primary">
                  {item.title}
                </h3>
                <p className="max-w-[52ch] text-sm leading-relaxed text-text-muted">
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
