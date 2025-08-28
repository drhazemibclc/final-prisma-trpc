// auth.ts
import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { admin as adminPlugin } from "better-auth/plugins";
import { headers } from "next/headers";
import { cache } from "react";
import prisma from "@/server/db";
import { ac, allRoles } from "./permissions";

// Constants for session max age
const ONE_DAY_IN_SECONDS = 60 * 60 * 24;

export const auth = betterAuth({
    database: prismaAdapter(prisma, { provider: "postgresql" }),
    trustedOrigins: [process.env["CORS_ORIGIN"] ?? "http://localhost:3000"],
    emailAndPassword: { enabled: true },
    advanced: {
        defaultCookieAttributes: {
            sameSite: "none",
            secure: true,
            httpOnly: true,
        },
    },
    session: {
        cookieCache: {
            enabled: true,
            maxAge: ONE_DAY_IN_SECONDS, // 1 day
        },
    },
    user: {
        additionalFields: {
            role: { type: "string", input: false },
            password: { type: "string", input: true },
        },
        changeEmail: { enabled: true },
        deleteUser: { enabled: true },
    },
    socialProviders: {
        github: {
            clientId: process.env["GITHUB_CLIENT_ID"] as string,
            clientSecret: process.env["GITHUB_CLIENT_SECRET"] as string,
        },
    },
    plugins: [adminPlugin({ ac, roles: allRoles })],
});

// tRPC & RSC-friendly memoized session retrieval
export const getSession = cache(async () => {
    return await auth.api.getSession({ headers: await headers() });
});

// Types for session, user, and roles
export type Session = typeof auth.$Infer.Session;
export type User = Session["user"];
export type Role = User["role"];

// Expose BetterAuth API for server usage
export const authServer = auth.api;
