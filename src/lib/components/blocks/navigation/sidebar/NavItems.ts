import type { NavConfig } from "$lib/types/nav";
import { UserRank } from "$lib/types/auth";

import IconDashboard from "@tabler/icons-svelte/icons/dashboard";

import IconGitCherryPick from "@tabler/icons-svelte/icons/git-cherry-pick";
import IconLayoutGrid from "@tabler/icons-svelte/icons/layout-grid";
import IconLogs from "@tabler/icons-svelte/icons/logs";

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
                title: "Applications",
                url: "/apps",
                icon: IconLayoutGrid,
            },
            {
                title: "Deployments",
                url: "/deployments",
                icon: IconGitCherryPick,
            },
            { title: "Logs", url: "/logs", icon: IconLogs },
        ],
    },
    {
        title: "Infrastructure",
        items: [{ title: "Nodes", url: "/infra/nodes", icon: IconServer }],
        ranks: [UserRank.Dev],
    },
    {
        title: "System",
        items: [
            { title: "Audit Log", url: "/system/audit", icon: IconReport },
            { title: "Settings", url: "/system/settings", icon: IconSettings },
        ],
        ranks: [UserRank.Dev],
    },
];
