<script lang="ts">
    import Page from "$lib/components/blocks/content/Page.svelte";

    const PAGE_TITLE = $state("Deployments");
</script>

<Page title={PAGE_TITLE} padding={true}>
    <h1 class="font-heading">{PAGE_TITLE}</h1>
</Page>
