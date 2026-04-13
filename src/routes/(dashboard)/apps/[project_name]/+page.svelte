<script lang="ts">
    import { page } from "$app/state";

    import Page from "$lib/components/blocks/content/Page.svelte";
</script>

<Page title={page.params.project_name ?? "Application"}>
    <div class="relative flex flex-col gap-4 overflow-auto px-4 lg:px-6">
        <h1>App</h1>
    </div>
</Page>
