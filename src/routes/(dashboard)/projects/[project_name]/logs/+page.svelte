<script lang="ts">
    import Page from "$lib/components/blocks/content/Page.svelte";

    const PAGE_TITLE = $state("Logs");
</script>

<Page title={PAGE_TITLE}>
    <div class="relative flex flex-col gap-4 overflow-auto px-4 lg:px-6">
        <h1 class="font-heading">{PAGE_TITLE}</h1>
    </div>
</Page>
