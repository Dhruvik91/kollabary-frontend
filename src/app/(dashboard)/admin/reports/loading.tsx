import { Skeleton } from '@/components/ui/skeleton';

export default function Loading() {
    return (
        <div className="space-y-6 animate-pulse p-1">
            <div className="flex flex-col gap-2">
                <Skeleton className="h-10 w-48 rounded-lg" />
                <Skeleton className="h-4 w-64 rounded-md" />
            </div>
            <div className="flex flex-col lg:flex-row gap-4">
                <Skeleton className="h-12 flex-1 rounded-xl" />
                <Skeleton className="h-12 w-full lg:w-48 rounded-xl" />
            </div>
            {[...Array(5)].map((_, i) => (
                <div key={i} className="rounded-2xl border border-border/50 p-4 md:p-5 space-y-4">
                    <div className="flex flex-col sm:flex-row justify-between gap-4">
                        <div className="flex gap-4">
                            <Skeleton className="h-10 w-10 rounded-full shrink-0" />
                            <div className="space-y-2">
                                <Skeleton className="h-5 w-32 sm:w-40" />
                                <Skeleton className="h-4 w-48 sm:w-60" />
                            </div>
                        </div>
                        <div className="flex items-center gap-2 self-end sm:self-center">
                            <Skeleton className="h-9 w-24 rounded-lg" />
                            <Skeleton className="h-9 w-9 rounded-lg" />
                        </div>
                    </div>
                    <Skeleton className="h-16 w-full rounded-xl" />
                </div>
            ))}
        </div>
    );
}
