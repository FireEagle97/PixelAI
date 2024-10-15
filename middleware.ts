// export { auth as middleware } from "@/auth";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import NextAuth from "next-auth";
import authConfig from "@/auth.config";
import {
  DEFAULT_LOGIN_REDIRECT,
  apiAuthPrefix,
  authRoutes,
  publicRoutes
} from "@/routes";
const {auth} = NextAuth(authConfig);
//for example
const protectedRoutes = ["/middleware"];
//it will be invoked on every route except the one mentioned in the matcher
export default auth((req) => {
  const {nextUrl} = req;
  const isLoggedIn = !!req.auth;

  const isApiAuthRoute = nextUrl.pathname.startsWith(apiAuthPrefix);
  const isPublicRoute = publicRoutes.includes(nextUrl.pathname);
  const isAuthRoute = authRoutes.includes(nextUrl.pathname);
  //order here matters
  if(isApiAuthRoute){
    return;
  }
  if(isAuthRoute){
    if(isLoggedIn){
      return Response.redirect(new URL(DEFAULT_LOGIN_REDIRECT,nextUrl))
    }
    return;
  }
  if(!isLoggedIn && !isPublicRoute){
    return Response.redirect(new URL("/login",nextUrl))
  }
  return;

})
  
export const config = {
  matcher: [// Skip Next.js internals and all static files, unless found in search params
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',],
};