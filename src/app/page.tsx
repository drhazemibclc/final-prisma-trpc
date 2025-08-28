"use client";

import { FeaturesSection } from "@/components/home/FeaturesSection";
import { FinalCTA } from "@/components/home/FinalCTA";
import { Footer } from "@/components/home/Footer";
import { Header } from "@/components/home/Header";
import { HeroSection } from "@/components/home/HeroSection";
import { TestimonialsSection } from "@/components/home/TestimonialsSection";
import { TITLE_TEXT } from "@/constants/titleText";
import { trpc } from "@/trpc/client";

export default function Home() {
    const { data, isLoading } = trpc.healthCheck.useQuery();

    return (
        <main className="flex min-h-screen flex-col">
            <Header />
            <HeroSection />

            {/* TITLE_TEXT Section */}
            <section className="container mx-auto max-w-4xl px-4 py-6">
                <pre className="mb-4 overflow-x-auto font-mono text-muted-foreground text-xs sm:text-sm">
                    {TITLE_TEXT}
                </pre>
                <div className="rounded-xl border bg-card p-4 shadow-sm">
                    <h2 className="mb-3 font-semibold text-lg">API Status</h2>
                    <div className="flex items-center gap-2">
                        <span
                            className={`h-3 w-3 rounded-full ${
                                isLoading ? "animate-pulse bg-yellow-500" : data ? "bg-green-500" : "bg-red-500"
                            }`}
                        />
                        <span className="text-muted-foreground text-sm">
                            {isLoading ? "Checking..." : data ? "Connected" : "Disconnected"}
                        </span>
                    </div>
                </div>
            </section>

            <FeaturesSection />
            <TestimonialsSection />
            <FinalCTA />
            <Footer />
        </main>
    );
}
