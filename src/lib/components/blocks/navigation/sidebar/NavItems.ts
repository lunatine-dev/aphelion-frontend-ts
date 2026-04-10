import type { NavConfig } from "$lib/types/nav";
import IconDashboard from "@tabler/icons-svelte/icons/dashboard";
import { UserRank } from "$lib/types/auth";

export const items: NavConfig = [
    {
        title: "Overview",
        items: [
            {
                title: "Dashboard",
                url: "/",
                icon: IconDashboard,
            },
        ],
    },
    {
        title: "Admin",
        items: [
            {
                title: "Protected Route",
                url: "/protected",
                icon: IconDashboard,
            },
        ],
        ranks: [UserRank.Admin, UserRank.Dev],
    },
    {
        title: "Developer",
        items: [
            {
                title: "Protected Route",
                url: "/protected",
                icon: IconDashboard,
            },
        ],
        ranks: [UserRank.Dev],
    },
];
