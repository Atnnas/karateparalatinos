import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  function middleware(req) {
    const token = req.nextauth.token;
    const status = token?.status;
    const role = token?.role;

    // If user is logged in but status is not approved, redirect to access-denied
    if (status && status !== "approved") {
      return NextResponse.redirect(
        new URL(`/access-denied?status=${status}`, req.url)
      );
    }

    // If route starts with /admin, check if user is admin
    if (req.nextUrl.pathname.startsWith("/admin") && role !== "admin") {
      return NextResponse.redirect(new URL("/access-denied", req.url));
    }

    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: ({ token }) => !!token,
    },
    pages: {
      signIn: "/login",
    },
  }
);

export const config = {
  matcher: ["/herramientas/:path*", "/admin/:path*"],
};
