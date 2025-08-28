import { cn } from "@/lib/utils";

function Skeleton({ className, ...properties }: React.ComponentProps<"div">) {
    return (
        <div
            className={cn("animate-pulse rounded-md bg-accent", className)}
            data-slot="skeleton"
            {...properties}
        />
    );
}

export { Skeleton };
