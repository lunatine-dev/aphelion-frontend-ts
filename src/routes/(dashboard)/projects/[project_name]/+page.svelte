<script lang="ts">
    import { page } from "$app/state";

    import Page from "$lib/components/blocks/content/Page.svelte";

    const PAGE_TITLE = page.params.project_name ?? "Application";
</script>

<Page title={PAGE_TITLE} padding={true}>
    <h1>{PAGE_TITLE}</h1>
</Page>
