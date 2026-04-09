<script lang="ts">
    import type { Snippet } from "svelte";

    import { page } from "$app/state";

    import * as Sidebar from "$lib/components/ui/sidebar";
    import { Button, type ButtonSize } from "$lib/components/ui/button";
    import { Separator } from "$lib/components/ui/separator";
    import * as Breadcrumb from "$lib/components/ui/breadcrumb";

    import { items } from "$lib/components/blocks/navigation/sidebar/NavItems";
    import favicon from "$lib/assets/favicon.svg";
    import { APP_NAME } from "$lib/components/constants";

    type ButtonType = {
        text: string;
        href: string;
        size: ButtonSize;
        target: string;
        icon?: Snippet;
    };

    interface Props {
        children: Snippet;
        title: string;
        buttons?: ButtonType[];
        extraClasses?: string;
        classOverride?: string;
        blank?: boolean;
        buttonsSnippet?: Snippet;
    }

    let { children, title, buttons = [], extraClasses, classOverride, blank = false, buttonsSnippet }: Props = $props();

    const autoCrumbs = $derived.by(() => {
        const pathname = page.url.pathname;
        const segments = pathname.split("/").filter(Boolean);

        const result = pathname !== "/" ? [{ title: "Dashboard", href: "/" }] : [];

        let cumulativePath = "";

        segments.forEach((segment, index) => {
            cumulativePath += `/${segment}`;
            const isLast = index === segments.length - 1;

            let foundTitle = "";
            let hasUrlInConfig = false;

            for (const group of items) {
                if (group.title.toLowerCase() === segment.toLowerCase()) {
                    foundTitle = group.title;
                }

                const item = group.items.find((i) => i.url === cumulativePath);
                if (item) {
                    foundTitle = item.title;
                    hasUrlInConfig = true;
                }
            }

            const displayTitle = foundTitle || segment.replace(/-/g, " ").replace(/\b\w/g, (l) => l.toUpperCase());

            result.push({
                title: isLast && title ? title : displayTitle,
                href: !isLast && hasUrlInConfig ? cumulativePath : "",
            });
        });

        return result;
    });
</script>

<svelte:head>
    <title>{APP_NAME} - {title ?? "Unknown"}</title>
</svelte:head>

<header
    class="h-(--header-height) group-has-data-[collapsible=icon]/sidebar-wrapper:h-(--header-height) flex shrink-0 items-center gap-2 border-b transition-[width,height] ease-linear"
>
    <div class="flex w-full items-center gap-1 px-4 lg:gap-2 lg:px-6">
        <Sidebar.Trigger class="-ml-1" />
        <Separator orientation="vertical" class="mx-2 data-[orientation=vertical]:h-4" />
        {#if !autoCrumbs.length}
            <h1 class="text-base font-medium">
                {title ?? "Title"}
            </h1>
        {:else}
            <Breadcrumb.Root>
                <Breadcrumb.List>
                    {#each autoCrumbs as crumb, index}
                        <Breadcrumb.Item>
                            {#if crumb.href}
                                <Breadcrumb.Link href={crumb.href}>
                                    {crumb.title}
                                </Breadcrumb.Link>
                            {:else}
                                <Breadcrumb.Page class="flex items-center gap-1">
                                    {crumb.title}
                                </Breadcrumb.Page>
                            {/if}
                        </Breadcrumb.Item>
                        {#if index < autoCrumbs.length - 1}
                            <Breadcrumb.Separator />
                        {/if}
                    {/each}
                </Breadcrumb.List>
            </Breadcrumb.Root>
        {/if}
        <div class="ml-auto flex items-center gap-2">
            {#each buttons as button}
                {@const Icon = button.icon}
                <Button
                    variant="ghost"
                    size={button.size}
                    class="dark:text-foreground hidden sm:flex"
                    target={button.target}
                    href={button.href}
                >
                    {#if button.icon}
                        <Icon />
                    {/if}
                    {button.text}
                </Button>
            {/each}
            {@render buttonsSnippet?.()}
        </div>
    </div>
</header>

{#if !blank}
    <div class="flex flex-1 flex-col">
        <div class="@container/main flex flex-1 flex-col gap-2">
            <div class={classOverride ? classOverride : `flex flex-col gap-4 py-4 md:gap-6 md:py-6 ${extraClasses}`}>
                {@render children?.()}
            </div>
        </div>
    </div>
{:else}
    <div class="flex flex-1 flex-col">
        {@render children?.()}
    </div>
{/if}
