// server/api/trpc.ts
import { cache } from 'react';
import { auth } from '@/lib/auth';
import type { ReadonlyRequestCookies } from '@/types';
import db from '../db';

// Cached session resolver with error handling
const getSession = cache(async (headers?: Headers) => {
    if (!headers) return null;
    try {
        return await auth.api.getSession({ headers });
    } catch (error) {
        console.error('Failed to get session:', error);
        return null;
    }
});

export interface CreateContextOptions {
    headers?: Headers; // optional now
    cookies?: ReadonlyRequestCookies; // optional now
    session?: Awaited<ReturnType<typeof auth.api.getSession>> | null; // optional
}

export const createContext = async ({ req, opts = {} }: { req?: Request; opts?: CreateContextOptions } = {}) => {
    const session = opts.session !== undefined ? opts.session : await getSession(opts.headers);

    return {
        db,
        session,
        user: session?.user ?? null,
        req: req ?? null,
        ...opts
    };
};

export type Context = Awaited<ReturnType<typeof createContext>>;
