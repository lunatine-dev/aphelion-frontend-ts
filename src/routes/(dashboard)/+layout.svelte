<script lang="ts">
    import type { User } from "$lib/types/auth";
    import type { Snippet } from "svelte";

    import * as Sidebar from "$lib/components/ui/sidebar";
    import SidebarMain from "$lib/components/blocks/navigation/sidebar/SidebarMain.svelte";

    interface Props {
        children?: Snippet;
        data: {
            user?: User;
        };
    }

    let { children, data }: Props = $props();
</script>

<Sidebar.Provider style="--sidebar-width: calc(var(--spacing) * 72); --header-height: calc(var(--spacing) * 12);">
    <SidebarMain variant="inset" user={data?.user} />
    <Sidebar.Inset>
        {@render children?.()}
    </Sidebar.Inset>
</Sidebar.Provider>
