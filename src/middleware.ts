// middleware.ts
import { jwtDecode } from "jwt-decode";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import {
  authRoutes,
  protectedRoutes,
  adminRoutes,
  customerRoutes,
} from "./constant";

type Role = "CUSTOMER" | "ADMIN" | "SUPER_ADMIN";

// Define role-based route permissions
const roleBasedRoutes: Record<Role, string[]> = {
  CUSTOMER: customerRoutes,
  ADMIN: [...adminRoutes, ...customerRoutes], // Admins can access customer routes too
  SUPER_ADMIN: [...adminRoutes, ...customerRoutes], // Super admins have full access
};

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const accessToken = request.cookies.get("accessToken")?.value;

  // Check if current route is an auth route
  const isAuthRoute = authRoutes.includes(pathname);

  // Check if current route is protected
  const isProtectedRoute = protectedRoutes.some(
    (route: string) =>
      pathname.startsWith(route) ||
      new RegExp(`^\\${route}(\\/[a-zA-Z0-9-_]+)?$`).test(pathname)
  );

  // Handle auth routes - if logged in, redirect to profile
  if (isAuthRoute) {
    if (accessToken) {
      return NextResponse.redirect(new URL("/profile", request.url));
    }
    return NextResponse.next();
  }

  // Handle protected routes - if not logged in, redirect to login
  if (isProtectedRoute && !accessToken) {
    return NextResponse.redirect(
      new URL(`/login?redirect=${pathname}`, request.url)
    );
  }

  // If not a protected route and not an auth route, proceed normally
  if (!isProtectedRoute && !isAuthRoute) {
    return NextResponse.next();
  }

  // For protected routes with token, validate token and check permissions
  try {
    const decoded = jwtDecode(accessToken as string) as { role?: Role };
    const role = decoded?.role;

    if (!role) {
      throw new Error("Invalid accessToken: role missing");
    }

    // Handle dashboard routes
    if (pathname.startsWith("/dashboard")) {
      // Redirect to role-specific dashboard if accessing base /dashboard
      if (pathname === "/dashboard") {
        if (role === "CUSTOMER") {
          return NextResponse.redirect(
            new URL("/dashboard/customer", request.url)
          );
        } else if (["ADMIN", "SUPER_ADMIN"].includes(role)) {
          return NextResponse.redirect(
            new URL("/dashboard/admin", request.url)
          );
        }
      }

      // Check if user has permission for this dashboard section
      const userRoutes = roleBasedRoutes[role];
      const hasAccess = userRoutes.some(
        (route) => pathname.startsWith(route) || pathname === route
      );

      if (!hasAccess) {
        // Redirect unauthorized access to appropriate dashboard
        if (role === "CUSTOMER") {
          return NextResponse.redirect(
            new URL("/dashboard/customer", request.url)
          );
        } else {
          return NextResponse.redirect(
            new URL("/dashboard/admin", request.url)
          );
        }
      }
    }

    return NextResponse.next();
  } catch (error) {
    console.error("Middleware error:", error);
    const response = NextResponse.redirect(new URL("/login", request.url));
    response.cookies.delete("accessToken");
    return response;
  }
}

export const config = {
  matcher: [
    "/profile",
    "/profile/:path*",
    "/dashboard",
    "/dashboard/:path*",
    "/login",
    "/register",
    "/forget-password",
    "/reset-password",
  ],
};
