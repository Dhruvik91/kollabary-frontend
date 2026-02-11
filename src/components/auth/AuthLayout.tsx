import { ReactNode } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

interface AuthLayoutProps {
    children: ReactNode;
    title: string;
    description?: string;
}

/**
 * Auth Layout Component
 * Provides consistent layout for authentication pages
 */
export function AuthLayout({ children, title, description }: AuthLayoutProps) {
    return (
        <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-background via-background to-muted/20">
            <div className="w-full max-w-md">
                <Card className="backdrop-blur-sm bg-card/95 border-border/50 shadow-xl">
                    <CardHeader className="space-y-1 text-center">
                        <CardTitle className="text-2xl font-bold tracking-tight">{title}</CardTitle>
                        {description && (
                            <CardDescription className="text-base">{description}</CardDescription>
                        )}
                    </CardHeader>
                    <CardContent>{children}</CardContent>
                </Card>

                {/* Footer */}
                <p className="mt-8 text-center text-sm text-muted-foreground">
                    © {new Date().getFullYear()} Kollabary. All rights reserved.
                </p>
            </div>
        </div>
    );
}
