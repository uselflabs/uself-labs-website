import { getDictionary } from "@/lib/i18n/dictionaries";
import type { Locale } from "@/lib/i18n/config";

/**
 * The single positioning sentence for USelf Labs, reused verbatim across
 * hero subtext, meta description, Organization.description (JSON-LD), and
 * llms.txt so an AI agent reading any one of them gets the same answer.
 */
export function getPositioning(locale: Locale): string {
  return getDictionary(locale).meta.positioning;
}
