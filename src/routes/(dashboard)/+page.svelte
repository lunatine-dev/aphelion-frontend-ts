<script lang="ts">
    import Page from "$lib/components/blocks/content/Page.svelte";
    import Deployments from "$lib/components/graphs/statistics/Deployments.svelte";
</script>

<Page title="Dashboard">
    <div class="relative flex flex-col gap-4 overflow-auto px-4 lg:px-6">
        <Deployments />
    </div>
</Page>
