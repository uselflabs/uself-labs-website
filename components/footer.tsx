import Image from "next/image";
import Link from "next/link";
import { GithubLogo, GooglePlayLogo } from "@phosphor-icons/react/dist/ssr";
import type { Locale } from "@/lib/i18n/config";
import type { Dictionary } from "@/lib/i18n/dictionaries";
import { getPositioning } from "@/lib/seo/positioning";
import { NAV_ROUTES } from "@/lib/constants";
import { GITHUB_URL, PLAY_DEVELOPER_URL } from "@/lib/apps";

export function Footer({
  locale,
  dictionary,
}: {
  locale: Locale;
  dictionary: Dictionary;
}) {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border bg-surface-raised">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-[1.4fr_1fr_1fr]">
          <div>
            <Image
              src="/logo.png"
              alt="USelf Labs"
              width={140}
              height={134}
              className="h-9 w-auto"
            />
            <p className="mt-4 max-w-[42ch] text-sm leading-relaxed text-text-muted">
              {getPositioning(locale)}
            </p>
          </div>

          <div>
            <h2 className="text-sm font-semibold text-text-primary">
              {dictionary.footer.columns.company}
            </h2>
            <ul className="mt-4 flex flex-col gap-3">
              {NAV_ROUTES.map((route) => (
                <li key={route.key}>
                  <Link
                    href={`/${locale}${route.path}`}
                    className="text-sm text-text-muted transition-colors hover:text-text-primary"
                  >
                    {dictionary.nav[route.key]}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="text-sm font-semibold text-text-primary">
              {dictionary.footer.columns.connect}
            </h2>
            <address className="mt-4 flex flex-col gap-3 text-sm not-italic text-text-muted">
              <a
                href={`mailto:${dictionary.footer.email}`}
                className="transition-colors hover:text-text-primary"
              >
                {dictionary.footer.email}
              </a>
              <span>{dictionary.footer.address}</span>
            </address>
            <div className="mt-4 flex gap-4">
              <a
                href={GITHUB_URL}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
                className="text-text-muted transition-colors hover:text-text-primary"
              >
                <GithubLogo size={20} weight="regular" aria-hidden />
              </a>
              <a
                href={PLAY_DEVELOPER_URL}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Google Play"
                className="text-text-muted transition-colors hover:text-text-primary"
              >
                <GooglePlayLogo size={20} weight="regular" aria-hidden />
              </a>
            </div>
          </div>
        </div>

        <p className="mt-12 border-t border-border pt-6 text-sm text-text-faint">
          {year} {dictionary.footer.copyright}
        </p>
      </div>
    </footer>
  );
}
