import { NextResponse } from "next/server";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { getPositioning } from "@/lib/seo/positioning";
import { absoluteUrl } from "@/lib/i18n/urls";
import { SITE_NAME, SITE_URL } from "@/lib/constants";
import { APPS_BY_ID, PLAY_DEVELOPER_URL } from "@/lib/apps";
import type { Locale } from "@/lib/i18n/config";

function pageEntries(locale: Locale) {
  const d = getDictionary(locale);
  return [
    { path: "", title: d.meta.defaultTitle, description: getPositioning(locale) },
    { path: "/services", title: d.services.hero.headline, description: d.services.hero.intro },
    { path: "/work", title: d.work.hero.headline, description: d.work.hero.intro },
    { path: "/about", title: d.about.hero.headline, description: d.about.hero.intro },
    { path: "/contact", title: d.contact.hero.headline, description: d.contact.hero.intro },
  ];
}

export function GET() {
  const en = getDictionary("en");
  const vi = getDictionary("vi");

  const lines: string[] = [
    `# ${SITE_NAME}`,
    "",
    `> ${en.meta.positioning}`,
    `> ${vi.meta.positioning} (Vietnamese)`,
    "",
    "## Engineering domains",
    ...en.home.domains.items.map((d) => `- ${d.title}: ${d.body}`),
    "",
    "## Published apps and games (Google Play)",
    ...en.work.apps.map(
      (a) => `- ${a.name} (${a.category}): ${a.tagline} ${APPS_BY_ID[a.id].playUrl}`,
    ),
    `- All apps by this developer: ${PLAY_DEVELOPER_URL}`,
    "",
    "## Pages (English)",
    ...pageEntries("en").map(
      (p) => `- [${p.title}](${absoluteUrl("en", p.path)}): ${p.description}`,
    ),
    "",
    "## Trang (Tiếng Việt)",
    ...pageEntries("vi").map(
      (p) => `- [${p.title}](${absoluteUrl("vi", p.path)}): ${p.description}`,
    ),
    "",
    "## Contact",
    `- Email: ${en.footer.email}`,
    `- Location: ${en.footer.address}`,
    "",
    "## Languages",
    "- English: /en/*",
    "- Vietnamese: /vi/*",
    "",
    `Full text content: ${SITE_URL}/llms-full.txt`,
  ];

  return new NextResponse(lines.join("\n") + "\n", {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
