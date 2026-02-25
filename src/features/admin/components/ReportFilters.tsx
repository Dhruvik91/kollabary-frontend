'use client';

import React from 'react';
import { Search, Filter } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import { ReportStatus } from '@/types/report.types';

interface ReportFiltersProps {
    searchQuery: string;
    onSearchChange: (query: string) => void;
    statusFilter: ReportStatus | 'ALL';
    onStatusFilterChange: (status: ReportStatus | 'ALL') => void;
}

export function ReportFilters({
    searchQuery,
    onSearchChange,
    statusFilter,
    onStatusFilterChange
}: ReportFiltersProps) {
    return (
        <div className="flex flex-col lg:flex-row gap-4 lg:items-center">
            <div className="relative w-full lg:flex-1 group">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground group-focus-within:text-primary transition-colors" size={18} />
                <Input
                    placeholder="Search reports by user or reason..."
                    className="pl-10 rounded-xl bg-card border-border/50 focus:ring-primary/20"
                    value={searchQuery}
                    onChange={(e) => onSearchChange(e.target.value)}
                />
            </div>

            <div className="flex items-center gap-2 w-full overflow-hidden">
                <Filter size={18} className="text-muted-foreground shrink-0" />
                <div className="flex bg-muted/50 p-1 rounded-xl border border-border/50 overflow-x-auto no-scrollbar scroll-smooth w-full">
                    {['ALL', ...Object.values(ReportStatus)].map((status) => (
                        <button
                            key={status}
                            onClick={() => onStatusFilterChange(status as any)}
                            className={cn(
                                "px-4 py-1.5 rounded-lg text-xs font-semibold transition-all",
                                statusFilter === status
                                    ? "bg-card text-foreground shadow-sm"
                                    : "text-muted-foreground hover:text-foreground"
                            )}
                        >
                            <span className="whitespace-nowrap">
                                {status.charAt(0) + status.slice(1).toLowerCase().replace('_', ' ')}
                            </span>
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
}
