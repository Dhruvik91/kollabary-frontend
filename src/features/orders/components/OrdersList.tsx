'use client';

import { PaymentStatus, PaymentOrder } from '@/types/payment.types';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { RefreshCw, Clock, CheckCircle2, XCircle, AlertCircle, Package } from 'lucide-react';
import { format } from 'date-fns';
import { Skeleton } from '@/components/ui/skeleton';
import { cn } from '@/lib/utils';
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip";

// Helper components for status visuals
export const getStatusIcon = (status: PaymentStatus) => {
    switch (status) {
        case PaymentStatus.SUCCESS: return <CheckCircle2 className="w-4 h-4 text-green-500" />;
        case PaymentStatus.FAILED: return <XCircle className="w-4 h-4 text-red-500" />;
        case PaymentStatus.CANCELLED: return <AlertCircle className="w-4 h-4 text-gray-400" />;
        default: return <Clock className="w-4 h-4 text-yellow-500 animate-pulse" />;
    }
};

export const getStatusBadge = (status: PaymentStatus) => {
    switch (status) {
        case PaymentStatus.SUCCESS: return <Badge variant="outline" className="text-green-500 border-green-500 bg-green-500/10">Paid</Badge>;
        case PaymentStatus.FAILED: return <Badge variant="destructive">Failed</Badge>;
        case PaymentStatus.CANCELLED: return <Badge variant="secondary">Cancelled</Badge>;
        default: return <Badge variant="outline" className="text-yellow-500 border-yellow-500 bg-yellow-500/10">Pending</Badge>;
    }
};

interface OrderItemProps {
    order: PaymentOrder;
    isSyncing?: boolean;
    onSync?: (orderId: string) => void;
}

export const OrderItem = ({ order, isSyncing, onSync }: OrderItemProps) => {
    return (
        <div 
            className="flex flex-col sm:flex-row sm:items-center justify-between p-5 rounded-2xl bg-card border border-border/50 hover:border-primary/30 transition-all hover:shadow-lg hover:shadow-primary/5 group"
        >
            <div className="flex items-center gap-5">
                <Tooltip delayDuration={300}>
                    <TooltipTrigger asChild>
                        <div className="p-3 rounded-xl bg-primary/10 border border-primary/20 group-hover:scale-110 transition-transform hidden sm:block cursor-help">
                            {getStatusIcon(order.status)}
                        </div>
                    </TooltipTrigger>
                    <TooltipContent side="top" className="font-bold">
                        Status: {order.status}
                    </TooltipContent>
                </Tooltip>
                <div className="flex flex-col space-y-1">
                    <div className="flex items-center gap-2">
                        <span className="text-lg font-bold text-foreground">
                            {order.coins} KC
                        </span>
                        <span className="text-muted-foreground font-medium text-sm">
                            at ₹{order.amount}
                        </span>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <span className="font-medium">Order ID: {order.id.slice(-8).toUpperCase()}</span>
                        <span>•</span>
                        <span>{format(new Date(order.createdAt), 'MMM dd, yyyy • hh:mm a')}</span>
                    </div>
                </div>
            </div>
            
            <div className="flex items-center justify-between sm:justify-end gap-4 mt-4 sm:mt-0 pt-4 sm:pt-0 border-t sm:border-t-0 border-border/50">
                <div className="sm:hidden">
                     {getStatusIcon(order.status)}
                </div>
                <div className="flex items-center gap-3">
                    {getStatusBadge(order.status)}
                    
                    {order.status === PaymentStatus.PENDING && onSync && (
                        <Tooltip delayDuration={300}>
                            <TooltipTrigger asChild>
                                <Button 
                                    variant="ghost" 
                                    size="icon" 
                                    className="h-9 w-9 rounded-xl text-primary hover:text-primary hover:bg-primary/20"
                                    onClick={() => onSync(order.id)}
                                    disabled={isSyncing}
                                >
                                    <RefreshCw className={cn("w-4 h-4", isSyncing && "animate-spin")} />
                                </Button>
                            </TooltipTrigger>
                            <TooltipContent side="top">
                                Sync with Payment Gateway
                            </TooltipContent>
                        </Tooltip>
                    )}
                </div>
            </div>
        </div>
    );
};

interface OrdersListProps {
    orders: PaymentOrder[];
    isLoading: boolean;
    isSyncing?: boolean;
    onSync?: (orderId: string) => void;
}

export const OrdersList = ({ orders, isLoading, isSyncing, onSync }: OrdersListProps) => {
    if (isLoading) {
        return (
            <div className="space-y-4">
                {[1, 2, 3, 4, 5].map((i) => (
                    <Skeleton key={i} className="h-20 w-full rounded-2xl" />
                ))}
            </div>
        );
    }

    if (orders.length === 0) {
        return (
            <Card className="border-dashed border-2 border-primary/20 bg-primary/5 rounded-3xl py-12">
                <CardContent className="flex flex-col items-center justify-center text-center space-y-4">
                    <div className="p-4 rounded-full bg-primary/10 text-primary">
                        <Package size={40} />
                    </div>
                    <div className="space-y-2">
                        <CardTitle className="text-2xl font-bold">No orders found</CardTitle>
                        <CardDescription className="max-w-xs mx-auto">
                            You haven't made any purchases yet. Your top-up history will appear here.
                        </CardDescription>
                    </div>
                </CardContent>
            </Card>
        );
    }

    return (
        <div className="space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-700">
            {orders.map((order) => (
                <OrderItem 
                    key={order.id} 
                    order={order} 
                    isSyncing={isSyncing} 
                    onSync={onSync} 
                />
            ))}
        </div>
    );
};
