'use client';

import { useState } from 'react';
import { Badge } from '@/components/ui/badge';
import { Gavel, Edit3, Trash2, AlertTriangle } from 'lucide-react';
import { format } from 'date-fns';
import { Auction } from '@/types/auction.types';
import { PageHeader } from '@/components/shared/PageHeader';
import { Button } from '@/components/ui/button';
import { AnimatedModal } from '@/components/modal/AnimatedModal';

interface AuctionDetailHeaderProps {
    auction: Auction;
    isCompleted: boolean;
    onEdit?: () => void;
    onDelete?: () => void;
}

export const AuctionDetailHeader = ({ auction, isCompleted, onEdit, onDelete }: AuctionDetailHeaderProps) => {
    const [showDeleteModal, setShowDeleteModal] = useState(false);

    return (
        <PageHeader
            label="Auction Details"
            title={auction.title}
            subtitle={`Posted by ${auction.creator.profile?.fullName || 'Brand'} • ${format(new Date(auction.createdAt), 'MMMM dd, yyyy')}`}
            icon={Gavel}
            action={
                <div className="flex items-center gap-3">
                    {onEdit && (
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={onEdit}
                            className="h-9 px-4 rounded-xl border-border/50 hover:bg-muted/50 text-foreground font-bold text-xs uppercase tracking-widest gap-2"
                        >
                            <Edit3 size={14} />
                            Edit
                        </Button>
                    )}

                    {onDelete && (
                        <>
                            <Button
                                variant="outline"
                                size="sm"
                                onClick={() => setShowDeleteModal(true)}
                                className="h-9 px-4 rounded-xl border-destructive/20 hover:bg-destructive/10 text-destructive font-bold text-xs uppercase tracking-widest gap-2"
                            >
                                <Trash2 size={14} />
                                Delete
                            </Button>

                            <AnimatedModal
                                isOpen={showDeleteModal}
                                onClose={() => setShowDeleteModal(false)}
                                title={
                                    <div className="flex items-center gap-3 text-red-500">
                                        <AlertTriangle className="h-6 w-6" />
                                        <span>Delete Auction?</span>
                                    </div>
                                }
                                description="Are you sure you want to delete this auction? This action is permanent and will remove all associated bids and data."
                                 footer={
                                    <div className="flex flex-col sm:flex-row justify-end gap-3 w-full">
                                        <Button
                                            variant="ghost"
                                            onClick={() => setShowDeleteModal(false)}
                                            className="rounded-xl font-bold uppercase text-[10px] tracking-widest w-full sm:w-auto"
                                        >
                                            Cancel
                                        </Button>
                                        <Button
                                            variant="destructive"
                                            onClick={() => {
                                                onDelete();
                                                setShowDeleteModal(false);
                                            }}
                                            className="rounded-xl font-black uppercase text-[10px] tracking-widest px-8 bg-red-600 hover:bg-red-700 text-white shadow-lg shadow-red-500/20 w-full sm:w-auto"
                                        >
                                            Delete Forever
                                        </Button>
                                    </div>
                                }
                            >
                                <div className="py-4">
                                    <div className="p-4 bg-red-500/5 border border-red-500/10 rounded-2xl">
                                        <p className="text-sm text-foreground/80 leading-relaxed">
                                            You are about to permanently delete <span className="font-bold text-foreground italic">"{auction.title}"</span>.
                                            This will notify any influencers who have placed bids that the opportunity is no longer available.
                                        </p>
                                    </div>
                                </div>
                            </AnimatedModal>
                        </>
                    )}

                    <Badge
                        variant={isCompleted ? "secondary" : "outline"}
                        className={isCompleted
                            ? "bg-green-500/20 text-green-500 border-green-500/20 px-4 py-1.5 rounded-xl font-bold uppercase tracking-widest text-[10px]"
                            : "bg-primary/20 text-primary border-primary/20 px-4 py-1.5 rounded-xl font-bold uppercase tracking-widest text-[10px]"
                        }
                    >
                        {auction.status}
                    </Badge>
                </div>
            }
        />
    );
};
