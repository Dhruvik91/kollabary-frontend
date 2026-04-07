'use client';

import React from 'react';
import { BackButton } from '@/components/shared/BackButton';
import { AlertCircle } from 'lucide-react';
import { FRONTEND_ROUTES } from '@/constants';

interface CollaborationErrorStateProps {
    message?: string;
}

export const CollaborationErrorState = ({ message = "Collaboration not found" }: CollaborationErrorStateProps) => {
    return (
        <div className="flex flex-col items-center justify-center p-12 bg-red-50/50 dark:bg-red-500/5 border border-red-200/50 dark:border-red-500/10 rounded-[3rem] text-center space-y-6 max-w-2xl mx-auto shadow-2xl shadow-red-500/5">
            <div className="w-20 h-20 bg-red-100 dark:bg-red-500/10 rounded-full flex items-center justify-center text-red-600 dark:text-red-400">
                <AlertCircle size={40} />
            </div>
            <div className="space-y-2">
                <h2 className="text-2xl font-black tracking-tight">{message}</h2>
                <p className="text-muted-foreground">
                    The collaboration request you are looking for might have been removed or you don't have permission to view it.
                </p>
            </div>
            <BackButton label="Back to Collaborations" />
        </div>
    );
};
