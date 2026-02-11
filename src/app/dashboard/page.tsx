'use client';

import { useAuth } from '@/contexts/auth-context';
import { useLogout } from '@/hooks/use-auth.hooks';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { AuthGuard } from '@/components/guards/AuthGuard';
import { Loader2 } from 'lucide-react';

function DashboardContent() {
    const { user, isLoading } = useAuth();
    const logoutMutation = useLogout();

    if (isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20 p-8">
            <div className="max-w-4xl mx-auto space-y-8">
                <div className="flex items-center justify-between">
                    <h1 className="text-4xl font-bold">Dashboard</h1>
                    <Button
                        onClick={() => logoutMutation.mutate()}
                        disabled={logoutMutation.isPending}
                        variant="outline"
                    >
                        {logoutMutation.isPending ? (
                            <>
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                Logging out...
                            </>
                        ) : (
                            'Logout'
                        )}
                    </Button>
                </div>

                <Card>
                    <CardHeader>
                        <CardTitle>Welcome to Kollabary!</CardTitle>
                        <CardDescription>You are successfully authenticated</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div>
                            <p className="text-sm font-medium text-muted-foreground">Email</p>
                            <p className="text-lg">{user?.email}</p>
                        </div>
                        <div>
                            <p className="text-sm font-medium text-muted-foreground">Role</p>
                            <p className="text-lg capitalize">{user?.role.toLowerCase()}</p>
                        </div>
                        <div>
                            <p className="text-sm font-medium text-muted-foreground">Status</p>
                            <p className="text-lg capitalize">{user?.status.toLowerCase()}</p>
                        </div>
                        <div>
                            <p className="text-sm font-medium text-muted-foreground">Email Verified</p>
                            <p className="text-lg">{user?.emailVerified ? 'Yes' : 'No'}</p>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}

export default function DashboardPage() {
    return (
        <AuthGuard>
            <DashboardContent />
        </AuthGuard>
    );
}
