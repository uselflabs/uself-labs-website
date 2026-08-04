import type { Dictionary } from "@/lib/i18n/dictionaries";
import { Reveal } from "@/components/reveal";

export function AboutStory({
  story,
}: {
  story: Dictionary["about"]["story"];
}) {
  return (
    <section className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
      <Reveal>
        <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
          {story.heading}
        </h2>
        <p className="mt-5 max-w-[65ch] text-base leading-relaxed text-text-muted">
          {story.body}
        </p>
      </Reveal>
    </section>
  );
}
