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
import { Filter, Search, Handshake } from 'lucide-react';
import { BrandFilters } from '../components/BrandFilters';
import { BrandList } from '../components/BrandList';
import { useInfiniteBrandSearch } from '@/hooks/queries/useProfileQueries';
import { useDebounce } from 'use-debounce';
import { PageHeader } from '@/components/shared/PageHeader';
import { useAuth } from '@/contexts/auth-context';
import { UserRole } from '@/types/auth.types';
import { DiscoverUnauthorizedState } from '@/features/influencer/components/DiscoverUnauthorizedState';

export const BrandDiscoverContainer = () => {
    const { user } = useAuth();
    const [filters, setFilters] = useState<{ query?: string; location?: string }>({
        query: '',
        location: '',
    });

    const [debouncedFilters] = useDebounce(filters, 500);
    const { 
        data: searchResults, 
        isLoading, 
        isError, 
        refetch,
        hasNextPage,
        isFetchingNextPage,
        fetchNextPage
    } = useInfiniteBrandSearch({
        name: debouncedFilters.query,
        location: debouncedFilters.location,
        limit: 12,
    });

    // Permission check: Only INFLUENCERS and ADMIN can discover brands
    const isAuthorized = user?.role === UserRole.INFLUENCER || user?.role === UserRole.ADMIN;

    const handleFilterChange = (newFilters: Partial<{ query: string; location: string }>) => {
        setFilters((prev) => ({ ...prev, ...newFilters }));
    };

    const handleResetFilters = () => {
        setFilters({ query: '', location: '' });
    };

    const brands = searchResults?.pages.flatMap((page) => page.items) || [];
    const totalCount = searchResults?.pages[0]?.meta?.total || 0;

    if (!isAuthorized) {
        return <DiscoverUnauthorizedState />;
    }

    return (
        <div className="space-y-6 sm:space-y-8 pb-20 px-4 sm:px-6 md:px-0">
            {/* Header Section */}
            <div className="flex flex-col xl:flex-row xl:items-end justify-between gap-4 sm:gap-6">
                <div className="space-y-3 sm:space-y-4">
                    <PageHeader
                        label="Discovery"
                        title="Find Your Next"
                        highlightedTitle="Partnership"
                        subtitle="Connect with leading brands and unlock exclusive collaboration opportunities."
                        icon={Handshake}
                    />

                    {/* Mobile Filter Trigger */}
                    <div className="xl:hidden flex items-center gap-2 sm:gap-3">
                        <Sheet>
                            <SheetTrigger asChild>
                                <Button
                                    variant="outline"
                                    className="flex-1 h-12 sm:h-14 rounded-2xl sm:rounded-3xl border-border/50 bg-background/50 backdrop-blur-xl font-bold flex items-center justify-center gap-2 sm:gap-3 shadow-xl shadow-black/5 text-sm sm:text-base"
                                >
                                    <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg sm:rounded-xl bg-secondary/10 text-secondary flex items-center justify-center">
                                        <Filter size={16} className="sm:w-[18px] sm:h-[18px]" />
                                    </div>
                                    <span className="hidden xs:inline">Filter Brands</span>
                                    <span className="xs:hidden">Filters</span>
                                </Button>
                            </SheetTrigger>
                            <SheetContent side="bottom" className="h-[80vh] rounded-t-[3.5rem] p-0 border-t border-border/50 bg-background/80 backdrop-blur-2xl">
                                <SheetHeader className="px-8 pt-8 pb-4 border-b border-border/50">
                                    <div className="flex items-center justify-between">
                                        <SheetTitle className="text-3xl font-black tracking-tight">Refine</SheetTitle>
                                        <div className="px-4 py-1.5 bg-secondary/10 text-secondary rounded-full text-xs font-black uppercase tracking-widest">
                                            {totalCount} Results
                                        </div>
                                    </div>
                                </SheetHeader>
                                <div className="overflow-y-auto h-full px-8 py-8 pb-32">
                                    <BrandFilters
                                        filters={filters}
                                        onFilterChange={handleFilterChange}
                                        onReset={handleResetFilters}
                                        className="bg-transparent border-0 p-0 backdrop-blur-none shadow-none"
                                    />
                                </div>
                            </SheetContent>
                        </Sheet>
                        
                        <div className="px-6 py-4 bg-muted/40 rounded-2xl border border-border/50 flex items-center gap-4">
                            <Handshake className="text-secondary" size={20} />
                            <div className="flex flex-col">
                                <span className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Verified Brands</span>
                                <span className="text-lg font-black leading-tight italic">{totalCount}</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="hidden xl:block">
                    <div className="px-8 py-6 bg-muted/40 rounded-[2.5rem] border border-border/50 flex items-center gap-6 min-w-[280px]">
                        <div className="w-12 h-12 rounded-2xl bg-secondary/10 flex items-center justify-center text-secondary">
                            <Handshake size={24} />
                        </div>
                        <div className="flex flex-col">
                            <span className="text-[10px] font-black text-muted-foreground uppercase tracking-widest mb-0.5">Global Brand Network</span>
                            <div className="flex items-baseline gap-1">
                                <span className="text-3xl font-black tracking-tighter italic">{totalCount}</span>
                                <span className="text-xs font-bold text-muted-foreground">PARTNERS</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-4 gap-6 md:gap-8">
                {/* Fixed Side Filters for Large Screens */}
                <div className="hidden xl:block xl:col-span-1 space-y-4 md:space-y-6">
                    <div className="sticky top-20 md:top-24">
                        <BrandFilters
                            filters={filters}
                            onFilterChange={handleFilterChange}
                            onReset={handleResetFilters}
                        />
                    </div>
                </div>

                {/* Main Content Grid */}
                <div className="xl:col-span-3">
                    {isLoading ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {[...Array(6)].map((_, i) => (
                                <div key={i} className="h-[400px] rounded-[2rem] bg-zinc-100 dark:bg-white/5 animate-pulse" />
                            ))}
                        </div>
                    ) : isError ? (
                        <div className="flex flex-col items-center justify-center py-20 text-center space-y-6">
                            <div className="w-16 h-16 bg-destructive/10 rounded-2xl flex items-center justify-center text-destructive">
                                <Search size={32} />
                            </div>
                            <div className="space-y-2">
                                <h3 className="text-xl font-bold">Search Interrupted</h3>
                                <p className="text-muted-foreground max-w-xs mx-auto">
                                    Something went wrong while exploring the brand network.
                                </p>
                            </div>
                            <Button onClick={() => refetch()} variant="outline" className="rounded-xl px-8 h-12 font-bold transition-all hover:scale-105 active:scale-95">
                                Try Again
                            </Button>
                        </div>
                    ) : (
                        <BrandList
                            brands={brands}
                            isLoading={isLoading}
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
