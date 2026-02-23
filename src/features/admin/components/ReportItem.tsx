'use client';

import React from 'react';
import { motion } from 'framer-motion';
import {
    ShieldAlert,
    MoreVertical,
    Clock,
    CheckCircle2,
    User as UserIcon,
    ExternalLink,
    AlertCircle
} from 'lucide-react';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';
import { ReportStatus, Report } from '@/types/report.types';
import { Button } from '@/components/ui/button';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

interface StatusBadgeProps {
    status: ReportStatus;
}

function StatusBadge({ status }: StatusBadgeProps) {
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

interface ReportItemProps {
    report: Report;
    index: number;
    onUpdateStatus: (reportId: string, status: ReportStatus) => void;
}

export function ReportItem({ report, index, onUpdateStatus }: ReportItemProps) {
    return (
        <motion.div
            layout
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ delay: index * 0.05 }}
            className="group relative rounded-2xl border border-border/40 bg-card/40 backdrop-blur-xl backdrop-saturate-150 p-5 shadow-sm transition-all duration-300 ease-out hover:shadow-lg hover:border-primary/20 will-change-transform"
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
                                onClick={() => onUpdateStatus(report.id, ReportStatus.UNDER_REVIEW)}
                                className="gap-2"
                            >
                                <Clock size={16} /> Mark Under Review
                            </DropdownMenuItem>
                            <DropdownMenuItem
                                onClick={() => onUpdateStatus(report.id, ReportStatus.RESOLVED)}
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
    );
}
