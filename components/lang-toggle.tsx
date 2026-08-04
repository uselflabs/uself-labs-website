"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { Locale } from "@/lib/i18n/config";
import { otherLocale, swapLocaleInPathname } from "@/lib/i18n/urls";

export function LangToggle({
  locale,
  label,
}: {
  locale: Locale;
  /** Describes the destination, written in the language currently displayed. */
  label: string;
}) {
  const pathname = usePathname();
  const target = otherLocale(locale);

  return (
    <Link
      href={swapLocaleInPathname(pathname, target)}
      hrefLang={target}
      aria-label={label}
      translate="no"
      className="rounded-full border border-border-strong px-3 py-1.5 text-sm font-medium text-text-primary transition-colors hover:border-accent hover:text-accent"
    >
      {target.toUpperCase()}
    </Link>
  );
}
