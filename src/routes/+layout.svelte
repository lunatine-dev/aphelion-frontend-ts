<script lang="ts">
    import "./layout.css";

    import { ModeWatcher } from "mode-watcher";
    import { APP_NAME } from "$lib/components/constants";

    import favicon from "$lib/assets/favicon.svg";
    import favicon96 from "$lib/assets/favicon-96x96.png";
    import appleTouchIcon from "$lib/assets/apple-touch-icon.png";
    import favicon192 from "$lib/assets/web-app-manifest-192x192.png";
    import favicon512 from "$lib/assets/web-app-manifest-512x512.png";

    let { children } = $props();
</script>

<ModeWatcher />

<svelte:head>
    <link rel="manifest" href="/manifest.json" />
    <meta name="theme-color" content="#005f5a" />
    <meta name="msapplication-TileColor" content="#005f5a" />

    <meta property="og:type" content="website" />
    <meta property="og:url" content="https://aphelion.sh" />
    <meta property="og:image" content={favicon512} />

    <link rel="icon" type="image/png" href={favicon96} sizes="96x96" />
    <link rel="icon" type="image/svg+xml" href={favicon} />
    <link rel="shortcut icon" href={favicon} />
    <link rel="apple-touch-icon" sizes="180x180" href={appleTouchIcon} />
    <meta name="apple-mobile-web-app-title" content={APP_NAME} />
</svelte:head>

{@render children()}
