import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Share2, Pencil, Trash2 } from 'lucide-react';
import Link from 'next/link';
import { FRONTEND_ROUTES } from '@/constants';
import { cn } from '@/lib/utils';

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
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <Link href={FRONTEND_ROUTES.DASHBOARD.COLLABORATIONS}>
                <Button variant="ghost" size="sm" className="group rounded-xl h-10 px-4 hover:bg-muted/50">
                    <ArrowLeft size={16} className="mr-2 group-hover:-translate-x-1 transition-transform" />
                    <span className="font-bold">Back to List</span>
                </Button>
            </Link>

            <div className="flex items-center gap-2 sm:gap-3">
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

                <div className="w-px h-6 bg-border/50 mx-1 hidden sm:block" />

                <Button variant="outline" size="icon" className="rounded-xl w-10 h-10 bg-background/50 border-border/50 hover:bg-muted font-bold transition-all shrink-0">
                    <Share2 size={18} />
                </Button>
            </div>
        </div>
    );
};
