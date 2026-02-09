import { Skeleton } from '@/components/ui/skeleton';

export default function Loading() {
    return (
        <div className="container max-w-4xl mx-auto py-8 px-4">
            {/* Header Skeleton */}
            <div className="mb-8">
                <Skeleton className="h-10 w-32 mb-2" />
                <Skeleton className="h-5 w-96" />
            </div>

            {/* Tabs Skeleton */}
            <Skeleton className="h-12 w-full mb-6" />

            {/* Settings Cards */}
            <div className="space-y-6">
                {[...Array(3)].map((_, i) => (
                    <div key={i} className="glass border-glass-border rounded-lg p-6 space-y-4">
                        <Skeleton className="h-6 w-48" />
                        <Skeleton className="h-4 w-full max-w-md" />
                        <div className="space-y-3">
                            <Skeleton className="h-10 w-full max-w-md" />
                            <Skeleton className="h-10 w-full max-w-md" />
                        </div>
                        <Skeleton className="h-10 w-32" />
                    </div>
                ))}
            </div>
        </div>
    );
}
