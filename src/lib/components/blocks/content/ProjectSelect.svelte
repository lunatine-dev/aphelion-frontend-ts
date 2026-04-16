<script lang="ts">
    import type { Component } from "svelte";
    interface Props {
        path: string;
        title: string;
        Icon: any;
    }

    import { goto } from "$app/navigation";
    import { PROJECT_TEMPLATE } from "$lib/components/constants";

    import * as Empty from "$lib/components/ui/empty/index.js";
    import { Input } from "$lib/components/ui/input/index.js";

    import IconArrowBadgeRightFilled from "@tabler/icons-svelte/icons/arrow-badge-right";

    let { path, Icon, title }: Props = $props();
    const repositories = Array.from({ length: 8 }, () => structuredClone(PROJECT_TEMPLATE));

    const navigate = (app_name: string, path: string) => {
        return goto(`/projects/${app_name}/${path}`);
    };
</script>

<Empty.Root>
    <Empty.Header>
        <Empty.Media variant="icon">
            <Icon />
        </Empty.Media>
        <Empty.Title>{title}</Empty.Title>
        <Empty.Description>Choose an application</Empty.Description>
    </Empty.Header>
    <Empty.Content>
        <div class="w-full max-w-96 flex flex-col items-center">
            <div class="w-full mb-4 px-1">
                <Input type="text" placeholder="Find application..." />
            </div>

            <div class="w-full max-h-80 overflow-y-auto pr-1 aphelion-scrollbar">
                <div class="space-y-1">
                    {#each repositories as app}
                        <button
                            onclick={() => navigate(app.name, path)}
                            type="button"
                            class="group flex w-full items-center justify-between rounded-md px-3 py-2.5 text-sm transition-all cursor-pointer
                               text-neutral-500 hover:text-neutral-900
                               dark:text-neutral-400 dark:hover:text-white
                               hover:bg-neutral-100 dark:hover:bg-neutral-900/50"
                        >
                            <span class="flex items-center gap-3">
                                <span
                                    class="opacity-40 transition-opacity group-hover:opacity-100 flex items-center justify-center"
                                >
                                    <Icon />
                                </span>
                                <span class="font-normal transition-colors group-hover:font-medium">
                                    {app.name}
                                </span>
                            </span>

                            <IconArrowBadgeRightFilled
                                size={16}
                                class="opacity-0 transition-opacity group-hover:opacity-100 dark:group-hover:opacity-40 text-neutral-900 dark:text-white"
                            />
                        </button>
                    {/each}
                </div>
            </div>
        </div>
    </Empty.Content>
</Empty.Root>

<style>
</style>
