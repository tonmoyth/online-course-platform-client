import { UserRole } from "@/types/navItems.dashboar"


export const authRoutes = ["/login", "/register"]

export const isAuthRoute = (pathname: string) => {
    return authRoutes.some((router: string) => router === pathname)
}



export const getDefaultDashboardRoute = (role: UserRole | null) => {
    if (role === "ADMIN") {
        return "/dashboard"
    }
    if (role === "SUPER ADMIN") {
        return "/dashboard"
    }
    if (role === "INSTRUCTOR") {
        return "/dashboard"
    }
    if (role === "STUDENT") {
        return "/dashboard"
    }
    return "/"
}