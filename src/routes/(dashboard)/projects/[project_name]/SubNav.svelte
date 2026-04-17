<script lang="ts">
    import { page } from "$app/state";
    import { fade } from "svelte/transition";
    import * as NavigationMenu from "$lib/components/ui/navigation-menu";

    import IconGitCherryPick from "@tabler/icons-svelte/icons/git-cherry-pick";
    import IconLogs from "@lucide/svelte/icons/logs";
    import IconKey from "@tabler/icons-svelte/icons/key";
    import IconLayoutGrid from "@tabler/icons-svelte/icons/layout-grid";

    const projectMatch = $derived(page.url.pathname.match(/\/projects\/[^/]+/));
    const projectBase = $derived(projectMatch ? projectMatch[0] : "");

    const items = [
        { title: "Overview", path: "", icon: IconLayoutGrid },
        { title: "Deployments", path: "/deployments", icon: IconGitCherryPick },
        { title: "Logs", path: "/logs", icon: IconLogs },
        { title: "Environment", path: "/environment", icon: IconKey },
    ];

    const isActive = $derived((itemPath: string) => {
        const fullPath = `${projectBase}${itemPath}`;

        if (itemPath === "") {
            return page.url.pathname === projectBase;
        }

        return page.url.pathname.startsWith(fullPath);
    });
</script>

<div class=" w-full border-b border-border bg-background/50 backdrop-blur-sm px-4 lg:px-6">
    <NavigationMenu.Root
        class="max-w-screen-2xl justify-start w-full overflow-scroll no-scrollbar md:w-auto md:overflow-auto"
    >
        <NavigationMenu.List class="flex h-10 gap-6">
            {#each items as item (item.title)}
                {@const Icon = item.icon}
                {@const active = isActive(item.path)}
                {@const href = `${projectBase}${item.path}`}

                <NavigationMenu.Item class="h-full">
                    <NavigationMenu.Link {active} class="h-full">
                        {#snippet child({ props })}
                            <a
                                {href}
                                {...props}
                                class="relative flex h-full items-center gap-2 px-1 text-sm font-medium transition-colors
                                {active ? 'text-foreground' : 'text-muted-foreground hover:text-foreground'}"
                            >
                                {#if Icon}<Icon size={16} />{/if}
                                {item.title}

                                {#if active}
                                    <div
                                        class="absolute inset-x-0 -bottom-px h-0.5 bg-primary"
                                        aria-hidden="true"
                                        transition:fade={{ duration: 100 }}
                                    ></div>
                                {/if}
                            </a>
                        {/snippet}
                    </NavigationMenu.Link>
                </NavigationMenu.Item>
            {/each}
        </NavigationMenu.List>
    </NavigationMenu.Root>
</div>

<style>
    .no-scrollbar {
        -ms-overflow-style: none;
        scrollbar-width: none;

        &::-webkit-scrollbar {
            display: none;
        }
    }
</style>
