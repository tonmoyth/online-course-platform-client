import { getDefaultDashboardRoute, } from "@/lib/authUtils"
import { NavSection, UserRole } from "@/types/navItems.dashboar"


/**
 * Common navigation items for all authenticated users
 */
const getCommonNavItems = (role: UserRole): NavSection[] => {
    const defaultDashboard = getDefaultDashboardRoute(role)

    return [
        {
            items: [
                {
                    title: "Home",
                    href: "/",
                    icon: "Home",
                },
                {
                    title: "Dashboard",
                    href: defaultDashboard,
                    icon: "LayoutDashboard",
                }
            ],
        },
    ]
}

/**
 * ADMIN NAVIGATION
 */
const adminNavItems: NavSection[] = [
    {
        title: "User Management",
        items: [
            {
                title: "User Management",
                href: "/dashboard/user-management",
                icon: "Users",
            },
        ],
    },
    {
        title: "Role Management",
        items: [
            {
                title: "View Roles",
                href: "/dashboard/view-role",
                icon: "Eye",
            },
            {
                title: "Create Role",
                href: "/dashboard/create-role",
                icon: "Plus",
            },
        ],
    },
    {
        title: "Course Oversight",
        items: [
            {
                title: "Course Oversight",
                href: "/dashboard/course-oversight",
                icon: "BookOpen",
            },
        ],
    },
]

/**
 * INSTRUCTOR NAVIGATION
 */
const instructorNavItems: NavSection[] = [
    {
        title: "Course Management",
        items: [
            {
                title: "Create Course",
                href: "/dashboard/create-course",
                icon: "Plus",
            },
            {
                title: "Draft Courses",
                href: "/dashboard/draft-course",
                icon: "FileText",
            },
            // {
            //     title: "Course manage",
            //     href: "/dashboard/course-manage",
            //     icon: "FileEdit",
            // },


        ],
    }
]

/**
 * STUDENT NAVIGATION
 */
const studentNavItems: NavSection[] = [
    {
        title: "Courses",
        items: [
            {
                title: "All Courses",
                href: "/dashboard/all-courses",
                icon: "Book",
            },

        ],
    },
    {
        title: "Learning",
        items: [
            {
                title: "My Learning",
                href: "/dashboard/my-learning",
                icon: "GraduationCap",
            },


        ],
    },

]

/**
 * Get navigation items based on role
 */
export const getNavItems = (role: UserRole): NavSection[] => {
    const commonRoutes = getCommonNavItems(role)

    switch (role) {
        case "SUPER ADMIN":
            return [...commonRoutes, ...adminNavItems]
        case "ADMIN":
            return [...commonRoutes, ...adminNavItems]
        case "INSTRUCTOR":
            return [...commonRoutes, ...instructorNavItems]
        case "STUDENT":
            return [...commonRoutes, ...studentNavItems]
        default:
            return commonRoutes
    }
}

/**
 * Sidebar only (dashboard specific)
 */
export const getDashboardNavItems = (role: UserRole): NavSection[] => {
    switch (role) {
        case "ADMIN":
            return adminNavItems
        case "INSTRUCTOR":
            return instructorNavItems
        case "STUDENT":
            return studentNavItems
        default:
            return []
    }
}