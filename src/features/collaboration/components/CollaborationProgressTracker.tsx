'use client';

import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { CollaborationStatus } from '@/types/collaboration.types';
import { CheckCircle2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import {
    Tooltip,
    TooltipContent,
    TooltipTrigger,
} from "@/components/ui/tooltip";

interface CollaborationProgressTrackerProps {
    status: CollaborationStatus;
}

export const CollaborationProgressTracker = ({ status }: CollaborationProgressTrackerProps) => {
    const getProgressWidth = () => {
        switch (status) {
            case CollaborationStatus.COMPLETED: return '100%';
            case CollaborationStatus.WORK_SUBMITTED: return '75%';
            case CollaborationStatus.IN_PROGRESS: return '50%';
            case CollaborationStatus.ACCEPTED: return '25%';
            default: return '5%';
        }
    };

    const steps = [
        { label: 'Request Sent', icon: 1, completed: status !== CollaborationStatus.REQUESTED },
        { label: 'Accepted', icon: 2, completed: [CollaborationStatus.ACCEPTED, CollaborationStatus.IN_PROGRESS, CollaborationStatus.WORK_SUBMITTED, CollaborationStatus.COMPLETED].includes(status) },
        { label: 'In Progress', icon: 3, completed: [CollaborationStatus.IN_PROGRESS, CollaborationStatus.WORK_SUBMITTED, CollaborationStatus.COMPLETED].includes(status) },
        { label: 'Work Done', icon: 4, completed: [CollaborationStatus.WORK_SUBMITTED, CollaborationStatus.COMPLETED].includes(status) },
        { label: 'Completed', icon: 5, completed: status === CollaborationStatus.COMPLETED },
    ];

    return (
        <Card className="rounded-3xl border-border/50 shadow-sm overflow-hidden">
            <div className="bg-primary/5 p-6 border-b border-border/20 text-center">
                <h3 className="font-bold mb-1">Collaboration Progress</h3>
                <Tooltip delayDuration={300}>
                    <TooltipTrigger asChild>
                        <div className="w-full bg-muted h-2 rounded-full mt-4 overflow-hidden cursor-help">
                            <div
                                className="bg-primary h-full transition-all duration-1000"
                                style={{ width: getProgressWidth() }}
                            />
                        </div>
                    </TooltipTrigger>
                    <TooltipContent side="bottom" className="font-bold">
                        Overall Progress: {getProgressWidth()}
                    </TooltipContent>
                </Tooltip>
            </div>
            <CardContent className="pt-6 space-y-4">
                {steps.map((step, idx) => (
                    <div key={idx} className="flex items-center gap-3 text-sm group/step">
                        <Tooltip delayDuration={300}>
                            <TooltipTrigger asChild>
                                <div className={cn("w-6 h-6 rounded-full flex items-center justify-center border shrink-0 cursor-help transition-all duration-300",
                                    step.completed ? "bg-emerald-500 border-emerald-500 text-white shadow-lg shadow-emerald-500/20" : "border-border group-hover/step:border-primary/50")}>
                                    {step.completed ? <CheckCircle2 size={14} /> : step.icon}
                                </div>
                            </TooltipTrigger>
                            <TooltipContent side="right">
                                {step.completed ? `Completed: ${step.label}` : `Pending: ${step.label}`}
                            </TooltipContent>
                        </Tooltip>
                        <span className={cn(
                            "transition-colors duration-300",
                            step.completed ? "font-bold text-foreground" : "text-muted-foreground group-hover/step:text-foreground"
                        )}>
                            {step.label}
                        </span>
                    </div>
                ))}
            </CardContent>
        </Card>
    );
};
