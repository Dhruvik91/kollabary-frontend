'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CheckCircle2, Circle, Clock, XCircle } from 'lucide-react';
import { format } from 'date-fns';
import type { Collaboration } from '@/types/collaboration';

interface CollaborationTimelineProps {
    collaboration: Collaboration;
}

export function CollaborationTimeline({ collaboration }: CollaborationTimelineProps) {
    const timelineEvents = [
        {
            status: 'REQUESTED',
            label: 'Requested',
            date: collaboration.createdAt,
            icon: Circle,
            color: 'text-blue-500',
        },
        {
            status: 'ACCEPTED',
            label: 'Accepted',
            date: collaboration.acceptedAt,
            icon: CheckCircle2,
            color: 'text-green-500',
        },
        {
            status: 'IN_PROGRESS',
            label: 'In Progress',
            date: collaboration.startedAt || collaboration.startDate,
            icon: Clock,
            color: 'text-purple-500',
        },
        {
            status: 'COMPLETED',
            label: 'Completed',
            date: collaboration.completedAt || collaboration.endDate,
            icon: CheckCircle2,
            color: 'text-emerald-500',
        },
    ];

    // Add rejected/cancelled if applicable
    if (collaboration.status === 'REJECTED') {
        timelineEvents.push({
            status: 'REJECTED',
            label: 'Rejected',
            date: collaboration.rejectedAt,
            icon: XCircle,
            color: 'text-red-500',
        });
    } else if (collaboration.status === 'CANCELLED') {
        timelineEvents.push({
            status: 'CANCELLED',
            label: 'Cancelled',
            date: collaboration.cancelledAt,
            icon: XCircle,
            color: 'text-gray-500',
        });
    }

    const currentStatusIndex = timelineEvents.findIndex(
        (event) => event.status === collaboration.status
    );

    return (
        <Card className="glass border-glass-border">
            <CardHeader>
                <CardTitle>Timeline</CardTitle>
                <CardDescription>Track the progress of this collaboration</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="space-y-6">
                    {timelineEvents.map((event, index) => {
                        const isPast = index <= currentStatusIndex;
                        const isCurrent = index === currentStatusIndex;
                        const Icon = event.icon;

                        // Skip events that haven't happened (except current)
                        if (!isPast && !isCurrent) return null;

                        return (
                            <div key={event.status} className="flex gap-4">
                                {/* Icon */}
                                <div className="flex flex-col items-center">
                                    <div
                                        className={`rounded-full p-2 ${isCurrent
                                                ? 'bg-primary/10 ring-2 ring-primary'
                                                : isPast
                                                    ? 'bg-primary/5'
                                                    : 'bg-muted'
                                            }`}
                                    >
                                        <Icon
                                            className={`h-5 w-5 ${isCurrent ? 'text-primary' : isPast ? event.color : 'text-muted-foreground'
                                                }`}
                                        />
                                    </div>
                                    {index < timelineEvents.length - 1 && (
                                        <div className={`w-0.5 h-12 ${isPast ? 'bg-primary/20' : 'bg-border'}`} />
                                    )}
                                </div>

                                {/* Content */}
                                <div className="flex-1 pb-6">
                                    <div className="flex items-center justify-between mb-1">
                                        <p
                                            className={`font-medium ${isCurrent
                                                    ? 'text-primary'
                                                    : isPast
                                                        ? 'text-foreground'
                                                        : 'text-muted-foreground'
                                                }`}
                                        >
                                            {event.label}
                                        </p>
                                        {isCurrent && (
                                            <Badge
                                                variant="outline"
                                                className="bg-primary/10 text-primary border-primary/20"
                                            >
                                                Current
                                            </Badge>
                                        )}
                                    </div>
                                    {event.date && (
                                        <p className="text-sm text-muted-foreground">
                                            {format(new Date(event.date), 'MMM dd, yyyy • h:mm a')}
                                        </p>
                                    )}
                                </div>
                            </div>
                        );
                    })}
                </div>
            </CardContent>
        </Card>
    );
}
