<script lang="ts">
    import { tick } from "svelte";
    import TerminalIcon from "@lucide/svelte/icons/terminal";
    import CircleCheck from "@lucide/svelte/icons/circle-check";
    import CircleX from "@lucide/svelte/icons/circle-x";
    import Clock from "@lucide/svelte/icons/clock";

    type LogType = "info" | "success" | "error" | "warning" | "docker" | string;

    interface LogEntry {
        timestamp: string;
        message: string;
        type: LogType;
        container?: string;
    }

    let { logs = [] }: { logs: LogEntry[] } = $props();
    let viewport = $state<HTMLDivElement>();

    $effect(() => {
        if (logs.length && viewport) {
            tick().then(() => {
                viewport!.scrollTo({ top: viewport!.scrollHeight, behavior: "smooth" });
            });
        }
    });
</script>

<div class="flex flex-col bg-[#09090b] rounded-none border-none overflow-scroll-x h-[60vh]">
    <div bind:this={viewport} class="flex-1 overflow-y-auto p-6 font-mono text-[13px] leading-relaxed">
        {#each logs as log}
            <div class="flex gap-4 py-0.5 group">
                <span class="shrink-0 text-zinc-600 select-none tabular-nums">{log.timestamp}</span>

                {#if log.container}
                    <span
                        class="inline-flex items-center rounded-md bg-blue-500/10 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-blue-400 border border-blue-500/20 mt-0.5"
                    >
                        {log.container}
                    </span>
                {/if}

                <span
                    class="
                    {log.type === 'error' ? 'text-red-400' : ''}
                    {log.type === 'success' ? 'text-emerald-400' : ''}
                    {log.type === 'warning' ? 'text-amber-400' : ''}
                    {log.type === 'info' ? 'text-zinc-300' : ''}
                    {log.type === 'docker' ? 'text-blue-400' : ''}
                "
                >
                    {#if log.type === "success"}<CircleCheck class="inline size-3 mr-1" />{/if}
                    {#if log.type === "error"}<CircleX class="inline size-3 mr-1" />{/if}
                    {log.message}
                </span>
            </div>
        {/each}
    </div>

    <div class="px-4 py-2 bg-zinc-900/50 border-t border-zinc-800 flex justify-between items-center">
        <div class="flex items-center gap-4 text-[10px] text-zinc-500 font-medium uppercase tracking-wider">
            <span class="flex items-center gap-1"><Clock class="size-3" /> Live Feed</span>
            <span>{logs.length} Lines</span>
        </div>
    </div>
</div>
