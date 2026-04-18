'use client';

import React from 'react';
import { Skeleton } from '@/components/ui/skeleton';

export default function AuctionDetailLoading() {
    return (
        <div className="space-y-6 sm:space-y-8 pb-20 md:px-0">
            <Skeleton className="h-10 w-32" />

            <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
                {/* Left Column Skeleton */}
                <div className="xl:col-span-2 space-y-8">
                    <Skeleton className="h-[500px] w-full rounded-[2rem]" />
                    <Skeleton className="h-32 w-full rounded-[2rem]" />
                </div>

                {/* Right Column Skeleton */}
                <div className="xl:col-span-1">
                    <Skeleton className="h-[600px] w-full rounded-[2rem]" />
                </div>
            </div>
        </div>
    );
}
