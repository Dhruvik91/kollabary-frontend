'use client';

import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { CollaborationStatus } from '@/types/collaboration.types';
import { CheckCircle2 } from 'lucide-react';
import { cn } from '@/lib/utils';

interface CollaborationProgressTrackerProps {
    status: CollaborationStatus;
}

export const CollaborationProgressTracker = ({ status }: CollaborationProgressTrackerProps) => {
    const getProgressWidth = () => {
        switch (status) {
            case CollaborationStatus.COMPLETED: return '100%';
            case CollaborationStatus.IN_PROGRESS: return '60%';
            case CollaborationStatus.ACCEPTED: return '30%';
            default: return '5%';
        }
    };

    const steps = [
        { label: 'Request Sent', icon: 1, completed: status !== CollaborationStatus.REQUESTED },
        { label: 'Accepted', icon: 2, completed: [CollaborationStatus.ACCEPTED, CollaborationStatus.IN_PROGRESS, CollaborationStatus.COMPLETED].includes(status) },
        { label: 'In Progress', icon: 3, completed: [CollaborationStatus.IN_PROGRESS, CollaborationStatus.COMPLETED].includes(status) },
        { label: 'Completed', icon: 4, completed: status === CollaborationStatus.COMPLETED },
    ];

    return (
        <Card className="rounded-3xl border-border/50 shadow-sm overflow-hidden">
            <div className="bg-primary/5 p-6 border-b border-border/20 text-center">
                <h3 className="font-bold mb-1">Collaboration Progress</h3>
                <div className="w-full bg-muted h-2 rounded-full mt-4 overflow-hidden">
                    <div
                        className="bg-primary h-full transition-all duration-1000"
                        style={{ width: getProgressWidth() }}
                    />
                </div>
            </div>
            <CardContent className="pt-6 space-y-4">
                {steps.map((step, idx) => (
                    <div key={idx} className="flex items-center gap-3 text-sm">
                        <div className={cn("w-6 h-6 rounded-full flex items-center justify-center border",
                            step.completed ? "bg-emerald-500 border-emerald-500 text-white" : "border-border")}>
                            {step.completed ? <CheckCircle2 size={14} /> : step.icon}
                        </div>
                        <span className={step.completed ? "font-medium" : "text-muted-foreground"}>{step.label}</span>
                    </div>
                ))}
            </CardContent>
        </Card>
    );
};
