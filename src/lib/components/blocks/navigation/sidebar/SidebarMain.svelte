<script lang="ts">
    import * as Sidebar from "$lib/components/ui/sidebar";
    import SidebarHeader from "$lib/components/blocks/navigation/sidebar/SidebarHeader.svelte";
    import SidebarContent from "$lib/components/blocks/navigation/sidebar/SidebarContent.svelte";
    import SidebarFooter from "$lib/components/blocks/navigation/sidebar/SidebarFooter.svelte";

    let { user, ...restProps } = $props();
</script>

<Sidebar.Root collapsible="icon" {...restProps}>
    <Sidebar.Header>
        <SidebarHeader />
    </Sidebar.Header>
    <Sidebar.Content>
        <SidebarContent {user} />
    </Sidebar.Content>
    <Sidebar.Footer>
        <SidebarFooter {user} />
    </Sidebar.Footer>
</Sidebar.Root>
