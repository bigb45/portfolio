import { NextRequest, NextResponse } from "next/server";

const COURSES_HOST = "courses.natour.dev";

function isStaticAsset(pathname: string): boolean {
  return pathname.includes(".");
}

export function middleware(request: NextRequest) {
  const host = request.headers.get("host") ?? "";
  const url = request.nextUrl.clone();
  const pathname = url.pathname;
  const isCoursesHost = host === COURSES_HOST || host.startsWith(`${COURSES_HOST}:`);

  if (isCoursesHost) {
    if (pathname.startsWith("/_next/") || pathname.startsWith("/api/") || isStaticAsset(pathname)) {
      return NextResponse.next();
    }

    if (pathname === "/courses" || pathname.startsWith("/courses/")) {
      const strippedPath = pathname === "/courses" ? "/" : pathname.replace(/^\/courses/, "") || "/";
      url.pathname = strippedPath;
      return NextResponse.redirect(url);
    }

    url.pathname = pathname === "/" ? "/courses" : `/courses${pathname}`;
    return NextResponse.rewrite(url);
  }

  if (pathname === "/courses" || pathname.startsWith("/courses/")) {
    url.pathname = "/";
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
