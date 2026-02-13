'use client';

import React, { useState } from 'react';
import { useAdminReports, useUpdateReportStatus } from '@/hooks/use-admin.hooks';
import { ReportStatus } from '@/types/report.types';
import { ReportList } from '../components/ReportList';
import { ReportFilters } from '../components/ReportFilters';
import { Skeleton } from '@/components/ui/skeleton';

export function AdminReportsContainer() {
    const { data: reports, isLoading, isError } = useAdminReports();
    const updateStatus = useUpdateReportStatus();
    const [searchQuery, setSearchQuery] = useState('');
    const [statusFilter, setStatusFilter] = useState<ReportStatus | 'ALL'>('ALL');

    const filteredReports = reports?.filter(report => {
        const matchesSearch =
            report.reporter.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
            report.reason.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesStatus = statusFilter === 'ALL' || report.status === statusFilter;
        return matchesSearch && matchesStatus;
    }) || [];

    const handleStatusUpdate = (reportId: string, newStatus: ReportStatus) => {
        updateStatus.mutate({
            reportId,
            data: { status: newStatus }
        });
    };

    if (isLoading) {
        return (
            <div className="space-y-6">
                <Skeleton className="h-10 w-48" />
                <div className="flex gap-4">
                    <Skeleton className="h-10 flex-1" />
                    <Skeleton className="h-10 w-32" />
                </div>
                {[...Array(5)].map((_, i) => (
                    <Skeleton key={i} className="h-24 w-full rounded-xl" />
                ))}
            </div>
        );
    }

    if (isError) {
        return (
            <div className="flex min-h-[400px] flex-col items-center justify-center rounded-2xl border border-dashed border-border p-8 text-center text-rose-500">
                <h3 className="text-xl font-semibold">Failed to load reports</h3>
                <p className="mt-2 text-muted-foreground">Please try again later.</p>
            </div>
        );
    }

    return (
        <div className="space-y-6 pb-10">
            {/* Header */}
            <div className="flex flex-col gap-2">
                <h1 className="text-3xl font-bold tracking-tight text-foreground">User Reports</h1>
                <p className="text-muted-foreground">Manage and resolve reports submitted by users.</p>
            </div>

            {/* Filters */}
            <ReportFilters
                searchQuery={searchQuery}
                onSearchChange={setSearchQuery}
                statusFilter={statusFilter}
                onStatusFilterChange={setStatusFilter}
            />

            {/* Reports List */}
            <ReportList
                reports={filteredReports}
                onUpdateStatus={handleStatusUpdate}
            />
        </div>
    );
}
