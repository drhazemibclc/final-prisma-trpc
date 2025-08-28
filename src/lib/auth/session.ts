import { cache } from "react";
import { getSession } from ".";

// Cache session for the duration of the request
export const getCachedSession = cache(async () => {
    try {
        return await getSession();
    } catch (error) {
        console.error("Failed to get session:", error);
        return null;
    }
});

// Get user role with caching
export const getCachedUserRole = cache(async () => {
    const session = await getCachedSession();
    return session?.user?.role ?? null;
});

// Get user ID with caching
export const getCachedUserId = cache(async () => {
    const session = await getCachedSession();
    return session?.user?.id ?? null;
});

// Check if user has a specific role
export const checkCachedRole = cache(async (roleToCheck: string) => {
    const userRole = await getCachedUserRole();
    return userRole?.toLowerCase() === roleToCheck.toLowerCase();
});
