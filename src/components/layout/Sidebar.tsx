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
    User,
    Shield
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
import { ROLES } from "@/constants/constants";
import { getDashboardRoute } from "@/lib/dashboard-routes";
import { ThemeToggle } from "@/components/ThemeToggle";
import { NotificationBell } from "@/components/NotificationBell";

const navLinks = [
    { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
    { href: "/influencers", label: "Discover", icon: Compass, roles: [ROLES.USER, ROLES.ADMIN] },
    { href: "/collaborations", label: "Collaborations", icon: Users },
    { href: "/messages", label: "Messages", icon: MessageSquare },
    { href: "/dashboard/admin", label: "Admin", icon: Shield, roles: [ROLES.ADMIN] },
];

export function Sidebar({ className }: { className?: string }) {
    const pathname = usePathname();
    const { user, signOut } = useAuth();

    const filteredLinks = navLinks.filter(link => {
        if (!link.roles) return true;
        if (!user) return link.href === "/"; // Only home for non-logged in if roles are specified
        return link.roles.includes(user.role);
    }).map(link => {
        if (link.label === "Dashboard" && user) {
            return { ...link, href: getDashboardRoute(user.role) };
        }
        return link;
    });

    return (
        <aside className={cn("flex flex-col glass-enhanced border-r border-glass-border h-screen sticky top-0 z-50", className)}>
            {/* Logo */}
            <div className="p-6">
                <Link href="/" className="flex items-center gap-2 group">
                    <div className="w-10 h-10 rounded-xl gradient-bg flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                        <Sparkles className="w-5 h-5 text-primary-foreground" />
                    </div>
                    <span className="font-display font-bold text-xl tracking-tight">Kollabary</span>
                </Link>
            </div>

            {/* Navigation */}
            <nav className="flex-1 px-4 py-4 space-y-2">
                {filteredLinks.map((link) => {
                    const isActive = pathname === link.href || (link.href !== "/" && pathname?.startsWith(link.href));
                    return (
                        <Link
                            key={link.href}
                            href={link.href}
                            className={cn(
                                "flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-300 group relative",
                                isActive
                                    ? "bg-primary/10 text-primary shadow-[inset_0_0_0_1px_rgba(var(--primary),0.2)]"
                                    : "text-muted-foreground hover:bg-glass-border/30 hover:text-foreground"
                            )}
                        >
                            <link.icon className={cn(
                                "w-5 h-5 transition-all duration-300",
                                isActive ? "text-primary scale-110" : "group-hover:text-foreground group-hover:scale-110"
                            )} />
                            {link.label}
                            {isActive && (
                                <motion.div
                                    layoutId="activeNav"
                                    className="ml-auto w-1.5 h-1.5 rounded-full bg-primary shadow-[0_0_8px_rgba(var(--primary),0.6)]"
                                />
                            )}
                        </Link>
                    );
                })}
            </nav>

            {/* Bottom Actions */}
            <div className="p-4 border-t border-glass-border space-y-4 bg-glass/20 backdrop-blur-md">
                <div className="flex items-center justify-around">
                    <NotificationBell />
                    <Link href="/settings" className="p-2 text-muted-foreground hover:text-foreground transition-all hover:scale-110">
                        <Settings className="w-5 h-5" />
                    </Link>
                    <ThemeToggle />
                </div>

                {user && (
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="w-full justify-start gap-3 px-2 h-auto py-2 rounded-xl hover:bg-glass-border/30 transition-all">
                                <div className="w-10 h-10 rounded-full gradient-bg flex items-center justify-center flex-shrink-0 shadow-md">
                                    <User className="w-5 h-5 text-primary-foreground" />
                                </div>
                                <div className="text-left overflow-hidden">
                                    <p className="text-sm font-semibold truncate">{user.name || user.email?.split('@')[0]}</p>
                                    <p className="text-xs text-muted-foreground truncate">{user.email}</p>
                                </div>
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="w-56 glass border-glass-border" side="right" sideOffset={10}>
                            <DropdownMenuItem asChild>
                                <Link href="/profile/edit" className="flex items-center gap-2 cursor-pointer py-2">
                                    <User className="w-4 h-4 text-primary" /> Edit Profile
                                </Link>
                            </DropdownMenuItem>
                            <DropdownMenuItem asChild>
                                <Link href="/settings" className="flex items-center gap-2 cursor-pointer py-2">
                                    <Settings className="w-4 h-4 text-primary" /> Settings
                                </Link>
                            </DropdownMenuItem>
                            <DropdownMenuSeparator className="bg-glass-border" />
                            <DropdownMenuItem className="text-destructive flex items-center gap-2 cursor-pointer py-2 hover:bg-destructive/10" onClick={() => signOut()}>
                                <LogOut className="w-4 h-4" /> Sign Out
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                )}
            </div>
        </aside>
    );
}
