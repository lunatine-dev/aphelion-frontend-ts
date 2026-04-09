<script lang="ts">
    import * as Sidebar from "$lib/components/ui/sidebar";

    import IconPlanet from "@tabler/icons-svelte/icons/planet";
    import { APP_NAME } from "$lib/components/constants";
</script>

<Sidebar.Menu>
    <Sidebar.MenuItem>
        <Sidebar.MenuButton class="data-[slot=sidebar-menu-button]:p-1.5!">
            {#snippet child({ props })}
                <a href="/" {...props}>
                    <IconPlanet class="size-5!" />
                    <span class="text-base font-semibold">{APP_NAME}</span>
                </a>
            {/snippet}
        </Sidebar.MenuButton>
    </Sidebar.MenuItem>
</Sidebar.Menu>
