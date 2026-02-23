'use client';

import { CollaborationStatus, CollaborationFilters } from '@/types/collaboration.types';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search, X } from 'lucide-react';
import { cn } from '@/lib/utils';

interface CollaborationFilterBarProps {
    filters: CollaborationFilters;
    onFilterChange: (filters: CollaborationFilters) => void;
}

const STATUS_OPTIONS: { label: string; value: CollaborationStatus | undefined }[] = [
    { label: 'All', value: undefined },
    { label: 'Requested', value: CollaborationStatus.REQUESTED },
    { label: 'Accepted', value: CollaborationStatus.ACCEPTED },
    { label: 'In Progress', value: CollaborationStatus.IN_PROGRESS },
    { label: 'Completed', value: CollaborationStatus.COMPLETED },
    { label: 'Rejected', value: CollaborationStatus.REJECTED },
    { label: 'Cancelled', value: CollaborationStatus.CANCELLED },
];

/**
 * Presentational filter bar for the collaborations list.
 * Horizontal scrollable status chips + search input.
 */
export const CollaborationFilterBar = ({ filters, onFilterChange }: CollaborationFilterBarProps) => {
    return (
        <div className="space-y-4">
            {/* Search */}
            <div className="relative group">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground group-focus-within:text-primary transition-colors" size={16} />
                <Input
                    placeholder="Search collaborations..."
                    value={filters.search || ''}
                    onChange={(e) => onFilterChange({ ...filters, search: e.target.value || undefined })}
                    className="pl-9 pr-9 h-10 bg-muted/50 border-transparent focus-visible:bg-background focus-visible:ring-primary/20 transition-all rounded-xl"
                />
                {filters.search && (
                    <button
                        onClick={() => onFilterChange({ ...filters, search: undefined })}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                        aria-label="Clear search"
                    >
                        <X size={14} />
                    </button>
                )}
            </div>

            {/* Status chips */}
            <div className="flex items-center gap-2 overflow-x-auto scrollbar-none pb-1 -mb-1">
                {STATUS_OPTIONS.map((option) => {
                    const isActive = filters.status === option.value;
                    return (
                        <Button
                            key={option.label}
                            variant={isActive ? 'default' : 'outline'}
                            size="sm"
                            onClick={() => onFilterChange({ ...filters, status: option.value })}
                            className={cn(
                                'rounded-full whitespace-nowrap shrink-0 text-xs font-semibold transition-all',
                                isActive
                                    ? 'shadow-md shadow-primary/20'
                                    : 'hover:border-primary/50 hover:text-primary'
                            )}
                        >
                            {option.label}
                        </Button>
                    );
                })}
            </div>
        </div>
    );
};
