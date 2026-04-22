"use client"


import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import { getIconComponent } from "@/lib/iconMapper"
import { cn } from "@/lib/utils"
import { NavSection } from "@/types/navItems.dashboar"
import { UserInfo } from "@/types/user.types"

import Link from "next/link"
import { usePathname } from "next/navigation"

interface DashboardSidebarContentProps {
    userInfo: UserInfo
    navItems: NavSection[]
    dashboardHome: string
}

const DashboardSidebarContent = ({
    dashboardHome,
    navItems,
    userInfo,
}: DashboardSidebarContentProps) => {
    const pathname = usePathname()

    return (
        <div className="hidden h-full w-64 flex-col overflow-y-auto border-r bg-card md:flex">
            {/* Logo / Brand */}
            <div className="flex h-16 items-center border-b px-6">
                <Link href={dashboardHome}>
                    <span className="text-xl font-bold text-primary">Travel Guide</span>
                </Link>
            </div>

            {/* Navigation Area */}
            <ScrollArea className="flex-1 px-3 py-4">
                <nav className="space-y-6">
                    {navItems.map((section, sectionId) => (
                        <div key={sectionId}>
                            {section.title && (
                                <h4 className="mb-2 px-3 text-xs font-semibold tracking-wider text-muted-foreground uppercase">
                                    {section.title}
                                </h4>
                            )}

                            <div className="space-y-1">
                                {section.items.map((item, id) => {
                                    const isActive = pathname === item.href
                                    // Icon Mapper Function
                                    const Icon = getIconComponent(item.icon)

                                    return (
                                        <Link
                                            href={item.href}
                                            key={id}
                                            className={cn(
                                                "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-all",
                                                isActive
                                                    ? "bg-[#1989A3] text-white"
                                                    : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                                            )}
                                        >
                                            <Icon className="h-4 w-4" />
                                            <span>{item.title}</span>
                                        </Link>
                                    )
                                })}
                            </div>

                            {sectionId < navItems.length - 1 && (
                                <Separator className="my-4" />
                            )}
                        </div>
                    ))}
                </nav>
            </ScrollArea>

            {/* User Info At Bottom */}
            <div className="border-t px-3 py-4">
                <div className="flex items-center gap-3">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10">
                        <span className="text-sm font-semibold text-primary">
                            {userInfo?.name?.charAt(0).toUpperCase()}
                        </span>
                    </div>

                    <div className="flex-1 overflow-hidden">
                        <p className="truncate text-sm font-medium">{userInfo?.name}</p>
                        <p className="text-xs text-muted-foreground capitalize">
                            {userInfo?.role?.name?.toLocaleLowerCase().replace("_", " ")}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default DashboardSidebarContent