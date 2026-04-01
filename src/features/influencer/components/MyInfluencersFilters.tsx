import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search, X } from 'lucide-react';
import { cn } from '@/lib/utils';

interface MyInfluencersFiltersProps {
    filters: {
        search?: string;
        niche?: string;
        limit?: number;
    };
    onFilterChange: (filters: Partial<{ search?: string; niche?: string }>) => void;
    onReset: () => void;
    className?: string;
}

export const MyInfluencersFilters = ({
    filters,
    onFilterChange,
    onReset,
    className,
}: MyInfluencersFiltersProps) => {
    const hasActiveFilters = filters.search || filters.niche;

    return (
        <Card className={cn(
            "border-border/50 bg-card/50 backdrop-blur-xl shadow-xl rounded-[2rem]",
            className
        )}>
            <CardHeader className="pb-4">
                <div className="flex items-center justify-between">
                    <CardTitle className="text-xl font-black tracking-tight">Filters</CardTitle>
                    {hasActiveFilters && (
                        <Button
                            variant="ghost"
                            size="sm"
                            onClick={onReset}
                            className="h-8 px-3 text-xs font-bold rounded-xl hover:bg-destructive/10 hover:text-destructive"
                        >
                            <X size={14} className="mr-1" />
                            Clear
                        </Button>
                    )}
                </div>
            </CardHeader>
            <CardContent className="space-y-4">
                <div className="space-y-2">
                    <label className="text-sm font-bold text-muted-foreground uppercase tracking-wider">
                        Search
                    </label>
                    <div className="relative">
                        <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                        <Input
                            placeholder="Search by name..."
                            value={filters.search || ''}
                            onChange={(e) => onFilterChange({ search: e.target.value })}
                            className="pl-10 h-12 rounded-xl border-border/50 bg-background/50"
                        />
                    </div>
                </div>

                <div className="space-y-2">
                    <label className="text-sm font-bold text-muted-foreground uppercase tracking-wider">
                        Niche
                    </label>
                    <Input
                        placeholder="Filter by niche..."
                        value={filters.niche || ''}
                        onChange={(e) => onFilterChange({ niche: e.target.value })}
                        className="h-12 rounded-xl border-border/50 bg-background/50"
                    />
                </div>
            </CardContent>
        </Card>
    );
};
