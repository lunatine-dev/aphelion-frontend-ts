<script lang="ts">
    import * as Chart from "$lib/components/ui/chart";
    import * as Card from "$lib/components/ui/card";

    import { scaleUtc } from "d3-scale";
    import { LineChart } from "layerchart";
    import { curveNatural } from "d3-shape";

    const chartData = [
        { date: new Date("2026-04-01"), deployments: 12, failures: 1 },
        { date: new Date("2026-04-02"), deployments: 16, failures: 2 },
        { date: new Date("2026-04-03"), deployments: 5, failures: 0 },
    ];

    const chartConfig = {
        views: { label: "Deployments", color: "" },
        deployments: { label: "Deployments", color: "var(--color-green-600)" },
        failures: { label: "Failures", color: "var(--color-red-600)" },
    } satisfies Chart.ChartConfig;

    let activeChart = $state<keyof typeof chartConfig>("deployments");
    let chartType = $derived(activeChart[0].toUpperCase() + activeChart.slice(1));

    const total = $derived({
        deployments: chartData.reduce((acc, curr) => acc + curr.deployments, 0),
        failures: chartData.reduce((acc, curr) => acc + curr.failures, 0),
    });
    const activeSeries = $derived([
        {
            key: activeChart,
            label: chartConfig[activeChart].label,
            color: chartConfig[activeChart].color,
        },
    ]);
</script>

<Card.Root class="@container/card border-y">
    <Card.Header class="flex flex-col items-stretch space-y-0 border-b p-0 sm:flex-row">
        <div class="flex flex-1 flex-col justify-center gap-1 px-6 py-5 sm:py-6">
            <Card.Title>{chartType}</Card.Title>
            <Card.Description
                >Showing total {chartType.charAt(0).toLowerCase() + chartType.slice(1)} in the last month</Card.Description
            >
        </div>
        <div class="flex">
            {#each ["deployments", "failures"] as key (key)}
                {@const chart = key as keyof typeof chartConfig}
                <button
                    data-active={activeChart === chart}
                    class="data-[active=true]:bg-muted/50 relative z-30 flex flex-1 flex-col justify-center gap-1 border-t px-6 py-4 text-start even:border-s sm:border-s sm:border-t-0 sm:px-8 sm:py-6"
                    onclick={() => (activeChart = chart)}
                >
                    <span class="text-muted-foreground text-xs">
                        {chartConfig[chart].label}
                    </span>
                    <span class="text-lg leading-none font-bold sm:text-3xl">
                        {total[key as keyof typeof total].toLocaleString()}
                    </span>
                </button>
            {/each}
        </div>
    </Card.Header>
    <Card.Content class="px-2 sm:p-6">
        <Chart.Container config={chartConfig} class="aspect-auto h-62.5 w-full">
            <LineChart
                data={chartData}
                x="date"
                xScale={scaleUtc()}
                axis="x"
                series={activeSeries}
                props={{
                    spline: { curve: curveNatural, motion: "tween", strokeWidth: 2 },
                    xAxis: {
                        format: (v: Date) => {
                            return v.toLocaleDateString("en-US", {
                                month: "short",
                                day: "numeric",
                            });
                        },
                    },
                    highlight: { points: { r: 4 } },
                }}
            >
                {#snippet tooltip()}
                    <Chart.Tooltip hideLabel />
                {/snippet}
            </LineChart>
        </Chart.Container>
    </Card.Content>
</Card.Root>
