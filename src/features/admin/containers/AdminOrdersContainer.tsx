'use client';

import { useState } from 'react';
import { useAdminOrders } from '@/hooks/use-admin.hooks';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import {
    Eye,
    RotateCcw
} from 'lucide-react';
import { toast } from 'sonner';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from '@/components/ui/dialog';

import { DataTable } from '@/components/shared/DataTable';
import { ColumnDef } from '@tanstack/react-table';

export const AdminOrdersContainer = () => {
    const [page, setPage] = useState(0); // DataTable uses 0-indexed page internally
    const [status, setStatus] = useState('ALL');
    const [search, setSearch] = useState('');
    const [selectedOrder, setSelectedOrder] = useState<any>(null);

    const { data, isLoading, refetch } = useAdminOrders({
        page: page + 1,
        limit: 10,
        status: status === 'ALL' ? undefined : status,
        search: search || undefined
    });

    const orders = data?.items || [];
    const meta = data?.meta || null;

    const getStatusBadge = (status: string) => {
        switch (status) {
            case 'SUCCESS':
                return <Badge className="bg-emerald-500/10 text-emerald-500 border-emerald-500/20 hover:bg-emerald-500/20">Success</Badge>;
            case 'PENDING':
                return <Badge variant="outline" className="text-amber-500 border-amber-500/20 animate-pulse">Pending</Badge>;
            case 'FAILED':
                return <Badge className="bg-red-500/10 text-red-500 border-red-500/20">Failed</Badge>;
            case 'CANCELLED':
                return <Badge variant="secondary">Cancelled</Badge>;
            case 'REFUNDED':
                return <Badge className="bg-blue-500/10 text-blue-500 border-blue-500/20">Refunded</Badge>;
            default:
                return <Badge variant="outline">{status}</Badge>;
        }
    };

    const columns: ColumnDef<any>[] = [
        {
            accessorKey: 'razorpayOrderId',
            header: 'Order ID',
            cell: ({ row }) => <span className="font-medium text-xs font-mono">{row.original.razorpayOrderId}</span>,
        },
        {
            accessorKey: 'user',
            header: 'Customer',
            cell: ({ row }) => (
                <div className="flex flex-col">
                    <span className="font-bold text-sm">{row.original.user?.profile?.fullName || 'Unknown'}</span>
                    <span className="text-[10px] text-muted-foreground font-mono">{row.original.user?.username}</span>
                </div>
            ),
        },
        {
            accessorKey: 'plan.name',
            header: 'Plan',
        },
        {
            accessorKey: 'amount',
            header: 'Amount',
            cell: ({ row }) => <span className="font-bold text-foreground">₹{row.original.amount}</span>,
        },
        {
            accessorKey: 'coins',
            header: 'Coins',
            cell: ({ row }) => <span className="text-amber-500 font-bold">+{row.original.coins} KC</span>,
        },
        {
            accessorKey: 'status',
            header: 'Status',
            cell: ({ row }) => getStatusBadge(row.original.status),
        },
        {
            accessorKey: 'createdAt',
            header: 'Date',
            cell: ({ row }) => (
                <div className="text-xs text-muted-foreground">
                    {new Date(row.original.createdAt).toLocaleDateString()}
                    <br />
                    {new Date(row.original.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </div>
            ),
        },
        {
            id: 'actions',
            header: () => <div className="text-left">Actions</div>,
            cell: ({ row }) => (
                <div className="text-left">
                    <Dialog>
                        <DialogTrigger asChild>
                            <Button variant="ghost" size="icon" onClick={() => setSelectedOrder(row.original)}>
                                <Eye className="w-4 h-4 text-muted-foreground hover:text-primary transition-colors" />
                            </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-2xl">
                            <DialogHeader>
                                <DialogTitle>Order Audit Details</DialogTitle>
                                <DialogDescription>
                                    Technical forensics for Order {row.original.razorpayOrderId}
                                </DialogDescription>
                            </DialogHeader>
                            {selectedOrder && (
                                <div className="space-y-4 py-4">
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="p-3 rounded-lg bg-muted/50">
                                            <p className="text-[10px] uppercase font-bold text-muted-foreground mb-1">Razorpay Payment ID</p>
                                            <p className="text-sm font-mono">{selectedOrder.razorpayPaymentId || 'N/A'}</p>
                                        </div>
                                        <div className="p-3 rounded-lg bg-muted/50">
                                            <p className="text-[10px] uppercase font-bold text-muted-foreground mb-1">Razorpay Signature</p>
                                            <p className="text-sm font-mono truncate">{selectedOrder.razorpaySignature || 'N/A'}</p>
                                        </div>
                                    </div>
                                    <div>
                                        <p className="text-xs font-bold mb-2">RAW METADATA</p>
                                        <pre className="p-4 rounded-xl bg-slate-950 text-emerald-400 text-[11px] overflow-auto max-h-64 font-mono leading-relaxed border border-white/10">
                                            {JSON.stringify(selectedOrder.metadata, null, 2)}
                                        </pre>
                                    </div>
                                </div>
                            )}
                        </DialogContent>
                    </Dialog>
                </div>
            ),
        },
    ];

    return (
        <div className="space-y-6 p-6">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-extrabold tracking-tight">Order Management</h1>
                    <p className="text-muted-foreground mt-1">Audit and manage all KC top-up transactions.</p>
                </div>
            </div>

            <DataTable
                data={orders}
                columns={columns}
                isLoading={isLoading}
                totalCount={meta?.total || 0}
                pageIndex={page}
                pageSize={10}
                onPageChange={setPage}
                manualPagination
                showSearch
                searchPosition="start"
                onSearch={setSearch}
                prependWithSearch={
                    <Select value={status} onValueChange={setStatus}>
                        <SelectTrigger className="w-[150px] bg-background/50 h-10">
                            <SelectValue placeholder="All Status" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="ALL">All Status</SelectItem>
                            <SelectItem value="SUCCESS">Success</SelectItem>
                            <SelectItem value="PENDING">Pending</SelectItem>
                            <SelectItem value="FAILED">Failed</SelectItem>
                            <SelectItem value="CANCELLED">Cancelled</SelectItem>
                            <SelectItem value="REFUNDED">Refunded</SelectItem>
                        </SelectContent>
                    </Select>
                }
                appendWithSearch={
                    <Button variant="outline" onClick={() => refetch()} size="icon" className="bg-background/50 h-10">
                        <RotateCcw className="w-4 h-4" />
                    </Button>
                }
            />
        </div>
    );
};
