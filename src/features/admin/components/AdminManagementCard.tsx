'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { ShieldAlert, CheckCircle } from 'lucide-react';
import { AdminStats } from '@/types/admin.types';

interface AdminManagementCardProps {
    stats: AdminStats | undefined;
}

export function AdminManagementCard({ stats }: AdminManagementCardProps) {
    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1 }}
            className="rounded-2xl border border-border/50 bg-card/50 glass-card p-6 shadow-sm"
        >
            <h3 className="mb-4 text-lg font-semibold flex items-center gap-2">
                <ShieldAlert size={20} className="text-rose-500" />
                Management Required
            </h3>
            <div className="space-y-4">
                <div className="group flex items-center justify-between rounded-xl border border-border/50 bg-muted/30 p-4 transition-colors hover:bg-muted/50">
                    <div className="flex items-center gap-4">
                        <div className="rounded-lg bg-emerald-500/10 p-2 text-emerald-600">
                            <CheckCircle size={20} />
                        </div>
                        <div>
                            <p className="text-sm font-medium">Verification Requests</p>
                            <p className="text-xs text-muted-foreground">{stats?.verifications.pendingRequests || 0} influencers waiting</p>
                        </div>
                    </div>
                    <button className="text-xs font-semibold text-primary hover:underline">Review All</button>
                </div>

                <div className="group flex items-center justify-between rounded-xl border border-border/50 bg-muted/30 p-4 transition-colors hover:bg-muted/50">
                    <div className="flex items-center gap-4">
                        <div className="rounded-lg bg-rose-500/10 p-2 text-rose-600">
                            <ShieldAlert size={20} />
                        </div>
                        <div>
                            <p className="text-sm font-medium">User Reports</p>
                            <p className="text-xs text-muted-foreground">0 items to resolve</p>
                        </div>
                    </div>
                    <button className="text-xs font-semibold text-primary hover:underline">Resolve</button>
                </div>
            </div>
        </motion.div>
    );
}
