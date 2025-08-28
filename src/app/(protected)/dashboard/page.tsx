"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { authClient, useRole } from "@/lib/auth/auth-client"; // your client session hook wrapper
import { DashboardContent } from "./_components/dashboard-content";
import { DashboardSkeleton } from "./_components/dashboard-skeleton";

export default function DashboardPage() {
    const router = useRouter();
    const { data: session, isPending } = authClient.useSession();
    const userRole = useRole(); // make a hook for role

    const loading = isPending;

    useEffect(() => {
        if (!(loading || (session && userRole))) {
            router.push("/signin");
        }
    }, [loading, session, userRole, router]);

    if (loading) {
        return <DashboardSkeleton />;
    }

    if (!session) {
        // Optionally, you could redirect here, but useEffect already handles it.
        return null;
    }

    return (
        <DashboardContent
            session={session?.session}
            user={session?.user ?? null}
            userRole={userRole ?? ""}
        />
    );
}
