'use client';

import { useMyCollaborations } from '@/hooks/useCollaborations';
import { useAuth } from '@/providers/auth-provider';
import { CollaborationCard } from '../components/CollaborationCard';
import { motion, AnimatePresence } from 'framer-motion';
import { Loader2, FolderKanban, Info } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

export function CollaborationListContainer() {
    const { user } = useAuth();
    const { data: collaborations, isLoading, isError } = useMyCollaborations();

    if (isLoading) {
        return (
            <div className="flex h-[60vh] items-center justify-center">
                <Loader2 className="h-10 w-10 text-primary animate-spin" />
            </div>
        );
    }

    return (
        <div className="container px-4 py-12 mx-auto">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight mb-2">My Collaborations</h1>
                    <p className="text-muted-foreground">Manage your partnerships and track project status.</p>
                </div>
            </div>

            {isError ? (
                <Alert variant="destructive" className="mb-8 bg-destructive/5 border-destructive/20">
                    <Info className="h-4 w-4" />
                    <AlertTitle>Connection Error</AlertTitle>
                    <AlertDescription>
                        We couldn't fetch your collaborations. Please check your connection and try again.
                    </AlertDescription>
                </Alert>
            ) : collaborations?.length === 0 ? (
                <div className="text-center py-24 glass-enhanced rounded-3xl">
                    <FolderKanban className="h-16 w-16 mx-auto mb-6 text-muted-foreground opacity-20" />
                    <h2 className="text-2xl font-bold mb-2">No collaborations yet</h2>
                    <p className="text-muted-foreground max-w-md mx-auto">
                        {user?.role === 'INFLUENCER'
                            ? "You haven't received any collaboration requests yet. Make sure your profile is complete!"
                            : "You haven't sent any collaboration proposals yet. Start by exploring our influencers."}
                    </p>
                </div>
            ) : (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <AnimatePresence>
                        {collaborations?.map((collab) => (
                            <CollaborationCard
                                key={collab.id}
                                collaboration={collab}
                                userRole={user?.role || 'USER'}
                            />
                        ))}
                    </AnimatePresence>
                </div>
            )}
        </div>
    );
}
