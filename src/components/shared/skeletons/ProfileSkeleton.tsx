'use client';

import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

export const ProfileSkeleton = () => {
    return (
        <div className="space-y-6 sm:space-y-8 pb-20 md:px-0">
            {/* Header / Hero Section Skeleton */}
            <div className="relative">
                {/* Banner */}
                <Skeleton className="h-48 md:h-64 rounded-[2.5rem]" />

                {/* Profile Info Overlay */}
                <div className="px-6 md:px-12 -mt-16 md:-mt-20 relative z-10 flex flex-col md:flex-row md:items-end gap-6 md:gap-8">
                    {/* Avatar */}
                    <Skeleton className="w-32 h-32 md:w-40 md:h-40 rounded-[2rem] border-4 md:border-8 border-background shadow-2xl" />

                    <div className="flex-1 space-y-2 md:pb-4">
                        <div className="flex flex-wrap items-center gap-4">
                            <Skeleton className="h-10 w-48" />
                            <Skeleton className="h-6 w-24 rounded-full" />
                        </div>
                        <div className="flex flex-wrap items-center gap-4">
                            <Skeleton className="h-4 w-32" />
                            <Skeleton className="h-4 w-48" />
                        </div>
                    </div>

                    <div className="md:pb-4 flex items-center gap-3">
                        <Skeleton className="h-12 w-32 rounded-xl" />
                        <Skeleton className="h-12 w-12 rounded-xl" />
                    </div>
                </div>
            </div>

            {/* Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Left: Social Links Sidebar */}
                <div className="lg:col-span-1 space-y-6">
                    <Card className="rounded-[2rem] border-border/50 bg-card/30 overflow-hidden">
                        <div className="p-6 border-b border-border/50 bg-muted/20 flex items-center gap-3">
                            <Skeleton className="w-8 h-8 rounded-lg" />
                            <Skeleton className="h-6 w-32" />
                        </div>
                        <CardContent className="p-6 space-y-3">
                            {[1, 2, 3].map((i) => (
                                <Skeleton key={i} className="h-14 w-full rounded-xl" />
                            ))}
                        </CardContent>
                    </Card>
                </div>

                {/* Center/Right: Bio */}
                <div className="lg:col-span-2">
                    <Card className="rounded-[2rem] border-border/50 bg-card/30 p-8 md:p-10">
                        <div className="space-y-6">
                            <div className="flex items-center gap-3">
                                <Skeleton className="w-10 h-10 rounded-xl" />
                                <Skeleton className="h-8 w-32" />
                            </div>
                            <div className="space-y-2">
                                <Skeleton className="h-5 w-full" />
                                <Skeleton className="h-5 w-full" />
                                <Skeleton className="h-5 w-3/4" />
                            </div>
                        </div>
                    </Card>
                </div>
            </div>

            {/* Account Security */}
            <div className="lg:col-span-3">
                <Card className="rounded-[2.5rem] border-border/50 bg-card/30 p-8 md:p-10">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="space-y-3">
                            <div className="flex items-center gap-3">
                                <Skeleton className="w-10 h-10 rounded-xl" />
                                <Skeleton className="h-8 w-48" />
                            </div>
                            <Skeleton className="h-4 w-full" />
                        </div>
                        <div className="md:col-span-2 space-y-4">
                            <Skeleton className="h-12 w-full rounded-xl" />
                            <Skeleton className="h-12 w-full rounded-xl" />
                            <Skeleton className="h-12 w-32 rounded-xl" />
                        </div>
                    </div>
                </Card>
            </div>
        </div>
    );
};
