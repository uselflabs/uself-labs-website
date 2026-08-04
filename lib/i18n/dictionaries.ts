import type { Locale } from "./config";
import vi from "./vi.json";
import en from "./en.json";

const dictionaries = { vi, en } satisfies Record<Locale, typeof vi>;

export type Dictionary = typeof vi;

export function getDictionary(locale: Locale): Dictionary {
  return dictionaries[locale];
}
