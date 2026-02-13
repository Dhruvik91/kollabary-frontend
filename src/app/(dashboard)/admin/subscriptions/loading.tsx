import { Skeleton } from '@/components/ui/skeleton';

export default function Loading() {
    return (
        <div className="space-y-8 animate-pulse p-1">
            <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
                <div className="space-y-2">
                    <Skeleton className="h-10 w-80 rounded-lg" />
                    <Skeleton className="h-4 w-96 rounded-md" />
                </div>
                <Skeleton className="h-10 w-32 rounded-xl" />
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {[...Array(3)].map((_, i) => (
                    <div key={i} className="rounded-3xl border border-border/50 p-8 space-y-8">
                        <div className="flex justify-between">
                            <Skeleton className="h-12 w-12 rounded-2xl" />
                            <div className="space-y-2 text-right">
                                <Skeleton className="h-8 w-16" />
                                <Skeleton className="h-3 w-12" />
                            </div>
                        </div>
                        <Skeleton className="h-7 w-32" />
                        <div className="space-y-4">
                            {[...Array(4)].map((_, j) => (
                                <div key={j} className="flex gap-3">
                                    <Skeleton className="h-4 w-4 rounded-full" />
                                    <Skeleton className="h-4 w-full" />
                                </div>
                            ))}
                        </div>
                        <div className="flex gap-2 pt-6">
                            <Skeleton className="h-10 flex-1 rounded-xl" />
                            <Skeleton className="h-10 w-10 rounded-xl" />
                        </div>
                    </div>
                ))}
            </div>

            <Skeleton className="h-32 w-full rounded-3xl" />
        </div>
    );
}
