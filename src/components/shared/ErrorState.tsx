'use client';

import React from 'react';
import { AlertCircle, RotateCcw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';

interface ErrorStateProps {
    title?: string;
    description?: string;
    onRetry?: () => void;
    className?: string;
}

export const ErrorState = ({
    title = "Something went wrong",
    description = "We encountered an error while fetching the data. Please try again or contact support if the issue persists.",
    onRetry,
    className
}: ErrorStateProps) => {
    return (
        <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex flex-col items-center justify-center p-8 sm:p-12 md:p-16 bg-red-50/50 dark:bg-red-500/5 border-2 border-dashed border-red-200/50 dark:border-red-500/20 rounded-[2rem] sm:rounded-[4rem] text-center space-y-6 sm:space-y-8 max-w-2xl mx-auto backdrop-blur-sm"
        >
            <div className="w-16 h-16 sm:w-20 sm:h-20 bg-red-100 dark:bg-red-500/10 rounded-[1.5rem] sm:rounded-[2.5rem] flex items-center justify-center text-red-500 relative overflow-hidden group">
                <div className="absolute inset-0 bg-red-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <AlertCircle size={32} className="sm:hidden" />
                <AlertCircle size={40} className="hidden sm:block" />
            </div>

            <div className="space-y-2 sm:space-y-3 max-w-md">
                <h3 className="text-xl sm:text-2xl font-black tracking-tight text-red-600 dark:text-red-500">
                    {title}
                </h3>
                <p className="text-sm sm:text-base text-muted-foreground leading-relaxed font-medium">
                    {description}
                </p>
            </div>

            {onRetry && (
                <Button
                    onClick={onRetry}
                    className="h-12 sm:h-14 px-8 rounded-xl sm:rounded-2xl font-bold bg-red-500 hover:bg-red-600 text-white shadow-xl shadow-red-500/20 active:scale-95 transition-all flex items-center justify-center gap-2 group"
                >
                    <RotateCcw size={18} className="group-hover:rotate-[-180deg] transition-transform duration-500" />
                    Try Again
                </Button>
            )}
        </motion.div>
    );
};
