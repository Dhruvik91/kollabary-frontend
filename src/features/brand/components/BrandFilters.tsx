'use client';

import React from 'react';
import { Search, MapPin, X } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface BrandFiltersProps {
    filters: {
        query?: string;
        location?: string;
    };
    onFilterChange: (newFilters: any) => void;
    onReset: () => void;
    className?: string;
}

export const BrandFilters = ({
    filters,
    onFilterChange,
    onReset,
    className,
}: BrandFiltersProps) => {
    return (
        <Card className={cn("border-border/50 bg-card/60 backdrop-blur-xl rounded-[2.5rem] overflow-hidden", className)}>
            <div className="p-6 border-b border-border/50 bg-muted/30 flex items-center justify-between">
                <h3 className="font-bold tracking-tight">Filter Brands</h3>
                <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={onReset}
                    className="text-xs font-bold text-muted-foreground hover:text-primary transition-colors h-8"
                >
                    <X size={14} className="mr-1" />
                    Reset
                </Button>
            </div>
            <CardContent className="p-6 space-y-6">
                {/* Search */}
                <div className="space-y-3">
                    <label className="text-xs font-black uppercase tracking-widest text-muted-foreground/70">Search Name</label>
                    <div className="relative group">
                        <Search className="absolute left-4 top-4 text-muted-foreground group-focus-within:text-primary transition-colors" size={18} />
                        <Input
                            placeholder="Find a brand..."
                            className="h-14 pl-12 rounded-2xl bg-zinc-50 dark:bg-white/5 border-border/50 transition-all focus:ring-2 focus:ring-primary/20"
                            value={filters.query || ''}
                            onChange={(e) => onFilterChange({ query: e.target.value })}
                        />
                    </div>
                </div>

                {/* Location */}
                <div className="space-y-3">
                    <label className="text-xs font-black uppercase tracking-widest text-muted-foreground/70">Location</label>
                    <div className="relative group">
                        <MapPin className="absolute left-4 top-4 text-muted-foreground group-focus-within:text-secondary transition-colors" size={18} />
                        <Input
                            placeholder="City or Country..."
                            className="h-14 pl-12 rounded-2xl bg-zinc-50 dark:bg-white/5 border-border/50 transition-all focus:ring-2 focus:ring-secondary/20"
                            value={filters.location || ''}
                            onChange={(e) => onFilterChange({ location: e.target.value })}
                        />
                    </div>
                </div>

                <div className="pt-2">
                    <p className="text-[10px] text-muted-foreground leading-relaxed">
                        Explore partner opportunities and grow your influence through direct partnerships with leading brands.
                    </p>
                </div>
            </CardContent>
        </Card>
    );
};
