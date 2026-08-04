import type { Dictionary } from "@/lib/i18n/dictionaries";
import { Disclosure } from "@/components/ui/disclosure";
import { Reveal } from "@/components/reveal";

export function ServicesList({
  items,
}: {
  items: Dictionary["services"]["list"];
}) {
  return (
    <section className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
      <Reveal>
        <div className="divide-y divide-border border-y border-border">
          {items.map((service, index) => (
            <Disclosure
              key={service.id}
              id={service.id}
              defaultOpen={index === 0}
              summary={
                <span className="text-xl font-semibold text-text-primary">
                  {service.title}
                </span>
              }
            >
              <p className="max-w-[65ch] text-base leading-relaxed text-text-muted">
                {service.description}
              </p>
              <ul className="mt-4 flex flex-col gap-2">
                {service.deliverables.map((item) => (
                  <li
                    key={item}
                    className="flex gap-2 text-sm text-text-muted"
                  >
                    <span className="text-accent">-</span>
                    {item}
                  </li>
                ))}
              </ul>
              <div className="mt-4 flex flex-wrap gap-2">
                {service.tech.map((tech) => (
                  <span
                    key={tech}
                    className="rounded-full border border-border-strong px-3 py-1 font-mono text-xs text-text-muted"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </Disclosure>
          ))}
        </div>
      </Reveal>
    </section>
  );
}
