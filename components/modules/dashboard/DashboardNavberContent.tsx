"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

import { useEffect, useState } from "react"
import { Menu, Search } from "lucide-react"
import { UserInfo } from "@/types/user.types"
import { NavSection } from "@/types/navItems.dashboar"
import DashboardMobileSidbar from "./DashboardMobileSidebar"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import UserDropdown from "./UserDropdwn"

interface DashboardNavberrContentProps {
    userInfo: UserInfo
    navItems: NavSection[]
    dashboardHome: string
}

export default function DashboardNavberContent({
    userInfo,
    navItems,
    dashboardHome,
}: DashboardNavberrContentProps) {
    const [isOpen, setIsOpen] = useState(false)
    const [isMobile, setIsMobile] = useState(false)

    useEffect(() => {
        const checkSmallerScreen = () => {
            setIsMobile(window.innerWidth < 768)
        }

        checkSmallerScreen()
        window.addEventListener("resize", checkSmallerScreen)

        return () => {
            window.removeEventListener("resize", checkSmallerScreen)
        }
    }, [])
    return (
        <div className="flex h-16 items-center justify-between gap-4 border-b bg-background px-4 md:px-6">
            {/* Mobile Menu Toggle Button And Menu */}
            <Sheet open={isOpen && isMobile} onOpenChange={setIsOpen}>
                <SheetTrigger asChild className="md:hidden">
                    <Button variant={"outline"} size={"icon"}>
                        <Menu className="h-5 w-5" />
                    </Button>
                </SheetTrigger>

                <SheetContent side="left" className="w-64 p-0">
                    <DashboardMobileSidbar
                        userInfo={userInfo}
                        dashboardHome={dashboardHome}
                        navItems={navItems}
                    />
                </SheetContent>
            </Sheet>

            {/* Search Component */}
            <div className="flex flex-1 items-center">
                {/* <div className="relative hidden w-full sm:block">
          <Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input type="text" placeholder="Search..." className="pr-4 pl-9" />
        </div> */}
            </div>

            {/* Right side action - Icons container */}
            <div className="flex items-center gap-2">
                {/* notification */}
                {/* <NotificationDropdown></NotificationDropdown> */}

                {/* user dropdown */}
                <UserDropdown userInfo={userInfo}></UserDropdown>
            </div>
        </div>
    )
}