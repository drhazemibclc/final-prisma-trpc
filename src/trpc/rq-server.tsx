import "server-only";
import { dehydrate, HydrationBoundary, type QueryClient } from "@tanstack/react-query";
import { createTRPCOptionsProxy } from "@trpc/tanstack-react-query";
import { cookies, headers } from "next/headers";
import { cache } from "react";
import { createContext } from "@/server/api/context";
import { appRouter } from "./routers/_app";
import { createQueryClient } from "./shared";

/**
 * Creates a stable getter for the query client,
 * ensuring the same client is used throughout a single request.
 */
const getQueryClient = cache(createQueryClient);

/**
 * Creates the tRPC proxy for server-side usage,
 * including a query client and context.
 */
export const trpc = createTRPCOptionsProxy({
    router: appRouter,
    queryClient: getQueryClient,
    ctx: async () => {
        const serverHeaders = await headers();
        const serverCookies = await cookies();

        return createContext({
            req: new Request("http://localhost", { headers: serverHeaders }),
            opts: {
                headers: serverHeaders,
                cookies: serverCookies,
            },
        });
    },
});
/**
 * A wrapper component that hydrates the query client state
 * for use in client components.
 */
export function HydrateClient(props: { children: React.ReactNode }) {
    const dehydratedState = dehydrate(getQueryClient());
    return <HydrationBoundary state={dehydratedState}>{props.children}</HydrationBoundary>;
}

/**
 * Type for prefetch options - using tRPC's proper types
 */
type PrefetchOptions = Parameters<QueryClient["prefetchQuery"]>[0];
type PrefetchInfiniteOptions = Parameters<QueryClient["prefetchInfiniteQuery"]>[0];

/**
 * A type guard to check if options are for an infinite query
 */
function isInfiniteQuery(options: PrefetchOptions | PrefetchInfiniteOptions): options is PrefetchInfiniteOptions {
    // Check if it has infinite query specific properties
    return "cursor" in options || "initialCursor" in options;
}

/**
 * Correctly typed prefetch function using tRPC's built-in methods
 */
export async function prefetch(options: PrefetchOptions | PrefetchInfiniteOptions) {
    const queryClient = getQueryClient();

    if (isInfiniteQuery(options)) {
        await queryClient.prefetchInfiniteQuery(options);
    } else {
        await queryClient.prefetchQuery(options);
    }
}
