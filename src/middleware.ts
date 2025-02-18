import { MiddlewareConfig, NextRequest, NextResponse } from "next/server";
import { auth0 } from "./lib/auth0";
// TODO: IMPLEMENTAR AUTH0 E CHECAGEM DE TOKEN JWT
const publicRoutes = [{ path: "/sign-in", whenAuthenticated: "redirect" }];

const REDIRECT_WHEN_NOT_AUTHENTICATED_ROUTE = "/sign-in";

export async function middleware(request: NextRequest, response: NextResponse) {
  return await auth0.middleware(request);
  // const path = request.nextUrl.pathname;
  // const publicRoute = publicRoutes.find((route) => route.path === path);

  // const userAuth0 = await auth0.getSession();

  // const authToken = userAuth0?.user.sub;

  // if (!authToken && publicRoute) {
  //   return NextResponse.next();
  // }

  // if (!authToken && !publicRoute) {
  //   const redirectUrl = request.nextUrl.clone();

  //   redirectUrl.pathname = REDIRECT_WHEN_NOT_AUTHENTICATED_ROUTE;

  //   return NextResponse.redirect(redirectUrl);
  // }

  // if (
  //   authToken &&
  //   publicRoute &&
  //   publicRoute.whenAuthenticated === "redirect"
  // ) {
  //   const redirectUrl = request.nextUrl.clone();

  //   redirectUrl.pathname = "/";

  //   return NextResponse.redirect(redirectUrl);
  // }

  // if (authToken && !publicRoute) {
  //   const session = await auth0.getSession();
  //   if (session?.tokenSet.expiresAt && session?.tokenSet.expiresAt <= 0) {
  //     await auth0.updateSession(request, response, session);
  //     const redirectUrl = request.nextUrl.clone();

  //     redirectUrl.pathname = "/";

  //     return NextResponse.redirect(redirectUrl);
  //   }
  // }

  // return NextResponse.next();
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
