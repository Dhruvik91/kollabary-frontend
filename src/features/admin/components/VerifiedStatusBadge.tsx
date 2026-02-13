'use client';

import React from 'react';
import { Clock, CheckCircle, XCircle } from 'lucide-react';
import { cn } from '@/lib/utils';
import { VerificationStatus } from '@/types/admin.types';

interface VerifiedStatusBadgeProps {
    status: VerificationStatus;
}

export function VerifiedStatusBadge({ status }: VerifiedStatusBadgeProps) {
    const config = {
        [VerificationStatus.PENDING]: {
            icon: Clock,
            className: "bg-blue-500/10 text-blue-600 border-blue-500/20",
            label: "Pending"
        },
        [VerificationStatus.APPROVED]: {
            icon: CheckCircle,
            className: "bg-emerald-500/10 text-emerald-600 border-emerald-500/20",
            label: "Approved"
        },
        [VerificationStatus.REJECTED]: {
            icon: XCircle,
            className: "bg-rose-500/10 text-rose-600 border-rose-500/20",
            label: "Rejected"
        }
    };

    const { icon: Icon, className, label } = config[status];

    return (
        <div className={cn("flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold border", className)}>
            <Icon size={12} />
            {label}
        </div>
    );
}
