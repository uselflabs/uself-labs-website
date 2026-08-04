import { NextResponse } from "next/server";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { flattenDictionary } from "@/lib/seo/flatten";
import { SITE_NAME } from "@/lib/constants";

export function GET() {
  const en = flattenDictionary(getDictionary("en")).join("\n");
  const vi = flattenDictionary(getDictionary("vi")).join("\n");

  const body = [
    `# ${SITE_NAME} - full site content`,
    "",
    "This file lists every piece of copy on the site, in both languages,",
    "for agents that want full context in a single request.",
    "",
    "## English",
    "",
    en,
    "",
    "## Vietnamese",
    "",
    vi,
    "",
  ].join("\n");

  return new NextResponse(body, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
