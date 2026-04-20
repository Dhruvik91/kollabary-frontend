'use client';

import React from 'react';
import { AlertCircle, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface DiscoverErrorStateProps {
    message?: string;
    onRetry?: () => void;
}

export const DiscoverErrorState = ({
    message = "There was an error connecting to our creator network. Please try again later.",
    onRetry
}: DiscoverErrorStateProps) => {
    return (
        <div className="flex flex-col items-center justify-center p-8 sm:p-12 md:p-16 bg-red-50/30 dark:bg-red-500/5 border border-red-200/50 dark:border-red-500/10 rounded-[2rem] sm:rounded-[3rem] md:rounded-[4rem] text-center space-y-6 sm:space-y-8 max-w-2xl mx-auto shadow-2xl shadow-red-500/5 backdrop-blur-sm transition-all duration-500">
            <div className="relative group">
                {/* Glow effect */}
                <div className="absolute inset-0 bg-red-500/20 blur-2xl rounded-full scale-150 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                
                <div className="relative w-16 h-16 sm:w-20 sm:h-20 bg-red-100 dark:bg-red-500/10 rounded-2xl sm:rounded-3xl flex items-center justify-center text-red-600 dark:text-red-400 transform group-hover:rotate-12 transition-transform duration-500">
                    <AlertCircle size={32} className="sm:hidden" />
                    <AlertCircle size={40} className="hidden sm:block" />
                </div>
            </div>

            <div className="space-y-2 sm:space-y-3">
                <h3 className="text-2xl sm:text-3xl font-black tracking-tight text-zinc-900 dark:text-zinc-100">Network Interruption</h3>
                <p className="text-sm sm:text-base text-muted-foreground leading-relaxed font-medium max-w-md mx-auto">
                    {message}
                </p>
            </div>

            {onRetry && (
                <Button
                    onClick={onRetry}
                    className="h-12 sm:h-14 px-8 sm:px-10 rounded-xl sm:rounded-2xl bg-red-600 hover:bg-red-700 text-white font-bold transition-all shadow-xl shadow-red-600/20 active:scale-95 flex items-center gap-2 group text-sm sm:text-base"
                >
                    <RefreshCw size={18} className="group-hover:rotate-180 transition-transform duration-500 sm:hidden" />
                    <RefreshCw size={20} className="hidden sm:block group-hover:rotate-180 transition-transform duration-500" />
                    Try Reconnecting
                </Button>
            )}
        </div>
    );
};
