<script lang="ts">
    import * as Table from "$lib/components/ui/table";
    import { Badge } from "$lib/components/ui/badge";
    import IconGitBranch from "@tabler/icons-svelte/icons/git-branch";
    import IconDots from "@tabler/icons-svelte/icons/dots";
    import { Button } from "$lib/components/ui/button";

    const statusMap = {
        Ready: "bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.4)]",
        Error: "bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.4)]",
        Building: "bg-amber-500 animate-pulse",
        Canceled: "bg-zinc-500",
    };
    const deployments = [
        {
            id: "BuyxBif72",
            status: "Ready",
            isCurrent: true,
            environment: "Production",
            duration: "39s",
            branch: "main",
            commitId: "9b64f08",
            message: "refactor: readme cleanup",
            date: "12/24/25",
            author: "lunatine-dev",
        },
        {
            id: "BuyxBif72",
            status: "Building",
            isCurrent: false,
            environment: "Production",
            duration: "39s",
            branch: "main",
            commitId: "9b64f08",
            message: "refactor: readme cleanup",
            date: "12/24/25",
            author: "lunatine-dev",
        },
        {
            id: "BuyxBif72",
            status: "Error",
            isCurrent: false,
            environment: "Production",
            duration: "39s",
            branch: "main",
            commitId: "9b64f08",
            message: "refactor: readme cleanup",
            date: "12/24/25",
            author: "lunatine-dev",
        },
        {
            id: "BuyxBif72",
            status: "Canceled",
            isCurrent: false,
            environment: "Production",
            duration: "39s",
            branch: "main",
            commitId: "9b64f08",
            message: "refactor: readme cleanup",
            date: "12/24/25",
            author: "lunatine-dev",
        },
    ];
</script>

<div class="border border-zinc-900 px-4">
    <Table.Root>
        <Table.Header>
            <Table.Row class="hover:bg-transparent border-zinc-900 uppercase">
                <Table.Head class="text-[10px] font-bold tracking-widest text-zinc-500">Deployment</Table.Head>
                <Table.Head class="text-[10px] font-bold tracking-widest text-zinc-500">Status</Table.Head>
                <Table.Head class="text-[10px] font-bold tracking-widest text-zinc-500">Commit</Table.Head>
                <Table.Head class="text-[10px] font-bold tracking-widest text-zinc-500 text-right">Timeline</Table.Head>
                <Table.Head class="w-12.5"></Table.Head>
            </Table.Row>
        </Table.Header>
        <Table.Body>
            {#each deployments as dep}
                <Table.Row class="border-zinc-900 hover:bg-zinc-950/50 transition-colors group/row">
                    <Table.Cell>
                        <div class="flex flex-col">
                            <span class="text-sm font-bold text-zinc-200">{dep.id}</span>
                            <div class="flex items-center gap-2">
                                <span class="text-[11px] text-zinc-500">{dep.environment}</span>
                                {#if dep.isCurrent}
                                    <Badge
                                        class="bg-blue-500/10 text-blue-500 border-blue-500/20 text-[9px] h-4 px-1.5 uppercase font-bold"
                                    >
                                        Current
                                    </Badge>
                                {/if}
                            </div>
                        </div>
                    </Table.Cell>

                    <Table.Cell>
                        <div class="flex items-center gap-2">
                            <div class="h-2 w-2 rounded-full {statusMap[dep?.status] || statusMap.Canceled}"></div>

                            <div class="flex flex-col">
                                <span class="text-xs font-medium text-zinc-300">{dep.status}</span>
                                <span class="text-[10px] text-zinc-600 font-mono">{dep.duration}</span>
                            </div>
                        </div>
                    </Table.Cell>

                    <Table.Cell>
                        <div class="flex flex-col gap-1">
                            <div class="flex items-center gap-1 text-zinc-400">
                                <IconGitBranch size={12} />
                                <span class="text-xs font-mono">{dep.branch}</span>
                            </div>
                            <div class="flex items-center gap-2">
                                <code class="text-[10px] text-zinc-500 bg-zinc-900 px-1 rounded border border-zinc-800">
                                    {dep.commitId}
                                </code>
                                <span class="text-xs text-zinc-400 truncate max-w-62.5">{dep.message}</span>
                            </div>
                        </div>
                    </Table.Cell>

                    <Table.Cell class="text-right">
                        <div class="flex flex-col">
                            <span class="text-xs text-zinc-300 font-mono">{dep.date}</span>
                            <span class="text-[10px] text-zinc-600">by {dep.author}</span>
                        </div>
                    </Table.Cell>

                    <Table.Cell>
                        <button
                            class="opacity-0 group-hover/row:opacity-100 transition-opacity p-1 hover:bg-zinc-900 rounded text-zinc-500 hover:text-zinc-200"
                        >
                            <IconDots size={16} />
                        </button>
                    </Table.Cell>
                </Table.Row>
            {/each}
        </Table.Body>
    </Table.Root>
</div>

<div class="flex w-full justify-center mt-3">
    <Button variant="secondary" class="uppercase px-5" size="lg">Load More</Button>
</div>
