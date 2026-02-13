'use client';

import React from 'react';
import { AnimatePresence } from 'framer-motion';
import { ShieldAlert } from 'lucide-react';
import { ReportItem } from './ReportItem';
import { Report, ReportStatus } from '@/types/report.types';

interface ReportListProps {
    reports: Report[];
    onUpdateStatus: (reportId: string, status: ReportStatus) => void;
}

export function ReportList({ reports, onUpdateStatus }: ReportListProps) {
    return (
        <div className="space-y-4">
            <AnimatePresence mode="popLayout">
                {reports.length > 0 ? (
                    reports.map((report, idx) => (
                        <ReportItem
                            key={report.id}
                            report={report}
                            index={idx}
                            onUpdateStatus={onUpdateStatus}
                        />
                    ))
                ) : (
                    <div className="flex flex-col items-center justify-center py-20 bg-muted/20 rounded-2xl border border-dashed border-border/50">
                        <ShieldAlert size={48} className="text-muted-foreground/30" />
                        <p className="mt-4 text-lg font-medium text-muted-foreground">No reports found matching your criteria.</p>
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
}
