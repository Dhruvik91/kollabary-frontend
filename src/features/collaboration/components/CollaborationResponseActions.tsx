'use client';

import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CheckCircle2, XCircle } from 'lucide-react';
import { CollaborationStatus } from '@/types/collaboration.types';

interface CollaborationResponseActionsProps {
    onAccept: () => void;
    onReject: () => void;
    isUpdating: boolean;
}

export const CollaborationResponseActions = ({ onAccept, onReject, isUpdating }: CollaborationResponseActionsProps) => {
    return (
        <Card className="border-primary/20 bg-primary/5 shadow-none rounded-[2rem]">
            <CardContent className="pt-6 flex flex-col md:flex-row items-center justify-between gap-6">
                <div className="text-center md:text-left">
                    <h3 className="text-xl font-bold mb-1">Respond to Request</h3>
                    <p className="text-muted-foreground text-sm">Review the terms and decide if you want to collaborate.</p>
                </div>
                <div className="flex gap-4 w-full md:w-auto">
                    <Button
                        variant="default"
                        className="flex-grow md:flex-none px-8 h-12 rounded-2xl font-bold shadow-lg shadow-primary/20"
                        onClick={onAccept}
                        disabled={isUpdating}
                    >
                        <CheckCircle2 size={18} className="mr-2" />
                        Accept
                    </Button>
                    <Button
                        variant="outline"
                        className="flex-grow md:flex-none px-8 h-12 rounded-2xl font-bold border-red-200 text-red-600 hover:bg-red-50 hover:text-red-700"
                        onClick={onReject}
                        disabled={isUpdating}
                    >
                        <XCircle size={18} className="mr-2" />
                        Reject
                    </Button>
                </div>
            </CardContent>
        </Card>
    );
};
