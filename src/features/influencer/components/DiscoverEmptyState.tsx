'use client';

import React from 'react';
import { SearchX, RotateCcw } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface DiscoverEmptyStateProps {
    onReset?: () => void;
}

export const DiscoverEmptyState = ({ onReset }: DiscoverEmptyStateProps) => {
    return (
        <div className="flex flex-col items-center justify-center p-8 sm:p-12 md:p-16 bg-muted/10 dark:bg-muted/5 border-2 border-dashed border-border/50 rounded-[2rem] sm:rounded-[3rem] md:rounded-[4rem] text-center space-y-6 sm:space-y-8 max-w-3xl mx-auto backdrop-blur-sm">
            <div className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 bg-muted/50 dark:bg-muted/10 rounded-[1.5rem] sm:rounded-[2rem] md:rounded-[2.5rem] flex items-center justify-center relative overflow-hidden group">
                <div className="absolute inset-0 bg-primary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <SearchX size={32} className="text-muted-foreground group-hover:text-primary transition-colors sm:hidden" />
                <SearchX size={40} className="hidden sm:block md:hidden text-muted-foreground group-hover:text-primary transition-colors" />
                <SearchX size={48} className="hidden md:block text-muted-foreground group-hover:text-primary transition-colors" />
            </div>

            <div className="space-y-2 sm:space-y-3 max-w-sm">
                <h3 className="text-2xl sm:text-3xl font-black tracking-tight drop-shadow-sm">No Creators Found</h3>
                <p className="text-sm sm:text-base md:text-lg text-muted-foreground leading-relaxed font-medium">
                    We couldn't find any influencers matching your current filters. Try broadening your search or resetting categories.
                </p>
            </div>

            {onReset && (
                <Button
                    variant="outline"
                    onClick={onReset}
                    className="h-11 sm:h-12 md:h-14 px-6 sm:px-8 md:px-10 rounded-xl sm:rounded-2xl font-bold border-2 hover:bg-primary hover:text-primary-foreground hover:border-primary transition-all flex items-center gap-2 group text-xs sm:text-sm md:text-base active:scale-95 shadow-lg shadow-black/5"
                >
                    <RotateCcw size={16} className="group-hover:rotate-[-180deg] transition-transform duration-500 sm:hidden" />
                    <RotateCcw size={18} className="hidden sm:block md:hidden group-hover:rotate-[-180deg] transition-transform duration-500" />
                    <RotateCcw size={20} className="hidden md:block group-hover:rotate-[-180deg] transition-transform duration-500" />
                    Reset All Filters
                </Button>
            )}
        </div>
    );
};
