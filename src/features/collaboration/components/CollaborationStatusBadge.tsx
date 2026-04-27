import { CollaborationStatus } from '@/types/collaboration.types';
import { cn } from '@/lib/utils';
import {
    Tooltip,
    TooltipContent,
    TooltipTrigger,
} from "@/components/ui/tooltip";

interface CollaborationStatusBadgeProps {
    status: CollaborationStatus;
    className?: string;
}

export const CollaborationStatusBadge = ({ status, className }: CollaborationStatusBadgeProps) => {
    const statusConfig = {
        [CollaborationStatus.REQUESTED]: {
            label: 'Requested',
            description: 'A collaboration request has been sent and is awaiting a response.',
            classes: 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400 border-amber-200 dark:border-amber-800',
        },
        [CollaborationStatus.ACCEPTED]: {
            label: 'Accepted',
            description: 'The collaboration request has been accepted. Waiting for progress to start.',
            classes: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400 border-blue-200 dark:border-blue-800',
        },
        [CollaborationStatus.REJECTED]: {
            label: 'Rejected',
            description: 'The collaboration request was declined.',
            classes: 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400 border-red-200 dark:border-red-800',
        },
        [CollaborationStatus.IN_PROGRESS]: {
            label: 'In Progress',
            description: 'The collaboration is currently active and work is being performed.',
            classes: 'bg-indigo-100 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-400 border-indigo-200 dark:border-indigo-800',
        },
        [CollaborationStatus.COMPLETED]: {
            label: 'Completed',
            description: 'The collaboration has been successfully finished and payment processed.',
            classes: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400 border-emerald-200 dark:border-emerald-800',
        },
        [CollaborationStatus.WORK_SUBMITTED]: {
            label: 'Work Submitted',
            description: 'The influencer has submitted their work for review.',
            classes: 'bg-cyan-100 text-cyan-700 dark:bg-cyan-900/30 dark:text-cyan-400 border-cyan-200 dark:border-cyan-800',
        },
        [CollaborationStatus.CANCELLED]: {
            label: 'Cancelled',
            description: 'The collaboration session was cancelled.',
            classes: 'bg-zinc-100 text-zinc-700 dark:bg-zinc-900/30 dark:text-zinc-400 border-zinc-200 dark:border-zinc-800',
        },
    };

    const config = statusConfig[status];

    return (
        <Tooltip delayDuration={300}>
            <TooltipTrigger asChild>
                <span className={cn(
                    "px-2.5 py-0.5 rounded-full text-xs font-semibold border cursor-help",
                    config.classes,
                    className
                )}>
                    {config.label}
                </span>
            </TooltipTrigger>
            <TooltipContent side="top" className="max-w-[200px] text-center font-medium">
                {config.description}
            </TooltipContent>
        </Tooltip>
    );
};
