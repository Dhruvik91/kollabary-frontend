'use client';

import { usePathname } from 'next/navigation';
import { Sidebar } from '@/components/layout/Sidebar';
import { Menu, Sparkles } from 'lucide-react';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';

interface AppShellProps {
    children: React.ReactNode;
}

export function AppShell({ children }: AppShellProps) {
    const pathname = usePathname();
    const isAuthPage = pathname?.startsWith('/auth');

    if (isAuthPage) {
        return <main>{children}</main>;
    }

    return (
        <div className="flex h-screen overflow-hidden bg-background text-foreground">
            {/* Desktop Sidebar */}
            <Sidebar className="hidden lg:flex w-64" />

            <div className="flex-1 flex flex-col min-w-0 h-full">
                {/* Mobile Top Bar */}
                <header className="lg:hidden h-16 border-b border-border bg-card/80 backdrop-blur-md sticky top-0 z-40 px-4 flex items-center justify-between flex-shrink-0">
                    <div className="flex items-center gap-2">
                        <Sheet>
                            <SheetTrigger asChild>
                                <Button variant="ghost" size="icon" className="lg:hidden">
                                    <Menu className="h-6 w-6" />
                                    <span className="sr-only">Toggle navigation</span>
                                </Button>
                            </SheetTrigger>
                            <SheetContent side="left" className="p-0 border-none">
                                <Sidebar className="flex w-full" />
                            </SheetContent>
                        </Sheet>
                        <div className="flex items-center gap-2">
                            <div className="w-8 h-8 rounded-lg gradient-bg flex items-center justify-center">
                                <Sparkles className="w-4 h-4 text-primary-foreground" />
                            </div>
                            <span className="font-display font-bold">Kollabary</span>
                        </div>
                    </div>
                </header>

                <main className="flex-1 overflow-y-auto">
                    {children}
                </main>
            </div>
        </div>
    );
}
