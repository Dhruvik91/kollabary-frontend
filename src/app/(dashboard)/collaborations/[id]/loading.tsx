'use client';

import React from 'react';
import { Skeleton } from '@/components/ui/skeleton';

export default function CollaborationDetailLoading() {
    return (
        <div className="space-y-6 sm:space-y-8 pb-20 md:px-0">
            {/* Header Skeleton */}
            <div className="flex items-center justify-between">
                <Skeleton className="h-10 w-48" />
                <div className="flex gap-3">
                    <Skeleton className="h-10 w-10 rounded-xl" />
                    <Skeleton className="h-10 w-10 rounded-xl" />
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Main Content Area Skeleton */}
                <div className="lg:col-span-2 space-y-6">
                    <Skeleton className="h-[400px] w-full rounded-[2.5rem]" />
                    <Skeleton className="h-[200px] w-full rounded-[2.5rem]" />
                </div>

                {/* Sidebar Details Skeleton */}
                <div className="space-y-6">
                    <Skeleton className="h-[300px] w-full rounded-[2.5rem]" />
                    <Skeleton className="h-[400px] w-full rounded-[2.5rem]" />
                </div>
            </div>
        </div>
    );
}
