'use client';

import React from 'react';
import { Package2, Plus, RotateCcw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import { FRONTEND_ROUTES } from '@/constants';

interface CollaborationEmptyStateProps {
    hasActiveFilters: boolean;
    isInfluencer: boolean;
    onReset: () => void;
}

export const CollaborationEmptyState = ({ 
    hasActiveFilters, 
    isInfluencer, 
    onReset 
}: CollaborationEmptyStateProps) => {
    const router = useRouter();

    return (
        <div className="flex flex-col items-center justify-center p-8 sm:p-12 md:p-16 bg-muted/10 dark:bg-muted/5 border-2 border-dashed border-border/50 rounded-[2rem] sm:rounded-[4rem] text-center space-y-6 sm:space-y-8 max-w-3xl mx-auto backdrop-blur-sm">
            <div className="w-16 h-16 sm:w-24 sm:h-24 bg-muted/50 dark:bg-muted/10 rounded-[1.5rem] sm:rounded-[2.5rem] flex items-center justify-center relative overflow-hidden group">
                <div className="absolute inset-0 bg-primary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <Package2 size={32} className="text-muted-foreground group-hover:text-primary transition-colors sm:hidden" />
                <Package2 size={48} className="hidden sm:block text-muted-foreground group-hover:text-primary transition-colors" />
            </div>

            <div className="space-y-2 sm:space-y-3 max-w-md">
                <h3 className="text-2xl sm:text-3xl font-black tracking-tight drop-shadow-sm text-zinc-900 dark:text-zinc-100">
                    {hasActiveFilters ? 'No matches found' : 'No collaborations yet'}
                </h3>
                <p className="text-sm sm:text-base md:text-lg text-muted-foreground leading-relaxed font-medium">
                    {hasActiveFilters
                        ? 'Try adjusting your filters or clearing them to see all collaborations.'
                        : 'Start your first partnership by reaching out to influencers or responding to requests.'}
                </p>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-3 w-full sm:w-auto">
                {hasActiveFilters ? (
                    <Button
                        variant="outline"
                        onClick={onReset}
                        className="w-full sm:w-auto h-12 sm:h-14 px-8 rounded-xl sm:rounded-2xl font-bold border-2 hover:bg-primary hover:text-primary-foreground hover:border-primary transition-all flex items-center justify-center gap-2 group shadow-lg shadow-black/5"
                    >
                        <RotateCcw size={18} className="group-hover:rotate-[-180deg] transition-transform duration-500" />
                        Clear All Filters
                    </Button>
                ) : (!isInfluencer && (
                    <Button 
                        onClick={() => router.push(FRONTEND_ROUTES.DASHBOARD.INFLUENCERS)}
                        className="w-full sm:w-auto h-12 sm:h-14 px-8 rounded-xl sm:rounded-2xl font-bold bg-primary hover:bg-primary/90 text-primary-foreground shadow-xl shadow-primary/20 active:scale-95 transition-all flex items-center justify-center gap-2 group"
                    >
                        <Plus size={18} className="group-hover:scale-110 transition-transform" />
                        Find Partners
                    </Button>
                ))}
            </div>
        </div>
    );
};
