'use client';

import React from 'react';
import { Skeleton } from '@/components/ui/skeleton';

export default function BrandDetailLoading() {
    return (
        <div className="space-y-6 sm:space-y-8 pb-20 md:px-0">
            {/* Header Skeleton */}
            <div className="relative">
                <Skeleton className="h-48 md:h-64 rounded-[2.5rem]" />
                <div className="px-6 md:px-12 -mt-16 md:-mt-20 relative z-10 flex items-end gap-6">
                    <Skeleton className="w-32 h-32 md:w-40 md:h-40 rounded-[2rem] border-4 border-background shadow-2xl" />
                    <div className="flex-1 space-y-2 pb-4">
                        <Skeleton className="h-10 w-48" />
                        <Skeleton className="h-4 w-32" />
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 space-y-6">
                    <Skeleton className="h-64 rounded-[2rem]" />
                    <Skeleton className="h-96 rounded-[2rem]" />
                </div>
                <div className="lg:col-span-1 space-y-6">
                    <Skeleton className="h-80 rounded-[2rem]" />
                </div>
            </div>
        </div>
    );
}
