import { NextRequest, NextResponse } from "next/server";
import { headers } from "next/headers";
import { auth } from "@/lib/auth";

export async function middleware(request: NextRequest) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  const path = request.nextUrl.pathname;

  if (session && (path === "/login" || path === "/register")) {
    return NextResponse.redirect(new URL("/explore", request.url));
  }

  if (!session && path !== "/login" && path !== "/register") {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/explore*",
    "/leaderboard*",
    "/map*",
    "/aquasisten*",
    "/login",
    "/register",
  ],
};
