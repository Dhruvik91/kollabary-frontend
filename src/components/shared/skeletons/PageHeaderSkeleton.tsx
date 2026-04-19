'use client';

import React from 'react';
import { Skeleton } from '@/components/ui/skeleton';
import { cn } from '@/lib/utils';

interface PageHeaderSkeletonProps {
    className?: string;
    hasAction?: boolean;
    hasSubtitle?: boolean;
    label?: string; // For compatibility with PageHeader component calls
}

export const PageHeaderSkeleton = ({
    className,
    hasAction = true,
    hasSubtitle = true,
}: PageHeaderSkeletonProps) => {
    return (
        <div className={cn("flex flex-col gap-6 md:flex-row md:items-end md:justify-between w-full", className)}>
            <div className="space-y-2 sm:space-y-3 max-w-3xl">
                {/* Label skeleton */}
                <div className="flex items-center gap-2">
                    <Skeleton className="h-4 w-4 rounded-sm" />
                    <Skeleton className="h-4 w-24" />
                </div>

                {/* Title skeleton */}
                <div className="space-y-2">
                    <Skeleton className="h-10 sm:h-12 md:h-16 w-3/4 sm:w-1/2" />
                    <Skeleton className="h-10 sm:h-12 md:h-16 w-1/2 sm:w-1/3 italic" />
                </div>

                {/* Subtitle skeleton */}
                {hasSubtitle && (
                    <div className="space-y-1 mt-4">
                        <Skeleton className="h-4 w-full max-w-md" />
                        <Skeleton className="h-4 w-3/4 max-w-sm" />
                    </div>
                )}
            </div>

            {/* Action button skeleton */}
            {hasAction && (
                <Skeleton className="h-14 w-full md:w-48 rounded-[1.5rem]" />
            )}
        </div>
    );
};
