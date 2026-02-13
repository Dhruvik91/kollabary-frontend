'use client';

import React from 'react';
import { AnimatePresence } from 'framer-motion';
import { Clock } from 'lucide-react';
import { VerificationRequest } from '@/types/admin.types';
import { VerificationRequestCard } from './VerificationRequestCard';

interface VerificationRequestListProps {
    requests: VerificationRequest[] | undefined;
    onProcess: (id: string, status: 'APPROVED' | 'REJECTED', notes: string) => void;
}

export function VerificationRequestList({ requests, onProcess }: VerificationRequestListProps) {
    return (
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            <AnimatePresence mode="popLayout">
                {requests?.length ? (
                    requests.map((request, idx) => (
                        <VerificationRequestCard
                            key={request.id}
                            request={request}
                            index={idx}
                            onProcess={onProcess}
                        />
                    ))
                ) : (
                    <div className="col-span-full flex flex-col items-center justify-center py-20 bg-muted/20 rounded-2xl border border-dashed border-border/50">
                        <Clock size={48} className="text-muted-foreground/30" />
                        <p className="mt-4 text-lg font-medium text-muted-foreground">No verification requests found.</p>
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
}
