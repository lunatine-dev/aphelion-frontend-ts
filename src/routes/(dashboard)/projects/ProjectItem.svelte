<script lang="ts">
    import type { User } from "$lib/types/auth";
    import type { Server } from "$lib/types/server";

    import { fly } from "svelte/transition";

    import * as Card from "$lib/components/ui/card";
    import { Button } from "$lib/components/ui/button";
    import * as DropdownMenu from "$lib/components/ui/dropdown-menu";

    import IconBrandGithub from "@tabler/icons-svelte/icons/brand-github";
    import IconDots from "@tabler/icons-svelte/icons/dots";
    import IconAlertCircle from "@tabler/icons-svelte/icons/alert-circle";
    import IconGitBranch from "@tabler/icons-svelte/icons/git-branch";
    import IconBox from "@tabler/icons-svelte/icons/box";
    import LanguageIcon from "$lib/components/LanguageIcon.svelte";

    interface Props {
        name: string;
        repositoryName: string;
        branch: string;
        createdAt: Date;
        updatedAt: Date;
        lastCommit: {
            text: string;
            date: Date;
        };
        index: number;
        language: string;
    }

    let { name, repositoryName, branch, lastCommit, index, language }: Props = $props();
</script>

<div in:fly={{ y: 20, duration: 500, delay: index * 100 }}>
    <Card.Root class="relative w-full max-w-sm  hover:outline group">
        <div class="px-4 py-1">
            <div class="flex items-start justify-between">
                <div class="flex items-center gap-3">
                    <div class="flex h-10 w-10 items-center justify-center">
                        <LanguageIcon {language} className="group-hover:-rotate-6 transition transform" size="2em" />
                    </div>

                    <div class="flex flex-col leading-tight">
                        <a
                            href="/projects/{name}"
                            class="text-[15px] font-semibold tracking-tight text-black after:absolute after:inset-0 after:z-0 dark:text-white"
                        >
                            {name}
                        </a>
                        <span class="text-sm text-muted-foreground">{branch}</span>
                    </div>
                </div>

                <div class="flex gap-1">
                    <DropdownMenu.Root>
                        <DropdownMenu.Trigger>
                            {#snippet child({ props })}
                                <button
                                    {...props}
                                    class="flex h-7 w-7 rounded-full items-center justify-center text-muted-foreground cursor-pointer hover:text-white hover:bg-white/10 transition-colors relative z-10"
                                    onclick={(e) => {
                                        e.stopPropagation();
                                    }}
                                >
                                    <IconDots size={16} />
                                </button>
                            {/snippet}
                        </DropdownMenu.Trigger>
                        <DropdownMenu.Content class="w-56" align="start">
                            <DropdownMenu.Label>{name}</DropdownMenu.Label>
                            <DropdownMenu.Group>
                                <DropdownMenu.Item>Deployments</DropdownMenu.Item>
                                <DropdownMenu.Item>Logs</DropdownMenu.Item>
                                <DropdownMenu.Item>Git</DropdownMenu.Item>
                                <DropdownMenu.Item>Environment Variables</DropdownMenu.Item>
                            </DropdownMenu.Group>
                        </DropdownMenu.Content>
                    </DropdownMenu.Root>
                </div>
            </div>

            <div class="mt-3 flex flex-col gap-3">
                <a
                    class="flex w-fit items-center gap-2 rounded-full border px-3 py-0.5 z-5 hover:underline"
                    href={`https://github.com/${repositoryName}`}
                    target="_blank"
                >
                    <IconBrandGithub size={14} />
                    <span class="text-xs font-medium">{repositoryName}</span>
                </a>

                <div class="flex flex-col gap-0.5">
                    <p class="text-[15px] font-medium">{lastCommit.text}</p>
                    <div class="flex items-center gap-1 text-[13px] text-muted-foreground">
                        <span>{lastCommit.date.toLocaleDateString()} on</span>
                        <IconGitBranch size={12} />
                        <span>{branch}</span>
                    </div>
                </div>
            </div>
        </div>
    </Card.Root>
</div>
