<script lang="ts">
    import { PUBLIC_BACKEND_URL } from "$env/static/public";

    import * as Card from "$lib/components/ui/card";
    import { Button } from "$lib/components/ui/button";

    let mouseX = $state(0);
    let mouseY = $state(0);

    function handleMouseMove(e: MouseEvent) {
        mouseX = e.clientX;
        mouseY = e.clientY;
    }
</script>

<div class="relative flex h-screen w-full items-center justify-center overflow-hidden bg-slate-950 px-4">
    <div class="absolute h-125 w-125 rounded-full bg-teal-500/10 blur-[120px] animate-pulse"></div>

    <div
        class="pointer-events-none absolute inset-0 opacity-20 mask-[radial-gradient(ellipse_at_center,black,transparent)] bg-[url('https://grainy-gradients.vercel.app/noise.svg')]"
    ></div>
    <Card.Root class="z-10 mx-auto w-full max-w-sm border-teal-500/20 bg-slate-950/50 backdrop-blur-xl shadow-2xl">
        <Card.Header class="space-y-1">
            <Card.Title class="font-mono text-xl uppercase tracking-widest text-teal-500">Authentication</Card.Title>
            <Card.Description class="font-sans text-slate-400">
                Aphelion requires GitHub authentication to manage your sessions.
            </Card.Description>
        </Card.Header>
        <Card.Content>
            <div class="grid gap-4">
                <Button
                    href={PUBLIC_BACKEND_URL + "/oauth/github"}
                    variant="default"
                    class="w-full bg-teal-600 hover:bg-teal-500 text-white font-mono uppercase tracking-tight"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                    >
                        <path
                            d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.28 1.15-.28 2.35 0 3.5-.73 1.02-1.08 2.25-1 3.5 0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"
                        />
                        <path d="M9 18c-4.51 2-5-2-7-2" />
                    </svg>
                    Continue with GitHub
                </Button>
            </div>
            <div class="mt-6 border-t border-slate-800 pt-4">
                <p class="text-center text-xs text-slate-500 font-sans">
                    By authenticating, you agree to our <a
                        href="/legal/terms-of-service"
                        class="underline hover:text-teal-500">Terms of Service</a
                    >.
                </p>
            </div>
        </Card.Content>
    </Card.Root>
</div>
