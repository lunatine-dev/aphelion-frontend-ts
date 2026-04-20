<script lang="ts">
    import { languageColors } from "$lib/components/languageColors";
    type LanguageEntry = {
        color: string | null;
        url: string;
    };

    import Code from "@tabler/icons-svelte/icons/code";

    //Languages
    import JavaScript from "@devicon/svelte/javascript/plain/JavascriptPlainIcon.svelte";
    import TypeScript from "@devicon/svelte/typescript/plain/TypescriptPlainIcon.svelte";
    import Svelte from "@devicon/svelte/svelte/plain/SveltePlainIcon.svelte";
    import Bash from "@devicon/svelte/bash/plain/BashPlainIcon.svelte";

    let icons = {
        JavaScript,
        TypeScript,
        Shell: Bash,
        Svelte,
    };

    interface Props {
        language: string;
        text: string;
        size?: string;
        className?: string;
    }
    let { language, text, size = "1.5em", className }: Props = $props();

    let Icon = $derived(icons[language as keyof typeof icons] || Code);

    const colorsMap = languageColors as unknown as Record<string, LanguageEntry>;
    let color = $derived(colorsMap[language]?.color || "#fff");
</script>

<div class={text ? "flex items-center gap-2" : ""}>
    <Icon {color} {size} class={className} />
    {#if text}
        <span class="text-sm" style={`color:${color};`}>{language}</span>
    {/if}
</div>
