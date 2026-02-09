import { Skeleton } from '@/components/ui/skeleton';

export default function Loading() {
    return (
        <div className="container max-w-7xl mx-auto py-8 px-4">
            {/* Header Skeleton */}
            <div className="mb-8">
                <Skeleton className="h-10 w-48 mb-2" />
                <Skeleton className="h-5 w-96" />
            </div>

            {/* Chat Layout */}
            <div className="grid gap-6 lg:grid-cols-12">
                {/* Conversations List */}
                <div className="lg:col-span-4 glass border-glass-border rounded-lg p-4">
                    <Skeleton className="h-10 w-full mb-4" />
                    <div className="space-y-3">
                        {[...Array(8)].map((_, i) => (
                            <div key={i} className="flex gap-3 p-3">
                                <Skeleton className="h-12 w-12 rounded-full" />
                                <div className="flex-1 space-y-2">
                                    <Skeleton className="h-4 w-32" />
                                    <Skeleton className="h-3 w-full" />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Message Thread */}
                <div className="lg:col-span-8 glass border-glass-border rounded-lg p-6">
                    <Skeleton className="h-16 w-full mb-6" />
                    <div className="space-y-4 mb-6">
                        {[...Array(6)].map((_, i) => (
                            <div key={i} className={`flex ${i % 2 === 0 ? 'justify-start' : 'justify-end'}`}>
                                <Skeleton className={`h-16 ${i % 2 === 0 ? 'w-3/4' : 'w-2/3'} rounded-lg`} />
                            </div>
                        ))}
                    </div>
                    <Skeleton className="h-12 w-full" />
                </div>
            </div>
        </div>
    );
}
