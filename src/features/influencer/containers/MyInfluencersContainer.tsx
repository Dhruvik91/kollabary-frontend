'use client';

import React, { useState } from 'react';
import { useMyInfluencers } from '@/hooks/use-collaboration.hooks';
import { MyInfluencersLoadingState } from '../components/MyInfluencersLoadingState';
import { MyInfluencersErrorState } from '../components/MyInfluencersErrorState';
import { MyInfluencersEmptyState } from '../components/MyInfluencersEmptyState';
import { MyInfluencersList } from '../components/MyInfluencersList';
import { useDebounce } from 'use-debounce';
import { Input } from '@/components/ui/input';
import { Search, X } from 'lucide-react';
import { Button } from '@/components/ui/button';

export const MyInfluencersContainer = () => {
    const [filters, setFilters] = useState<{
        search?: string;
        niche?: string;
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

    const handleFilterChange = (newFilters: Partial<{ search?: string; niche?: string }>) => {
        setFilters((prev) => ({ ...prev, ...newFilters }));
    };

    const handleResetFilters = () => {
        setFilters({
            limit: 10,
            search: '',
            niche: '',
        });
    };

    const allInfluencers = data?.pages.flatMap((page: any) => page.items) || [];
    const totalCount = (data?.pages[0] as any)?.meta?.total || 0;
    const hasActiveFilters = Boolean(filters.search || filters.niche);


    const hasActiveFiltersForClear = Boolean(filters.search || filters.niche);

    return (
        <div className="space-y-6 pb-20">
            <div className="space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
                    <div className="space-y-2">
                        <h1 className="text-3xl md:text-4xl font-black tracking-tight">My Influencers</h1>
                        <p className="text-muted-foreground text-lg">
                            Creators you've collaborated with before. Start a new collaboration with ease!
                        </p>
                    </div>

                    <div className="flex items-center gap-2">
                        {hasActiveFiltersForClear && (
                            <Button
                                variant="ghost"
                                size="sm"
                                onClick={handleResetFilters}
                                className="h-10 px-4 text-xs font-bold rounded-xl hover:bg-destructive/10 hover:text-destructive"
                            >
                                <X size={14} className="mr-1" />
                                Clear Filters
                            </Button>
                        )}
                        <div className="px-4 py-1.5 bg-primary/10 text-primary rounded-full text-xs font-black uppercase tracking-widest">
                            {totalCount} Found
                        </div>
                    </div>
                </div>

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
                        placeholder="Filter by niche..."
                        value={filters.niche || ''}
                        onChange={(e) => handleFilterChange({ niche: e.target.value })}
                        className="h-12 rounded-xl border-border/50 bg-background/50"
                    />
                </div>
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
    );
};
