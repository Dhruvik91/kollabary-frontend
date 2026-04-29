'use client';

import { useAdminReports, useUpdateReportStatus } from '@/hooks/use-admin.hooks';
import { ReportStatus, Report } from '@/types/report.types';
import { DataTable } from '@/components/shared/DataTable';
import { ColumnDef } from '@tanstack/react-table';
import { format } from 'date-fns';
import {
    Clock,
    CheckCircle2,
    AlertCircle,
    MoreVertical,
    User as UserIcon,
    ShieldAlert,
    ExternalLink
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { cn } from '@/lib/utils';

import { PageHeader } from '@/components/shared/PageHeader';

export function AdminReportsContainer() {
    const updateStatus = useUpdateReportStatus();
    const { data: reports = [], isLoading } = useAdminReports({});

    const handleStatusUpdate = (reportId: string, newStatus: ReportStatus) => {
        updateStatus.mutate({
            reportId,
            data: { status: newStatus }
        });
    };

    const columns: ColumnDef<Report>[] = [
        {
            id: 'reason',
            header: 'Reason',
            accessorKey: 'reason',
            cell: ({ row }) => {
                const report = row.original;
                return (
                    <div className="flex flex-col gap-1 max-w-[300px]">
                        <span className="font-semibold text-foreground break-words leading-tight">
                            {report.reason}
                        </span>
                        <span className="text-xs text-muted-foreground line-clamp-1">
                            {report.description || "No description provided."}
                        </span>
                    </div>
                );
            },
        },
        {
            id: 'reporter',
            header: 'Reporter',
            accessorKey: 'reporter.email',
            cell: ({ row }) => (
                <div className="flex items-center gap-2">
                    <UserIcon size={14} className="text-muted-foreground" />
                    <span className="text-sm truncate max-w-[150px]">{row.original.reporter.email}</span>
                </div>
            ),
        },
        {
            id: 'status',
            header: 'Status',
            accessorKey: 'status',
            cell: ({ row }) => {
                const status = row.original.status;
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
                    <div className={cn("flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold border w-fit", className)}>
                        <Icon size={12} />
                        {label}
                    </div>
                );
            },
        },
        {
            id: 'date',
            header: 'Date',
            accessorKey: 'createdAt',
            cell: ({ row }) => (
                <span className="text-xs font-medium text-muted-foreground">
                    {format(new Date(row.original.createdAt), 'MMM d, yyyy')}
                </span>
            ),
        },
        {
            id: 'actions',
            header: 'Actions',
            meta: { headerAlign: 'left' },
            cell: ({ row }) => {
                const report = row.original;
                return (
                    <div className="flex items-center justify-start gap-2">
                        <Button variant="outline" size="sm" className="h-8 w-8 p-0 rounded-lg">
                            <ExternalLink size={14} />
                        </Button>
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="icon" className="h-8 w-8 rounded-lg hover:bg-muted/50 transition-colors">
                                    <MoreVertical size={18} className="text-muted-foreground" />
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end" className="w-48 rounded-xl glass-card border-border/40">
                                <DropdownMenuItem
                                    onClick={() => handleStatusUpdate(report.id, ReportStatus.UNDER_REVIEW)}
                                    className="gap-2 cursor-pointer"
                                >
                                    <Clock size={16} /> Mark Under Review
                                </DropdownMenuItem>
                                <DropdownMenuItem
                                    onClick={() => handleStatusUpdate(report.id, ReportStatus.RESOLVED)}
                                    className="gap-2 text-emerald-600 focus:text-emerald-700 focus:bg-emerald-500/10 cursor-pointer"
                                >
                                    <CheckCircle2 size={16} /> Resolve Report
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                );
            },
        },
    ];

    return (
        <div className="space-y-8 pb-10">
            <PageHeader
                label="Compliance Control"
                title="User"
                highlightedTitle="Reports"
                subtitle="Manage and resolve reports submitted by users across the platform."
                icon={ShieldAlert}
            />

            {/* Reports DataTable */}
            <DataTable
                data={reports}
                columns={columns}
                isLoading={isLoading}
                showSearch={true}
                searchPosition="end"
                className="w-full"
                emptyState={
                    <div className="flex flex-col items-center justify-center py-20 bg-muted/20 rounded-2xl border border-dashed border-border/50">
                        <ShieldAlert size={48} className="text-muted-foreground/30" />
                        <p className="mt-4 text-lg font-medium text-muted-foreground">No reports found matching your criteria.</p>
                    </div>
                }
            />
        </div>
    );
}
