'use client';

import React, { useState } from 'react';
import { useMyInfluencers } from '@/hooks/use-collaboration.hooks';
import { MyInfluencersLoadingState } from '../components/MyInfluencersLoadingState';
import { MyInfluencersErrorState } from '../components/MyInfluencersErrorState';
import { MyInfluencersEmptyState } from '../components/MyInfluencersEmptyState';
import { MyInfluencersList } from '../components/MyInfluencersList';
import { useDebounce } from 'use-debounce';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { PageHeader } from '@/components/shared/PageHeader';
import { Search, X, Users } from 'lucide-react';

export const MyInfluencersContainer = () => {
    const [filters, setFilters] = useState<{
        search?: string;
        category?: string;
        limit?: number;
    }>({
        limit: 10,
    });

    const [debouncedFilters] = useDebounce(filters, 500);

    const {
        data,
        isLoading,
        isError,
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage,
        refetch,
    } = useMyInfluencers(debouncedFilters);

    const handleFilterChange = (newFilters: Partial<{ search?: string; category?: string }>) => {
        setFilters((prev) => ({ ...prev, ...newFilters }));
    };

    const handleResetFilters = () => {
        setFilters({
            limit: 10,
            search: '',
            category: '',
        });
    };

    const allInfluencers = data?.pages.flatMap((page: any) => page.items) || [];
    const totalCount = (data?.pages[0] as any)?.meta?.total || 0;
    const hasActiveFilters = Boolean(filters.search || filters.category);

    return (
        <div className="space-y-6 sm:space-y-8 pb-20 md:px-0">
            <PageHeader
                label="My Influencers"
                title="Manage Your"
                highlightedTitle="Network."
                subtitle="Creators you've collaborated with before. Start a new collaboration with ease!"
                icon={Users}
                action={
                    <div className="flex items-center gap-2">
                        {hasActiveFilters && (
                            <Button
                                variant="ghost"
                                size="sm"
                                onClick={handleResetFilters}
                                className="h-10 px-4 text-xs font-bold rounded-xl hover:bg-destructive/10 hover:text-destructive transition-all"
                            >
                                <X size={14} className="mr-1" />
                                Clear Filters
                            </Button>
                        )}
                        <div className="px-5 py-2 bg-primary/10 text-primary border border-primary/20 rounded-xl text-[10px] font-black uppercase tracking-widest">
                            {totalCount} Found
                        </div>
                    </div>
                }
            />

            <div className="space-y-8">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="relative">
                        <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                        <Input
                            placeholder="Search by name..."
                            value={filters.search || ''}
                            onChange={(e) => handleFilterChange({ search: e.target.value })}
                            className="pl-10 h-12 rounded-xl border-border/50 bg-background/50"
                        />
                    </div>
                    <Input
                        placeholder="Filter by category..."
                        value={filters.category || ''}
                        onChange={(e) => handleFilterChange({ category: e.target.value })}
                        className="h-12 rounded-xl border-border/50 bg-background/50"
                    />
                </div>

                {isLoading ? (
                    <MyInfluencersLoadingState />
                ) : isError ? (
                    <MyInfluencersErrorState onRetry={() => refetch()} />
                ) : allInfluencers.length === 0 ? (
                    <MyInfluencersEmptyState
                        hasFilters={hasActiveFilters}
                        onReset={handleResetFilters}
                    />
                ) : (
                    <MyInfluencersList
                        influencers={allInfluencers}
                        hasNextPage={hasNextPage}
                        isFetchingNextPage={isFetchingNextPage}
                        fetchNextPage={fetchNextPage}
                    />
                )}
            </div>
        </div>
    );
};
