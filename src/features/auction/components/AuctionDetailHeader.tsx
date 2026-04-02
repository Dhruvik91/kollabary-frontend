'use client';

import { Badge } from '@/components/ui/badge';
import { Gavel, User as UserIcon, Calendar, Edit3, Trash2 } from 'lucide-react';
import { format } from 'date-fns';
import { Auction } from '@/types/auction.types';
import { PageHeader } from '@/components/shared/PageHeader';
import { Button } from '@/components/ui/button';
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

interface AuctionDetailHeaderProps {
    auction: Auction;
    isCompleted: boolean;
    onEdit?: () => void;
    onDelete?: () => void;
}

export const AuctionDetailHeader = ({ auction, isCompleted, onEdit, onDelete }: AuctionDetailHeaderProps) => {
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
                        <AlertDialog>
                            <AlertDialogTrigger asChild>
                                <Button
                                    variant="outline"
                                    size="sm"
                                    className="h-9 px-4 rounded-xl border-destructive/20 hover:bg-destructive/10 text-destructive font-bold text-xs uppercase tracking-widest gap-2"
                                >
                                    <Trash2 size={14} />
                                    Delete
                                </Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent className="rounded-2xl border-border/50">
                                <AlertDialogHeader>
                                    <AlertDialogTitle className="text-xl font-black">Are you sure?</AlertDialogTitle>
                                    <AlertDialogDescription className="text-muted-foreground font-medium">
                                        This action cannot be undone. This will permanently delete the auction and all associated bids.
                                    </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                    <AlertDialogCancel className="rounded-xl border-border/50">Cancel</AlertDialogCancel>
                                    <AlertDialogAction
                                        onClick={onDelete}
                                        className="rounded-xl bg-destructive hover:bg-destructive/90 text-white font-bold"
                                    >
                                        Delete Forever
                                    </AlertDialogAction>
                                </AlertDialogFooter>
                            </AlertDialogContent>
                        </AlertDialog>
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
