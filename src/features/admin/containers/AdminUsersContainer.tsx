'use client';

import { useState } from 'react';
import {
    useAdminUsers,
    useBulkUpdateUserStatus,
    useModerateUser,
    useAdminAddCoins
} from '@/hooks/use-admin.hooks';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import {
    UserX,
    UserCheck,
    ShieldCheck,
    ShieldAlert,
    MoreVertical,
    AlertTriangle,
    Mail,
    Calendar,
    Ban,
    Coins,
    Users
} from 'lucide-react';
import { AnimatedModal } from '@/components/modal/AnimatedModal';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Checkbox } from '@/components/ui/checkbox';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { DataTable } from '@/components/shared/DataTable';
import { ColumnDef } from '@tanstack/react-table';
import { PageHeader } from '@/components/shared/PageHeader';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';

export const AdminUsersContainer = () => {
    const [page, setPage] = useState(0); // DataTable uses 0-indexed page
    const [search, setSearch] = useState('');
    const [role, setRole] = useState('ALL');
    const [status, setStatus] = useState('ALL');
    const [selectedUsers, setSelectedUsers] = useState<string[]>([]);
    const [isBulkConfirmOpen, setIsBulkConfirmOpen] = useState(false);
    const [bulkAction, setBulkAction] = useState<'ACTIVE' | 'SUSPENDED' | null>(null);
    const [isAddCoinsOpen, setIsAddCoinsOpen] = useState(false);
    const [selectedUserForCoins, setSelectedUserForCoins] = useState<any>(null);
    const [coinAmount, setCoinAmount] = useState<string>('');

    const { data, isLoading } = useAdminUsers({
        page: page + 1,
        limit: 10,
        role: role === 'ALL' ? undefined : role,
        status: status === 'ALL' ? undefined : status,
        search: search || undefined
    });

    const { mutate: bulkStatusUpdate, isPending: isBulkUpdating } = useBulkUpdateUserStatus();
    const { mutate: moderateUser } = useModerateUser();
    const { mutate: addCoins, isPending: isAddingCoins } = useAdminAddCoins();

    const handleSelectAll = (checked: boolean) => {
        if (checked && data?.items) {
            setSelectedUsers(data.items.map((u: any) => u.id));
        } else {
            setSelectedUsers([]);
        }
    };

    const handleSelectUser = (userId: string, checked: boolean) => {
        if (checked) {
            setSelectedUsers(prev => [...prev, userId]);
        } else {
            setSelectedUsers(prev => prev.filter(id => id !== userId));
        }
    };

    const columns: ColumnDef<any>[] = [
        {
            id: 'select',
            header: ({ table }) => (
                <Checkbox
                    checked={selectedUsers.length > 0 && selectedUsers.length === data?.items?.length}
                    onCheckedChange={(checked: boolean | string) => handleSelectAll(!!checked)}
                />
            ),
            cell: ({ row }) => (
                <Checkbox
                    checked={selectedUsers.includes(row.original.id)}
                    onCheckedChange={(checked: boolean | string) => handleSelectUser(row.original.id, !!checked)}
                />
            ),
            size: 40,
        },
        {
            id: 'user',
            header: 'User',
            cell: ({ row }) => (
                <div className="flex items-center gap-3">
                    <Avatar className="h-10 w-10 border shadow-sm">
                        <AvatarImage src={row.original.profile?.avatarUrl} />
                        <AvatarFallback className="bg-primary/5 text-primary">
                            {row.original.username?.substring(0, 2).toUpperCase() || '??'}
                        </AvatarFallback>
                    </Avatar>
                    <div className="flex flex-col">
                        <span className="font-bold text-sm">{row.original.profile?.fullName || row.original.username}</span>
                        <span className="text-xs text-muted-foreground flex items-center gap-1">
                            <Mail className="w-3 h-3" />
                            {row.original.email}
                        </span>
                    </div>
                </div>
            ),
        },
        {
            accessorKey: 'role',
            header: 'Role',
            cell: ({ row }) => (
                <Badge variant="outline" className="capitalize">
                    {row.original.role.toLowerCase()}
                </Badge>
            ),
        },
        {
            accessorKey: 'status',
            header: 'Status',
            cell: ({ row }) => (
                row.original.status === 'ACTIVE' ? (
                    <Badge className="bg-emerald-500/10 text-emerald-500 border-emerald-500/0">Active</Badge>
                ) : (
                    <Badge variant="destructive" className="bg-red-500/10 text-red-500 border-none">Banned</Badge>
                )
            ),
        },
        {
            id: 'verified',
            header: 'Verified',
            cell: ({ row }) => {
                const role = row.original.role;
                const isInfluencer = role === 'INFLUENCER';
                const isBrand = role === 'USER';
                const isVerified = isInfluencer
                    ? row.original.influencerProfile?.verified
                    : row.original.profile?.verified;

                if (!isInfluencer && !isBrand) {
                    return <span className="text-xs text-muted-foreground italic">N/A</span>;
                }

                return isVerified ? (
                    <Tooltip delayDuration={300}>
                        <TooltipTrigger asChild>
                            <ShieldCheck className="w-5 h-5 text-primary cursor-help" />
                        </TooltipTrigger>
                        <TooltipContent side="top">
                            Verified {isInfluencer ? 'Influencer' : 'Brand'}
                        </TooltipContent>
                    </Tooltip>
                ) : (
                    <Tooltip delayDuration={300}>
                        <TooltipTrigger asChild>
                            <ShieldAlert className="w-5 h-5 text-muted-foreground opacity-30 cursor-help" />
                        </TooltipTrigger>
                        <TooltipContent side="top">
                            Not Verified
                        </TooltipContent>
                    </Tooltip>
                );
            },
        },
        {
            accessorKey: 'createdAt',
            header: 'Joined Date',
            cell: ({ row }) => (
                <div className="flex items-center gap-1 text-xs text-muted-foreground">
                    <Calendar className="w-3 h-3" />
                    {new Date(row.original.createdAt).toLocaleDateString()}
                </div>
            ),
        },
        {
            id: 'actions',
            header: () => <div className="text-left">Actions</div>,
            cell: ({ row }) => (
                <div className="text-left">
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                                <MoreVertical className="w-4 h-4" />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="w-48">
                            <DropdownMenuLabel>Account Control</DropdownMenuLabel>
                            <DropdownMenuSeparator />

                            {row.original.status === 'ACTIVE' ? (
                                <DropdownMenuItem
                                    className="text-red-500 focus:text-red-500"
                                    onClick={() => moderateUser({ userId: row.original.id, status: 'SUSPENDED' })}
                                >
                                    <UserX className="w-4 h-4 mr-2" />
                                    Ban Account
                                </DropdownMenuItem>
                            ) : (
                                <DropdownMenuItem
                                    className="text-emerald-500 focus:text-emerald-500"
                                    onClick={() => moderateUser({ userId: row.original.id, status: 'ACTIVE' })}
                                >
                                    <UserCheck className="w-4 h-4 mr-2" />
                                    Lift Suspension
                                </DropdownMenuItem>
                            )}

                            {(row.original.role === 'INFLUENCER' || row.original.role === 'USER') && (
                                <>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuItem onClick={() => {
                                        const isInfluencer = row.original.role === 'INFLUENCER';
                                        const isVerified = isInfluencer
                                            ? row.original.influencerProfile?.verified
                                            : row.original.profile?.verified;

                                        moderateUser({
                                            userId: row.original.id,
                                            verified: !isVerified
                                        });
                                    }}>
                                        <ShieldCheck className="w-4 h-4 mr-2" />
                                        {(row.original.role === 'INFLUENCER' ? row.original.influencerProfile?.verified : row.original.profile?.verified) ? 'Remove Verification' : 'Verify Directly'}
                                    </DropdownMenuItem>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuItem onClick={() => {
                                        setSelectedUserForCoins(row.original);
                                        setIsAddCoinsOpen(true);
                                    }}>
                                        <Coins className="w-4 h-4 mr-2" />
                                        Add K Coins
                                    </DropdownMenuItem>
                                </>
                            )}
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            ),
        },
    ];

    const runBulkAction = () => {
        if (!bulkAction) return;
        bulkStatusUpdate({ userIds: selectedUsers, status: bulkAction }, {
            onSuccess: () => {
                setSelectedUsers([]);
                setIsBulkConfirmOpen(false);
            }
        });
    };

    return (
        <div className="space-y-8 pb-10">
            <PageHeader
                label="User Management"
                title="Platform"
                highlightedTitle="Population"
                subtitle="Full control over users, influencers, and their access."
                icon={Users}
            />

            <DataTable
                data={data?.items || []}
                columns={columns}
                isLoading={isLoading}
                totalCount={data?.meta?.total || 0}
                pageIndex={page}
                pageSize={10}
                onPageChange={setPage}
                manualPagination
                showSearch
                searchPosition="start"
                onSearch={setSearch}
                prependWithSearch={
                    <div className="flex items-center gap-2">
                        <Select value={role} onValueChange={setRole}>
                            <SelectTrigger className="w-[140px] bg-background/50 h-10">
                                <SelectValue placeholder="All Roles" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="ALL">All Roles</SelectItem>
                                <SelectItem value="USER">Brands / Users</SelectItem>
                                <SelectItem value="INFLUENCER">Influencers</SelectItem>
                                <SelectItem value="ADMIN">Admins</SelectItem>
                            </SelectContent>
                        </Select>
                        <Select value={status} onValueChange={setStatus}>
                            <SelectTrigger className="w-[140px] bg-background/50 h-10">
                                <SelectValue placeholder="All Status" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="ALL">All Status</SelectItem>
                                <SelectItem value="ACTIVE">Active</SelectItem>
                                <SelectItem value="SUSPENDED">Suspended</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                }
            />

            {/* Bulk Action Bar */}
            {selectedUsers.length > 0 && (
                <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 animate-in slide-in-from-bottom-4 duration-300">
                    <div className="bg-card border shadow-2xl rounded-2xl p-4 flex items-center gap-6 glass-card">
                        <div className="flex items-center gap-3 border-r pr-6">
                            <div className="bg-primary text-primary-foreground w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold shadow-sm">
                                {selectedUsers.length}
                            </div>
                            <span className="text-sm font-semibold tracking-tight">Users Selected</span>
                        </div>
                        <div className="flex items-center gap-3">
                            <Button
                                size="sm"
                                variant="outline"
                                className="h-10 text-emerald-500 hover:text-emerald-600 hover:bg-emerald-50 border-emerald-500/20 shadow-sm"
                                onClick={() => {
                                    setBulkAction('ACTIVE');
                                    setIsBulkConfirmOpen(true);
                                }}
                            >
                                <UserCheck className="w-4 h-4 mr-2" />
                                Lift Suspension
                            </Button>
                            <Button
                                size="sm"
                                variant="outline"
                                className="h-10 text-red-500 hover:text-red-600 hover:bg-red-50 border-red-500/20 shadow-sm"
                                onClick={() => {
                                    setBulkAction('SUSPENDED');
                                    setIsBulkConfirmOpen(true);
                                }}
                            >
                                <Ban className="w-4 h-4 mr-2" />
                                Ban Selected
                            </Button>
                        </div>
                    </div>
                </div>
            )}

            {/* Bulk Action Confirmation */}
            <AlertDialog open={isBulkConfirmOpen} onOpenChange={setIsBulkConfirmOpen}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle className="flex items-center gap-2">
                            <AlertTriangle className="w-5 h-5 text-amber-500" />
                            Confirm Bulk Action
                        </AlertDialogTitle>
                        <AlertDialogDescription>
                            You are about to {bulkAction === 'SUSPENDED' ? 'BAN' : 'UNBAN'} <strong>{selectedUsers.length}</strong> user accounts.
                            {bulkAction === 'SUSPENDED' ? ' This will immediately block their access to the platform.' : ' This will restore their access immediately.'}
                            Are you absolutely sure you want to proceed?
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction
                            className={bulkAction === 'SUSPENDED' ? 'bg-red-500 hover:bg-red-600' : 'bg-emerald-500 hover:bg-emerald-600'}
                            onClick={runBulkAction}
                        >
                            {isBulkUpdating ? 'Processing...' : `Yes, ${bulkAction === 'SUSPENDED' ? 'Ban' : 'Unban'} All`}
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>

            {/* Add Coins Modal */}
            <AnimatedModal
                isOpen={isAddCoinsOpen}
                onClose={() => {
                    setIsAddCoinsOpen(false);
                    setCoinAmount('');
                    setSelectedUserForCoins(null);
                }}
                title="Add K Coins"
                description={`Directly credit K Coins to ${selectedUserForCoins?.profile?.fullName || selectedUserForCoins?.username}'s wallet.`}
                size="sm"
            >
                <div className="space-y-4 py-2">
                    <div className="space-y-2">
                        <Label htmlFor="amount">Coin Amount</Label>
                        <Input
                            id="amount"
                            type="number"
                            placeholder="Enter amount (e.g. 500)"
                            value={coinAmount}
                            onChange={(e) => setCoinAmount(e.target.value)}
                            className="text-lg font-bold h-12"
                        />
                    </div>
                    <div className="pt-4 flex gap-3">
                        <Button
                            variant="outline"
                            className="flex-1"
                            onClick={() => setIsAddCoinsOpen(false)}
                        >
                            Cancel
                        </Button>
                        <Button
                            className="flex-1"
                            disabled={!coinAmount || parseFloat(coinAmount) <= 0 || isAddingCoins}
                            onClick={() => {
                                if (selectedUserForCoins && coinAmount) {
                                    addCoins({
                                        userId: selectedUserForCoins.id,
                                        amount: parseFloat(coinAmount)
                                    }, {
                                        onSuccess: () => {
                                            setIsAddCoinsOpen(false);
                                            setCoinAmount('');
                                            setSelectedUserForCoins(null);
                                        }
                                    });
                                }
                            }}
                        >
                            {isAddingCoins ? 'Processing...' : 'Confirm Addition'}
                        </Button>
                    </div>
                </div>
            </AnimatedModal>
        </div>
    );
};
