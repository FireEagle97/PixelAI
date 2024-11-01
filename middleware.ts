import NextAuth from "next-auth";
import authConfig from "@/auth.config";
import {
  DEFAULT_LOGIN_REDIRECT,
  apiAuthPrefix,
  authRoutes,
  publicRoutes
} from "@/routes";
const { auth } = NextAuth(authConfig);
//for example
const protectedRoutes = ["/middleware"];
//it will be invoked on every route except the one mentioned in the matcher
export default auth((req) => {
  const { nextUrl } = req;
  const isLoggedIn = !!req.auth;

  const isApiAuthRoute = nextUrl.pathname.startsWith(apiAuthPrefix);
  const isPublicRoute = publicRoutes.includes(nextUrl.pathname);
  const isAuthRoute = authRoutes.includes(nextUrl.pathname);  
  // Ensure we have a valid session before proceeding with protected routes
  if (!isApiAuthRoute && !isPublicRoute && !isAuthRoute) {
    if (!isLoggedIn) {
      const redirectUrl = new URL("/login", nextUrl);
      redirectUrl.searchParams.set("callbackUrl", nextUrl.pathname);
      return Response.redirect(redirectUrl);
    }

    // Verify user ID exists in the session
    if (!req.auth?.user?.id) {
      // Handle missing user ID by redirecting to error page or re-authentication
      return Response.redirect(new URL("/error", nextUrl));
    }
  }

  // Handle auth routes (login, register, etc.)
  if (isAuthRoute) {
    if (isLoggedIn) {
      return Response.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl));
    }
    return;
  }

  // Allow API auth routes to pass through
  if (isApiAuthRoute) {
    return;
  }

  return;
  //order here matters
  // if(isApiAuthRoute){
  //   return;
  // }
  // if(isAuthRoute){
  //   if(isLoggedIn){
  //     return Response.redirect(new URL(DEFAULT_LOGIN_REDIRECT,nextUrl))
  //   }
  //   return;
  // }
  // if(!isLoggedIn && !isPublicRoute){
  //   return Response.redirect(new URL("/login",nextUrl))
  // }
  // return;

})

export const config = {
  matcher: [// Skip Next.js internals and all static files, unless found in search params
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',],
};