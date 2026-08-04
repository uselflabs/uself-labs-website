import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { defaultLocale, isLocale } from "@/lib/i18n/config";

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (isLocale(pathname.split("/")[1])) {
    return NextResponse.next();
  }

  const url = request.nextUrl.clone();
  url.pathname = `/${defaultLocale}${pathname}`;
  return NextResponse.redirect(url, 307);
}

export const config = {
  matcher: [
    /*
     * Only locale-prefixed pages are rewritten. Anything with a file extension
     * (static assets under public/, llms.txt, sitemap.xml, ...) and Next's own
     * internals are excluded, so assets are never redirected into a locale.
     */
    "/((?!_next/|api/|.*\\.[a-zA-Z0-9]+$).*)",
  ],
};
