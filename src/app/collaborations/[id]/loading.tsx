import { Skeleton } from '@/components/ui/skeleton';

export default function Loading() {
    return (
        <div className="container max-w-6xl mx-auto py-8 px-4">
            {/* Back Button Skeleton */}
            <Skeleton className="h-10 w-40 mb-6" />

            {/* Header Skeleton */}
            <div className="mb-8">
                <Skeleton className="h-10 w-64 mb-2" />
                <Skeleton className="h-5 w-96" />
            </div>

            {/* Content Grid */}
            <div className="grid gap-6 lg:grid-cols-3">
                {/* Main Content */}
                <div className="lg:col-span-2 space-y-6">
                    {/* Overview Card */}
                    <div className="glass border-glass-border rounded-lg p-6 space-y-4">
                        <Skeleton className="h-6 w-32" />
                        <Skeleton className="h-4 w-48 mb-4" />
                        <div className="space-y-4">
                            <Skeleton className="h-16 w-full" />
                            <Skeleton className="h-16 w-full" />
                            <Skeleton className="h-16 w-full" />
                        </div>
                    </div>

                    {/* Timeline Card */}
                    <div className="glass border-glass-border rounded-lg p-6">
                        <Skeleton className="h-6 w-32 mb-4" />
                        <div className="space-y-6">
                            <Skeleton className="h-20 w-full" />
                            <Skeleton className="h-20 w-full" />
                            <Skeleton className="h-20 w-full" />
                        </div>
                    </div>
                </div>

                {/* Sidebar */}
                <div className="space-y-6">
                    {/* Actions Card */}
                    <div className="glass border-glass-border rounded-lg p-6">
                        <Skeleton className="h-6 w-24 mb-4" />
                        <Skeleton className="h-10 w-full mb-3" />
                        <Skeleton className="h-10 w-full" />
                    </div>

                    {/* Message Card */}
                    <div className="glass border-glass-border rounded-lg p-6">
                        <Skeleton className="h-10 w-full" />
                    </div>
                </div>
            </div>
        </div>
    );
}
