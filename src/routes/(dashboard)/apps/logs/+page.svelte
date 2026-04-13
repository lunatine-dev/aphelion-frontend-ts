<script lang="ts">
    const PAGE_TITLE = $state("Logs");

    import Page from "$lib/components/blocks/content/Page.svelte";
</script>

<Page title={PAGE_TITLE}>
    <div class="relative flex flex-col gap-4 overflow-auto px-4 lg:px-6">
        <h1>{PAGE_TITLE}</h1>
    </div>
</Page>
