'use client';

import React from 'react';
import { Shield, Trash2, Power, AlertTriangle, UserCheck, UserX } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { AnimatedModal } from '@/components/modal/AnimatedModal';
import { useUpdateStatus, useDeleteAccount } from '@/hooks/queries/useProfileQueries';
import { UserProfile } from '@/services/profile.service';
import { cn } from '@/lib/utils';

interface AccountManagementSectionProps {
    profile: UserProfile;
}

export const AccountManagementSection = ({ profile }: AccountManagementSectionProps) => {
    const [isDeleteModalOpen, setIsDeleteModalOpen] = React.useState(false);
    const [isStatusModalOpen, setIsStatusModalOpen] = React.useState(false);
    
    const updateStatusMutation = useUpdateStatus();
    const deleteAccountMutation = useDeleteAccount();

    const userStatus = profile.user?.status;
    const isActive = userStatus === 'ACTIVE';

    const handleToggleStatus = () => {
        const newStatus = isActive ? 'INACTIVE' : 'ACTIVE';
        updateStatusMutation.mutate(newStatus, {
            onSuccess: () => setIsStatusModalOpen(false)
        });
    };

    return (
        <Card className="rounded-[2.5rem] border-border/50 bg-card/30 glass-card p-8 md:p-10 border-none shadow-none ring-1 ring-border/50">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8 items-start">
                {/* Left Column: Info */}
                <div className="md:col-span-1 space-y-3">
                    <div className="flex items-center gap-3 text-primary">
                        <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center">
                            <Shield size={20} />
                        </div>
                        <h3 className="text-xl font-black tracking-tight">Account Management</h3>
                    </div>
                    <p className="text-muted-foreground font-medium text-sm leading-relaxed">
                        Control your account visibility and lifecycle settings.
                    </p>
                </div>

                {/* Right Column: Controls */}
                <div className="md:col-span-3 space-y-4">
                    {/* Activation/Deactivation Row */}
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 bg-zinc-500/5 border border-zinc-500/10 rounded-[2rem] transition-all hover:bg-zinc-500/10">
                        <div className="flex items-center gap-4">
                            <div className={cn("w-12 h-12 rounded-2xl flex items-center justify-center shadow-inner", 
                                isActive ? "bg-emerald-500/10 text-emerald-500" : "bg-zinc-500/10 text-zinc-500"
                            )}>
                                {isActive ? <UserCheck size={24} /> : <UserX size={24} />}
                            </div>
                            <div>
                                <p className="font-bold text-base">Account Visibility</p>
                                <p className="text-xs text-muted-foreground font-medium">
                                    {isActive 
                                        ? "Your profile is visible to brands and other users." 
                                        : "Your profile is currently hidden from search results."}
                                </p>
                            </div>
                        </div>
                        <Button
                            variant={isActive ? "outline" : "default"}
                            onClick={() => setIsStatusModalOpen(true)}
                            className="rounded-xl font-bold px-6 h-11 transition-all active:scale-95 shadow-sm"
                            disabled={updateStatusMutation.isPending}
                        >
                            {isActive ? "Deactivate Account" : "Activate Account"}
                        </Button>
                    </div>

                    {/* Delete Account Row */}
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 bg-red-500/5 border border-red-500/10 rounded-[2rem] transition-all hover:bg-red-500/[0.08]">
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 bg-red-500/10 rounded-2xl flex items-center justify-center text-red-500 shadow-inner">
                                <Trash2 size={24} />
                            </div>
                            <div>
                                <p className="font-bold text-base text-red-600 dark:text-red-400">Delete Account</p>
                                <p className="text-xs text-muted-foreground font-medium max-w-sm">
                                    Permanently remove your account and all data. This action cannot be undone.
                                </p>
                            </div>
                        </div>
                        <Button
                            variant="destructive"
                            onClick={() => setIsDeleteModalOpen(true)}
                            className="rounded-xl font-bold px-8 h-11 shadow-lg shadow-red-500/20 hover:bg-red-600 transition-all active:scale-95"
                            disabled={deleteAccountMutation.isPending}
                        >
                            Delete Account
                        </Button>
                    </div>
                </div>
            </div>

            {/* Status Change Confirmation Modal */}
            <AnimatedModal
                isOpen={isStatusModalOpen}
                onClose={() => setIsStatusModalOpen(false)}
                title={isActive ? "Deactivate Account?" : "Activate Account?"}
                description={isActive 
                    ? "Your profile will be hidden from search results and you won't receive new collaboration requests. You can reactivate anytime by logging back in." 
                    : "Your profile will become visible again and you can start receiving collaboration requests immediately."}
                size="sm"
            >
                <div className="flex flex-col gap-3">
                    <Button
                        size="lg"
                        className={cn("w-full rounded-2xl font-bold h-12 shadow-lg", 
                            isActive ? "bg-zinc-800 text-white shadow-zinc-500/20" : "bg-primary text-primary-foreground shadow-primary/20"
                        )}
                        onClick={handleToggleStatus}
                        disabled={updateStatusMutation.isPending}
                    >
                        {updateStatusMutation.isPending 
                            ? "Updating..." 
                            : (isActive ? "Yes, Deactivate" : "Yes, Activate")}
                    </Button>
                    <Button
                        variant="ghost"
                        size="lg"
                        className="w-full rounded-2xl font-bold h-12"
                        onClick={() => setIsStatusModalOpen(false)}
                        disabled={updateStatusMutation.isPending}
                    >
                        Cancel
                    </Button>
                </div>
            </AnimatedModal>

            {/* Delete Confirmation Modal */}
            <AnimatedModal
                isOpen={isDeleteModalOpen}
                onClose={() => setIsDeleteModalOpen(false)}
                title="Delete Account Permanently?"
                description="This action is irreversible. All your data, including auctions, collaborations, and wallet balance, will be permanently removed."
                size="sm"
            >
                <div className="space-y-6">
                    <div className="p-4 rounded-2xl bg-red-500/10 border border-red-500/20 flex items-start gap-3">
                        <AlertTriangle className="text-red-500 shrink-0" size={20} />
                        <p className="text-xs font-medium text-red-500/80 leading-relaxed">
                            Deleting your account is permanent. You will lose access to all your earnings and collaboration history.
                        </p>
                    </div>
                    
                    <div className="flex flex-col gap-3">
                        <Button
                            variant="destructive"
                            size="lg"
                            className="w-full rounded-2xl font-bold h-12 shadow-lg shadow-red-500/20"
                            onClick={() => deleteAccountMutation.mutate()}
                            disabled={deleteAccountMutation.isPending}
                        >
                            {deleteAccountMutation.isPending ? "Deleting..." : "Permanently Delete"}
                        </Button>
                        <Button
                            variant="ghost"
                            size="lg"
                            className="w-full rounded-2xl font-bold h-12"
                            onClick={() => setIsDeleteModalOpen(false)}
                        >
                            Cancel
                        </Button>
                    </div>
                </div>
            </AnimatedModal>
        </Card>
    );
};
