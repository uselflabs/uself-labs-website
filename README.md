# USelf Labs website

Company site for USelf Labs, a software lab in Vietnam. Next.js 16 App Router, TypeScript, Tailwind v4, bilingual (Vietnamese / English), dark theme only.

## Run it

```bash
npm install
npm run dev       # http://localhost:3000 -> redirects to /vi
npm run build
npm run start
```

## Structure

| Path                                | Purpose                                                                                                                                  |
| ----------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------- |
| `app/[lang]/…`                      | Pages, each under a `/vi` or `/en` prefix. `/` redirects to `/vi`.                                                                       |
| `proxy.ts`                          | Locale redirect (Next.js 16's rename of `middleware.ts`). Excludes anything with a file extension so static assets are never redirected. |
| `lib/i18n/vi.json`, `en.json`       | Every visible string. Both files must keep the same shape; components never hardcode copy.                                               |
| `lib/apps.ts`                       | Non-localized data for the published apps: asset paths, Play Store URLs, screenshot aspect ratios.                                       |
| `lib/seo/schema.ts`                 | JSON-LD (Organization, WebSite, Service, FAQPage, BreadcrumbList, Mobile/SoftwareApplication).                                           |
| `lib/constants.ts`                  | `SITE_URL`, and `NAV_ROUTES` as the single source of truth for which pages exist (the sitemap derives from it).                          |
| `app/llms.txt`, `app/llms-full.txt` | Machine-readable summaries for AI agents.                                                                                                |

## Where the content comes from

Everything on the site traces back to a verifiable source:

- **Positioning, engineering domains, methodology, tech stack** come from the [`uselflabs/uselflabs`](https://github.com/uselflabs/uselflabs) profile README: the four engineering domains, the "zero hallucinated code / test-driven validation / minimal friction / scalable modularity" principles, and the actual stack (Kotlin, Python, Java, TypeScript, Spring Boot, FastAPI, Next.js, Godot Engine, GitHub Actions).
- **The three products** (Velora, Dream Courier, 1000 Lives) use their real Play Store names, categories, taglines, and feature counts. Descriptions are condensed from the live listings.
- **No repository is named anywhere on the site.** See the licensing note below.
- **App icons, feature graphics, and screenshots** were downloaded from each Play Store listing into `public/apps/` and recompressed (7.3 MB to 0.7 MB). They are self-hosted rather than hotlinked because Google's CDN URLs rotate. To refresh, re-download from the `playUrl` in `lib/apps.ts`.
  - Each asset type has one job: **icons** identify a product (hero, product cards, product detail), **feature graphics** are card artwork, and **screenshots** appear only on `/work`, where they are large enough to actually read. Screenshots were tried in the hero first and removed: at roughly 200 px wide nothing inside them is legible, so they functioned as decoration, and three phone screens of a tarot app and two games also contradicted a headline about AI coding agents. App icons are drawn to be recognisable small, so they carry that spot instead.
  - App icons share one radius treatment, `rounded-[22%]`, at every size they appear. A percentage radius scales the way Android and iOS mask launcher icons; a fixed `10px` looked wrong once the same icon was rendered at both 40 px and 150 px.
- **Brand logos** are official Simple Icons SVGs vendored into `public/brands/`, so the logo wall does not depend on an external CDN at render time.
- **Logo** was processed from `assets/logo.webp`: background removed, cropped, and split into `public/logo.png` (full lockup) and `public/logo-mark.png` (nav and favicon). The palette is sampled from it: surface `#06060f`, accent `#0074fe`, cyan `#00fafe`.

There are **no placeholder images and no invented facts left on the site.**

Three sections were removed:

- **Team** was dropped, since the lab is one person.
- **Careers** was dropped for the same reason. Its copy promised things a one-person lab cannot offer ("reviews from your direct manager"). Re-add it when there is actually a role to advertise.
- **Open source** was dropped for a licensing reason, described next.

## Licensing constraint: do not re-add repository references

The open-source section originally listed three real repos and stated that `Swiss-Ephemeris-API` supplied the birth chart data behind Velora. That sentence was a liability: Swiss Ephemeris is dual-licensed under AGPL or a paid commercial licence, so publicly documenting that it powers a commercial app on Google Play would be evidence of a licensing problem.

The whole section is now gone, and **no repository name appears anywhere on the site** or in `llms.txt` / `llms-full.txt`. The `/services` FAQ answer about open source was also rewritten: it now mentions only the AI agent skillsets and behavioral guidelines, not the calculation API.

If you re-add an open-source section later, keep two rules:

1. Never state or imply that Swiss Ephemeris (or any AGPL-only dependency) is used by a commercial product.
2. Grep the whole repo for co-occurrence before shipping, not just the section you edited. The link had leaked into four separate places: both repo descriptions, both Velora product descriptions, the FAQ, and the README.

One borderline line was **left in place** for you to decide on: the `/services` deliverable "Scientific calculation APIs, such as astronomical data" (`services.list[backend-services].deliverables`). It is a capability claim taken from your own GitHub profile and names no library, product, or repository, so it does not document anything. Remove the "astronomical data" example if you would rather leave no hint at all.

The footer still links to the GitHub **profile** (`github.com/uselflabs`), which is also in `Organization.sameAs`. Remove `GITHUB_URL` from `components/footer.tsx` and `lib/seo/schema.ts` if you want no GitHub reference at all. Separately, worth checking the repo itself: if its own README mentions Velora, that is more direct evidence than anything this website contained.

## Still needs your input

1. **`admin@uselflabs.com `** (`lib/i18n/*.json`, used in the footer, contact page, and `Organization.email`) is assumed, not confirmed. Change it if the real address differs.
2. **Contact form** (`app/[lang]/contact/actions.ts`) validates input and logs to the server console, but is not wired to an email or CRM service. Marked `TODO(user)` at the exact spot.
3. **`SITE_URL`** is `https://uselflabs.com`, which matches the `blog` field on the GitHub profile. Canonical URLs, hreflang, the sitemap, and JSON-LD all derive from this one constant.
4. **Address** says only "Vietnam". The Play Store listing exposes a full street address in Vĩnh Long; it was deliberately left off the site since it looks like a private residence. Add a business address if you want one shown.
5. **`foundingDate`** is absent from the Organization schema on purpose rather than guessed. Add it if you want the founding year in structured data.
6. **Services framing.** The site presents the four domains as client-facing capabilities with a "Start a project" CTA. If the lab does not take client work, reframe `/services` and change that CTA.

## Design and performance notes

- **One accent, locked.** `#0074fe` for text, links, and borders; `#0046d4` for solid button fills so label contrast passes WCAG AA (the brand blue alone only reached 3.8:1 against near-white text). All colour pairs used on the site were checked and clear AA.
- **No animation library.** Scroll reveals are a shared `IntersectionObserver` (`components/reveal.tsx`) driving a CSS transition. Dropping Motion cut client JS from 214 KB to 176 KB gzipped with no visual change. The reveal styles sit behind `@media (scripting: enabled)` so content is visible with JavaScript off.
- **Accessibility.** One global `:focus-visible` outline, a skip link, `aria-current` on the active nav item, localized `aria-label`s, decorative icons marked `aria-hidden`, and the contact form focuses its first invalid field on submit.
- **Icons** are Phosphor. Client components import per-icon paths (`@phosphor-icons/react/dist/csr/List`) instead of the package barrel; server components use the `/dist/ssr` entrypoint.

## Verifying

```bash
npm run build && npm run start

curl -s localhost:3000/llms.txt
curl -s localhost:3000/sitemap.xml | grep -c hreflang     # 30 (5 pages x 2 locales x 3 entries)
curl -s -o /dev/null -w '%{http_code}\n' localhost:3000/apps/velora-icon.webp   # 200, not 307
curl -s -o /dev/null -w '%{http_code}\n' localhost:3000/vi/careers              # 404
curl -s localhost:3000/vi/services | grep -o 'hrefLang="[^"]*"'                 # vi, en, x-default
```

For structured data, view source on any page and paste the `application/ld+json` blocks into Google's Rich Results Test.
