import { Skeleton } from "@/components/ui/skeleton";

export function DashboardSkeleton() {
    const skeletonIds = ["a", "b", "c", "d", "e"];

    return (
        <div className="space-y-6">
            {/* Header skeleton */}
            <div className="flex items-center justify-between">
                <Skeleton className="h-8 w-32" />
                <Skeleton className="h-10 w-64" />
            </div>

            {/* Card skeletons */}
            <div className="space-y-4">
                {skeletonIds.map(id => (
                    <div
                        key={`skeleton-${id}`}
                        className="space-y-3 rounded-lg border p-4"
                    >
                        <div className="flex items-start justify-between">
                            <Skeleton className="h-6 w-48" />
                            <Skeleton className="h-6 w-20" />
                        </div>
                        <div className="space-y-2">
                            <Skeleton className="h-4 w-32" />
                            <Skeleton className="h-4 w-24" />
                        </div>
                    </div>
                ))}
            </div>

            {/* Footer skeleton */}
            <div className="flex justify-center space-x-2">
                <Skeleton className="h-10 w-10" />
                <Skeleton className="h-10 w-10" />
                <Skeleton className="h-10 w-10" />
            </div>
        </div>
    );
}
