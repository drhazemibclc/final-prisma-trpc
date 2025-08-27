import { PrismaClient } from '@prisma/client';
import { withAccelerate } from '@prisma/extension-accelerate';

// import { PrismaClient } from './generated/client';

const createClient = () =>
    new PrismaClient({
        transactionOptions: {
            isolationLevel: 'ReadCommitted',
            timeout: 10_000,
            maxWait: 10_000
        },
        errorFormat: 'pretty',
        log: process.env.NODE_ENV === 'development' ? ['query', 'warn', 'error'] : ['error']
    }).$extends(withAccelerate());

// Global singleton pattern (for dev hot-reloading)
const globalForPrisma = globalThis as unknown as {
    __PRISMA__: ReturnType<typeof createClient> | undefined;
};

// Only create a new client if not already present
const client = globalForPrisma.__PRISMA__ ?? createClient();

if (process.env.NODE_ENV !== 'production') {
    globalForPrisma.__PRISMA__ = client;
}

export const db = client;
export default db;
export const prisma = client;
