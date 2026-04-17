<script lang="ts">
    import { PROJECT_TEMPLATE } from "$lib/components/constants";

    import { Button } from "$lib/components/ui/button";

    import Page from "$lib/components/blocks/content/Page.svelte";
    import ProjectItem from "./ProjectItem.svelte";

    import IconPlus from "@tabler/icons-svelte/icons/plus";

    const PAGE_TITLE = $state("Projects");
    const repositories = Array.from({ length: 12 }, () => structuredClone(PROJECT_TEMPLATE));
</script>

<Page title={PAGE_TITLE} padding={true}>
    {#snippet buttonsSnippet()}
        <Button href="/projects/new">
            <IconPlus />
            New Project
        </Button>
    {/snippet}
    <div
        class="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 fhd:grid-cols-4 qhd:grid-cols-6 uhd:grid-cols-8 py-1"
    >
        {#each repositories as repo, i}
            <ProjectItem {...repo} index={i} />
        {/each}
    </div>
</Page>
