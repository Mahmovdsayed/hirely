import { NextRequest, NextResponse } from "next/server";
import { clientURL } from "./constants/statics";
import { verifyAuth } from "./helpers/auth";

export default async function proxy(request: NextRequest) {
  const { pathname, origin } = request.nextUrl;

  // Create base response with security headers
  const response = NextResponse.next();
  response.headers.set("X-Content-Type-Options", "nosniff");
  response.headers.set("X-Frame-Options", "DENY");
  response.headers.set("X-XSS-Protection", "1; mode=block");
  response.headers.set("Strict-Transport-Security","max-age=63072000; includeSubDomains; preload");

  // CORS check - only apply to actual cross-origin fetch/XHR requests, not navigation
  const requestOrigin = request.headers.get("origin");
  const secFetchMode = request.headers.get("sec-fetch-mode");
  const allowedOrigins = [
    clientURL,
    "https://www.hirely.cc",
    "https://hirely.cc",
  ];

  const isCrossOriginRequest = requestOrigin && (secFetchMode === "cors" || secFetchMode === "no-cors");
  if (isCrossOriginRequest && !allowedOrigins.includes(requestOrigin)) return new NextResponse("CORS policy violation", { status: 403 });

  // Get auth token from cookies
  const token = request.cookies.get("token")?.value;

  // Check if this is dashboard path or auth path
  const isDashboardPath = pathname.includes("/dashboard");
  const isAuthPath = pathname.includes("/auth");

  // Dashboard protection - redirect to login if not authenticated
  if (isDashboardPath && !token) {
    const loginUrl = "/auth/sign-in";
    return NextResponse.redirect(new URL(loginUrl, origin));
  }

  if (isDashboardPath && token) {
    const isValidUser = await verifyAuth();

    if (!isValidUser) {
      // Token is invalid or expired - clear cookie and redirect to home
      const redirectResponse = NextResponse.redirect(new URL("/auth/sign-in", origin));

      // Clear the invalid token cookie
      redirectResponse.cookies.delete("token");

      console.log("Invalid/expired token - redirecting to home and clearing cookie");
      return redirectResponse;
    }
  }

  // Redirect authenticated users away from auth pages
  if (isAuthPath && token) {
    const isAuthUser = await verifyAuth();
    if (!isAuthUser) return NextResponse.redirect(new URL("/auth/sign-in", origin));

    const dashboardUrl = "/dashboard";
    return NextResponse.redirect(new URL(dashboardUrl, origin));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/", "/((?!api|_next|_vercel|.*\\..*).*)"],
};
