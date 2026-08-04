import type { Dictionary } from "@/lib/i18n/dictionaries";
import { Disclosure } from "@/components/ui/disclosure";
import { Reveal } from "@/components/reveal";

export function Faq({
  faq,
}: {
  faq: Dictionary["services"]["faq"];
}) {
  return (
    <section className="border-t border-border bg-surface-raised">
      <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
        <Reveal>
          <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
            {faq.heading}
          </h2>
          <div className="mt-8 divide-y divide-border border-y border-border">
            {faq.items.map((item) => (
              <Disclosure
                key={item.question}
                summary={
                  <span className="text-base font-semibold text-text-primary">
                    {item.question}
                  </span>
                }
              >
                <p className="max-w-[65ch] text-sm leading-relaxed text-text-muted">
                  {item.answer}
                </p>
              </Disclosure>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
