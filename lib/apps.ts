/**
 * The apps and games USelf Labs has published on Google Play.
 *
 * Icons, feature graphics, and screenshots were downloaded from each app's
 * live Play Store listing and are served from `public/apps/` rather than
 * hotlinked, because Google's CDN URLs rotate. To refresh them, re-download
 * from the `playUrl` listing below.
 *
 * Localized text (name, tagline, description) lives in `lib/i18n/*.json`
 * under `work.apps.<id>`; only non-localized asset data lives here.
 */

export type AppImage = {
  src: string;
  width: number;
  height: number;
};

export type PublishedApp = {
  id: string;
  /** Drives the schema.org type. Not derived from the category label, which is localized. */
  kind: "app" | "game";
  packageName: string;
  playUrl: string;
  icon: AppImage;
  feature: AppImage;
  screenshots: AppImage[];
  /** Native screenshot aspect ratio, used so each app's strip renders undistorted. */
  screenshotAspect: string;
};

const playUrl = (pkg: string) =>
  `https://play.google.com/store/apps/details?id=${pkg}`;

const PUBLISHED_APPS: PublishedApp[] = [
  {
    id: "velora",
    kind: "app",
    packageName: "com.uself.velora",
    playUrl: playUrl("com.uself.velora"),
    icon: { src: "/apps/velora-icon.webp", width: 512, height: 512 },
    feature: { src: "/apps/velora-feature.webp", width: 1024, height: 500 },
    screenshots: [
      { src: "/apps/velora-shot-0.webp", width: 720, height: 1082 },
      { src: "/apps/velora-shot-1.webp", width: 720, height: 1080 },
      { src: "/apps/velora-shot-2.webp", width: 720, height: 1080 },
    ],
    screenshotAspect: "2 / 3",
  },
  {
    id: "dream-courier",
    kind: "game",
    packageName: "com.uself.dreamcourier",
    playUrl: playUrl("com.uself.dreamcourier"),
    icon: { src: "/apps/dream-courier-icon.webp", width: 512, height: 512 },
    feature: {
      src: "/apps/dream-courier-feature.webp",
      width: 1024,
      height: 500,
    },
    screenshots: [
      { src: "/apps/dream-courier-shot-0.webp", width: 720, height: 1280 },
      { src: "/apps/dream-courier-shot-1.webp", width: 720, height: 1280 },
      { src: "/apps/dream-courier-shot-2.webp", width: 720, height: 1280 },
    ],
    screenshotAspect: "9 / 16",
  },
  {
    id: "1000-lives",
    kind: "game",
    packageName: "com.uself.onethousandlives",
    playUrl: playUrl("com.uself.onethousandlives"),
    icon: { src: "/apps/1000-lives-icon.webp", width: 512, height: 512 },
    feature: { src: "/apps/1000-lives-feature.webp", width: 1024, height: 500 },
    screenshots: [
      { src: "/apps/1000-lives-shot-0.webp", width: 720, height: 1561 },
      { src: "/apps/1000-lives-shot-1.webp", width: 720, height: 1561 },
      { src: "/apps/1000-lives-shot-2.webp", width: 720, height: 1561 },
    ],
    screenshotAspect: "720 / 1561",
  },
];

export const APPS_BY_ID = Object.fromEntries(
  PUBLISHED_APPS.map((app) => [app.id, app]),
) as Record<string, PublishedApp>;

export const PLAY_DEVELOPER_URL =
  "https://play.google.com/store/apps/dev?id=4759355575361087914";

export const GITHUB_URL = "https://github.com/uselflabs";
