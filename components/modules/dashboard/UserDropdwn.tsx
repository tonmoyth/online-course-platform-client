"use client"

import * as React from "react"
import swal from "sweetalert"
import { Button } from "@/components/ui/button"

import { toast } from "sonner"


import { Key, LogOut, User } from "lucide-react"
import Link from "next/link"
import { UserInfo } from "@/types/user.types"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { logoutAction } from "@/actions/auth/logout.action"
import { usePathname } from "next/navigation"

interface UserDropdownProps {
    userInfo: UserInfo
}

const UserDropdown = ({ userInfo }: UserDropdownProps) => {
    const [isLoggingOut, setIsLoggingOut] = React.useState(false)
    const pathname = usePathname()

    const handleLogout = async () => {
        const confirmed = await swal({
            title: "Are you sure?",
            text: "You will be logged out from the application.",
            icon: "warning",
            buttons: ["Cancel", "Logout"],
            dangerMode: true,
        })

        if (!confirmed) {
            return
        }

        setIsLoggingOut(true)

        try {
            const result = await logoutAction()

            if (!result.success) {

                setIsLoggingOut(false)
                return
            }

            toast.success("Logged out successfully")
            if (pathname === "/") {
                window.location.reload()
            } else {
                window.location.href = "/login"
            }
        } catch (error: any) {


            setIsLoggingOut(false)
        }
    }

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant={"outline"} size={"icon"} className="rounded-full">
                    <span className="text-sm font-semibold">
                        {userInfo?.name?.charAt(0).toUpperCase()}
                    </span>
                </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent align={"end"} className="w-56">
                <DropdownMenuLabel>
                    <div className="flex flex-col space-y-1">
                        <p className="text-sm font-medium">{userInfo?.name}</p>

                        <p className="text-xs text-muted-foreground">{userInfo?.email}</p>

                        <p className="text-xs text-primary capitalize">
                            {userInfo?.role?.name.toLowerCase().replace("_", " ")}
                        </p>
                    </div>
                </DropdownMenuLabel>

                <DropdownMenuSeparator />

                {/* <DropdownMenuItem>
                    <Link className="flex" href={"/my-profile"}>
                        <User className="mr-2 h-4 w-4" />
                        My Profile
                    </Link>
                </DropdownMenuItem> */}

                {/* <DropdownMenuItem>
                    <Link className="flex" href="/settings/change-password">
                        <Key className="mr-2 h-4 w-4" />
                        Change Password
                    </Link>
                </DropdownMenuItem> */}

                <DropdownMenuSeparator />

                <DropdownMenuItem
                    onClick={handleLogout}
                    className="cursor-pointer text-red-600"
                    disabled={isLoggingOut}
                >
                    <LogOut className="mr-2 h-4 w-4" />
                    {isLoggingOut ? "Logging out..." : "Logout"}
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}

export default UserDropdown