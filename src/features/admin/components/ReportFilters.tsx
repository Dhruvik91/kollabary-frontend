'use client';

import React from 'react';
import { Search, Filter, X } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { ReportStatus } from '@/types/report.types';

interface ReportFiltersProps {
    searchQuery: string;
    onSearchChange: (query: string) => void;
    statusFilter: ReportStatus | 'ALL';
    onStatusFilterChange: (status: ReportStatus | 'ALL') => void;
    onClearFilters: () => void;
}

export function ReportFilters({
    searchQuery,
    onSearchChange,
    statusFilter,
    onStatusFilterChange,
    onClearFilters
}: ReportFiltersProps) {
    const hasActiveFilters = searchQuery.length > 0 || statusFilter !== 'ALL';

    return (
        <div className="flex flex-col gap-3 w-full">
            {/* Search Input */}
            <div className="relative w-full group">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                    <Search
                        className="text-muted-foreground group-focus-within:text-primary transition-all duration-300 group-focus-within:scale-110"
                        size={18}
                    />
                </div>
                <Input
                    placeholder="Search reports by user or reason..."
                    className="pl-11 h-11 rounded-2xl bg-card/40 border-border/40 glass-card focus-visible:ring-primary/20 focus-visible:border-primary/30 transition-all duration-300 placeholder:text-muted-foreground/60 w-full"
                    value={searchQuery}
                    onChange={(e) => onSearchChange(e.target.value)}
                />
                {searchQuery && (
                    <button
                        onClick={() => onSearchChange('')}
                        className="absolute inset-y-0 right-0 pr-3 flex items-center text-muted-foreground hover:text-foreground transition-colors"
                    >
                        <X size={16} />
                    </button>
                )}
            </div>

            {/* Status Filters & Clear */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                <div className="flex items-center gap-2 p-1.5 rounded-2xl bg-card/40 border border-border/40 glass-card h-11 flex-1 min-w-0">
                    <div className="px-2 border-r border-border/20 hidden xs:block shrink-0">
                        <Filter size={16} className="text-muted-foreground/70" />
                    </div>
                    <div className="flex items-center gap-1 overflow-x-auto no-scrollbar h-full px-1 w-full">
                        {['ALL', ...Object.values(ReportStatus)].map((status) => (
                            <button
                                key={status}
                                onClick={() => onStatusFilterChange(status as any)}
                                className={cn(
                                    "relative px-4 py-1.5 rounded-xl text-xs font-semibold transition-all duration-300 whitespace-nowrap shrink-0",
                                    statusFilter === status
                                        ? "bg-primary text-primary-foreground shadow-lg shadow-primary/20 translate-y-[-1px]"
                                        : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                                )}
                            >
                                {status.charAt(0) + status.slice(1).toLowerCase().replace('_', ' ')}
                            </button>
                        ))}
                    </div>
                </div>

                {hasActiveFilters && (
                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={onClearFilters}
                        className="h-11 px-4 rounded-2xl text-xs font-semibold gap-2 border border-border/40 bg-card/40 glass-card hover:bg-rose-500/10 hover:text-rose-500 hover:border-rose-500/20 transition-all duration-300 group animate-in fade-in slide-in-from-bottom-2 sm:slide-in-from-right-2 shrink-0"
                    >
                        <X size={14} className="group-hover:rotate-90 transition-transform duration-300" />
                        <span>Clear Filters</span>
                    </Button>
                )}
            </div>
        </div>
    );
}
