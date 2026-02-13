import { Skeleton } from '@/components/ui/skeleton';

export default function Loading() {
    return (
        <div className="space-y-8 animate-pulse p-1">
            <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
                <div className="space-y-2">
                    <Skeleton className="h-10 w-64 rounded-lg" />
                    <Skeleton className="h-4 w-96 rounded-md" />
                </div>
                <Skeleton className="h-10 w-48 rounded-xl" />
            </div>

            <div className="grid gap-6 lg:grid-cols-2">
                <div className="rounded-2xl border border-border/50 p-6 space-y-8">
                    <Skeleton className="h-7 w-48" />
                    <div className="space-y-6">
                        {[...Array(5)].map((_, i) => (
                            <div key={i} className="space-y-4">
                                <div className="flex justify-between">
                                    <Skeleton className="h-4 w-32" />
                                    <Skeleton className="h-4 w-12" />
                                </div>
                                <Skeleton className="h-3 w-full rounded-lg" />
                            </div>
                        ))}
                    </div>
                </div>

                <div className="space-y-6">
                    <div className="rounded-2xl border border-border/50 p-6 space-y-4">
                        <Skeleton className="h-7 w-32" />
                        <Skeleton className="h-20 w-full rounded-xl" />
                    </div>
                    <Skeleton className="h-40 w-full rounded-2xl" />
                </div>
            </div>
        </div>
    );
}
