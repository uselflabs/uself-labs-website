"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
// Per-icon paths rather than the package barrel, so this client bundle pulls in
// two icons instead of the whole set.
import { List } from "@phosphor-icons/react/dist/csr/List";
import { X } from "@phosphor-icons/react/dist/csr/X";
import type { Locale } from "@/lib/i18n/config";
import type { Dictionary } from "@/lib/i18n/dictionaries";
import { NAV_ROUTES, Z } from "@/lib/constants";
import { LangToggle } from "@/components/lang-toggle";

export function Nav({
  locale,
  dictionary,
}: {
  locale: Locale;
  dictionary: Dictionary;
}) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  const links = NAV_ROUTES.filter((route) => route.key !== "home");

  return (
    <header
      className="sticky top-0 border-b border-border bg-surface/85 backdrop-blur"
      style={{ zIndex: Z.nav }}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:h-[72px] lg:px-8">
        <Link
          href={`/${locale}`}
          className="flex items-center gap-2"
          aria-label={dictionary.nav.home}
        >
          <Image
            src="/logo-mark.png"
            alt="USelf Labs"
            width={32}
            height={32}
            className="h-8 w-8"
            priority
          />
          <span className="text-base font-semibold tracking-tight text-text-primary">
            USelf Labs
          </span>
        </Link>

        <nav className="hidden items-center gap-8 lg:flex">
          {links.map((route) => {
            const href = `/${locale}${route.path}`;
            const active = pathname === href;
            return (
              <Link
                key={route.key}
                href={href}
                aria-current={active ? "page" : undefined}
                className={`text-sm font-medium transition-colors ${
                  active
                    ? "text-text-primary"
                    : "text-text-muted hover:text-text-primary"
                }`}
              >
                {dictionary.nav[route.key]}
              </Link>
            );
          })}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <LangToggle locale={locale} label={dictionary.a11y.switchLanguage} />
          <Link
            href={`/${locale}/contact`}
            className="rounded-full bg-accent-solid px-4 py-2 text-sm font-semibold text-text-primary transition-colors hover:bg-accent-solid-hover active:scale-[0.98]"
          >
            {dictionary.nav.cta}
          </Link>
        </div>

        <button
          type="button"
          className="flex items-center justify-center rounded-full p-2 text-text-primary lg:hidden"
          aria-label={open ? dictionary.nav.menuClose : dictionary.nav.menuOpen}
          aria-expanded={open}
          aria-controls="mobile-nav"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? (
            <X size={24} weight="regular" aria-hidden />
          ) : (
            <List size={24} weight="regular" aria-hidden />
          )}
        </button>
      </div>

      {open && (
        <div
          id="mobile-nav"
          className="border-t border-border px-4 pb-6 pt-2 lg:hidden"
        >
          <nav className="flex flex-col gap-1">
            {links.map((route) => {
              const href = `/${locale}${route.path}`;
              const active = pathname === href;
              return (
                <Link
                  key={route.key}
                  href={href}
                  aria-current={active ? "page" : undefined}
                  className="rounded-md px-2 py-3 text-base font-medium text-text-primary"
                  onClick={() => setOpen(false)}
                >
                  {dictionary.nav[route.key]}
                </Link>
              );
            })}
          </nav>
          <div className="mt-4 flex items-center gap-3">
            <LangToggle
              locale={locale}
              label={dictionary.a11y.switchLanguage}
            />
            <Link
              href={`/${locale}/contact`}
              className="flex-1 rounded-full bg-accent-solid px-4 py-2.5 text-center text-sm font-semibold text-text-primary"
              onClick={() => setOpen(false)}
            >
              {dictionary.nav.cta}
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
