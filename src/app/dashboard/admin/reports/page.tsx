'use client';

import { useState } from 'react';
import { useAllReports, useUpdateReportStatus } from '@/hooks/useAdmin';
import { PageContainer } from '@/components/layout/PageContainer';
import { PageHeader } from '@/components/layout/PageHeader';
import { GlassCard } from '@/components/ui/GlassCard';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { LoadingState } from '@/components/ui/states/LoadingState';
import { ErrorState } from '@/components/ui/states/ErrorState';
import { AlertCircle, CheckCircle, XCircle, Clock } from 'lucide-react';
import { format } from 'date-fns';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';

const statusConfig = {
    PENDING: { label: 'Pending', icon: Clock, color: 'bg-yellow-500/10 text-yellow-500 border-yellow-500/20' },
    REVIEWED: { label: 'Reviewed', icon: AlertCircle, color: 'bg-blue-500/10 text-blue-500 border-blue-500/20' },
    RESOLVED: { label: 'Resolved', icon: CheckCircle, color: 'bg-green-500/10 text-green-500 border-green-500/20' },
    DISMISSED: { label: 'Dismissed', icon: XCircle, color: 'bg-gray-500/10 text-gray-500 border-gray-500/20' },
};

export default function AdminReportsPage() {
    const { data: reports, isLoading, isError } = useAllReports();
    const updateStatusMutation = useUpdateReportStatus();
    const [selectedStatus, setSelectedStatus] = useState<Record<string, string>>({});

    const handleStatusChange = (reportId: string, newStatus: string) => {
        updateStatusMutation.mutate({ id: reportId, status: newStatus as any });
    };

    if (isLoading) return <LoadingState message="Loading reports..." />;
    if (isError) return <ErrorState message="Failed to load reports" />;

    return (
        <PageContainer>
            <PageHeader
                title="Reports Management"
                description="Review and manage all system reports from users."
            />

            <div className="space-y-6">
                {reports && reports.length === 0 ? (
                    <GlassCard className="p-12 text-center">
                        <AlertCircle className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
                        <h3 className="text-xl font-semibold mb-2">No Reports</h3>
                        <p className="text-muted-foreground">There are no reports to review at this time.</p>
                    </GlassCard>
                ) : (
                    reports?.map((report) => {
                        const StatusIcon = statusConfig[report.status].icon;
                        return (
                            <GlassCard key={report.id} className="p-6 border-glass-border">
                                <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                                    <div className="flex-1 space-y-3">
                                        <div className="flex items-center gap-3">
                                            <Badge variant="outline" className={statusConfig[report.status].color}>
                                                <StatusIcon className="w-3 h-3 mr-1" />
                                                {statusConfig[report.status].label}
                                            </Badge>
                                            <Badge variant="secondary">
                                                {report.targetType}
                                            </Badge>
                                        </div>

                                        <div>
                                            <h3 className="text-lg font-semibold mb-1">{report.reason}</h3>
                                            {report.details && (
                                                <p className="text-muted-foreground text-sm">{report.details}</p>
                                            )}
                                        </div>

                                        <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                                            <span>Reporter ID: {report.reporterId}</span>
                                            <span>Target ID: {report.targetId}</span>
                                            <span>Submitted: {format(new Date(report.createdAt), 'MMM dd, yyyy')}</span>
                                        </div>
                                    </div>

                                    <div className="flex flex-col gap-3 min-w-[200px]">
                                        <Select
                                            value={selectedStatus[report.id] || report.status}
                                            onValueChange={(value) => {
                                                setSelectedStatus({ ...selectedStatus, [report.id]: value });
                                                handleStatusChange(report.id, value);
                                            }}
                                        >
                                            <SelectTrigger className="glass border-glass-border">
                                                <SelectValue placeholder="Update status" />
                                            </SelectTrigger>
                                            <SelectContent className="glass border-glass-border">
                                                <SelectItem value="PENDING">Pending</SelectItem>
                                                <SelectItem value="REVIEWED">Reviewed</SelectItem>
                                                <SelectItem value="RESOLVED">Resolved</SelectItem>
                                                <SelectItem value="DISMISSED">Dismissed</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                </div>
                            </GlassCard>
                        );
                    })
                )}
            </div>
        </PageContainer>
    );
}
