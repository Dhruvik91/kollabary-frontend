'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Filter, Rocket, Sparkles } from 'lucide-react';
import { InfluencerFilters } from '../components/InfluencerFilters';
import { InfluencerList } from '../components/InfluencerList';
import { useInfluencerSearch } from '@/hooks/queries/useInfluencerQueries';
import { SearchInfluencersDto } from '@/types/influencer.types';
import { useDebounce } from 'use-debounce';

export const InfluencerDiscoverContainer = () => {
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
    } = useInfluencerSearch(debouncedFilters);

    const handleFilterChange = (newFilters: Partial<SearchInfluencersDto>) => {
        setFilters((prev) => ({ ...prev, ...newFilters }));
    };

    const allInfluencers = data?.pages.flatMap((page) => page.items) || [];

    return (
        <div className="space-y-8 pb-20 px-4 md:px-0">
            {/* Header Section */}
            <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
                <div className="space-y-4">
                    <div className="space-y-2">
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="flex items-center gap-2 text-primary font-bold uppercase tracking-[0.2em] text-xs"
                        >
                            <Sparkles size={14} />
                            <span>Discover Network</span>
                        </motion.div>
                        <motion.h1
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 }}
                            className="text-4xl md:text-5xl font-black tracking-tight leading-tight"
                        >
                            Find Your Perfect <br />
                            <span className="text-primary italic">Match.</span>
                        </motion.h1>
                    </div>

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
                                            {data?.pages[0]?.meta?.total || 0} Found
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

                        <div className="h-14 px-5 rounded-3xl bg-zinc-100 dark:bg-zinc-800/50 border border-border/50 flex items-center gap-3">
                            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                            <span className="font-bold text-sm">{data?.pages[0]?.meta?.total || 0}</span>
                        </div>
                    </div>
                </div>

                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.2 }}
                    className="hidden lg:flex bg-zinc-100 dark:bg-zinc-800/50 p-4 rounded-3xl border border-border/50 items-center gap-4"
                >
                    <div className="w-12 h-12 bg-primary rounded-2xl flex items-center justify-center text-primary-foreground shadow-lg shadow-primary/20">
                        <Rocket size={24} />
                    </div>
                    <div>
                        <p className="text-xs font-bold text-muted-foreground uppercase">Network Status</p>
                        <p className="font-bold">{data?.pages[0]?.meta?.total || 0} Influencers Active</p>
                    </div>
                </motion.div>
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
                    {isError ? (
                        <div className="bg-red-50 dark:bg-red-500/10 border border-red-200 dark:border-red-500/20 p-8 rounded-[2rem] text-center">
                            <h3 className="text-red-600 dark:text-red-400 font-bold text-lg">Failed to load influencers</h3>
                            <p className="text-red-500/80 mt-2">There was an error connecting to our network. Please try again later.</p>
                            <button
                                onClick={() => window.location.reload()}
                                className="mt-4 px-6 py-2 bg-red-600 text-white rounded-full font-bold hover:bg-red-700 transition-colors"
                            >
                                Retry Connection
                            </button>
                        </div>
                    ) : (
                        <InfluencerList
                            influencers={allInfluencers}
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
