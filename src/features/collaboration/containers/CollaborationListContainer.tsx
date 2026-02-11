'use client';

import { useCollaborations } from '@/hooks/use-collaboration.hooks';
import { CollaborationCard } from '@/components/collaboration/CollaborationCard';
import { useAuth } from '@/contexts/auth-context';
import { Skeleton } from '@/components/ui/skeleton';
import { UserRole } from '@/types/auth.types';
import { Package2, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';

export const CollaborationListContainer = () => {
    const { data: collaborations, isLoading, error } = useCollaborations();
    const { user } = useAuth();

    if (isLoading) {
        return (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[1, 2, 3].map((i) => (
                    <Skeleton key={i} className="h-[250px] w-full rounded-2xl" />
                ))}
            </div>
        );
    }

    if (error) {
        return (
            <div className="p-12 text-center bg-red-50 dark:bg-red-900/10 rounded-3xl border border-red-100 dark:border-red-900/20">
                <p className="text-red-600 dark:text-red-400 font-medium">Failed to load collaborations. Please try again later.</p>
            </div>
        );
    }

    if (!collaborations || collaborations.length === 0) {
        return (
            <div className="p-12 text-center bg-muted/30 rounded-3xl border border-dashed border-border flex flex-col items-center">
                <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mb-4 text-muted-foreground">
                    <Package2 size={32} />
                </div>
                <h3 className="text-xl font-bold mb-2">No collaborations yet</h3>
                <p className="text-muted-foreground max-w-sm mb-8">
                    Start your first partnership by reaching out to influencers or responding to requests.
                </p>
                <Button className="rounded-full px-8">
                    <Plus size={18} className="mr-2" />
                    Find Partners
                </Button>
            </div>
        );
    }

    const isInfluencer = user?.role === UserRole.INFLUENCER;

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {collaborations.map((collab) => (
                <CollaborationCard
                    key={collab.id}
                    collaboration={collab}
                    isInfluencer={isInfluencer}
                />
            ))}
        </div>
    );
};
