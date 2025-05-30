import { Auth0Client } from "@auth0/nextjs-auth0/server";
import { NextRequest, NextResponse } from "next/server";

const publicRoutes = [
  { path: "/", whenAuthenticated: "redirect" },
  { path: "sign-in", whenAuthenticated: "redirect" },
];

const auth0Routes = [
  "/auth/login",
  "/auth/logout",
  "/auth/callback",
  "/auth/profile",
  "/auth/access-token",
  "/auth/backchannel-logout",
];
const REDIRECT_WHEN_NOT_AUTHENTICATED_ROUTE = "/sign-in";

export async function authMiddlewareHandler(
  request: NextRequest,
  auth0: Auth0Client
) {
  const session = await auth0.getSession(request);

  const publicRoute = publicRoutes.find(
    (route) => route.path === request.nextUrl.pathname
  );

  const isAuth0Route = auth0Routes.includes(request.nextUrl.pathname);

  if (isAuth0Route) {
    return await auth0.middleware(request);
  }

  if (
    session?.user &&
    publicRoute &&
    publicRoute.whenAuthenticated === "redirect"
  ) {
    const redirectUrl = request.nextUrl.clone();
    redirectUrl.pathname = "/credentialscheck";
    return NextResponse.redirect(redirectUrl);
  }

  if (!session?.user && !publicRoute) {
    const redirectUrl = request.nextUrl.clone();
    redirectUrl.pathname = REDIRECT_WHEN_NOT_AUTHENTICATED_ROUTE;
    if (request.nextUrl.pathname !== "/sign-in") {
      return NextResponse.redirect(redirectUrl);
    }
  }

  return await auth0.middleware(request);
}
