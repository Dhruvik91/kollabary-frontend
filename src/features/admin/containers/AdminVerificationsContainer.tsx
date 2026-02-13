'use client';

import React from 'react';
import { useAdminVerifications, useProcessVerification } from '@/hooks/use-admin.hooks';
import { VerificationRequestList } from '../components/VerificationRequestList';
import { Skeleton } from '@/components/ui/skeleton';

export function AdminVerificationsContainer() {
    const { data: requests, isLoading, isError } = useAdminVerifications();
    const processVerification = useProcessVerification();

    const handleProcess = (id: string, status: 'APPROVED' | 'REJECTED', notes: string) => {
        processVerification.mutate({ id, status, notes });
    };

    if (isLoading) {
        return (
            <div className="space-y-6">
                <Skeleton className="h-10 w-64" />
                <div className="grid gap-6 md:grid-cols-2">
                    {[...Array(4)].map((_, i) => (
                        <Skeleton key={i} className="h-48 w-full rounded-2xl" />
                    ))}
                </div>
            </div>
        );
    }

    if (isError) {
        return (
            <div className="flex min-h-[400px] flex-col items-center justify-center rounded-2xl border border-dashed border-border p-8 text-center text-rose-500">
                <h3 className="text-xl font-semibold">Failed to load verification requests</h3>
                <p className="mt-2 text-muted-foreground">Please try again later.</p>
            </div>
        );
    }

    return (
        <div className="space-y-6 pb-10">
            {/* Header */}
            <div className="flex flex-col gap-2">
                <h1 className="text-3xl font-bold tracking-tight text-foreground">Verification Requests</h1>
                <p className="text-muted-foreground">Review and process identity verification for influencers.</p>
            </div>

            {/* Requests List */}
            <VerificationRequestList
                requests={requests}
                onProcess={handleProcess}
            />
        </div>
    );
}
