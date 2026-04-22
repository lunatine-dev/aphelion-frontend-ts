<script>
    import * as Card from "$lib/components/ui/card";
    import { Badge } from "$lib/components/ui/badge";
    import { Button } from "$lib/components/ui/button";

    import ProjectOverviewCard from "./ProjectOverviewCard.svelte";

    import IconGitCommit from "@tabler/icons-svelte/icons/git-commit";
    import IconServer from "@tabler/icons-svelte/icons/server";
    import IconNetwork from "@tabler/icons-svelte/icons/network";
    import IconBrandDocker from "@tabler/icons-svelte/icons/brand-docker";
    import IconCircleCheck from "@tabler/icons-svelte/icons/circle-check";
    import IconCircleX from "@tabler/icons-svelte/icons/circle-x";
    import IconExternalLink from "@tabler/icons-svelte/icons/external-link";

    const PROJECT_TEMPLATE = {
        name: "umbra",
        docker: {
            container: "umbra_prod",
            status: "online",
        },
        commits: [
            {
                id: "7f8e2a",
                message: "feat: add health-check endpoint for docker agent",
                timeAgo: "12m ago",
            },
            {
                id: "a2b1c4",
                message: "fix: resolve race condition in session rotation middleware",
                timeAgo: "2h ago",
            },
            {
                id: "9d3f5b",
                message: "chore: bump fastify from 4.26.1 to 4.27.0",
                timeAgo: "5h ago",
            },
            {
                id: "e1c8d2",
                message: "docs: update port mapping examples in readme",
                timeAgo: "1d ago",
            },
            {
                id: "b4a7f9",
                message: "refactor: optimize mongoose query for deployment history",
                timeAgo: "2d ago",
            },
        ],
        deployments: [
            {
                id: "DE-9901",
                commit: "7f8e2a",
                message: "feat: add health-check endpoint for docker agent",
                time: "12m ago",
                status: "success",
            },
            {
                id: "DE-9900",
                commit: "a2b1c4",
                message: "fix: resolve race condition in session rotation middleware",
                time: "2h ago",
                status: "success",
            },
            {
                id: "DE-9899",
                commit: "d3f5b9",
                message: "chore: bump fastify from 4.26.1 to 4.27.0",
                time: "5h ago",
                status: "error",
            },
            {
                id: "DE-9898",
                commit: "e1c8d2",
                message: "docs: update port mapping examples in readme",
                time: "1d ago",
                status: "success",
            },
        ],
    };
</script>

<div class="flex flex-col gap-6 w-full dark:text-zinc-200">
    <header class="flex items-center justify-between">
        <div class="flex flex-col gap-1">
            <div class="flex items-center gap-3">
                <h1 class="text-3xl font-bold tracking-tighter font-mono">{PROJECT_TEMPLATE.name}</h1>
                <Badge
                    class={`${PROJECT_TEMPLATE.docker.status === "online" ? "bg-emerald-500/10 text-emerald-500 border-emerald-500/20" : "bg-rose-500/10 text-rose-500 border-rose-500/20"} text-[10px] py-0 px-2 font-bold uppercase`}
                >
                    ● {PROJECT_TEMPLATE.docker.status}
                </Badge>
            </div>
            <p class="text-xs text-gray-500 dark:text-zinc-500 font-mono">
                Container: {PROJECT_TEMPLATE.docker.container}
            </p>
        </div>

        <div class="flex gap-2">
            <Button variant="outline">View on GitHub</Button>
        </div>
    </header>

    <div class="grid grid-cols-1 lg:grid-cols-4 gap-4">
        <ProjectOverviewCard title="Node Status" Icon={IconServer}>
            <span class="text-sm font-mono">fra-production-01</span>
            <div class="flex items-center gap-2">
                <div class="h-2 w-2 rounded-full bg-emerald-500"></div>
                <span class="text-xs dark:text-zinc-400">Node Online (142.250.180.14)</span>
            </div>
        </ProjectOverviewCard>
        <ProjectOverviewCard title="Port Map" Icon={IconNetwork}>
            <span class="text-sm font-mono dark:text-zinc-200 font-bold">8080 : 3000</span>
            <span class="text-[10px] dark:text-zinc-500 uppercase tracking-tighter">Host → Container</span>
        </ProjectOverviewCard>
        <ProjectOverviewCard title="Local Container" Icon={IconBrandDocker}>
            <span class="text-sm font-mono dark:text-zinc-200 italic">umbra_latest</span>
            <span class="text-[10px] dark:text-zinc-500">Built from ./Dockerfile</span>
        </ProjectOverviewCard>
        <ProjectOverviewCard title="Source Branch" Icon={IconGitCommit}>
            <span class="text-sm font-mono dark:text-zinc-200 italic">main</span>
            <span class="text-[10px] dark:text-zinc-500 uppercase tracking-tighter">Auto-Deploy Enabled</span>
        </ProjectOverviewCard>
    </div>
    <div class="grid grid-cols-12 gap-8 mt-10">
        <div class="col-span-12 lg:col-span-8 space-y-4">
            <div class="flex items-center justify-between px-1">
                <h3 class="text-[11px] font-bold text-zinc-500 uppercase tracking-widest">Latest Deployments</h3>
                <a
                    class="text-[10px] text-zinc-600 hover:text-zinc-400 font-mono transition-colors"
                    href={`/projects/${PROJECT_TEMPLATE.name}/deployments`}
                >
                    View All →
                </a>
            </div>

            <div class="divide-y divide-zinc-900 border-t border-zinc-900">
                {#each PROJECT_TEMPLATE.deployments as dep}
                    <div
                        class="group flex items-center justify-between py-4 hover:bg-zinc-950/5 hover:dark:bg-zinc-950/20 px-2 rounded-md transition-colors"
                    >
                        <div class="flex items-center gap-4">
                            {#if dep.status === "success"}
                                <IconCircleCheck size={18} class="text-emerald-500 stroke-[1.5]" />
                            {:else}
                                <IconCircleX size={18} class="text-red-500 stroke-[1.5]" />
                            {/if}

                            <div class="flex flex-col">
                                <div class="flex items-center gap-2">
                                    <span class="text-sm font-bold dark:text-zinc-200 tracking-tight"
                                        >{dep.message}</span
                                    >
                                    <code
                                        class="text-[10px] px-1.5 py-0.5 dark:bg-zinc-900 dark:text-zinc-500 rounded border dark:border-zinc-800 uppercase"
                                    >
                                        {dep.commit}
                                    </code>
                                </div>
                                <div class="flex items-center gap-2 mt-0.5 text-[10px] font-mono text-zinc-600">
                                    <span class="uppercase">ID: {dep.id}</span>
                                    <span>•</span>
                                    <span>{dep.time}</span>
                                </div>
                            </div>
                        </div>

                        <div class="flex items-center gap-4 opacity-0 group-hover:opacity-100 transition-opacity">
                            <button class="text-zinc-500 hover:text-white transition-colors">
                                <IconExternalLink size={16} />
                            </button>
                        </div>
                    </div>
                {/each}
            </div>
        </div>

        <div class="col-span-12 lg:col-span-4 space-y-4">
            <h3 class="text-[11px] font-bold text-zinc-500 uppercase tracking-widest px-1">Recent Commits</h3>
            <div class="space-y-6 border-l border-zinc-900 ml-2 pl-4">
                {#each PROJECT_TEMPLATE.commits as commit, i}
                    <div class="relative {i > 0 ? 'opacity-50' : ''}">
                        <div
                            class="absolute -left-5.25 mt-1.5 h-2 w-2 rounded-full bg-zinc-800 border border-black"
                        ></div>

                        <p class="text-xs font-bold text-zinc-600 dark:text-zinc-300 leading-tight">{commit.message}</p>
                        <p class="text-[10px] text-zinc-600 font-mono mt-1">
                            <span class="text-zinc-500 font-bold">{commit.id}</span> · {commit.timeAgo}
                        </p>
                    </div>
                {/each}
            </div>
        </div>
    </div>
</div>
