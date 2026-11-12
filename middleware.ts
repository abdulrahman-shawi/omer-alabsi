import { NextRequest, NextResponse } from "next/server";
import { COOKIE_NAME, verifySessionValue } from "@/lib/auth";

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // صفحة تسجيل الدخول متاحة دائماً
  if (pathname.startsWith("/admin/login")) {
    return NextResponse.next();
  }

  const session = req.cookies.get(COOKIE_NAME)?.value;
  if (await verifySessionValue(session)) {
    return NextResponse.next();
  }

  const loginUrl = req.nextUrl.clone();
  loginUrl.pathname = "/admin/login";
  loginUrl.search = `?next=${encodeURIComponent(pathname)}`;
  return NextResponse.redirect(loginUrl);
}

export const config = {
  matcher: ["/admin/:path*"],
};
