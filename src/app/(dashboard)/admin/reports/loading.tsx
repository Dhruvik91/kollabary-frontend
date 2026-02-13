import { Skeleton } from '@/components/ui/skeleton';

export default function Loading() {
    return (
        <div className="space-y-6 animate-pulse p-1">
            <div className="flex flex-col gap-2">
                <Skeleton className="h-10 w-48 rounded-lg" />
                <Skeleton className="h-4 w-64 rounded-md" />
            </div>
            <div className="flex gap-4">
                <Skeleton className="h-12 flex-1 rounded-xl" />
                <Skeleton className="h-12 w-32 rounded-xl" />
            </div>
            {[...Array(5)].map((_, i) => (
                <div key={i} className="rounded-2xl border border-border/50 p-5 space-y-4">
                    <div className="flex justify-between">
                        <div className="flex gap-4">
                            <Skeleton className="h-10 w-10 rounded-full" />
                            <div className="space-y-2">
                                <Skeleton className="h-5 w-40" />
                                <Skeleton className="h-4 w-60" />
                            </div>
                        </div>
                        <Skeleton className="h-8 w-24 rounded-full" />
                    </div>
                    <Skeleton className="h-16 w-full rounded-xl" />
                </div>
            ))}
        </div>
    );
}
