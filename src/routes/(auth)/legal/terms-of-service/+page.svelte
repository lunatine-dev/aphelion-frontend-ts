<script lang="ts">
    import * as Card from "$lib/components/ui/card";

    const lastUpdated = "April 24, 2026";
</script>

<div class="relative flex h-screen w-full items-center justify-center bg-slate-950 px-4 antialiased overflow-hidden">
    <div class="absolute h-125 w-125 rounded-full bg-teal-500/10 blur-[120px] animate-pulse"></div>

    <Card.Root
        class="z-10 w-full max-w-2xl border-teal-500/20 bg-slate-950/80 backdrop-blur-xl shadow-2xl overflow-hidden py-0"
    >
        <Card.Header class="border-b border-white/5 bg-white/2 py-6">
            <div class="flex items-center justify-between">
                <div>
                    <Card.Title class="font-mono text-lg uppercase tracking-[0.2em] text-teal-500"
                        >Terms of Service</Card.Title
                    >
                    <Card.Description class="font-mono text-[10px] uppercase text-slate-500 mt-1">
                        Revision: {lastUpdated}
                    </Card.Description>
                </div>
                <a
                    href="/"
                    class="group flex items-center gap-2 font-mono text-[10px] text-slate-500 hover:text-white transition-colors"
                >
                    <span class="opacity-0 group-hover:opacity-100 transition-opacity">RETURN</span> [ X ]
                </a>
            </div>
        </Card.Header>

        <Card.Content class="p-0">
            <div class="h-[55vh] overflow-y-auto px-8 py-10 custom-scrollbar text-slate-400">
                <div class="space-y-12">
                    <section>
                        <h3 class="font-mono text-xs text-white uppercase mb-4 tracking-widest flex items-center gap-3">
                            <span class="text-teal-500">01</span> Acceptance of Terms
                        </h3>
                        <p class="text-sm leading-relaxed">
                            By authenticating via GitHub and accessing the Aphelion dashboard, you agree to be bound by
                            these Terms. Our infrastructure utilizes a <strong>Hub-and-Spoke model</strong> to manage remote
                            Docker nodes.
                        </p>
                    </section>

                    <section>
                        <h3 class="font-mono text-xs text-white uppercase mb-4 tracking-widest flex items-center gap-3">
                            <span class="text-teal-500">02</span> Infrastructure & Encryption
                        </h3>
                        <p class="text-sm leading-relaxed mb-4">
                            All sensitive environment variables and third-party tokens are encrypted at rest using <strong
                                >AES-256-GCM</strong
                            >.
                        </p>
                    </section>

                    <section>
                        <h3 class="font-mono text-xs text-white uppercase mb-4 tracking-widest flex items-center gap-3">
                            <span class="text-teal-500">03</span> Service Availability
                        </h3>
                        <p class="text-sm leading-relaxed">
                            Aphelion uses <strong>Blue/Green deployment strategies</strong> to minimize downtime. However,
                            we are not liable for interruptions caused by upstream GitHub API changes or maintenance to the
                            Fastify backend.
                        </p>
                    </section>
                </div>
            </div>
        </Card.Content>

        <Card.Footer class="border-t border-white/5 bg-white/2 py-4 flex justify-between items-center">
            <span class="text-[9px] font-mono text-slate-600 uppercase tracking-widest">Aphelion Engine</span>
            <div class="flex gap-4">
                <button class="text-[9px] font-mono text-teal-500/50 hover:text-teal-500 uppercase transition-colors"
                    >Privacy Policy</button
                >
                <button class="text-[9px] font-mono text-teal-500/50 hover:text-teal-500 uppercase transition-colors"
                    >System Status</button
                >
            </div>
        </Card.Footer>
    </Card.Root>
</div>

<style>
    /* Technical scrollbar styling */
    .custom-scrollbar::-webkit-scrollbar {
        width: 3px;
    }
    .custom-scrollbar::-webkit-scrollbar-track {
        background: transparent;
    }
    .custom-scrollbar::-webkit-scrollbar-thumb {
        background: rgba(20, 184, 166, 0.2);
        border-radius: 4px;
    }
    .custom-scrollbar::-webkit-scrollbar-thumb:hover {
        background: rgba(20, 184, 166, 0.5);
    }
</style>
