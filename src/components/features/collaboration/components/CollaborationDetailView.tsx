'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Calendar, DollarSign, User, Building2, MessageSquare } from 'lucide-react';
import { format } from 'date-fns';
import type { Collaboration } from '@/types/collaboration';
import { CollaborationTimeline } from './CollaborationTimeline';
import { CollaborationActions } from './CollaborationActions';
import { ProofUploadSection } from './ProofUploadSection';

interface CollaborationDetailViewProps {
    collaboration: Collaboration;
    isBrand: boolean;
    isInfluencer: boolean;
    isAdmin: boolean;
    onBack: () => void;
    onMessage: () => void;
}

export function CollaborationDetailView({
    collaboration,
    isBrand,
    isInfluencer,
    isAdmin,
    onBack,
    onMessage,
}: CollaborationDetailViewProps) {
    const getStatusColor = (status: string) => {
        switch (status) {
            case 'REQUESTED':
                return 'bg-blue-500/10 text-blue-500 border-blue-500/20';
            case 'ACCEPTED':
                return 'bg-green-500/10 text-green-500 border-green-500/20';
            case 'REJECTED':
                return 'bg-red-500/10 text-red-500 border-red-500/20';
            case 'IN_PROGRESS':
                return 'bg-purple-500/10 text-purple-500 border-purple-500/20';
            case 'COMPLETED':
                return 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20';
            case 'CANCELLED':
                return 'bg-gray-500/10 text-gray-500 border-gray-500/20';
            default:
                return 'bg-muted text-muted-foreground';
        }
    };

    return (
        <div className="container max-w-6xl mx-auto py-8 px-4">
            {/* Back Button */}
            <Button variant="ghost" onClick={onBack} className="mb-6 gap-2">
                <ArrowLeft className="h-4 w-4" />
                Back to Collaborations
            </Button>

            {/* Header */}
            <div className="mb-8">
                <div className="flex items-start justify-between mb-4">
                    <div>
                        <h1 className="text-3xl font-bold mb-2 bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
                            Collaboration Details
                        </h1>
                        <p className="text-muted-foreground">
                            Manage and track your collaboration progress
                        </p>
                    </div>
                    <Badge className={getStatusColor(collaboration.status)} variant="outline">
                        {collaboration.status.replace('_', ' ')}
                    </Badge>
                </div>
            </div>

            <div className="grid gap-6 lg:grid-cols-3">
                {/* Main Content */}
                <div className="lg:col-span-2 space-y-6">
                    {/* Overview Card */}
                    <Card className="glass border-glass-border">
                        <CardHeader>
                            <CardTitle>Overview</CardTitle>
                            <CardDescription>Collaboration details and requirements</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            {/* Brand Info */}
                            <div className="flex items-center gap-3">
                                <Building2 className="h-5 w-5 text-primary" />
                                <div>
                                    <p className="text-sm text-muted-foreground">Brand</p>
                                    <p className="font-medium">
                                        {collaboration.requester?.name || collaboration.requester?.email || 'N/A'}
                                    </p>
                                </div>
                            </div>

                            {/* Influencer Info */}
                            <div className="flex items-center gap-3">
                                <User className="h-5 w-5 text-primary" />
                                <div>
                                    <p className="text-sm text-muted-foreground">Influencer</p>
                                    <p className="font-medium">
                                        {collaboration.influencer?.name || collaboration.influencer?.email || 'N/A'}
                                    </p>
                                </div>
                            </div>

                            {/* Budget */}
                            {collaboration.budget && (
                                <div className="flex items-center gap-3">
                                    <DollarSign className="h-5 w-5 text-primary" />
                                    <div>
                                        <p className="text-sm text-muted-foreground">Budget</p>
                                        <p className="font-medium">${collaboration.budget.toLocaleString()}</p>
                                    </div>
                                </div>
                            )}

                            {/* Created Date */}
                            <div className="flex items-center gap-3">
                                <Calendar className="h-5 w-5 text-primary" />
                                <div>
                                    <p className="text-sm text-muted-foreground">Created</p>
                                    <p className="font-medium">
                                        {format(new Date(collaboration.createdAt), 'MMM dd, yyyy')}
                                    </p>
                                </div>
                            </div>

                            {/* Description */}
                            {collaboration.description && (
                                <div className="pt-4 border-t">
                                    <p className="text-sm text-muted-foreground mb-2">Description</p>
                                    <p className="text-sm">{collaboration.description}</p>
                                </div>
                            )}

                            {/* Requirements */}
                            {collaboration.requirements && (
                                <div className="pt-4 border-t">
                                    <p className="text-sm text-muted-foreground mb-2">Requirements</p>
                                    <p className="text-sm">{collaboration.requirements}</p>
                                </div>
                            )}
                        </CardContent>
                    </Card>

                    {/* Proof Upload (Influencer Only, IN_PROGRESS status) */}
                    {isInfluencer && collaboration.status === 'IN_PROGRESS' && (
                        <ProofUploadSection collaborationId={collaboration.id} />
                    )}

                    {/* Timeline */}
                    <CollaborationTimeline collaboration={collaboration} />
                </div>

                {/* Sidebar */}
                <div className="space-y-6">
                    {/* Actions */}
                    <CollaborationActions
                        collaboration={collaboration}
                        isBrand={isBrand}
                        isInfluencer={isInfluencer}
                        isAdmin={isAdmin}
                    />

                    {/* Message Button */}
                    <Card className="glass border-glass-border">
                        <CardContent className="pt-6">
                            <Button className="w-full gap-2" variant="outline" onClick={onMessage}>
                                <MessageSquare className="h-4 w-4" />
                                Send Message
                            </Button>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}
