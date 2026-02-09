import { Skeleton } from '@/components/ui/skeleton';

export default function Loading() {
    return (
        <div className="bg-gradient-to-tr from-background via-primary/5 to-background min-h-screen">
            <div className="container max-w-6xl mx-auto py-8 px-4">
                {/* Back Button */}
                <Skeleton className="h-10 w-32 mb-6" />

                {/* Hero Section */}
                <div className="glass border-glass-border rounded-lg p-8 mb-6">
                    <div className="flex flex-col md:flex-row gap-8">
                        {/* Avatar */}
                        <Skeleton className="h-32 w-32 rounded-full" />

                        {/* Info */}
                        <div className="flex-1 space-y-4">
                            <Skeleton className="h-8 w-48" />
                            <Skeleton className="h-5 w-32" />
                            <Skeleton className="h-4 w-full max-w-2xl" />
                            <div className="flex gap-2">
                                <Skeleton className="h-6 w-20" />
                                <Skeleton className="h-6 w-20" />
                                <Skeleton className="h-6 w-20" />
                            </div>
                        </div>

                        {/* Actions */}
                        <div className="space-y-3">
                            <Skeleton className="h-10 w-40" />
                            <Skeleton className="h-10 w-40" />
                        </div>
                    </div>
                </div>

                {/* Stats Grid */}
                <div className="grid gap-6 md:grid-cols-3 mb-6">
                    {[...Array(3)].map((_, i) => (
                        <div key={i} className="glass border-glass-border rounded-lg p-6">
                            <Skeleton className="h-5 w-24 mb-2" />
                            <Skeleton className="h-8 w-32" />
                        </div>
                    ))}
                </div>

                {/* Content Sections */}
                <div className="grid gap-6 lg:grid-cols-2">
                    {[...Array(4)].map((_, i) => (
                        <div key={i} className="glass border-glass-border rounded-lg p-6 space-y-4">
                            <Skeleton className="h-6 w-32" />
                            <Skeleton className="h-4 w-full" />
                            <Skeleton className="h-4 w-3/4" />
                            <Skeleton className="h-4 w-full" />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
