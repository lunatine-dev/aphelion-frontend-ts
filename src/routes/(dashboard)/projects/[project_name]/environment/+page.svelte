<script>
    import { Button } from "$lib/components/ui/button";
    import { Input } from "$lib/components/ui/input";

    // Icons
    import IconSearch from "@tabler/icons-svelte/icons/search";
    import IconEye from "@tabler/icons-svelte/icons/eye";
    import IconEyeOff from "@tabler/icons-svelte/icons/eye-off";
    import IconCopy from "@tabler/icons-svelte/icons/copy";
    import IconPencil from "@tabler/icons-svelte/icons/pencil";
    import IconTrash from "@tabler/icons-svelte/icons/trash";
    import IconKey from "@tabler/icons-svelte/icons/key";

    let visibleKey = $state(null);
    let editingKey = $state(null);
    let search = $state("");

    let mockEnvVars = $state([
        { id: 1, key: "ENCRYPTION_KEY", value: "8f39b2a1c5d0e4f7" },
        { id: 2, key: "GITHUB_APP_ID", value: "123456" },
        { id: 3, key: "JWT_SECRET", value: "super_secret_jwt_token_string" },
    ]);

    const mask = "****************************";
</script>

<div>
    <div class="flex items-center justify-between bg-neutral-950 p-2 rounded-none border-x border-t border-neutral-800">
        <div class="flex items-center gap-2">
            <div
                class="bg-neutral-900 border border-neutral-800 rounded px-2 py-1 flex items-center gap-2 text-xs text-neutral-400"
            >
                <span>Development</span>
                <span class="opacity-30">|</span>
                <IconSearch class="w-3 h-3" />
            </div>
        </div>
        <div class="flex items-center gap-2">
            <Button variant="ghost" size="sm" class="text-[11px] h-7 text-neutral-400 hover:text-white">
                <IconEye class="w-3 h-3 mr-1" /> Reveal Values
            </Button>
            <Button class="bg-emerald-600 hover:bg-emerald-700 text-white text-[11px] h-7 px-3">+ Add Secret</Button>
        </div>
    </div>

    <div class="border border-neutral-800 bg-neutral-950 overflow-hidden">
        <div
            class="grid grid-cols-[40px_250px_1fr_200px] items-center px-4 py-2 border-b border-neutral-800 text-[11px] text-neutral-500 font-medium uppercase tracking-wider bg-neutral-900/30"
        >
            <div class="flex justify-center"><input type="checkbox" class="accent-emerald-500" /></div>
            <div>Name</div>
            <div>Value</div>
            <div class="text-right">Actions</div>
        </div>

        {#each mockEnvVars as item (item.id)}
            <div
                class="grid grid-cols-[40px_250px_1fr_200px] items-center px-4 py-1.5 border-b last:border-none border-neutral-800 group hover:bg-neutral-900/50 transition-all"
                class:bg-emerald-950={editingKey === item.id}
            >
                <div class="flex justify-center">
                    <IconKey class="w-3.5 h-3.5 text-neutral-600 group-hover:text-neutral-400" />
                </div>

                <div class="font-mono text-xs">
                    {#if editingKey === item.id}
                        <input
                            bind:value={item.key}
                            class="bg-transparent border-none focus:ring-0 text-emerald-400 w-full outline-none"
                        />
                    {:else}
                        <span class="text-neutral-300">{item.key}</span>
                    {/if}
                </div>

                <div class="font-mono text-xs flex items-center gap-2">
                    {#if editingKey === item.id}
                        <input
                            bind:value={item.value}
                            class="bg-neutral-900/50 border border-emerald-800/50 rounded px-2 py-0.5 text-emerald-400 w-full outline-none focus:border-emerald-500"
                        />
                    {:else}
                        <span class="text-neutral-500 tracking-widest">
                            {visibleKey === item.id ? item.value : mask}
                        </span>
                    {/if}
                </div>

                <div class="flex justify-end items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    {#if editingKey === item.id}
                        <button
                            class="text-[10px] px-2 py-1 bg-emerald-600 rounded text-white"
                            onclick={() => (editingKey = null)}>Save</button
                        >
                    {:else}
                        <button
                            class="p-1.5 hover:bg-neutral-800 rounded text-neutral-500 hover:text-white"
                            onclick={() => (editingKey = item.id)}
                        >
                            <IconPencil class="w-3.5 h-3.5" />
                        </button>
                        <button class="p-1.5 hover:bg-neutral-800 rounded text-neutral-500 hover:text-white">
                            <IconCopy class="w-3.5 h-3.5" />
                        </button>
                        <button class="p-1.5 hover:bg-neutral-800 rounded text-neutral-500 hover:text-rose-500">
                            <IconTrash class="w-3.5 h-3.5" />
                        </button>
                    {/if}
                </div>
            </div>
        {/each}
    </div>
</div>
