import { getDefaultDashboardRoute } from "@/lib/authUtils"
import { getNavItems } from "@/navItems/navItems"
import { getUserInfo } from "@/services/auth/auth.service"
import { NavSection } from "@/types/navItems.dashboar"
import DashboardSidebarContent from "./DashboardSideberContent"


const DashboardSidebar = async () => {
    const userInfo = await getUserInfo()

    const navItems: NavSection[] = getNavItems(userInfo?.role?.name)

    const dashboardHome = getDefaultDashboardRoute(userInfo?.role)

    return (
        <DashboardSidebarContent
            userInfo={userInfo}
            navItems={navItems}
            dashboardHome={dashboardHome}
        />
    )
}

export default DashboardSidebar