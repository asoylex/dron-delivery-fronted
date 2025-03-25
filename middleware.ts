import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const role = request.cookies.get("role")?.value || "";

  const protectedRoutes = [
    { path: "/admin", roles: ["admin"] },
    { path: "/admin/dron", roles: ["admin"] },
    { path: "/admin/product", roles: ["admin"] },
    { path: "/admin/role", roles: ["admin"] },
    { path: "/admin/station", roles: ["admin"] },
    { path: "/admin/status", roles: ["admin"] },
    { path: "/client", roles: ["client"] },
  ];

  const matchedRoute = protectedRoutes.find((route) =>
    request.nextUrl.pathname.startsWith(route.path)
  );

  if (matchedRoute && !matchedRoute.roles.includes(role)) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/client/:path*"],
};
