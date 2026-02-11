'use client';

import React, { useState } from 'react';
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Filter } from 'lucide-react';
import { DiscoverHeader } from '../components/DiscoverHeader';
import { DiscoverNetworkStats } from '../components/DiscoverNetworkStats';
import { DiscoverLoadingState } from '../components/DiscoverLoadingState';
import { DiscoverErrorState } from '../components/DiscoverErrorState';
import { DiscoverEmptyState } from '../components/DiscoverEmptyState';
import { DiscoverUnauthorizedState } from '../components/DiscoverUnauthorizedState';
import { useAuth } from '@/contexts/auth-context';
import { UserRole } from '@/types/auth.types';
import { InfluencerFilters } from '../components/InfluencerFilters';
import { InfluencerList } from '../components/InfluencerList';
import { useInfluencerSearch } from '@/hooks/queries/useInfluencerQueries';
import { SearchInfluencersDto } from '@/types/influencer.types';
import { useDebounce } from 'use-debounce';

export const InfluencerDiscoverContainer = () => {
    const { user } = useAuth();
    const [filters, setFilters] = useState<SearchInfluencersDto>({
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
    } = useInfluencerSearch(debouncedFilters);

    // Permission check: Only USER and ADMIN can discover influencers
    const isAuthorized = user?.role === UserRole.USER || user?.role === UserRole.ADMIN;

    const handleFilterChange = (newFilters: Partial<SearchInfluencersDto>) => {
        setFilters((prev: SearchInfluencersDto) => ({ ...prev, ...newFilters }));
    };

    const handleResetFilters = () => {
        setFilters({ limit: 10 });
    };

    const allInfluencers = data?.pages.flatMap((page: any) => page.items) || [];
    const totalCount = data?.pages[0]?.meta?.total || 0;

    if (!isAuthorized) {
        return <DiscoverUnauthorizedState />;
    }

    return (
        <div className="space-y-8 pb-20 px-4 md:px-0">
            {/* Header Section */}
            <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
                <div className="space-y-4">
                    <DiscoverHeader />

                    {/* Mobile Filter Trigger */}
                    <div className="lg:hidden flex items-center gap-3">
                        <Sheet>
                            <SheetTrigger asChild>
                                <Button
                                    variant="outline"
                                    className="flex-1 h-14 rounded-3xl border-border/50 bg-background/50 backdrop-blur-xl font-bold flex items-center justify-center gap-3 shadow-xl shadow-black/5"
                                >
                                    <div className="w-8 h-8 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
                                        <Filter size={18} />
                                    </div>
                                    Filter & Search
                                </Button>
                            </SheetTrigger>
                            <SheetContent side="bottom" className="h-[85vh] rounded-t-[3.5rem] p-0 border-t border-border/50 bg-background/80 backdrop-blur-2xl">
                                <SheetHeader className="px-8 pt-8 pb-4 border-b border-border/50">
                                    <div className="flex items-center justify-between">
                                        <SheetTitle className="text-3xl font-black tracking-tight">Refine</SheetTitle>
                                        <div className="px-4 py-1.5 bg-primary/10 text-primary rounded-full text-xs font-black uppercase tracking-widest">
                                            {totalCount} Found
                                        </div>
                                    </div>
                                </SheetHeader>
                                <div className="overflow-y-auto h-full px-8 py-8 pb-32">
                                    <InfluencerFilters
                                        filters={filters}
                                        onFilterChange={handleFilterChange}
                                        className="bg-transparent border-0 p-0 backdrop-blur-none shadow-none"
                                    />
                                </div>
                            </SheetContent>
                        </Sheet>

                        <DiscoverNetworkStats total={totalCount} isMobile />
                    </div>
                </div>

                <div className="hidden lg:block">
                    <DiscoverNetworkStats total={totalCount} />
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                {/* Fixed Side Filters for Large Screens */}
                <div className="hidden lg:block lg:col-span-1 space-y-6">
                    <div className="sticky top-24">
                        <InfluencerFilters filters={filters} onFilterChange={handleFilterChange} />
                    </div>
                </div>

                {/* Main Content Grid */}
                <div className="lg:col-span-3">
                    {isLoading ? (
                        <DiscoverLoadingState />
                    ) : isError ? (
                        <DiscoverErrorState onRetry={() => refetch()} />
                    ) : allInfluencers.length === 0 ? (
                        <DiscoverEmptyState onReset={handleResetFilters} />
                    ) : (
                        <InfluencerList
                            influencers={allInfluencers}
                            hasNextPage={hasNextPage}
                            isFetchingNextPage={isFetchingNextPage}
                            fetchNextPage={fetchNextPage}
                        />
                    )}
                </div>
            </div>
        </div>
    );
};
