<script lang="ts">
    import { PROJECT_TEMPLATE } from "$lib/components/constants";

    import Page from "$lib/components/blocks/content/Page.svelte";
    import ProjectItem from "./ProjectItem.svelte";

    const PAGE_TITLE = $state("Applications");
    const repositories = Array.from({ length: 12 }, () => structuredClone(PROJECT_TEMPLATE));
</script>

<Page title={PAGE_TITLE}>
    <div class="relative flex flex-col gap-4 overflow-auto px-4 lg:px-6">
        <h1 class="font-heading">{PAGE_TITLE}</h1>
        <div
            class="grid grid-cols-1 gap-4 px-4 lg:px-6 @xl/main:grid-cols-2 @5xl/main:grid-cols-4 overflow-hidden py-1"
        >
            {#each repositories as repo, i}
                <ProjectItem {...repo} index={i} />
            {/each}
        </div>
    </div>
</Page>
