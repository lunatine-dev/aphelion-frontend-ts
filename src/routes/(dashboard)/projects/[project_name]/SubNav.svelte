<script lang="ts">
    import { page } from "$app/state";
    import { fade } from "svelte/transition";

    import * as NavigationMenu from "$lib/components/ui/navigation-menu";
    import { IsMobile } from "$lib/hooks/is-mobile.svelte";

    import IconGitCherryPick from "@tabler/icons-svelte/icons/git-cherry-pick";
    import IconLogs from "@lucide/svelte/icons/logs";
    import IconKey from "@tabler/icons-svelte/icons/key";
    import IconLayoutGrid from "@tabler/icons-svelte/icons/layout-grid";
    import IconBrandGit from "@tabler/icons-svelte/icons/brand-git";
    import IconSettings from "@tabler/icons-svelte/icons/settings";

    const projectMatch = $derived(page.url.pathname.match(/\/projects\/[^/]+/));
    const projectBase = $derived(projectMatch ? projectMatch[0] : "");

    const isMobile = new IsMobile();

    const items = [
        { title: "Overview", path: "", icon: IconLayoutGrid },
        { title: "Deployments", path: "/deployments", icon: IconGitCherryPick },
        { title: "Logs", path: "/logs", icon: IconLogs },
        { title: "Git", path: "/git", icon: IconBrandGit },
        {
            title: "Settings",
            icon: IconSettings,
            children: [
                {
                    title: "Environment Variables",
                    path: "/environment",
                    icon: IconKey,
                },
            ],
        },
    ];

    const isActive = $derived((itemPath: string) => {
        const fullPath = `${projectBase}${itemPath}`;

        if (itemPath === "") {
            return page.url.pathname === projectBase;
        }

        return page.url.pathname.startsWith(fullPath);
    });
</script>

<div class=" w-full border-b border-border bg-background/50 backdrop-blur-sm px-4 lg:px-6 hidden md:block">
    <NavigationMenu.Root
        class="relative z-10 flex max-w-max flex-1 items-center justify-center"
        viewport={isMobile.current}
    >
        <NavigationMenu.List class="flex h-10 gap-6">
            {#each items as item (item.title)}
                {@const Icon = item.icon}
                {#if item.children}
                    {@const active = item.children.some((child) => isActive(child.path))}
                    <NavigationMenu.Item class="h-full">
                        <NavigationMenu.Trigger
                            class="bg-transparent! hover:bg-transparent! focus:bg-transparent!
           data-[state=open]:bg-transparent! shadow-none!
           rounded-none! px-1 h-full
           group relative flex items-center gap-2 text-sm font-medium transition-colors
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
                        </NavigationMenu.Trigger>
                        <NavigationMenu.Content>
                            <ul class="grid w-50 gap-4 p-2">
                                <li>
                                    {#each item.children as child (child.title)}
                                        {@const href = `${projectBase}${child.path}`}
                                        {@const ChildIcon = child.icon}
                                        <NavigationMenu.Link {href}>
                                            {#if ChildIcon}<ChildIcon size={16} />{/if}
                                            {child.title}
                                        </NavigationMenu.Link>
                                    {/each}
                                </li>
                            </ul>
                        </NavigationMenu.Content>
                    </NavigationMenu.Item>
                {:else}
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
                {/if}
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
