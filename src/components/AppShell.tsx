'use client';

import { usePathname } from 'next/navigation';
import { Sidebar } from '@/components/layout/Sidebar';
import { Navbar } from '@/components/layout/Navbar';
import { Menu, Sparkles } from 'lucide-react';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/providers/auth-provider';
import { LoadingState } from '@/components/ui/states/LoadingState';

interface AppShellProps {
    children: React.ReactNode;
}

import { BackgroundEffects } from '@/components/BackgroundEffects';

export function AppShell({ children }: AppShellProps) {
    const pathname = usePathname();
    const { user, loading } = useAuth();
    const isAuthPage = pathname?.startsWith('/auth');

    if (loading) {
        return <LoadingState fullPage message="Initializing Kollabary..." />;
    }

    if (isAuthPage) {
        return (
            <main className="relative min-h-screen">
                <BackgroundEffects />
                {children}
            </main>
        );
    }

    return (
        <div className="flex h-screen overflow-hidden bg-background text-foreground relative">
            <BackgroundEffects />
            {/* Desktop Sidebar */}
            {user && <Sidebar className="hidden lg:flex w-64 border-r border-glass-border shadow-sm z-20" />}

            <div className="flex-1 flex flex-col min-w-0 h-full relative z-10">
                {/* Mobile Top Bar */}
                {user && (
                    <header className="lg:hidden h-16 border-b border-glass-border bg-card/40 backdrop-blur-xl sticky top-0 z-40 px-4 flex items-center justify-between flex-shrink-0">
                        <div className="flex items-center gap-2">
                            <Sheet>
                                <SheetTrigger asChild>
                                    <Button variant="ghost" size="icon" className="lg:hidden hover:bg-glass">
                                        <Menu className="h-6 w-6" />
                                        <span className="sr-only">Toggle navigation</span>
                                    </Button>
                                </SheetTrigger>
                                <SheetContent side="left" className="p-0 border-none bg-transparent">
                                    <Sidebar className="flex w-full h-full" />
                                </SheetContent>
                            </Sheet>
                            <div className="flex items-center gap-2">
                                <div className="w-8 h-8 rounded-lg gradient-bg flex items-center justify-center shadow-lg shadow-primary/20">
                                    <Sparkles className="w-4 h-4 text-primary-foreground" />
                                </div>
                                <span className="font-display font-bold tracking-tight">Kollabary</span>
                            </div>
                        </div>
                    </header>
                )}

                <main className={`flex-1 overflow-y-auto scroll-smooth custom-scrollbar ${!user ? 'w-full' : ''}`}>
                    {!user && <Navbar />}
                    {children}
                </main>
            </div>
        </div>
    );
}
