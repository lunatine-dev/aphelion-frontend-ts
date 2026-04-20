<script lang="ts">
    import { page } from "$app/state";
    import type { Snippet } from "svelte";

    import Page from "$lib/components/blocks/content/Page.svelte";
    import SubNav from "./SubNav.svelte";

    const titleMap: Record<string, string> = {
        "/deployments": "Deployments",
        "/logs": "Logs",
        "/environment": "Environment Variables",
        "/git": "Git Repository",
    };

    const projectSlug = $derived(page.params.project_name);
    const title = $derived(() => {
        const path = page.url.pathname;
        const match = Object.entries(titleMap).find(([key]) => path.endsWith(key));

        return match ? match[1] : projectSlug || "Overview";
    });

    const fluidRoutes = ["/deployments", "/logs"];
    const isFluid = $derived(fluidRoutes.some((route) => page.url.pathname.endsWith(route)));

    interface Props {
        children?: Snippet;
    }
    let { children }: Props = $props();
</script>

<Page title={title()} blank={true} border={false}>
    <div>
        <SubNav />
    </div>
    <div class={isFluid ? "" : "p-8"}>
        {@render children?.()}
    </div>
</Page>
