"use client";

import type { QueryClient } from "@tanstack/react-query";
import { QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { createTRPCClient, httpBatchStreamLink, loggerLink } from "@trpc/client";
import { createTRPCContext } from "@trpc/tanstack-react-query";
import { useState } from "react";
import type { AppRouter } from "./routers/_app";
import { createQueryClient, getUrl, transformer } from "./shared";

export const { TRPCProvider, useTRPC } = createTRPCContext<AppRouter>();

let clientQueryClientSingleton: QueryClient | undefined;
const getQueryClient = () => {
    if (typeof window === "undefined") {
        // Server: always make a new query client
        return createQueryClient();
    }
    // Browser: use singleton pattern to keep the same query client
    return clientQueryClientSingleton ?? createQueryClient();
};

export function TRPCReactProvider(props: { children: React.ReactNode }) {
    const queryClient = getQueryClient();

    const [trpcClient] = useState(() =>
        createTRPCClient<AppRouter>({
            links: [
                loggerLink({
                    enabled: op =>
                        process.env.NODE_ENV === "development" ||
                        (op.direction === "down" && op.result instanceof Error),
                }),
                httpBatchStreamLink({
                    transformer,
                    url: getUrl(),
                    headers: { "x-trpc-source": "react-query" },
                }),
            ],
        })
    );

    return (
        <TRPCProvider
            trpcClient={trpcClient}
            queryClient={queryClient}
        >
            <QueryClientProvider client={queryClient}>
                {props.children}
                <ReactQueryDevtools />
            </QueryClientProvider>
        </TRPCProvider>
    );
}
