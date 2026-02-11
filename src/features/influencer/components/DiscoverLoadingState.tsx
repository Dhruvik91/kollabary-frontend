'use client';

import React from 'react';
import { Skeleton } from '@/components/ui/skeleton';

export const DiscoverLoadingState = () => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
                <div key={i} className="bg-card/30 border border-border/50 rounded-[2rem] overflow-hidden">
                    <Skeleton className="h-32 w-full rounded-b-none" />
                    <div className="p-6 space-y-4">
                        <div className="flex items-center gap-4">
                            <Skeleton className="w-16 h-16 rounded-2xl" />
                            <div className="space-y-2 flex-1">
                                <Skeleton className="h-5 w-3/4" />
                                <Skeleton className="h-4 w-1/2" />
                            </div>
                        </div>
                        <div className="flex gap-2">
                            <Skeleton className="h-6 w-16 rounded-lg" />
                            <Skeleton className="h-6 w-24 rounded-lg" />
                        </div>
                        <div className="grid grid-cols-3 gap-2 pt-4 border-t border-border/50">
                            <Skeleton className="h-10 w-full rounded-xl" />
                            <Skeleton className="h-10 w-full rounded-xl" />
                            <Skeleton className="h-10 w-full rounded-xl" />
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};
