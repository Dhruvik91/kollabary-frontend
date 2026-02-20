'use client';

import { useState, useMemo, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useInView } from 'react-intersection-observer';
import { useCollaborations } from '@/hooks/use-collaboration.hooks';
import { CollaborationCard } from '@/components/collaboration/CollaborationCard';
import { CollaborationFilterBar } from '@/components/collaboration/CollaborationFilterBar';
import { useAuth } from '@/contexts/auth-context';
import { Skeleton } from '@/components/ui/skeleton';
import { UserRole } from '@/types/auth.types';
import { CollaborationFilters } from '@/types/collaboration.types';
import { Package2, Plus, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { FRONTEND_ROUTES } from '@/constants';
import { useDebounce } from '@/hooks/use-debounce';

export const CollaborationListContainer = () => {
    const [filters, setFilters] = useState<CollaborationFilters>({});
    const debouncedSearch = useDebounce(filters.search, 300);
    const debouncedFilters = useMemo<Omit<CollaborationFilters, 'page'>>(
        () => ({ status: filters.status, search: debouncedSearch }),
        [filters.status, debouncedSearch],
    );

    const {
        data,
        isLoading,
        error,
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage,
    } = useCollaborations(debouncedFilters);

    const { user } = useAuth();
    const router = useRouter();
    const { ref: sentinelRef, inView } = useInView();

    const isInfluencer = user?.role === UserRole.INFLUENCER;
    const hasActiveFilters = !!filters.status || !!filters.search;

    // Auto-fetch next page when sentinel comes into view
    useEffect(() => {
        if (inView && hasNextPage && !isFetchingNextPage) {
            fetchNextPage();
        }
    }, [inView, hasNextPage, isFetchingNextPage, fetchNextPage]);

    const collaborations = data?.pages.flatMap((page) => page.items) ?? [];

    return (
        <div className="space-y-6">
            <CollaborationFilterBar filters={filters} onFilterChange={setFilters} />

            {isLoading ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {[1, 2, 3].map((i) => (
                        <Skeleton key={i} className="h-[250px] w-full rounded-2xl" />
                    ))}
                </div>
            ) : error ? (
                <div className="p-12 text-center bg-red-50 dark:bg-red-900/10 rounded-3xl border border-red-100 dark:border-red-900/20">
                    <p className="text-red-600 dark:text-red-400 font-medium">Failed to load collaborations. Please try again later.</p>
                </div>
            ) : collaborations.length === 0 ? (
                <div className="p-12 text-center bg-muted/30 rounded-3xl border border-dashed border-border flex flex-col items-center">
                    <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mb-4 text-muted-foreground">
                        <Package2 size={32} />
                    </div>
                    <h3 className="text-xl font-bold mb-2">
                        {hasActiveFilters ? 'No matching collaborations' : 'No collaborations yet'}
                    </h3>
                    <p className="text-muted-foreground max-w-sm mb-8">
                        {hasActiveFilters
                            ? 'Try adjusting your filters or clearing them to see all collaborations.'
                            : 'Start your first partnership by reaching out to influencers or responding to requests.'}
                    </p>
                    {hasActiveFilters ? (
                        <Button
                            variant="outline"
                            className="rounded-full px-8"
                            onClick={() => setFilters({})}
                        >
                            Clear Filters
                        </Button>
                    ) : (
                        <Button className="rounded-full px-8" onClick={() => router.push(FRONTEND_ROUTES.DASHBOARD.DISCOVER)}>
                            <Plus size={18} className="mr-2" />
                            Find Partners
                        </Button>
                    )}
                </div>
            ) : (
                <>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {collaborations.map((collab) => (
                            <CollaborationCard
                                key={collab.id}
                                collaboration={collab}
                                isInfluencer={isInfluencer}
                            />
                        ))}
                    </div>

                    {/* Infinite scroll sentinel */}
                    <div ref={sentinelRef} className="flex justify-center py-4">
                        {isFetchingNextPage && (
                            <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
                        )}
                    </div>
                </>
            )}
        </div>
    );
};
