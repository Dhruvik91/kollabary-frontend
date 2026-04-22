'use client';

import { useMyOrders, useSyncOrder } from '@/hooks/queries/usePaymentQueries';
import { PaymentStatus } from '@/types/payment.types';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { RefreshCw, Clock, CheckCircle2, XCircle, AlertCircle } from 'lucide-react';
import { format } from 'date-fns';
import { Skeleton } from '@/components/ui/skeleton';

export const OrderHistory = () => {
    const { data, isLoading } = useMyOrders();
    const { mutate: syncOrder, isPending: isSyncing } = useSyncOrder();

    const getStatusIcon = (status: PaymentStatus) => {
        switch (status) {
            case PaymentStatus.SUCCESS: return <CheckCircle2 className="w-4 h-4 text-green-500" />;
            case PaymentStatus.FAILED: return <XCircle className="w-4 h-4 text-red-500" />;
            case PaymentStatus.CANCELLED: return <AlertCircle className="w-4 h-4 text-gray-400" />;
            default: return <Clock className="w-4 h-4 text-yellow-500 animate-pulse" />;
        }
    };

    const getStatusBadge = (status: PaymentStatus) => {
        switch (status) {
            case PaymentStatus.SUCCESS: return <Badge variant="outline" className="text-green-500 border-green-500 bg-green-500/10">Paid</Badge>;
            case PaymentStatus.FAILED: return <Badge variant="destructive">Failed</Badge>;
            case PaymentStatus.CANCELLED: return <Badge variant="secondary">Cancelled</Badge>;
            default: return <Badge variant="outline" className="text-yellow-500 border-yellow-500 bg-yellow-500/10">Pending</Badge>;
        }
    };

    if (isLoading) {
        return (
            <Card className="border-primary/10 overflow-hidden bg-background/50 backdrop-blur-sm">
                <CardHeader>
                    <Skeleton className="h-8 w-48 mb-2" />
                    <Skeleton className="h-4 w-64" />
                </CardHeader>
                <CardContent className="space-y-4">
                    {[1, 2, 3].map((i) => (
                        <Skeleton key={i} className="h-16 w-full rounded-xl" />
                    ))}
                </CardContent>
            </Card>
        );
    }

    if (!data?.items || data.items.length === 0) {
        return null; // Don't show anything if no history
    }

    return (
        <Card className="border-primary/10 overflow-hidden bg-background/50 backdrop-blur-sm animate-in fade-in slide-in-from-bottom-4 duration-700">
            <CardHeader>
                <CardTitle className="text-lg font-bold">Order History</CardTitle>
                <CardDescription>View your recent top-up requests and their current status.</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="space-y-3">
                    {data.items.slice(0, 5).map((order) => (
                        <div key={order.id} className="flex items-center justify-between p-4 rounded-xl bg-primary/5 border border-primary/10 transition-all hover:bg-primary/10 group">
                            <div className="flex items-center gap-4">
                                <div className="p-2 rounded-full bg-background border border-primary/20 shadow-sm group-hover:scale-110 transition-transform">
                                    {getStatusIcon(order.status)}
                                </div>
                                <div className="flex flex-col">
                                    <div className="flex items-center gap-2">
                                        <span className="font-bold">{order.coins} KC</span>
                                        <span className="text-xs opacity-50">•</span>
                                        <span className="text-sm font-medium">₹{order.amount}</span>
                                    </div>
                                    <span className="text-xs opacity-60">
                                        {format(new Date(order.createdAt), 'MMM dd, yyyy • hh:mm a')}
                                    </span>
                                </div>
                            </div>
                            
                            <div className="flex items-center gap-3">
                                {getStatusBadge(order.status)}
                                
                                {order.status === PaymentStatus.PENDING && (
                                    <Button 
                                        variant="ghost" 
                                        size="icon" 
                                        className="h-8 w-8 text-primary hover:text-primary hover:bg-primary/20"
                                        onClick={() => syncOrder(order.id)}
                                        disabled={isSyncing}
                                        title="Sync with Payment Gateway"
                                    >
                                        <RefreshCw className={`w-4 h-4 ${isSyncing ? 'animate-spin' : ''}`} />
                                    </Button>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </CardContent>
        </Card>
    );
};
