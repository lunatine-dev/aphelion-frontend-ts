<script lang="ts">
    import ProjectSelect from "$lib/components/blocks/content/ProjectSelect.svelte";

    import IconLogs from "@lucide/svelte/icons/logs";

    const PAGE_TITLE = $state("Logs");

    import Page from "$lib/components/blocks/content/Page.svelte";
</script>

<Page title={PAGE_TITLE}>
    <ProjectSelect title="Logs" path="logs" Icon={IconLogs} />
</Page>
