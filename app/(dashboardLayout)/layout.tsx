
import DashboardNavber from "@/components/modules/dashboard/DashboardNavber"
import DashboardSidebar from "@/components/modules/dashboard/DashboardSidebar"
import { getUserInfo } from "@/services/auth/auth.service"
import { redirect } from "next/navigation"

type DashboardLayoutProps = {
    children: React.ReactNode
    admin: React.ReactNode
    instructor: React.ReactNode
    student: React.ReactNode
}

export default async function DashboardLayout({
    admin,
    instructor,
    student,
}: DashboardLayoutProps) {
    const userInfo = await getUserInfo();


    if (!userInfo) {
        redirect("/login")
    }

    return (
        <div className="flex h-screen overflow-hidden">
            {/* Dashboard Sidebar */}
            <DashboardSidebar></DashboardSidebar>

            <div className="flex flex-1 flex-col overflow-hidden">
                {/* DashboardNavbar */}
                <DashboardNavber></DashboardNavber>
                {/* <DashboardNavbar /> */}
                <main className="flex-1 overflow-y-auto bg-muted/10 p-4 sm:p-6 lg:p-8 w-full">
                    {/* Render role-based content */}
                    {userInfo?.role?.name === "SUPER ADMIN" || userInfo?.role?.name === "ADMIN" ? admin : userInfo?.role?.name === "INSTRUCTOR" ? instructor : student}
                </main>
            </div>

        </div>
    )
}