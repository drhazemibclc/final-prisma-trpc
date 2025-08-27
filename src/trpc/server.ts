import { loggerLink } from '@trpc/client';
import { experimental_nextCacheLink } from '@trpc/next/app-dir/links/nextCache';
import { experimental_createTRPCNextAppDirServer } from '@trpc/next/app-dir/server';
import { createHydrationHelpers } from '@trpc/react-query/rsc';
import type { inferRouterInputs, inferRouterOutputs } from '@trpc/server';
import { cookies, headers } from 'next/headers';
import { cache } from 'react';
import SuperJSON from 'superjson';

import { createContext } from '@/server/api/context';
import type { ReadonlyRequestCookies } from '@/types';
import { makeQueryClient } from './query-client';
import { appRouter } from './routers/_app';

/**
 * Server-side tRPC API (direct invocation)
 */
export const api = experimental_createTRPCNextAppDirServer<typeof appRouter>({
    config() {
        return {
            links: [
                loggerLink({ enabled: () => true }),
                experimental_nextCacheLink<typeof appRouter>({
                    router: appRouter,
                    transformer: SuperJSON,
                    revalidate: 5,
                    createContext: async () => {
                        const serverHeaders = await headers();
                        const serverCookies = await cookies();
                        return createContext({
                            req: new Request('http://localhost', { headers: serverHeaders }),
                            opts: { headers: serverHeaders, cookies: serverCookies }
                        });
                    }
                })
            ]
        };
    }
});

// Cache query client per request
export const getQueryClient = cache(makeQueryClient);

// Cache server-side tRPC caller per request
export const getServerCaller = cache(async () => {
    const serverHeaders = await headers();
    const serverCookies = await cookies();

    const ctx = await createContext({
        req: new Request('http://localhost', { headers: serverHeaders }),
        opts: { headers: serverHeaders, cookies: serverCookies }
    });

    return appRouter.createCaller(ctx);
});

// Hydration helpers (server caller + query client)
export const createTrpc = async () => {
    const serverCaller = await getServerCaller();
    return createHydrationHelpers<typeof appRouter>(serverCaller, getQueryClient);
};

/**
 * Simple server-side tRPC caller.
 * Usage: const result = await trpc.doctor.getRatingById(id);
 */
export const trpc = new Proxy(
    {},
    {
        get(_, routerKey: string) {
            return new Proxy(
                {},
                {
                    get(_, procedureKey: string) {
                        return async (...args: unknown[]) => {
                            const ctx = await createContext({
                                req: new Request('http://localhost', { headers: await headers() }),
                                opts: { headers: await headers(), cookies: await cookies() }
                            });

                            const caller = appRouter.createCaller(ctx);
                            // @ts-expect-error dynamic access
                            return caller[routerKey]?.[procedureKey](...args);
                        };
                    }
                }
            );
        }
    }
);

// Types for router inputs and outputs
export type RouterInputs = inferRouterInputs<typeof appRouter>;
export type RouterOutputs = inferRouterOutputs<typeof appRouter>;
export const trpcCaller = async () => {
    // create a server-side context with dummy request (if needed)
    const context = await createContext({
        req: new Request('http://localhost'),
        opts: { headers: new Headers(), cookies: await cookies() }
    });

    return appRouter.createCaller(context);
};
/**
 * Explicit caller with request/session context
 */
export const createCaller = async (opts: {
    req: Request;
    headers: Headers;
    cookies: ReadonlyRequestCookies;
    session?: Awaited<ReturnType<typeof import('@/lib/auth').auth.api.getSession>> | null;
}) => {
    const ctx = await createContext({
        req: opts.req,
        opts: { headers: opts.headers, cookies: opts.cookies, session: opts.session }
    });
    return appRouter.createCaller(ctx);
};
