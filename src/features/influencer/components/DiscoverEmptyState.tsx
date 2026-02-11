'use client';

import React from 'react';
import { SearchX, RotateCcw } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface DiscoverEmptyStateProps {
    onReset?: () => void;
}

export const DiscoverEmptyState = ({ onReset }: DiscoverEmptyStateProps) => {
    return (
        <div className="flex flex-col items-center justify-center p-16 bg-muted/20 border-2 border-dashed border-border/50 rounded-[4rem] text-center space-y-8 max-w-3xl mx-auto backdrop-blur-sm">
            <div className="w-24 h-24 bg-muted/50 rounded-[2.5rem] flex items-center justify-center relative overflow-hidden group">
                <div className="absolute inset-0 bg-primary/10 opacity-0 group-hover:opacity-100 transition-opacity" />
                <SearchX size={48} className="text-muted-foreground group-hover:text-primary transition-colors" />
            </div>

            <div className="space-y-3 max-w-sm">
                <h3 className="text-3xl font-black tracking-tight">No Creators Found</h3>
                <p className="text-muted-foreground text-lg leading-relaxed">
                    We couldn't find any influencers matching your current filters. Try broadening your search or resetting categories.
                </p>
            </div>

            {onReset && (
                <Button
                    variant="outline"
                    onClick={onReset}
                    className="h-14 px-10 rounded-2xl font-bold border-2 hover:bg-primary hover:text-primary-foreground hover:border-primary transition-all flex items-center gap-2 group"
                >
                    <RotateCcw size={20} className="group-hover:rotate-[-180deg] transition-transform duration-500" />
                    Reset All Filters
                </Button>
            )}
        </div>
    );
};
