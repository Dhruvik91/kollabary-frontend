import { CollaborationStatus } from '@/types/collaboration.types';
import { cn } from '@/lib/utils';

interface CollaborationStatusBadgeProps {
    status: CollaborationStatus;
    className?: string;
}

export const CollaborationStatusBadge = ({ status, className }: CollaborationStatusBadgeProps) => {
    const statusConfig = {
        [CollaborationStatus.REQUESTED]: {
            label: 'Requested',
            classes: 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400 border-amber-200 dark:border-amber-800',
        },
        [CollaborationStatus.ACCEPTED]: {
            label: 'Accepted',
            classes: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400 border-blue-200 dark:border-blue-800',
        },
        [CollaborationStatus.REJECTED]: {
            label: 'Rejected',
            classes: 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400 border-red-200 dark:border-red-800',
        },
        [CollaborationStatus.IN_PROGRESS]: {
            label: 'In Progress',
            classes: 'bg-indigo-100 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-400 border-indigo-200 dark:border-indigo-800',
        },
        [CollaborationStatus.COMPLETED]: {
            label: 'Completed',
            classes: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400 border-emerald-200 dark:border-emerald-800',
        },
        [CollaborationStatus.CANCELLED]: {
            label: 'Cancelled',
            classes: 'bg-zinc-100 text-zinc-700 dark:bg-zinc-900/30 dark:text-zinc-400 border-zinc-200 dark:border-zinc-800',
        },
    };

    const config = statusConfig[status];

    return (
        <span className={cn(
            "px-2.5 py-0.5 rounded-full text-xs font-semibold border transition-colors",
            config.classes,
            className
        )}>
            {config.label}
        </span>
    );
};
