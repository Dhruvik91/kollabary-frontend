'use client';

import { useParams, useRouter } from 'next/navigation';
import { useCollaborationDetail } from '@/hooks/useCollaborations';
import { useAuth } from '@/providers/auth-provider';
import { Skeleton } from '@/components/ui/skeleton';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { ROLES } from '@/constants/constants';
import { CollaborationDetailView } from '../components/CollaborationDetailView';

export function CollaborationDetailContainer() {
    const params = useParams();
    const router = useRouter();
    const { user } = useAuth();
    const collaborationId = params.id as string;

    const { data: collaboration, isLoading, error } = useCollaborationDetail(collaborationId);

    if (isLoading) {
        return (
            <div className="container max-w-6xl mx-auto py-8 px-4">
                <Skeleton className="h-10 w-32 mb-6" />
                <div className="grid gap-6">
                    <Skeleton className="h-64" />
                    <Skeleton className="h-96" />
                </div>
            </div>
        );
    }

    if (error || !collaboration) {
        return (
            <div className="container max-w-6xl mx-auto py-8 px-4">
                <Card className="glass border-glass-border">
                    <CardContent className="flex flex-col items-center justify-center py-12">
                        <p className="text-muted-foreground mb-4">Collaboration not found</p>
                        <Button onClick={() => router.push('/collaborations')}>
                            <ArrowLeft className="h-4 w-4 mr-2" />
                            Back to Collaborations
                        </Button>
                    </CardContent>
                </Card>
            </div>
        );
    }

    const isBrand = user?.role === ROLES.USER;
    const isInfluencer = user?.role === ROLES.INFLUENCER;
    const isAdmin = user?.role === ROLES.ADMIN;

    return (
        <CollaborationDetailView
            collaboration={collaboration}
            isBrand={isBrand}
            isInfluencer={isInfluencer}
            isAdmin={isAdmin}
            onBack={() => router.push('/collaborations')}
            onMessage={() => router.push('/messages')}
        />
    );
}
