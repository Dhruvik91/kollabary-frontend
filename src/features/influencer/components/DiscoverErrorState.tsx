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
        <div className="flex flex-col items-center justify-center p-12 bg-red-50/50 dark:bg-red-500/5 border border-red-200/50 dark:border-red-500/10 rounded-[3rem] text-center space-y-6 max-w-2xl mx-auto shadow-2xl shadow-red-500/5">
            <div className="w-20 h-20 bg-red-100 dark:bg-red-500/10 rounded-full flex items-center justify-center text-red-600 dark:text-red-400">
                <AlertCircle size={40} />
            </div>
            <div className="space-y-2">
                <h3 className="text-2xl font-black tracking-tight mb-2">Network Interruption</h3>
                <p className="text-muted-foreground leading-relaxed">
                    {message}
                </p>
            </div>
            {onRetry && (
                <Button
                    onClick={onRetry}
                    className="h-14 px-8 rounded-2xl bg-red-600 hover:bg-red-700 text-white font-bold transition-all shadow-xl shadow-red-600/20 active:scale-95 flex items-center gap-2"
                >
                    <RefreshCw size={20} />
                    Try Reconnecting
                </Button>
            )}
        </div>
    );
};
