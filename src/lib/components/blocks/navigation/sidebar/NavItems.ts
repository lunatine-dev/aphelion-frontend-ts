import type { NavConfig } from "$lib/types/nav";
import { UserRole } from "$lib/types/auth";

import IconDashboard from "@tabler/icons-svelte/icons/dashboard";

import IconLayoutGrid from "@tabler/icons-svelte/icons/layout-grid";

import IconServer from "@tabler/icons-svelte/icons/server";

import IconReport from "@tabler/icons-svelte/icons/report";
import IconSettings from "@tabler/icons-svelte/icons/settings";

export const items: NavConfig = [
    {
        title: "Overview",
        items: [
            {
                title: "Dashboard",
                url: "/",
                icon: IconDashboard,
            },
            {
                title: "Projects",
                url: "/projects",
                icon: IconLayoutGrid,
            },
        ],
    },
    {
        title: "Infrastructure",
        items: [{ title: "Nodes", url: "/infra/nodes", icon: IconServer }],
        roles: [UserRole.Dev],
    },
    {
        title: "System",
        items: [
            { title: "Audit Log", url: "/system/audit", icon: IconReport },
            { title: "Settings", url: "/system/settings", icon: IconSettings },
        ],
        roles: [UserRole.Dev],
    },
];
