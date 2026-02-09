'use client';

import { useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { AlertTriangle, RefreshCcw, Home } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function Error({
    error,
    reset,
}: {
    error: Error & { digest?: string };
    reset: () => void;
}) {
    const router = useRouter();

    useEffect(() => {
        // Log the error to an error reporting service
        console.error('Collaboration error:', error);
    }, [error]);

    return (
        <div className="container max-w-2xl mx-auto py-16 px-4">
            <Card className="glass border-glass-border border-destructive/20">
                <CardHeader>
                    <div className="flex items-center gap-3 mb-2">
                        <div className="p-3 rounded-full bg-destructive/10">
                            <AlertTriangle className="h-6 w-6 text-destructive" />
                        </div>
                        <CardTitle className="text-2xl">Something went wrong!</CardTitle>
                    </div>
                    <CardDescription>
                        We encountered an error while loading this collaboration.
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    {/* Error Details */}
                    <div className="p-4 rounded-lg bg-muted/50 border border-border">
                        <p className="text-sm font-mono text-muted-foreground">
                            {error.message || 'An unexpected error occurred'}
                        </p>
                        {error.digest && (
                            <p className="text-xs text-muted-foreground mt-2">
                                Error ID: {error.digest}
                            </p>
                        )}
                    </div>

                    {/* Actions */}
                    <div className="flex gap-3">
                        <Button onClick={reset} className="gap-2">
                            <RefreshCcw className="h-4 w-4" />
                            Try Again
                        </Button>
                        <Button
                            variant="outline"
                            onClick={() => router.push('/collaborations')}
                            className="gap-2"
                        >
                            <Home className="h-4 w-4" />
                            Back to Collaborations
                        </Button>
                    </div>

                    {/* Help Text */}
                    <p className="text-sm text-muted-foreground">
                        If this problem persists, please contact support or try again later.
                    </p>
                </CardContent>
            </Card>
        </div>
    );
}
