import { Collaboration } from '@/types/collaboration.types';
import { CollaborationStatusBadge } from './CollaborationStatusBadge';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { format } from 'date-fns';
import { Calendar, User as UserIcon, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { FRONTEND_ROUTES } from '@/constants';
import { Trash2, Edit2, AlertCircle, Loader2 } from 'lucide-react';
import { useState } from 'react';
import { useDeleteCollaboration } from '@/hooks/use-collaboration.hooks';
import { EditCollaborationDialog } from '@/features/collaboration/components/EditCollaborationDialog';
import { AnimatedModal } from '@/components/modal/AnimatedModal';
import { useMe } from '@/hooks/use-auth.hooks';
import { CollaborationStatus } from '@/types/collaboration.types';

interface CollaborationCardProps {
    collaboration: Collaboration;
    isInfluencer?: boolean;
}

export const CollaborationCard = ({ collaboration, isInfluencer }: CollaborationCardProps) => {
    const { data: user } = useMe();
    const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
    const deleteCollaboration = useDeleteCollaboration();

    const isRequester = user?.id === collaboration.requester.id;
    const canEdit = isRequester && (collaboration.status === CollaborationStatus.REQUESTED || collaboration.status === CollaborationStatus.ACCEPTED);
    const canDelete = isRequester && collaboration.status === CollaborationStatus.REQUESTED;

    const partner = isInfluencer ? collaboration.requester : collaboration.influencer.user;
    const dateRange = collaboration.startDate && collaboration.endDate
        ? `${format(new Date(collaboration.startDate), 'MMM d')} - ${format(new Date(collaboration.endDate), 'MMM d, yyyy')}`
        : 'Request Pending';

    const handleDelete = () => {
        deleteCollaboration.mutate(collaboration.id, {
            onSuccess: () => setIsDeleteDialogOpen(false)
        });
    };

    return (
        <>
            <Card className="glass-card border-border hover:shadow-lg group overflow-hidden relative rounded-2xl transition-shadow duration-300">
                <CardHeader className="pb-2">
                    <div className="flex justify-between items-start mb-2">
                        <CollaborationStatusBadge status={collaboration.status} />
                        <div className="flex items-center gap-2">
                            {canEdit && (
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    className="h-8 w-8 rounded-full hover:bg-primary/10 hover:text-primary"
                                    onClick={(e) => {
                                        e.preventDefault();
                                        setIsEditDialogOpen(true);
                                    }}
                                >
                                    <Edit2 size={14} />
                                </Button>
                            )}
                            {canDelete && (
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    className="h-8 w-8 rounded-full hover:bg-destructive/10 hover:text-destructive"
                                    onClick={(e) => {
                                        e.preventDefault();
                                        setIsDeleteDialogOpen(true);
                                    }}
                                >
                                    <Trash2 size={14} />
                                </Button>
                            )}
                            <span className="text-xs text-muted-foreground">{format(new Date(collaboration.createdAt), 'MMM d, yyyy')}</span>
                        </div>
                    </div>
                    <CardTitle className="text-lg line-clamp-1 group-hover:text-primary">
                        {collaboration.title}
                    </CardTitle>
                </CardHeader>
                <CardContent className="pb-4">
                    <p className="text-sm text-muted-foreground line-clamp-2 mb-4 h-10">
                        {collaboration.description || 'No description provided.'}
                    </p>

                    <div className="space-y-2">
                        <div className="flex items-center gap-2 text-sm">
                            <UserIcon size={14} className="text-primary" />
                            <span className="font-medium text-foreground">{partner.email.split('@')[0]}</span>
                            <span className="text-muted-foreground text-xs uppercase tracking-wider font-semibold ml-auto">
                                {isInfluencer ? 'Brand' : 'Influencer'}
                            </span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <Calendar size={14} />
                            <span>{dateRange}</span>
                        </div>
                    </div>
                </CardContent>
                <CardFooter className="pt-2 border-t border-border glass-section bg-muted/20">
                    <Link href={FRONTEND_ROUTES.DASHBOARD.COLLABORATION_DETAIL(collaboration.id)} className="w-full">
                        <Button variant="ghost" size="sm" className="w-full justify-between hover:bg-primary/10 hover:text-primary group">
                            View Details
                            <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                        </Button>
                    </Link>
                </CardFooter>
            </Card>

            {/* Edit Dialog */}
            {canEdit && (
                <EditCollaborationDialog
                    collaboration={collaboration}
                    isOpen={isEditDialogOpen}
                    onClose={() => setIsEditDialogOpen(false)}
                />
            )}

            {/* Delete Confirmation Modal */}
            <AnimatedModal
                isOpen={isDeleteDialogOpen}
                onClose={() => setIsDeleteDialogOpen(false)}
                title="Delete Collaboration"
                description="Are you sure you want to delete this collaboration? This action cannot be undone."
                size="sm"
            >
                <div className="flex flex-col items-center gap-6 py-4">
                    <div className="h-20 w-20 rounded-full bg-destructive/10 flex items-center justify-center text-destructive animate-pulse">
                        <AlertCircle size={40} />
                    </div>

                    <div className="flex gap-4 w-full">
                        <Button
                            variant="outline"
                            onClick={() => setIsDeleteDialogOpen(false)}
                            className="flex-1 h-12 rounded-xl font-bold"
                        >
                            Cancel
                        </Button>
                        <Button
                            variant="destructive"
                            onClick={handleDelete}
                            disabled={deleteCollaboration.isPending}
                            className="flex-1 h-12 rounded-xl font-bold shadow-lg shadow-destructive/20"
                        >
                            {deleteCollaboration.isPending ? (
                                <Loader2 className="h-5 w-5 animate-spin" />
                            ) : (
                                'Delete'
                            )}
                        </Button>
                    </div>
                </div>
            </AnimatedModal>
        </>
    );
};
