"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import {
    Home,
    Compass,
    Users,
    LayoutDashboard,
    BarChart3,
    Settings,
    LogOut,
    Sparkles,
    MessageSquare,
    Bell,
    User
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/providers/auth-provider";
import { Badge } from "@/components/ui/badge";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const navLinks = [
    { href: "/", label: "Home", icon: Home },
    { href: "/influencers", label: "Discover", icon: Compass },
    { href: "/collaborations", label: "Collaborations", icon: Users },
    { href: "/dashboard/brand", label: "Dashboard", icon: LayoutDashboard },
    { href: "/analytics", label: "Analytics", icon: BarChart3 },
];

export function Sidebar({ className }: { className?: string }) {
    const pathname = usePathname();
    const { user, signOut } = useAuth();

    return (
        <aside className={cn("flex flex-col bg-card border-r border-border h-screen sticky top-0", className)}>
            {/* Logo */}
            <div className="p-6">
                <Link href="/" className="flex items-center gap-2">
                    <div className="w-10 h-10 rounded-xl gradient-bg flex items-center justify-center">
                        <Sparkles className="w-5 h-5 text-primary-foreground" />
                    </div>
                    <span className="font-display font-bold text-xl">Kollabary</span>
                </Link>
            </div>

            {/* Navigation */}
            <nav className="flex-1 px-4 py-4 space-y-1">
                {navLinks.map((link) => {
                    const isActive = pathname === link.href || (link.href !== "/" && pathname?.startsWith(link.href));
                    return (
                        <Link
                            key={link.href}
                            href={link.href}
                            className={cn(
                                "flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all group",
                                isActive
                                    ? "bg-primary/10 text-primary shadow-sm"
                                    : "text-muted-foreground hover:bg-secondary hover:text-foreground"
                            )}
                        >
                            <link.icon className={cn(
                                "w-5 h-5 transition-colors",
                                isActive ? "text-primary" : "group-hover:text-foreground"
                            )} />
                            {link.label}
                            {isActive && (
                                <motion.div
                                    layoutId="activeNav"
                                    className="ml-auto w-1.5 h-1.5 rounded-full bg-primary"
                                />
                            )}
                        </Link>
                    );
                })}
            </nav>

            {/* Bottom Actions */}
            <div className="p-4 border-t border-border space-y-4">
                <div className="flex items-center justify-around">
                    <Link href="/messages" className="relative p-2 text-muted-foreground hover:text-foreground transition-colors">
                        <MessageSquare className="w-5 h-5" />
                        <Badge className="absolute -top-1 -right-1 w-5 h-5 p-0 text-[10px] flex items-center justify-center bg-accent text-accent-foreground">3</Badge>
                    </Link>
                    <Link href="/notifications" className="relative p-2 text-muted-foreground hover:text-foreground transition-colors">
                        <Bell className="w-5 h-5" />
                        <Badge className="absolute -top-1 -right-1 w-5 h-5 p-0 text-[10px] flex items-center justify-center bg-accent text-accent-foreground">2</Badge>
                    </Link>
                    <Link href="/settings" className="p-2 text-muted-foreground hover:text-foreground transition-colors">
                        <Settings className="w-5 h-5" />
                    </Link>
                </div>

                {user && (
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="w-full justify-start gap-3 px-2 h-auto py-2 rounded-xl hover:bg-secondary">
                                <div className="w-10 h-10 rounded-full gradient-bg flex items-center justify-center flex-shrink-0">
                                    <User className="w-5 h-5 text-primary-foreground" />
                                </div>
                                <div className="text-left overflow-hidden">
                                    <p className="text-sm font-semibold truncate">{user.email?.split('@')[0]}</p>
                                    <p className="text-xs text-muted-foreground truncate">{user.email}</p>
                                </div>
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="w-56" side="right" sideOffset={10}>
                            <DropdownMenuItem asChild>
                                <Link href="/profile/edit" className="flex items-center gap-2 cursor-pointer">
                                    <User className="w-4 h-4" /> Edit Profile
                                </Link>
                            </DropdownMenuItem>
                            <DropdownMenuItem asChild>
                                <Link href="/settings" className="flex items-center gap-2 cursor-pointer">
                                    <Settings className="w-4 h-4" /> Settings
                                </Link>
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem className="text-destructive flex items-center gap-2 cursor-pointer" onClick={() => signOut()}>
                                <LogOut className="w-4 h-4" /> Sign Out
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                )}
            </div>
        </aside>
    );
}
