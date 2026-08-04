/**
 * Recursively turns a dictionary object into flat "path: value" lines, so
 * llms-full.txt can dump the entire site's copy in one machine-readable pass.
 */
export function flattenDictionary(value: unknown, prefix = ""): string[] {
  if (typeof value === "string") {
    return [`${prefix}: ${value}`];
  }
  if (Array.isArray(value)) {
    return value.flatMap((item, index) =>
      flattenDictionary(item, `${prefix}[${index}]`),
    );
  }
  if (value && typeof value === "object") {
    return Object.entries(value).flatMap(([key, val]) =>
      flattenDictionary(val, prefix ? `${prefix}.${key}` : key),
    );
  }
  return [];
}
