<script lang="ts">
    import { page } from "$app/state";

    import * as Sidebar from "$lib/components/ui/sidebar";
    import * as Collapsible from "$lib/components/ui/collapsible";

    import { items } from "$lib/components/blocks/navigation/sidebar/NavItems";

    import IconChevronRight from "@tabler/icons-svelte/icons/chevron-right";

    let { user } = $props();
</script>

{#each items as item (item.title)}
    {@const isVisible = !item.ranks ? true : item.ranks.includes(user?.rank)}
    {#if isVisible}
        <Sidebar.Group>
            <Sidebar.GroupLabel>{item.title}</Sidebar.GroupLabel>
            <Sidebar.GroupContent class="flex flex-col gap-2">
                <Sidebar.Menu>
                    {#each item.items as navItem (navItem.title)}
                        {@const Icon = navItem.icon}
                        {#if !navItem.type}
                            <Sidebar.MenuItem>
                                <Sidebar.MenuButton
                                    tooltipContent={navItem.title}
                                    isActive={navItem.url === "/"
                                        ? page.url.pathname === navItem.url
                                        : page.url.pathname.includes(navItem.url)}
                                >
                                    {#snippet child({ props })}
                                        <a href={navItem.url} {...props}>
                                            {#if navItem.icon}
                                                <Icon />
                                            {/if}
                                            <span>{navItem.title}</span>
                                        </a>
                                    {/snippet}
                                </Sidebar.MenuButton>
                            </Sidebar.MenuItem>
                        {:else if navItem.type === "collapse"}
                            <Collapsible.Root
                                open={navItem.items?.some((c) => c.url === page.url.pathname)}
                                class="group/collapsible"
                            >
                                {#snippet child({ props })}
                                    <Sidebar.MenuItem {...props}>
                                        <Collapsible.Trigger>
                                            {#snippet child({ props })}
                                                <Sidebar.MenuButton {...props} tooltipContent={navItem.title}>
                                                    {#if navItem.icon}
                                                        <Icon />
                                                    {/if}
                                                    <span>{navItem.title}</span>
                                                    <IconChevronRight
                                                        class="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90"
                                                    />
                                                </Sidebar.MenuButton>
                                            {/snippet}
                                        </Collapsible.Trigger>
                                        <Collapsible.Content>
                                            <Sidebar.MenuSub>
                                                {#each navItem.items as subItem (subItem.title)}
                                                    {@const SubIcon = subItem.icon}
                                                    <Sidebar.MenuSubItem>
                                                        <Sidebar.MenuSubButton>
                                                            {#snippet child({ props })}
                                                                <a href={subItem.url} {...props}>
                                                                    {#if subItem.icon}
                                                                        <SubIcon />
                                                                    {/if}
                                                                    <span>{subItem.title}</span>
                                                                </a>
                                                            {/snippet}
                                                        </Sidebar.MenuSubButton>
                                                    </Sidebar.MenuSubItem>
                                                {/each}
                                            </Sidebar.MenuSub>
                                        </Collapsible.Content>
                                    </Sidebar.MenuItem>
                                {/snippet}
                            </Collapsible.Root>
                        {/if}
                    {/each}
                </Sidebar.Menu>
            </Sidebar.GroupContent>
        </Sidebar.Group>
    {/if}
{/each}
