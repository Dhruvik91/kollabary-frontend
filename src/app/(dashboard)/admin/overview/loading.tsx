import { Skeleton } from '@/components/ui/skeleton';

export default function Loading() {
    return (
        <div className="space-y-8 animate-pulse p-1">
            <div className="flex flex-col gap-2">
                <Skeleton className="h-10 w-48 rounded-lg" />
                <Skeleton className="h-4 w-64 rounded-md" />
            </div>

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                {[...Array(4)].map((_, i) => (
                    <Skeleton key={i} className="h-32 w-full rounded-2xl" />
                ))}
            </div>

            <div className="grid gap-6 lg:grid-cols-2">
                <Skeleton className="h-80 w-full rounded-2xl" />
                <Skeleton className="h-80 w-full rounded-2xl" />
            </div>
        </div>
    );
}
