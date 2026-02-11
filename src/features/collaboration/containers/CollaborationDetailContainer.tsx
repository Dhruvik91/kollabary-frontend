'use client';

import {
    useCollaborationDetail,
    useUpdateCollaborationStatus
} from '@/hooks/use-collaboration.hooks';
import { useAuth } from '@/contexts/auth-context';
import { CollaborationStatusBadge } from '@/components/collaboration/CollaborationStatusBadge';
import { CollaborationStatus } from '@/types/collaboration.types';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { format } from 'date-fns';
import {
    Calendar,
    User as UserIcon,
    CheckCircle2,
    XCircle,
    Clock,
    ArrowLeft,
    Share2,
    FileText
} from 'lucide-react';
import Link from 'next/link';
import { FRONTEND_ROUTES } from '@/constants';
import { UserRole } from '@/types/auth.types';
import { cn } from '@/lib/utils';

interface CollaborationDetailContainerProps {
    id: string;
}

export const CollaborationDetailContainer = ({ id }: CollaborationDetailContainerProps) => {
    const { data: collaboration, isLoading, error } = useCollaborationDetail(id);
    const { mutate: updateStatus, isPending: isUpdating } = useUpdateCollaborationStatus(id);
    const { user } = useAuth();

    if (isLoading) {
        return (
            <div className="space-y-6">
                <Skeleton className="h-8 w-48" />
                <Card>
                    <CardHeader><Skeleton className="h-6 w-3/4" /></CardHeader>
                    <CardContent className="space-y-4">
                        <Skeleton className="h-4 w-full" />
                        <Skeleton className="h-4 w-full" />
                        <Skeleton className="h-4 w-2/3" />
                    </CardContent>
                </Card>
            </div>
        );
    }

    if (error || !collaboration) {
        return (
            <div className="p-12 text-center bg-red-50 dark:bg-red-900/10 rounded-3xl border border-red-100 dark:border-red-900/20">
                <p className="text-red-600 dark:text-red-400 font-bold mb-4">Collaboration not found</p>
                <Link href={FRONTEND_ROUTES.DASHBOARD.COLLABORATIONS}>
                    <Button variant="outline">
                        <ArrowLeft size={16} className="mr-2" />
                        Back to List
                    </Button>
                </Link>
            </div>
        );
    }

    const isInfluencer = user?.role === UserRole.INFLUENCER;
    const partner = isInfluencer ? collaboration.requester : collaboration.influencer;

    const canAccept = collaboration.status === CollaborationStatus.REQUESTED && isInfluencer;

    const handleAction = (status: CollaborationStatus) => {
        updateStatus({ status });
    };

    return (
        <div className="space-y-8 max-w-5xl mx-auto">
            <div className="flex items-center justify-between">
                <Link href={FRONTEND_ROUTES.DASHBOARD.COLLABORATIONS}>
                    <Button variant="ghost" size="sm" className="group">
                        <ArrowLeft size={16} className="mr-2 group-hover:-translate-x-1 transition-transform" />
                        Back to List
                    </Button>
                </Link>
                <div className="flex items-center gap-3">
                    <Button variant="outline" size="icon-sm" className="rounded-full">
                        <Share2 size={16} />
                    </Button>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Main Content */}
                <div className="lg:col-span-2 space-y-6">
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
                                        {collaboration.proposedTerms ? JSON.stringify(collaboration.proposedTerms) : 'Standard terms apply'}
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Action Card for Recipients */}
                    {canAccept && (
                        <Card className="border-primary/20 bg-primary/5 shadow-none rounded-3xl">
                            <CardContent className="pt-6 flex flex-col md:flex-row items-center justify-between gap-6">
                                <div className="text-center md:text-left">
                                    <h3 className="text-xl font-bold mb-1">Respond to Request</h3>
                                    <p className="text-muted-foreground text-sm">Review the terms and decide if you want to collaborate.</p>
                                </div>
                                <div className="flex gap-4 w-full md:w-auto">
                                    <Button
                                        variant="default"
                                        className="flex-grow md:flex-none px-8 rounded-full"
                                        onClick={() => handleAction(CollaborationStatus.ACCEPTED)}
                                        disabled={isUpdating}
                                    >
                                        <CheckCircle2 size={18} className="mr-2" />
                                        Accept
                                    </Button>
                                    <Button
                                        variant="outline"
                                        className="flex-grow md:flex-none px-8 rounded-full border-red-200 text-red-600 hover:bg-red-50"
                                        onClick={() => handleAction(CollaborationStatus.REJECTED)}
                                        disabled={isUpdating}
                                    >
                                        <XCircle size={18} className="mr-2" />
                                        Reject
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>
                    )}
                </div>

                {/* Sidebar Details */}
                <div className="space-y-6">
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

                    <Card className="rounded-3xl border-border/50 shadow-sm overflow-hidden">
                        <div className="bg-primary/5 p-6 border-b border-border/20 text-center">
                            <h3 className="font-bold mb-1">Collaboration Progress</h3>
                            <div className="w-full bg-muted h-2 rounded-full mt-4 overflow-hidden">
                                <div
                                    className="bg-primary h-full transition-all duration-1000"
                                    style={{
                                        width: collaboration.status === CollaborationStatus.COMPLETED ? '100%' :
                                            collaboration.status === CollaborationStatus.IN_PROGRESS ? '60%' :
                                                collaboration.status === CollaborationStatus.ACCEPTED ? '30%' : '5%'
                                    }}
                                />
                            </div>
                        </div>
                        <CardContent className="pt-6 space-y-4">
                            <div className="flex items-center gap-3 text-sm">
                                <div className={cn("w-6 h-6 rounded-full flex items-center justify-center border",
                                    collaboration.status !== CollaborationStatus.REQUESTED ? "bg-emerald-500 border-emerald-500 text-white" : "border-border")}>
                                    {collaboration.status !== CollaborationStatus.REQUESTED ? <CheckCircle2 size={14} /> : 1}
                                </div>
                                <span className={collaboration.status !== CollaborationStatus.REQUESTED ? "font-medium" : "text-muted-foreground"}>Request Sent</span>
                            </div>
                            <div className="flex items-center gap-3 text-sm">
                                <div className={cn("w-6 h-6 rounded-full flex items-center justify-center border",
                                    [CollaborationStatus.ACCEPTED, CollaborationStatus.IN_PROGRESS, CollaborationStatus.COMPLETED].includes(collaboration.status) ? "bg-emerald-500 border-emerald-500 text-white" : "border-border")}>
                                    {[CollaborationStatus.ACCEPTED, CollaborationStatus.IN_PROGRESS, CollaborationStatus.COMPLETED].includes(collaboration.status) ? <CheckCircle2 size={14} /> : 2}
                                </div>
                                <span className={[CollaborationStatus.ACCEPTED, CollaborationStatus.IN_PROGRESS, CollaborationStatus.COMPLETED].includes(collaboration.status) ? "font-medium" : "text-muted-foreground"}>Accepted</span>
                            </div>
                            <div className="flex items-center gap-3 text-sm">
                                <div className={cn("w-6 h-6 rounded-full flex items-center justify-center border",
                                    [CollaborationStatus.IN_PROGRESS, CollaborationStatus.COMPLETED].includes(collaboration.status) ? "bg-emerald-500 border-emerald-500 text-white" : "border-border")}>
                                    {[CollaborationStatus.IN_PROGRESS, CollaborationStatus.COMPLETED].includes(collaboration.status) ? <CheckCircle2 size={14} /> : 3}
                                </div>
                                <span className={[CollaborationStatus.IN_PROGRESS, CollaborationStatus.COMPLETED].includes(collaboration.status) ? "font-medium" : "text-muted-foreground"}>In Progress</span>
                            </div>
                            <div className="flex items-center gap-3 text-sm">
                                <div className={cn("w-6 h-6 rounded-full flex items-center justify-center border",
                                    collaboration.status === CollaborationStatus.COMPLETED ? "bg-emerald-500 border-emerald-500 text-white" : "border-border")}>
                                    {collaboration.status === CollaborationStatus.COMPLETED ? <CheckCircle2 size={14} /> : 4}
                                </div>
                                <span className={collaboration.status === CollaborationStatus.COMPLETED ? "font-medium" : "text-muted-foreground"}>Completed</span>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
};
