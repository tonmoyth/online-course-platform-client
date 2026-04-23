import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import { jwtUtils } from "@/lib/jwtUtils"
import { getDefaultDashboardRoute, isAuthRoute } from "@/lib/authUtils"
import { tokenExpiredSoon } from "./lib/token"
import { NavSection, UserRole } from "./types/navItems.dashboar"
import { getNavItems } from "./navItems/navItems"



export async function proxy(request: NextRequest) {
    const pathname = request.nextUrl.pathname
    const accessToken = request.cookies.get("accessToken")?.value
    const refreshToken = request.cookies.get("refreshToken")?.value
    const sessionToken = request.cookies.get("sessionToken")?.value

    let decoded: any = null
    if (accessToken) {
        const result = jwtUtils.verifyToken(accessToken, process.env.JWT_SECRET!)
        if (result.success) {
            decoded = result.data
        }
    }

    let role: UserRole | null = null

    if (decoded) {
        role = decoded.role
    }

    let routeOwner = null

    if (role === "SUPER ADMIN") {
        routeOwner = "SUPER ADMIN"
    } else if (role === "STUDENT") {
        routeOwner = "STUDENT"
    } else if (role === "INSTRUCTOR") {
        routeOwner = "INSTRUCTOR"
    } else if (role === "ADMIN") {
        routeOwner = "ADMIN"
    }



    if (pathname === "/login" || pathname === "/register") {
        if (sessionToken && decoded) {
            const defaultRoute = getDefaultDashboardRoute(role as UserRole)
            return NextResponse.redirect(new URL(defaultRoute, request.url))
        }
        return NextResponse.next()
    }

    if (decoded && sessionToken && isAuthRoute(pathname)) {
        const defaultRoute = "/dashboard"
        return NextResponse.redirect(new URL(defaultRoute, request.url))
    }

    if (
        !accessToken &&
        !sessionToken &&
        !request.nextUrl.pathname.startsWith("/login")
    ) {
        const loginUrl = new URL("/login", request.url)
        loginUrl.searchParams.set("redirect", pathname)
        return NextResponse.redirect(loginUrl)
    }

    // admin parbe sudu tar route gula access korte, member parbe tar route gula access korte, ar guest parbe sudu public route gula access korte
    const navItems: NavSection[] = getNavItems(role as UserRole);

    // Dynamic route prefixes that are allowed without exact nav item match
    const dynamicAllowedPrefixes = [
        "/dashboard/manage-course/",
    ]

    if (routeOwner) {
        const isExactMatch = navItems.some((section) =>
            section.items.some((item) => item.href === pathname)
        )

        const isDynamicMatch = dynamicAllowedPrefixes.some((prefix) =>
            pathname.startsWith(prefix)
        )

        if (!isExactMatch && !isDynamicMatch && pathname !== "/login") {
            return NextResponse.redirect(new URL("/dashboard", request.url))
        }
    }

    return NextResponse.next()
}

export const config = {
    matcher: [
        "/dashboard/:path*", "/login",
        "/register",
    ],
}