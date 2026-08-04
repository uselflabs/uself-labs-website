import type { Dictionary } from "@/lib/i18n/dictionaries";
import { Reveal } from "@/components/reveal";

/**
 * Brand marks are official Simple Icons SVGs vendored into `public/brands/`,
 * so the logo wall does not depend on an external CDN at render time. They are
 * plain <img> rather than next/image because each file is ~1KB of vector and
 * gains nothing from the raster optimizer.
 */
export function TechStackStrip({
  stack,
}: {
  stack: Dictionary["home"]["stack"];
}) {
  return (
    <section className="border-y border-border bg-surface-raised">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <Reveal>
          <h2 className="text-center text-sm font-medium text-text-muted">
            {stack.heading}
          </h2>
          <ul className="mt-8 flex flex-wrap items-center justify-center gap-x-10 gap-y-7">
            {stack.logos.map((logo) => (
              <li key={logo.slug} className="flex items-center">
                <img
                  src={`/brands/${logo.slug}.svg`}
                  alt={logo.name}
                  width={28}
                  height={28}
                  loading="lazy"
                  decoding="async"
                  className="h-7 w-7 opacity-55 transition-opacity hover:opacity-100"
                />
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
