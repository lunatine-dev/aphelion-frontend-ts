<script lang="ts">
    import Page from "$lib/components/blocks/content/Page.svelte";
    import Deployments from "$lib/components/graphs/statistics/Deployments.svelte";
    import type { User } from "$lib/types/auth";

    interface Props {
        data: {
            user?: User;
        };
    }

    let { data }: Props = $props();
</script>

<Page title="Dashboard" padding={true}>
    <Deployments />
</Page>
