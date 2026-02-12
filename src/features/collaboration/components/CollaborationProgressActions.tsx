'use client';

import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Play, CheckCircle2, Loader2, Info } from 'lucide-react';
import { CollaborationStatus } from '@/types/collaboration.types';
import { motion } from 'framer-motion';

interface CollaborationProgressActionsProps {
    status: CollaborationStatus;
    onUpdateStatus: (status: CollaborationStatus) => void;
    isUpdating: boolean;
}

export const CollaborationProgressActions = ({
    status,
    onUpdateStatus,
    isUpdating
}: CollaborationProgressActionsProps) => {

    if (status === CollaborationStatus.COMPLETED || status === CollaborationStatus.CANCELLED || status === CollaborationStatus.REJECTED) {
        return null;
    }

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
        >
            <Card className="border-primary/20 bg-primary/5 shadow-xl shadow-primary/5 rounded-[2.5rem] overflow-hidden">
                <CardContent className="p-8">
                    <div className="flex flex-col md:flex-row items-center justify-between gap-8">
                        <div className="flex items-start gap-4 text-center md:text-left">
                            <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary flex-shrink-0 mx-auto md:mx-0">
                                <Info size={24} />
                            </div>
                            <div className="space-y-1">
                                <h3 className="text-xl font-bold tracking-tight">Manage Progress</h3>
                                <p className="text-muted-foreground text-sm max-w-sm">
                                    Update the collaboration status as you reach milestones.
                                </p>
                            </div>
                        </div>

                        <div className="flex flex-wrap gap-4 w-full md:w-auto justify-center md:justify-end">
                            {status === CollaborationStatus.ACCEPTED && (
                                <Button
                                    variant="default"
                                    className="px-8 h-14 rounded-2xl font-bold shadow-xl shadow-primary/20 hover:scale-105 transition-all gap-2"
                                    onClick={() => onUpdateStatus(CollaborationStatus.IN_PROGRESS)}
                                    disabled={isUpdating}
                                >
                                    {isUpdating ? <Loader2 className="animate-spin" size={20} /> : <Play size={20} />}
                                    Start Collaboration
                                </Button>
                            )}

                            {(status === CollaborationStatus.IN_PROGRESS || status === CollaborationStatus.ACCEPTED) && (
                                <Button
                                    variant="outline"
                                    className="px-8 h-14 rounded-2xl font-bold bg-background shadow-lg hover:bg-emerald-50 hover:text-emerald-600 hover:border-emerald-200 transition-all gap-2"
                                    onClick={() => onUpdateStatus(CollaborationStatus.COMPLETED)}
                                    disabled={isUpdating}
                                >
                                    {isUpdating ? <Loader2 className="animate-spin" size={20} /> : <CheckCircle2 size={20} />}
                                    Mark as Completed
                                </Button>
                            )}
                        </div>
                    </div>
                </CardContent>
            </Card>
        </motion.div>
    );
};
