import { MiddlewareConfig, NextRequest } from "next/server";
import { authMiddlewareHandler } from "./utils/authMiddlewareHandler";
import { auth0 } from "./lib/auth0";

export async function middleware(request: NextRequest) {
  return authMiddlewareHandler(request, auth0);
}

export const config: MiddlewareConfig = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico, sitemap.xml, robots.txt (metadata files)
     */
    "/((?!api|_next/static|_next/image|.*\\.png$|.*\\.jpg$|favicon.ico|sitemap.xml|robots.txt).*)",
  ],
};
