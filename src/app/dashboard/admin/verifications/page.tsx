'use client';

import { useState } from 'react';
import { useVerificationRequests, useApproveVerification, useRejectVerification } from '@/hooks/admin/useVerificationRequests';
import { VerificationRequestCard } from '@/components/admin/VerificationRequestCard';
import { Card, CardContent } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { AlertCircle, CheckCircle2, Clock, XCircle } from 'lucide-react';

function VerificationsSkeleton() {
    return (
        <div className="grid gap-4 md:grid-cols-2">
            {[...Array(4)].map((_, i) => (
                <Card key={i}>
                    <CardContent className="p-6">
                        <div className="flex items-center gap-3 mb-4">
                            <Skeleton className="h-12 w-12 rounded-full" />
                            <div className="flex-1">
                                <Skeleton className="h-5 w-32 mb-2" />
                                <Skeleton className="h-4 w-48" />
                            </div>
                        </div>
                        <Skeleton className="h-10 w-full mb-2" />
                        <div className="flex gap-2">
                            <Skeleton className="h-10 flex-1" />
                            <Skeleton className="h-10 flex-1" />
                        </div>
                    </CardContent>
                </Card>
            ))}
        </div>
    );
}

export default function AdminVerificationsPage() {
    const [activeTab, setActiveTab] = useState('pending');
    const { data: requests, isLoading, error } = useVerificationRequests();
    const approveMutation = useApproveVerification();
    const rejectMutation = useRejectVerification();

    const handleApprove = (id: string) => {
        approveMutation.mutate(id);
    };

    const handleReject = (id: string, reason: string) => {
        rejectMutation.mutate({ id, reason });
    };

    if (isLoading) {
        return (
            <div className="container mx-auto py-8 px-4">
                <div className="mb-8">
                    <Skeleton className="h-10 w-64 mb-2" />
                    <Skeleton className="h-4 w-96" />
                </div>
                <VerificationsSkeleton />
            </div>
        );
    }

    if (error || !requests) {
        return (
            <div className="container mx-auto py-8 px-4">
                <Card>
                    <CardContent className="py-12 text-center">
                        <AlertCircle className="h-12 w-12 mx-auto mb-4 text-red-500" />
                        <h3 className="text-lg font-semibold mb-2">Failed to Load Verifications</h3>
                        <p className="text-muted-foreground">Please try refreshing the page</p>
                    </CardContent>
                </Card>
            </div>
        );
    }

    const pendingRequests = requests.filter(r => r.status === 'PENDING');
    const approvedRequests = requests.filter(r => r.status === 'APPROVED');
    const rejectedRequests = requests.filter(r => r.status === 'REJECTED');

    return (
        <div className="container mx-auto py-8 px-4 space-y-6">
            {/* Header */}
            <div>
                <h1 className="text-4xl font-bold tracking-tight">Verification Requests</h1>
                <p className="text-muted-foreground mt-2">
                    Review and manage influencer verification requests
                </p>
            </div>

            {/* Stats */}
            <div className="grid gap-4 md:grid-cols-3">
                <Card>
                    <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-muted-foreground">Pending</p>
                                <p className="text-3xl font-bold">{pendingRequests.length}</p>
                            </div>
                            <div className="p-3 bg-yellow-100 dark:bg-yellow-900/20 rounded-full">
                                <Clock className="h-6 w-6 text-yellow-600" />
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-muted-foreground">Approved</p>
                                <p className="text-3xl font-bold">{approvedRequests.length}</p>
                            </div>
                            <div className="p-3 bg-green-100 dark:bg-green-900/20 rounded-full">
                                <CheckCircle2 className="h-6 w-6 text-green-600" />
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-muted-foreground">Rejected</p>
                                <p className="text-3xl font-bold">{rejectedRequests.length}</p>
                            </div>
                            <div className="p-3 bg-red-100 dark:bg-red-900/20 rounded-full">
                                <XCircle className="h-6 w-6 text-red-600" />
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Tabs */}
            <Tabs value={activeTab} onValueChange={setActiveTab}>
                <TabsList>
                    <TabsTrigger value="pending">
                        Pending ({pendingRequests.length})
                    </TabsTrigger>
                    <TabsTrigger value="approved">
                        Approved ({approvedRequests.length})
                    </TabsTrigger>
                    <TabsTrigger value="rejected">
                        Rejected ({rejectedRequests.length})
                    </TabsTrigger>
                </TabsList>

                <TabsContent value="pending" className="mt-6">
                    {pendingRequests.length === 0 ? (
                        <Card>
                            <CardContent className="py-12 text-center">
                                <Clock className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                                <h3 className="text-lg font-semibold mb-2">No Pending Requests</h3>
                                <p className="text-muted-foreground">All verification requests have been processed</p>
                            </CardContent>
                        </Card>
                    ) : (
                        <div className="grid gap-4 md:grid-cols-2">
                            {pendingRequests.map((request) => (
                                <VerificationRequestCard
                                    key={request.id}
                                    request={request}
                                    onApprove={handleApprove}
                                    onReject={handleReject}
                                    isApproving={approveMutation.isPending}
                                    isRejecting={rejectMutation.isPending}
                                />
                            ))}
                        </div>
                    )}
                </TabsContent>

                <TabsContent value="approved" className="mt-6">
                    {approvedRequests.length === 0 ? (
                        <Card>
                            <CardContent className="py-12 text-center">
                                <CheckCircle2 className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                                <h3 className="text-lg font-semibold mb-2">No Approved Requests</h3>
                                <p className="text-muted-foreground">No verifications have been approved yet</p>
                            </CardContent>
                        </Card>
                    ) : (
                        <div className="grid gap-4 md:grid-cols-2">
                            {approvedRequests.map((request) => (
                                <VerificationRequestCard
                                    key={request.id}
                                    request={request}
                                    onApprove={handleApprove}
                                    onReject={handleReject}
                                />
                            ))}
                        </div>
                    )}
                </TabsContent>

                <TabsContent value="rejected" className="mt-6">
                    {rejectedRequests.length === 0 ? (
                        <Card>
                            <CardContent className="py-12 text-center">
                                <XCircle className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                                <h3 className="text-lg font-semibold mb-2">No Rejected Requests</h3>
                                <p className="text-muted-foreground">No verifications have been rejected</p>
                            </CardContent>
                        </Card>
                    ) : (
                        <div className="grid gap-4 md:grid-cols-2">
                            {rejectedRequests.map((request) => (
                                <VerificationRequestCard
                                    key={request.id}
                                    request={request}
                                    onApprove={handleApprove}
                                    onReject={handleReject}
                                />
                            ))}
                        </div>
                    )}
                </TabsContent>
            </Tabs>
        </div>
    );
}
