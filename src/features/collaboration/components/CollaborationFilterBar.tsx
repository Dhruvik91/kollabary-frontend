'use client';

import { CollaborationStatus, CollaborationFilters } from '@/types/collaboration.types';
import { Input } from '@/components/ui/input';
import { Search, X } from 'lucide-react';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface CollaborationFilterBarProps {
    filters: CollaborationFilters;
    onFilterChange: (filters: CollaborationFilters) => void;
}

const STATUS_OPTIONS: { label: string; value: string }[] = [
    { label: 'All', value: 'all' },
    { label: 'Requested', value: CollaborationStatus.REQUESTED },
    { label: 'Accepted', value: CollaborationStatus.ACCEPTED },
    { label: 'In Progress', value: CollaborationStatus.IN_PROGRESS },
    { label: 'Completed', value: CollaborationStatus.COMPLETED },
    { label: 'Rejected', value: CollaborationStatus.REJECTED },
    { label: 'Cancelled', value: CollaborationStatus.CANCELLED },
];

/**
 * Presentational filter bar for the collaborations list.
 */
export const CollaborationFilterBar = ({ filters, onFilterChange }: CollaborationFilterBarProps) => {
    const activeTab = filters.status || 'all';

    const handleTabChange = (value: string) => {
        onFilterChange({ 
            ...filters, 
            status: value === 'all' ? undefined : (value as CollaborationStatus) 
        });
    };

    return (
        <div className="space-y-6">
            {/* Search */}
            <div className="relative group px-1">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground group-focus-within:text-primary transition-colors" size={16} />
                <Input
                    placeholder="Search collaborations..."
                    value={filters.search || ''}
                    onChange={(e) => onFilterChange({ ...filters, search: e.target.value || undefined })}
                    className="pl-10 pr-10 h-12 bg-muted/30 border-border/50 focus-visible:bg-background focus-visible:ring-primary/20 transition-all rounded-2xl w-full text-sm"
                />
                {filters.search && (
                    <button
                        onClick={() => onFilterChange({ ...filters, search: undefined })}
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                        aria-label="Clear search"
                    >
                        <X size={14} />
                    </button>
                )}
            </div>

            {/* Status Tabs */}
            <div className="w-full">
                <Tabs value={activeTab} onValueChange={handleTabChange} className="w-full">
                    <div className="overflow-x-auto overflow-y-hidden scrollbar-none pb-2">
                        <TabsList className="h-12 p-1 bg-card border border-border rounded-2xl inline-flex min-w-full sm:min-w-0 flex items-center gap-1.5 shadow-sm overflow-y-hidden">
                            {STATUS_OPTIONS.map((option) => (
                                <TabsTrigger 
                                    key={option.value}
                                    value={option.value}
                                    className="px-4 sm:px-6 h-10 rounded-xl font-bold text-[11px] sm:text-xs uppercase tracking-widest data-[state=active]:bg-primary data-[state=active]:text-white dark:data-[state=active]:text-white data-[state=active]:shadow-lg data-[state=active]:shadow-primary/20 transition-all whitespace-nowrap shrink-0"
                                >
                                    {option.label}
                                </TabsTrigger>
                            ))}
                        </TabsList>
                    </div>
                </Tabs>
            </div>
        </div>
    );
};
