<script lang="ts">
    import type { Snippet } from "svelte";

    import { page } from "$app/state";

    import * as Sidebar from "$lib/components/ui/sidebar";
    import { Button, type ButtonSize, type ButtonVariant } from "$lib/components/ui/button";
    import { Separator } from "$lib/components/ui/separator";
    import * as Breadcrumb from "$lib/components/ui/breadcrumb";
    import { toggleMode } from "mode-watcher";

    import { items } from "$lib/components/blocks/navigation/sidebar/NavItems";
    import favicon from "$lib/assets/favicon.svg";
    import { APP_NAME } from "$lib/components/constants";

    import SunIcon from "@lucide/svelte/icons/sun";
    import MoonIcon from "@lucide/svelte/icons/moon";

    type ButtonType = {
        text: string;
        href: string;
        size?: ButtonSize;
        target: string;
        icon?: Snippet;
        variant?: ButtonVariant;
    };

    interface Props {
        children: Snippet;
        title: string;
        buttons?: ButtonType[];
        extraClasses?: string;
        classOverride?: string;
        blank?: boolean;
        buttonsSnippet?: Snippet;
        padding?: boolean;
        border?: boolean;
    }

    let {
        children,
        title,
        buttons = [],
        extraClasses,
        classOverride,
        blank = false,
        buttonsSnippet,
        padding = false,
        border = true,
    }: Props = $props();

    const crumbAliases: Record<string, string> = {
        infra: "Infrastructure",
        apps: "Applications",
    };

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
                if (group.title.toLowerCase() === segment.toLowerCase()) foundTitle = group.title;
                const item = group.items.find((i) => i.url === cumulativePath);
                if (item) {
                    foundTitle = item.title;
                    hasUrlInConfig = true;
                }
            }

            const displayTitle = foundTitle || segment;

            const isProjectIdSegment = index === 1 && segments[0] === "projects";

            let finalHref = "";
            if (isProjectIdSegment) {
                finalHref = !isLast ? cumulativePath : "";
            } else if (!isLast && hasUrlInConfig) {
                finalHref = cumulativePath;
            }

            result.push({
                title: isLast && title ? title : displayTitle,
                href: finalHref,
            });
        });

        return result;
    });
</script>

<svelte:head>
    <title>{APP_NAME} - {title ?? "Unknown"}</title>
    <meta property="og:title" content={`${APP_NAME} - ${title ?? "Unknown"}`} />
</svelte:head>

<header
    class="h-(--header-height) group-has-data-[collapsible=icon]/sidebar-wrapper:h-(--header-height) flex shrink-0 items-center gap-2 {border
        ? 'border-b'
        : false} transition-[width,height] ease-linear"
>
    <div class="flex w-full items-center gap-1 px-4 lg:gap-2 lg:px-6">
        <Sidebar.Trigger class="-ml-1" />
        <Separator orientation="vertical" class="mx-2 data-[orientation=vertical]:h-4" />
        {#if !autoCrumbs.length}
            <h1 class="text-base font-medium font-heading">
                {title ?? "Title"}
            </h1>
        {:else}
            <Breadcrumb.Root>
                <Breadcrumb.List>
                    {#each autoCrumbs as crumb, index}
                        {@const title = crumbAliases[crumb.title.toLowerCase()] ?? crumb.title}
                        <Breadcrumb.Item>
                            {#if crumb.href}
                                <Breadcrumb.Link href={crumb.href}>
                                    {title}
                                </Breadcrumb.Link>
                            {:else}
                                <Breadcrumb.Page class="flex items-center gap-1">
                                    {title}
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
                    variant={button.variant ?? "ghost"}
                    size={button.size ?? "default"}
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
            <Button onclick={toggleMode} variant="outline" size="icon">
                <SunIcon
                    class="h-[1.2rem] w-[1.2rem] scale-100 rotate-0 transition-all! dark:scale-0 dark:-rotate-90"
                />
                <MoonIcon
                    class="absolute h-[1.2rem] w-[1.2rem] scale-0 rotate-90 transition-all! dark:scale-100 dark:rotate-0"
                />
                <span class="sr-only">Toggle theme</span>
            </Button>
        </div>
    </div>
</header>

{#if !blank}
    <div class="flex flex-1 flex-col">
        <div class="@container/main flex flex-1 flex-col gap-2">
            <div
                class={classOverride
                    ? classOverride
                    : `flex flex-col justify-center gap-4 py-4 md:gap-6 md:py-6 ${extraClasses} ${padding ? "px-4 lg:px-6" : ""}`}
            >
                {@render children?.()}
            </div>
        </div>
    </div>
{:else}
    <div class="flex flex-1 flex-col">
        <div class={padding ? `relative flex flex-col gap-4 overflow-auto px-4 lg:px-6 @container` : ""}>
            {@render children?.()}
        </div>
    </div>
{/if}
