'use client';

import React from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

export const CollaborationLoadingState = () => {
    return (
        <div className="space-y-8 max-w-5xl mx-auto">
            <div className="flex items-center justify-between">
                <Skeleton className="h-9 w-32 rounded-lg" />
                <Skeleton className="h-9 w-9 rounded-full" />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 space-y-6">
                    <Card className="border-none shadow-xl bg-card/50">
                        <CardHeader className="pb-4">
                            <div className="flex justify-between items-start mb-4">
                                <Skeleton className="h-6 w-24 rounded-full" />
                                <Skeleton className="h-4 w-32" />
                            </div>
                            <Skeleton className="h-10 w-3/4" />
                        </CardHeader>
                        <CardContent className="space-y-8">
                            <div className="space-y-3">
                                <Skeleton className="h-4 w-full" />
                                <Skeleton className="h-4 w-full" />
                                <Skeleton className="h-4 w-2/3" />
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-4">
                                <Skeleton className="h-24 w-full rounded-2xl" />
                                <Skeleton className="h-24 w-full rounded-2xl" />
                            </div>
                        </CardContent>
                    </Card>
                </div>
                <div className="space-y-6">
                    <Card className="rounded-3xl border-border/50">
                        <CardHeader><Skeleton className="h-6 w-32" /></CardHeader>
                        <CardContent>
                            <div className="flex items-center gap-4 p-4">
                                <Skeleton className="w-12 h-12 rounded-full" />
                                <div className="space-y-2 flex-1">
                                    <Skeleton className="h-5 w-3/4" />
                                    <Skeleton className="h-3 w-1/2" />
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
};
