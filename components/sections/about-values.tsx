import type { Dictionary } from "@/lib/i18n/dictionaries";
import { Reveal } from "@/components/reveal";

export function AboutValues({
  values,
}: {
  values: Dictionary["about"]["values"];
}) {
  return (
    <section className="border-t border-border bg-surface-raised">
      <div className="mx-auto max-w-5xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
        <Reveal>
          <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
            {values.heading}
          </h2>
        </Reveal>
        <div className="mt-10 grid grid-cols-1 gap-x-10 gap-y-8 lg:grid-cols-2">
          {values.items.map((value, index) => (
            <Reveal key={value.title} delay={index * 0.05}>
              <div className="border-t border-border pt-5">
                <h3 className="text-lg font-semibold text-text-primary">
                  {value.title}
                </h3>
                <p className="mt-2 max-w-[50ch] text-sm leading-relaxed text-text-muted">
                  {value.body}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
