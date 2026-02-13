import { Skeleton } from '@/components/ui/skeleton';

export default function Loading() {
    return (
        <div className="space-y-6 animate-pulse p-1">
            <div className="flex flex-col gap-2">
                <Skeleton className="h-10 w-64 rounded-lg" />
                <Skeleton className="h-4 w-72 rounded-md" />
            </div>

            <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
                {[...Array(6)].map((_, i) => (
                    <div key={i} className="rounded-2xl border border-border/50 p-5 space-y-6">
                        <div className="flex justify-between items-center">
                            <div className="flex gap-3">
                                <Skeleton className="h-10 w-10 rounded-full" />
                                <div className="space-y-2">
                                    <Skeleton className="h-4 w-24" />
                                    <Skeleton className="h-3 w-16" />
                                </div>
                            </div>
                            <Skeleton className="h-6 w-20 rounded-full" />
                        </div>
                        <div className="space-y-3">
                            <Skeleton className="h-4 w-full" />
                            <Skeleton className="h-4 w-3/4" />
                        </div>
                        <div className="flex gap-2">
                            <Skeleton className="h-9 flex-1 rounded-xl" />
                            <Skeleton className="h-9 flex-1 rounded-xl" />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
