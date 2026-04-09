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
import Link from 'next/link';

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

    const collaborations = data?.pages.flatMap((page) => page.items) ?? [];

    return (
        <div className="space-y-6 sm:space-y-8 pb-20 px-4 sm:px-6 md:px-0">
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
                    renderItem={(collab: Collaboration) => (
                        <CollaborationCard
                            key={collab.id}
                            collaboration={collab}
                            isInfluencer={isInfluencer}
                        />
                    )}
                    hasNextPage={hasNextPage}
                    isFetchingNextPage={isFetchingNextPage}
                    fetchNextPage={fetchNextPage}
                    isLoading={isLoading}
                    gridClassName="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6"
                    loader={
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {[1, 2, 3].map((i) => (
                                <Skeleton key={i} className="h-[250px] w-full rounded-2xl" />
                            ))}
                        </div>
                    }
                    emptyState={
                        error ? (
                            <div className="p-12 text-center bg-red-50 dark:bg-red-900/10 rounded-3xl border border-red-100 dark:border-red-900/20">
                                <p className="text-red-600 dark:text-red-400 font-medium">Failed to load collaborations. Please try again later.</p>
                            </div>
                        ) : (
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
                                ) : (!isInfluencer && (
                                    <Button className="rounded-full px-8" onClick={() => router.push(FRONTEND_ROUTES.DASHBOARD.INFLUENCERS)}>
                                        <Plus size={18} className="mr-2" />
                                        Find Partners
                                    </Button>
                                ))}
                            </div>
                        )
                    }
                />
            </div>
        </div>
    );
};
