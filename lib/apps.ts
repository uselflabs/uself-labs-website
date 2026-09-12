/**
 * The apps and games USelf Labs has published on Google Play.
 *
 * Icons, feature graphics, and screenshots were downloaded from each app's
 * live Play Store listing and are served from `public/apps/` rather than
 * hotlinked, because Google's CDN URLs rotate. To refresh them, re-download
 * from the `playUrl` listing below.
 *
 * Play Store assets come far larger than this site ever renders them, and
 * `images.unoptimized` (next.config.ts) means whatever is on disk is what the
 * browser downloads -- nothing resizes it at request time. So downscale on the
 * way in and update the width/height here to the file's real dimensions:
 * icons to 192px, feature graphics to 1024px, screenshots to 640px wide.
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
  webUrl?: string;
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
    id: "pulso",
    kind: "game",
    packageName: "com.uself.pulse",
    playUrl: playUrl("com.uself.pulse"),
    webUrl: "https://pulso.uselflabs.com/",
    icon: { src: "/apps/pulso-icon.webp", width: 192, height: 192 },
    feature: { src: "/apps/pulso-feature.webp", width: 1024, height: 500 },
    screenshots: [
      { src: "/apps/pulso-shot-0.webp", width: 640, height: 1138 },
      { src: "/apps/pulso-shot-1.webp", width: 640, height: 1138 },
      { src: "/apps/pulso-shot-2.webp", width: 640, height: 1138 },
      { src: "/apps/pulso-shot-3.webp", width: 640, height: 1138 },
    ],
    screenshotAspect: "9 / 16",
  },
  {
    id: "puzzena",
    kind: "game",
    packageName: "com.uself.logicpuzzles",
    playUrl: playUrl("com.uself.logicpuzzles"),
    webUrl: "https://puzzena.uselflabs.com/",
    icon: { src: "/apps/puzzena-icon.webp", width: 192, height: 192 },
    feature: { src: "/apps/puzzena-feature.webp", width: 1024, height: 501 },
    screenshots: [
      { src: "/apps/puzzena-shot-0.webp", width: 640, height: 1422 },
      { src: "/apps/puzzena-shot-1.webp", width: 640, height: 1422 },
      { src: "/apps/puzzena-shot-2.webp", width: 640, height: 1422 },
      { src: "/apps/puzzena-shot-3.webp", width: 640, height: 1422 },
      { src: "/apps/puzzena-shot-4.webp", width: 640, height: 1422 },
    ],
    screenshotAspect: "9 / 20",
  },
  {
    id: "velora",
    kind: "app",
    packageName: "com.uself.velora",
    playUrl: playUrl("com.uself.velora"),
    icon: { src: "/apps/velora-icon.webp", width: 192, height: 192 },
    feature: { src: "/apps/velora-feature.webp", width: 1024, height: 500 },
    screenshots: [
      { src: "/apps/velora-shot-0.webp", width: 640, height: 962 },
      { src: "/apps/velora-shot-1.webp", width: 640, height: 960 },
      { src: "/apps/velora-shot-2.webp", width: 640, height: 960 },
    ],
    screenshotAspect: "2 / 3",
  },
  {
    id: "dream-courier",
    kind: "game",
    packageName: "com.uself.dreamcourier",
    playUrl: playUrl("com.uself.dreamcourier"),
    icon: { src: "/apps/dream-courier-icon.webp", width: 192, height: 192 },
    feature: {
      src: "/apps/dream-courier-feature.webp",
      width: 1024,
      height: 500,
    },
    screenshots: [
      { src: "/apps/dream-courier-shot-0.webp", width: 640, height: 1138 },
      { src: "/apps/dream-courier-shot-1.webp", width: 640, height: 1138 },
      { src: "/apps/dream-courier-shot-2.webp", width: 640, height: 1138 },
    ],
    screenshotAspect: "9 / 16",
  },
  {
    id: "1000-lives",
    kind: "game",
    packageName: "com.uself.onethousandlives",
    playUrl: playUrl("com.uself.onethousandlives"),
    icon: { src: "/apps/1000-lives-icon.webp", width: 192, height: 192 },
    feature: { src: "/apps/1000-lives-feature.webp", width: 1024, height: 500 },
    screenshots: [
      { src: "/apps/1000-lives-shot-0.webp", width: 640, height: 1388 },
      { src: "/apps/1000-lives-shot-1.webp", width: 640, height: 1388 },
      { src: "/apps/1000-lives-shot-2.webp", width: 640, height: 1388 },
    ],
    screenshotAspect: "640 / 1388",
  },
];

export const APPS_BY_ID = Object.fromEntries(
  PUBLISHED_APPS.map((app) => [app.id, app]),
) as Record<string, PublishedApp>;

export const PLAY_DEVELOPER_URL =
  "https://play.google.com/store/apps/dev?id=4759355575361087914";

export const GITHUB_URL = "https://github.com/uselflabs";

