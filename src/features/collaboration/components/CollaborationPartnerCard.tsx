'use client';

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { User as UserIcon } from 'lucide-react';
import { User } from '@/types/auth.types';

interface CollaborationPartnerCardProps {
    partner: User;
    isInfluencer: boolean;
}

export const CollaborationPartnerCard = ({ partner, isInfluencer }: CollaborationPartnerCardProps) => {
    return (
        <Card className="rounded-3xl border-border/50 shadow-sm">
            <CardHeader>
                <CardTitle className="text-lg">Partner Details</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="flex items-center gap-4 p-4 bg-muted/20 rounded-2xl border border-border/20">
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                        <UserIcon size={24} />
                    </div>
                    <div>
                        <p className="font-bold text-lg leading-tight">{partner.email.split('@')[0]}</p>
                        <p className="text-xs text-muted-foreground uppercase tracking-widest font-bold">
                            {isInfluencer ? 'Brand Partner' : 'Influencer Partner'}
                        </p>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
};
