'use client';

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CollaborationStatusBadge } from '@/components/collaboration/CollaborationStatusBadge';
import { Collaboration } from '@/types/collaboration.types';
import { format } from 'date-fns';
import { Calendar, Clock, FileText } from 'lucide-react';

interface CollaborationMainInfoProps {
    collaboration: Collaboration;
}

export const CollaborationMainInfo = ({ collaboration }: CollaborationMainInfoProps) => {
    return (
        <Card className="border-none shadow-xl bg-card/50 backdrop-blur-sm overflow-hidden border-t-4 border-t-primary">
            <CardHeader className="pb-4">
                <div className="flex justify-between items-start mb-4">
                    <CollaborationStatusBadge status={collaboration.status} className="scale-110" />
                    <span className="text-sm text-muted-foreground flex items-center gap-1.5">
                        <Clock size={14} />
                        Created {format(new Date(collaboration.createdAt), 'MMM d, yyyy')}
                    </span>
                </div>
                <CardTitle className="text-3xl font-extrabold tracking-tight">
                    {collaboration.title}
                </CardTitle>
            </CardHeader>
            <CardContent className="space-y-8">
                <div>
                    <h3 className="text-sm font-bold uppercase tracking-widest text-primary mb-3 flex items-center gap-2">
                        <FileText size={16} />
                        Campaign Description
                    </h3>
                    <p className="text-muted-foreground leading-relaxed text-lg">
                        {collaboration.description || 'No description provided.'}
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-4">
                    <div className="space-y-4 p-5 bg-muted/30 rounded-2xl border border-border/50">
                        <h3 className="text-sm font-bold uppercase tracking-widest text-muted-foreground mb-1">Timeline</h3>
                        <div className="flex items-center gap-3 text-foreground font-medium">
                            <Calendar className="text-primary" size={20} />
                            <span>
                                {collaboration.startDate ? format(new Date(collaboration.startDate), 'MMM d, yyyy') : 'TBD'} -
                                {collaboration.endDate ? format(new Date(collaboration.endDate), 'MMM d, yyyy') : 'TBD'}
                            </span>
                        </div>
                    </div>
                    <div className="space-y-4 p-5 bg-muted/30 rounded-2xl border border-border/50">
                        <h3 className="text-sm font-bold uppercase tracking-widest text-muted-foreground mb-1">Proposed Terms</h3>
                        <div className="text-foreground font-medium">
                            {collaboration.proposedTerms ?
                                (typeof collaboration.proposedTerms === 'object' ?
                                    (collaboration.proposedTerms as any).details || JSON.stringify(collaboration.proposedTerms) :
                                    collaboration.proposedTerms) :
                                'Standard terms apply'}
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
};
