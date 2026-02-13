'use client';

import React, { useState } from 'react';
import {
    ShieldAlert,
    MoreVertical,
    Filter,
    CheckCircle2,
    Clock,
    AlertCircle,
    User as UserIcon,
    Search,
    ExternalLink
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAdminReports, useUpdateReportStatus } from '@/hooks/use-admin.hooks';
import { ReportStatus } from '@/types/report.types';
import { cn } from '@/lib/utils';
import { Skeleton } from '@/components/ui/skeleton';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { format } from 'date-fns';

function StatusBadge({ status }: { status: ReportStatus }) {
    const config = {
        [ReportStatus.OPEN]: {
            icon: AlertCircle,
            className: "bg-rose-500/10 text-rose-600 border-rose-500/20",
            label: "Open"
        },
        [ReportStatus.UNDER_REVIEW]: {
            icon: Clock,
            className: "bg-amber-500/10 text-amber-600 border-amber-500/20",
            label: "Under Review"
        },
        [ReportStatus.RESOLVED]: {
            icon: CheckCircle2,
            className: "bg-emerald-500/10 text-emerald-600 border-emerald-500/20",
            label: "Resolved"
        }
    };

    const { icon: Icon, className, label } = config[status];

    return (
        <div className={cn("flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold border", className)}>
            <Icon size={12} />
            {label}
        </div>
    );
}

export default function AdminReportsPage() {
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

    return (
        <div className="space-y-6 pb-10">
            {/* Header */}
            <div className="flex flex-col gap-2">
                <h1 className="text-3xl font-bold tracking-tight text-foreground">User Reports</h1>
                <p className="text-muted-foreground">Manage and resolve reports submitted by users.</p>
            </div>

            {/* Filters */}
            <div className="flex flex-col md:flex-row gap-4 items-center">
                <div className="relative flex-1 group">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground group-focus-within:text-primary transition-colors" size={18} />
                    <Input
                        placeholder="Search reports by user or reason..."
                        className="pl-10 rounded-xl bg-card border-border/50 focus:ring-primary/20"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </div>

                <div className="flex items-center gap-2">
                    <Filter size={18} className="text-muted-foreground" />
                    <div className="flex bg-muted/50 p-1 rounded-xl border border-border/50">
                        {['ALL', ...Object.values(ReportStatus)].map((status) => (
                            <button
                                key={status}
                                onClick={() => setStatusFilter(status as any)}
                                className={cn(
                                    "px-4 py-1.5 rounded-lg text-xs font-semibold transition-all",
                                    statusFilter === status
                                        ? "bg-card text-foreground shadow-sm"
                                        : "text-muted-foreground hover:text-foreground"
                                )}
                            >
                                {status.charAt(0) + status.slice(1).toLowerCase().replace('_', ' ')}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            {/* Reports List */}
            <div className="space-y-4">
                <AnimatePresence mode="popLayout">
                    {filteredReports.length > 0 ? (
                        filteredReports.map((report, idx) => (
                            <motion.div
                                key={report.id}
                                layout
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.95 }}
                                transition={{ delay: idx * 0.05 }}
                                className="group relative rounded-2xl border border-border/50 bg-card p-5 shadow-sm transition-all hover:shadow-md hover:border-primary/20"
                            >
                                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                                    <div className="flex items-start gap-4">
                                        <div className="mt-1 rounded-full bg-muted p-2 text-muted-foreground">
                                            <ShieldAlert size={20} />
                                        </div>
                                        <div>
                                            <div className="flex items-center gap-2 flex-wrap">
                                                <h3 className="font-semibold text-foreground">{report.reason}</h3>
                                                <StatusBadge status={report.status} />
                                            </div>
                                            <div className="mt-1 flex items-center gap-3 text-sm text-muted-foreground">
                                                <span className="flex items-center gap-1">
                                                    <UserIcon size={14} />
                                                    By: {report.reporter.email}
                                                </span>
                                                <span className="h-1 w-1 rounded-full bg-muted-foreground/30" />
                                                <span className="flex items-center gap-1">
                                                    <Clock size={14} />
                                                    {format(new Date(report.createdAt), 'MMM d, yyyy')}
                                                </span>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-2 self-end md:self-center">
                                        <Button variant="outline" size="sm" className="rounded-lg h-9 gap-2">
                                            <ExternalLink size={14} />
                                            Inspect
                                        </Button>

                                        <DropdownMenu>
                                            <DropdownMenuTrigger asChild>
                                                <Button variant="ghost" size="icon" className="h-9 w-9 rounded-lg">
                                                    <MoreVertical size={18} />
                                                </Button>
                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent align="end" className="w-48 rounded-xl">
                                                <DropdownMenuItem
                                                    onClick={() => handleStatusUpdate(report.id, ReportStatus.UNDER_REVIEW)}
                                                    className="gap-2"
                                                >
                                                    <Clock size={16} /> Mark Under Review
                                                </DropdownMenuItem>
                                                <DropdownMenuItem
                                                    onClick={() => handleStatusUpdate(report.id, ReportStatus.RESOLVED)}
                                                    className="gap-2 text-emerald-600 focus:text-emerald-700 focus:bg-emerald-50"
                                                >
                                                    <CheckCircle2 size={16} /> Resolve Report
                                                </DropdownMenuItem>
                                            </DropdownMenuContent>
                                        </DropdownMenu>
                                    </div>
                                </div>

                                <div className="mt-4 rounded-xl bg-muted/30 p-4 text-sm text-muted-foreground border border-border/30">
                                    {report.description || "No additional description provided."}
                                </div>
                            </motion.div>
                        ))
                    ) : (
                        <div className="flex flex-col items-center justify-center py-20 bg-muted/20 rounded-2xl border border-dashed border-border/50">
                            <ShieldAlert size={48} className="text-muted-foreground/30" />
                            <p className="mt-4 text-lg font-medium text-muted-foreground">No reports found matching your criteria.</p>
                        </div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
}
