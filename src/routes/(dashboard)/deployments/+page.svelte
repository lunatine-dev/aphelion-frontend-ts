<script lang="ts">
    import ProjectSelect from "$lib/components/blocks/content/ProjectSelect.svelte";

    import IconGitCherryPick from "@tabler/icons-svelte/icons/git-cherry-pick";

    const PAGE_TITLE = $state("Deployments");

    import Page from "$lib/components/blocks/content/Page.svelte";
</script>

<Page title={PAGE_TITLE}>
    <ProjectSelect title="Deployments" path="deployments" Icon={IconGitCherryPick} />
</Page>
