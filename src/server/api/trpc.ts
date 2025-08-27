import { experimental_createServerActionHandler } from '@trpc/next/app-dir/server';
import { initTRPC, TRPCError } from '@trpc/server';
import { cookies, headers } from 'next/headers';
import { ZodError } from 'zod';
import { getSession } from '@/lib/auth';
import { transformer } from '@/trpc/shared';
import { prisma } from '../db';
import type { Context } from './context';

const t = initTRPC.context<Context>().create({
    transformer,
    errorFormatter(opts) {
        const { shape, error } = opts;
        return {
            ...shape,
            data: {
                ...shape.data,
                zodError: error.code === 'BAD_REQUEST' && error.cause instanceof ZodError ? error.cause.flatten() : null
            }
        };
    }
});

/**
 * Create a server-side caller
 * @see https://trpc.io/docs/server/server-side-calls
 */
export const createCallerFactory = t.createCallerFactory;

export const createTRPCRouter = t.router;
export const publicProcedure = t.procedure;

export const protectedProcedure = publicProcedure.use(opts => {
    const { session } = opts.ctx;

    if (!session?.user) {
        throw new TRPCError({
            code: 'UNAUTHORIZED'
        });
    }

    return opts.next({ ctx: { session } });
});
export const createAction = experimental_createServerActionHandler(t, {
    async createContext() {
        const req = new Request(''); // dummy req if needed for compatibility

        const hdrs = await headers();
        const ckies = await cookies();

        const session = await getSession();

        return {
            db: prisma,
            session,
            user: session?.user ?? null,
            req,
            headers: hdrs,
            cookies: ckies
        };
    }
});
