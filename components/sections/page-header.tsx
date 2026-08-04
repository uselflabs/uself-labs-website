import { Reveal } from "@/components/reveal";

export function PageHeader({
  headline,
  intro,
}: {
  headline: string;
  intro: string;
}) {
  return (
    <section className="border-b border-border">
      <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
        <Reveal>
          <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">
            {headline}
          </h1>
          <p className="mt-5 max-w-[60ch] text-lg leading-relaxed text-text-muted">
            {intro}
          </p>
        </Reveal>
      </div>
    </section>
  );
}
