<script lang="ts">
    import { page } from "$app/state";
    import type { Snippet } from "svelte";

    import Page from "$lib/components/blocks/content/Page.svelte";
    import SubNav from "$lib/components/blocks/navigation/subnav/SubNav.svelte";

    const projectSlug = $derived(page.params.project_name);
    const title = $derived(() => {
        const path = page.url.pathname;

        if (path.endsWith("/deployments")) return "Deployments";
        if (path.endsWith("/logs")) return "Logs";
        if (path.endsWith("/environment")) return "Environment Settings";

        return projectSlug ? projectSlug : "Overview";
    });

    interface Props {
        children?: Snippet;
    }
    let { children }: Props = $props();
</script>

<Page title={title()} blank={true} border={false}>
    <div>
        <SubNav />
    </div>
    {@render children?.()}
</Page>
