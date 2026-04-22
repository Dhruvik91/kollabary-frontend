'use client';

import React from 'react';
import { LucideIcon, Package2, RotateCcw } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface EmptyStateProps {
    title: string;
    description: string;
    icon?: LucideIcon;
    action?: {
        label: string;
        onClick: () => void;
        icon?: LucideIcon;
    };
    secondaryAction?: {
        label: string;
        onClick: () => void;
        icon?: LucideIcon;
    };
    className?: string;
}

export const EmptyState = ({
    title,
    description,
    icon: Icon = Package2,
    action,
    secondaryAction,
    className
}: EmptyStateProps) => {
    return (
        <div className="flex flex-col items-center justify-center p-8 sm:p-12 md:p-16 bg-muted/10 dark:bg-muted/5 border-2 border-dashed border-border/50 rounded-[2rem] sm:rounded-[4rem] text-center space-y-6 sm:space-y-8 max-w-3xl mx-auto backdrop-blur-sm">
            <div className="w-16 h-16 sm:w-24 sm:h-24 bg-muted/50 dark:bg-muted/10 rounded-[1.5rem] sm:rounded-[2.5rem] flex items-center justify-center relative overflow-hidden group">
                <div className="absolute inset-0 bg-primary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <Icon size={32} className="text-muted-foreground group-hover:text-primary transition-colors sm:hidden" />
                <Icon size={48} className="hidden sm:block text-muted-foreground group-hover:text-primary transition-colors" />
            </div>

            <div className="space-y-2 sm:space-y-3 max-w-md">
                <h3 className="text-2xl sm:text-3xl font-black tracking-tight drop-shadow-sm text-zinc-900 dark:text-zinc-100">
                    {title}
                </h3>
                <p className="text-sm sm:text-base md:text-lg text-muted-foreground leading-relaxed font-medium">
                    {description}
                </p>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-3 w-full sm:w-auto">
                {action && (
                    <Button
                        onClick={action.onClick}
                        className="w-full sm:w-auto h-12 sm:h-14 px-8 rounded-xl sm:rounded-2xl font-bold bg-primary hover:bg-primary/90 text-primary-foreground shadow-xl shadow-primary/20 active:scale-95 transition-all flex items-center justify-center gap-2 group"
                    >
                        {action.icon && <action.icon size={18} className="group-hover:scale-110 transition-transform" />}
                        {action.label}
                    </Button>
                )}
                {secondaryAction && (
                    <Button
                        variant="outline"
                        onClick={secondaryAction.onClick}
                        className="w-full sm:w-auto h-12 sm:h-14 px-8 rounded-xl sm:rounded-2xl font-bold border-2 hover:bg-muted transition-all flex items-center justify-center gap-2 group shadow-lg shadow-black/5"
                    >
                        {secondaryAction.icon && <secondaryAction.icon size={18} className="group-hover:rotate-[-180deg] transition-transform duration-500" />}
                        {secondaryAction.label}
                    </Button>
                )}
            </div>
        </div>
    );
};
