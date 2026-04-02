
'use client';

import React from 'react';
import { BackButton } from '@/components/shared/BackButton';
import { Button } from '@/components/ui/button';
import { Pencil, Trash2 } from 'lucide-react';

interface CollaborationHeaderProps {
    canEdit?: boolean;
    canDelete?: boolean;
    onEdit?: () => void;
    onDelete?: () => void;
}

export const CollaborationHeader = ({
    canEdit,
    canDelete,
    onEdit,
    onDelete
}: CollaborationHeaderProps) => {
    return (
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 w-full min-w-0">
            <BackButton label="Back to List" />

            <div className="flex items-center gap-2 sm:gap-3 w-full sm:w-auto justify-between sm:justify-end min-w-0">
                <div className="flex items-center gap-2 sm:gap-3 flex-wrap min-w-0">
                {canEdit && (
                    <Button
                        onClick={onEdit}
                        variant="outline"
                        className="h-10 px-4 sm:px-5 rounded-xl font-bold bg-background/50 border-border/50 hover:bg-primary/5 hover:text-primary hover:border-primary/30 transition-all flex items-center gap-2"
                    >
                        <Pencil size={16} />
                        <span className="hidden sm:inline">Edit Request</span>
                        <span className="sm:hidden text-xs">Edit</span>
                    </Button>
                )}

                {canDelete && (
                    <Button
                        onClick={onDelete}
                        variant="outline"
                        className="h-10 px-4 sm:px-5 rounded-xl font-bold bg-background/50 border-border/50 hover:bg-destructive/5 hover:text-destructive hover:border-destructive/30 transition-all flex items-center gap-2"
                    >
                        <Trash2 size={16} />
                        <span className="hidden sm:inline">Delete</span>
                        <span className="sm:hidden text-xs">Delete</span>
                    </Button>
                )}

                </div>
            </div>
        </div>
    );
};
