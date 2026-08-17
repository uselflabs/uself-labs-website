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
    "",
    "## Products & Games",
    "",
    ...en.work.apps.map((a) => {
      const asset = APPS_BY_ID[a.id];
      const webPart = asset.webUrl ? ` Web: ${asset.webUrl}.` : "";
      return `- [${a.name}](${asset.webUrl || asset.playUrl}): ${a.tagline} ${a.description} Google Play: ${asset.playUrl}.${webPart}`;
    }),
    "",
    "## Engineering Capabilities",
    "",
    ...en.services.list.map(
      (s) => `- [${s.title}](${absoluteUrl("en", "/services")}#${s.id}): ${s.description} Technologies: ${s.tech.join(", ")}. Deliverables: ${s.deliverables.join("; ")}.`,
    ),
    "",
    "## Documentation & Pages (English)",
    "",
    ...pageEntries("en").map(
      (p) => `- [${p.title}](${absoluteUrl("en", p.path)}): ${p.description}`,
    ),
    "",
    "## Tài liệu & Các trang (Tiếng Việt)",
    "",
    ...pageEntries("vi").map(
      (p) => `- [${p.title}](${absoluteUrl("vi", p.path)}): ${p.description}`,
    ),
    "",
    "## Frequently Asked Questions",
    "",
    ...en.services.faq.items.map(
      (faq) => `- **${faq.question}**: ${faq.answer}`,
    ),
    "",
    "## Optional",
    "",
    `- [Full Website Knowledge Dump](${SITE_URL}/llms-full.txt): Complete plain-text content of all pages in English and Vietnamese for comprehensive context window ingestion.`,
    `- [XML Sitemap](${SITE_URL}/sitemap.xml): Complete URL index for web crawlers.`,
    `- [Google Play Developer Profile](${PLAY_DEVELOPER_URL}): All published apps and games on Google Play.`,
    `- [GitHub Organization](https://github.com/uselflabs): Open-source agent skillsets and tooling.`,
    `- Contact Email: ${en.footer.email}`,
    `- Location: ${en.footer.address}`,
  ];

  return new NextResponse(lines.join("\n") + "\n", {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
