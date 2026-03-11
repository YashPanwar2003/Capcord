import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import aj from "./lib/arcjet";
import { createMiddleware, detectBot, shield } from "@arcjet/next";
const publicRoutes = ["/sign-in", "/sign-up"];

export async function middleware(req: NextRequest) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  const { pathname } = req.nextUrl;
  const isPublicRoute = publicRoutes.includes(pathname);

  if (!session && !isPublicRoute) {
    return NextResponse.redirect(new URL("/sign-in", req.url));
  }

  if (session && isPublicRoute) {
    return NextResponse.redirect(new URL("/dashboard", req.url));
  }

  return NextResponse.next();
}

const validate = aj
  .withRule(shield({ mode: "LIVE" }))
  .withRule(detectBot({ mode: "LIVE", allow: ['CATEGORY:SEARCH_ENGINE', "GOOGLE_CRAWLER"] }))

export default createMiddleware(validate,middleware)



export const config = {
  matcher: [
    "/dashboard/:path*",
    "/profile/:path*",
    "/video/:path*",
    "/sign-in",
    "/sign-up",
  ],
};