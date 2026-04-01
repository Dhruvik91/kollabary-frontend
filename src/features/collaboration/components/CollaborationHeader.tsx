
'use client';

import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Pencil, Trash2 } from 'lucide-react';
import Link from 'next/link';
import { FRONTEND_ROUTES } from '@/constants';

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
            <Link href={FRONTEND_ROUTES.DASHBOARD.COLLABORATIONS}>
                <Button variant="ghost" size="sm" className="group rounded-xl h-10 px-4 hover:bg-muted/50">
                    <ArrowLeft size={16} className="mr-2 group-hover:-translate-x-1 transition-transform" />
                    <span className="font-bold">Back to List</span>
                </Button>
            </Link>

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
