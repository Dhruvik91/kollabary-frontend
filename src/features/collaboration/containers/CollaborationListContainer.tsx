'use client';

import { useState, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { useCollaborations } from '@/hooks/use-collaboration.hooks';
import { CollaborationCard } from '@/features/collaboration/components/CollaborationCard';
import { CollaborationFilterBar } from '@/features/collaboration/components/CollaborationFilterBar';
import { useAuth } from '@/contexts/auth-context';
import { Skeleton } from '@/components/ui/skeleton';
import { UserRole } from '@/types/auth.types';
import { CollaborationFilters, Collaboration } from '@/types/collaboration.types';
import { PageHeader } from '@/components/shared/PageHeader';
import { Handshake, Package2, Plus, ArrowUpRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { InfiniteScrollContainer } from '@/components/shared/InfiniteScrollContainer';
import { FRONTEND_ROUTES } from '@/constants';
import { useDebounce } from '@/hooks/use-debounce';
import { CollaborationEmptyState } from '../components/CollaborationEmptyState';
import { CollaborationErrorState } from '../components/CollaborationErrorState';
import Link from 'next/link';
import { useCallback } from 'react';

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
    const isInfluencer = user?.role === UserRole.INFLUENCER;
    const hasActiveFilters = !!filters.status || !!filters.search;

    const collaborations = useMemo(() => data?.pages.flatMap((page) => page.items) ?? [], [data]);

    const renderCollaboration = useCallback((collab: Collaboration) => (
        <CollaborationCard
            key={collab.id}
            collaboration={collab}
            isInfluencer={isInfluencer}
        />
    ), [isInfluencer]);

    const handleResetFilters = useCallback(() => setFilters({}), []);

    return (
        <div className="space-y-6 sm:space-y-8 pb-20 md:px-0">
            <PageHeader
                label="My Collaborations"
                title="Manage Your"
                highlightedTitle="Partnerships."
                subtitle="Manage your active partnerships, review requests, and track campaign progress."
                icon={Handshake}
                action={
                    !isInfluencer && (
                        <Link href={FRONTEND_ROUTES.DASHBOARD.INFLUENCERS}>
                            <Button className="h-14 px-8 rounded-[1.5rem] bg-secondary hover:bg-secondary/90 text-white font-bold shadow-2xl shadow-primary/20 hover:scale-[1.02] active:scale-[0.98] transition-all gap-2 border-none">
                                <span className="uppercase tracking-widest text-xs">Find Partners</span>
                                <ArrowUpRight size={20} className="stroke-[3]" />
                            </Button>
                        </Link>
                    )
                }
            />

            <div className="space-y-8">
                <CollaborationFilterBar filters={filters} onFilterChange={setFilters} />

                <InfiniteScrollContainer
                    items={collaborations}
                    renderItem={renderCollaboration}
                    hasNextPage={hasNextPage}
                    isFetchingNextPage={isFetchingNextPage}
                    fetchNextPage={fetchNextPage}
                    isLoading={isLoading}
                    gridClassName="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6"
                    loader={
                        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
                            {[...Array(4)].map((_, i) => (
                                <Skeleton key={i} className="h-[280px] w-full rounded-[2rem] bg-card/50" />
                            ))}
                        </div>
                    }
                    emptyState={
                        error ? (
                            <CollaborationErrorState onRetry={() => router.refresh()} />
                        ) : (
                            <CollaborationEmptyState 
                                hasActiveFilters={hasActiveFilters}
                                isInfluencer={isInfluencer}
                                onReset={handleResetFilters}
                            />
                        )
                    }
                />
            </div>
        </div>
    );
};
