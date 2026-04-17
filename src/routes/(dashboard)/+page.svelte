<script lang="ts">
    import Page from "$lib/components/blocks/content/Page.svelte";
    import Deployments from "$lib/components/graphs/statistics/Deployments.svelte";
</script>

<Page title="Dashboard" padding={true}>
    <Deployments />
</Page>
