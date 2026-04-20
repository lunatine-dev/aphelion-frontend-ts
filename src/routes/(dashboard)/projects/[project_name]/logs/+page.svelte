<script lang="ts">
    import LogViewer from "./LogViewer.svelte";

    const mockLogs = [
        { timestamp: "12:00:01", type: "info", message: "Starting deployment to production..." },
        { timestamp: "12:00:04", type: "docker", container: "api-v2", message: "Pulling image node:20-alpine" },
        {
            timestamp: "12:00:08",
            type: "docker",
            container: "api-v2",
            message: "Extracting layers... [####################] 100%",
        },
        { timestamp: "12:00:12", type: "success", message: "Build completed in 14.2s" },
        { timestamp: "12:00:13", type: "error", message: "Post-deployment health check failed on node-01" },
        { timestamp: "12:00:15", type: "warning", message: "Retrying health check (1/3)..." },
    ];
</script>

<div class="flex flex-col h-full space-y-6">
    <div class="flex-1 min-h-0 pb-6">
        <LogViewer logs={mockLogs} />
    </div>
</div>
