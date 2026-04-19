<script lang="ts">
    import * as Card from "$lib/components/ui/card";
    import type { Snippet } from "svelte";

    interface Props {
        title: string;
        children: Snippet;
        Icon?: any;
    }

    let { title, Icon, children }: Props = $props();
</script>

<Card.Root class="bg-transparent">
    <Card.Header>
        <Card.Title class="font-mono uppercase text-[10px] text-zinc-500 flex items-center tracking-widest font-bold">
            {#if Icon}
                <Icon class="mr-2 stroke-[1.5]" size={14} />
            {/if}
            {title}
        </Card.Title>
    </Card.Header>
    <Card.Content>
        <div class="flex flex-col gap-0.5">
            {@render children?.()}
        </div>
    </Card.Content>
</Card.Root>
