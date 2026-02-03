'use client';

import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import { useAuth } from '@/providers/auth-provider';
import { Button } from '@/components/ui/button';
import { FRONTEND_ROUTES } from '@/constants/constants';
import { getDashboardRoute } from '@/lib/dashboard-routes';
import { User, LogOut, Settings, LayoutDashboard } from 'lucide-react';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

interface AppShellProps {
    children: React.ReactNode;
}

export function AppShell({ children }: AppShellProps) {
    const pathname = usePathname();
    const { user, profile, signOut } = useAuth();
    const isAuthPage = pathname?.startsWith('/auth');

    if (isAuthPage) {
        return <main>{children}</main>;
    }

    const dashboardRoute = getDashboardRoute(user?.role || null);

    return (
        <div className="flex flex-col min-h-screen">
            <nav className="sticky top-0 z-50 w-full border-b glass-enhanced">
                <div className="container flex h-16 items-center justify-between px-4 mx-auto">
                    <Link href="/" className="text-2xl font-bold bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent hover:opacity-80 transition-opacity">
                        Kollabary
                    </Link>

                    <div className="hidden md:flex items-center gap-8">
                        <Link href={FRONTEND_ROUTES.INFLUENCERS.SEARCH} className={cn("text-sm font-medium transition-colors hover:text-primary", pathname.includes('influencers') ? "text-primary" : "text-muted-foreground")}>
                            Influencers
                        </Link>
                        <Link href={FRONTEND_ROUTES.COLLABORATIONS.BASE} className={cn("text-sm font-medium transition-colors hover:text-primary", pathname.includes('collaborations') ? "text-primary" : "text-muted-foreground")}>
                            Collaborations
                        </Link>
                    </div>

                    <div className="flex items-center gap-4">
                        {user ? (
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button variant="ghost" className="relative h-10 w-10 rounded-full">
                                        <Avatar className="h-10 w-10 border border-primary/20">
                                            <AvatarImage src={profile?.profileImage} alt={user.name} />
                                            <AvatarFallback className="bg-primary/5 text-primary">
                                                {user.name?.charAt(0) || <User className="h-4 w-4" />}
                                            </AvatarFallback>
                                        </Avatar>
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent className="w-56 glass-enhanced border-white/10" align="end" forceMount>
                                    <DropdownMenuLabel className="font-normal">
                                        <div className="flex flex-col space-y-1">
                                            <p className="text-sm font-medium leading-none">{user.name}</p>
                                            <p className="text-xs leading-none text-muted-foreground">{user.email}</p>
                                        </div>
                                    </DropdownMenuLabel>
                                    <DropdownMenuSeparator className="bg-white/10" />
                                    <DropdownMenuItem asChild>
                                        <Link href={dashboardRoute} className="cursor-pointer">
                                            <LayoutDashboard className="mr-2 h-4 w-4" />
                                            Dashboard
                                        </Link>
                                    </DropdownMenuItem>
                                    <DropdownMenuItem asChild>
                                        <Link href={FRONTEND_ROUTES.PROFILE.EDIT} className="cursor-pointer">
                                            <Settings className="mr-2 h-4 w-4" />
                                            Settings
                                        </Link>
                                    </DropdownMenuItem>
                                    <DropdownMenuSeparator className="bg-white/10" />
                                    <DropdownMenuItem className="text-destructive focus:bg-destructive/10 cursor-pointer" onClick={() => signOut()}>
                                        <LogOut className="mr-2 h-4 w-4" />
                                        Log out
                                    </DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        ) : (
                            <div className="flex items-center gap-2">
                                <Link href={FRONTEND_ROUTES.AUTH.LOGIN}>
                                    <Button variant="ghost" size="sm">Login</Button>
                                </Link>
                                <Link href={FRONTEND_ROUTES.AUTH.SIGNUP}>
                                    <Button size="sm" className="bg-primary hover:bg-primary/90">Sign Up</Button>
                                </Link>
                            </div>
                        )}
                    </div>
                </div>
            </nav>

            <main className="flex-1">
                {children}
            </main>

            {/* Footer will go here */}
            <footer className="border-t py-6 md:py-0 glass-enhanced">
                <div className="container flex flex-col items-center justify-between gap-4 md:h-24 md:flex-row">
                    <p className="text-sm text-muted-foreground">
                        &copy; {new Date().getFullYear()} Kollabary. All rights reserved.
                    </p>
                </div>
            </footer>
        </div>
    );
}
