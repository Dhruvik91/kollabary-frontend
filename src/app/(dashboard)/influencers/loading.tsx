'use client';

import React from 'react';
import { GridSkeleton } from '@/components/shared/skeletons/GridSkeleton';
import { Skeleton } from '@/components/ui/skeleton';

export default function InfluencersLoading() {
    return (
        <div className="space-y-6 sm:space-y-8 pb-20 md:px-0">
            {/* Custom Discovery Header Skeleton */}
            <div className="flex flex-col xl:flex-row xl:items-end justify-between gap-4 sm:gap-6">
                <div className="space-y-3 sm:space-y-4 flex-1">
                    <div className="space-y-2">
                        <Skeleton className="h-4 w-32" />
                        <Skeleton className="h-12 sm:h-16 w-3/4" />
                        <Skeleton className="h-4 w-1/2" />
                    </div>
                </div>
                <div className="w-full xl:w-64 h-24 rounded-3xl overflow-hidden">
                    <Skeleton className="h-full w-full" />
                </div>
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-4 gap-6 md:gap-8">
                {/* Side Filters Skeleton */}
                <div className="hidden xl:block xl:col-span-1 space-y-6">
                    <Skeleton className="h-[600px] w-full rounded-3xl" />
                </div>

                {/* Main Content Grid Skeleton */}
                <div className="xl:col-span-3">
                    <GridSkeleton 
                        variant="influencer" 
                        count={6} 
                        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                    />
                </div>
            </div>
        </div>
    );
}
