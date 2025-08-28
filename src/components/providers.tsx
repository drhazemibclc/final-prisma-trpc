"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { httpBatchLink } from "@trpc/client";
import SuperJSON from "superjson";
import { trpc } from "@/trpc/client";
import { ThemeProvider } from "./theme-provider";
import { Toaster } from "./ui/sonner";

const queryClient = new QueryClient();

// Create tRPC client for the browser
const trpcClient = trpc.createClient({
    links: [
        httpBatchLink({
            url: "/api/trpc",
            transformer: SuperJSON,
        }),
    ],
});

export default function Providers({ children }: { children: React.ReactNode }) {
    return (
        <ThemeProvider
            attribute="class"
            defaultTheme="system"
            disableTransitionOnChange
            enableSystem
        >
            <QueryClientProvider client={queryClient}>
                <trpc.Provider
                    client={trpcClient}
                    queryClient={queryClient}
                >
                    {children}
                </trpc.Provider>
                <ReactQueryDevtools initialIsOpen={false} />
            </QueryClientProvider>
            <Toaster richColors />
        </ThemeProvider>
    );
}
