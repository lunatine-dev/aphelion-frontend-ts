import type { NavConfig } from "$lib/types/nav";
import IconDashboard from "@tabler/icons-svelte/icons/dashboard";

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
];
