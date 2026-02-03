"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Sparkles, User, Bell, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { useAuth } from "@/providers/auth-provider";

const navLinks = [
    { href: "/", label: "Home" },
    { href: "/influencers", label: "Discover" },
    { href: "/collaborations", label: "Collaborations" },
    { href: "/dashboard", label: "Dashboard" },
    { href: "/analytics", label: "Analytics" },
];

export function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const pathname = usePathname();
    const { user, profile, signOut } = useAuth();

    const isLoggedIn = !!user;

    return (
        <motion.header
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            className="fixed top-0 left-0 right-0 z-50"
        >
            <nav className="mx-2 sm:mx-4 mt-2 sm:mt-4" aria-label="Main navigation">
                <div className="glass rounded-xl sm:rounded-2xl px-4 sm:px-6 py-3 sm:py-4">
                    <div className="flex items-center justify-between">
                        {/* Logo */}
                        <Link
                            href="/"
                            className="flex items-center gap-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 rounded-lg"
                            aria-label="Kollabary - Go to homepage"
                        >
                            <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg sm:rounded-xl gradient-bg flex items-center justify-center">
                                <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 text-primary-foreground" aria-hidden="true" />
                            </div>
                            <span className="font-display font-bold text-lg sm:text-xl">Kollabary</span>
                        </Link>

                        {/* Desktop Navigation */}
                        <div className="hidden lg:flex items-center gap-6 xl:gap-8" role="navigation">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.href}
                                    href={link.href}
                                    className={cn(
                                        "text-sm font-medium transition-colors hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 rounded px-2 py-1",
                                        pathname === link.href
                                            ? "text-primary"
                                            : "text-muted-foreground"
                                    )}
                                    aria-current={pathname === link.href ? "page" : undefined}
                                >
                                    {link.label}
                                </Link>
                            ))}
                        </div>

                        {/* Desktop Auth Buttons */}
                        <div className="hidden lg:flex items-center gap-3">
                            {isLoggedIn ? (
                                <>
                                    {/* Messages */}
                                    <Link href="/messages" aria-label="Messages">
                                        <Button variant="ghost" size="icon" className="relative">
                                            <MessageSquare className="w-5 h-5" />
                                            <Badge className="absolute -top-1 -right-1 w-5 h-5 p-0 text-[10px] flex items-center justify-center bg-accent text-accent-foreground">
                                                3
                                            </Badge>
                                        </Button>
                                    </Link>

                                    {/* Notifications */}
                                    <Link href="/notifications" aria-label="Notifications">
                                        <Button variant="ghost" size="icon" className="relative">
                                            <Bell className="w-5 h-5" />
                                            <Badge className="absolute -top-1 -right-1 w-5 h-5 p-0 text-[10px] flex items-center justify-center bg-accent text-accent-foreground">
                                                2
                                            </Badge>
                                        </Button>
                                    </Link>

                                    <DropdownMenu>
                                        <DropdownMenuTrigger asChild>
                                            <Button
                                                variant="ghost"
                                                size="sm"
                                                className="gap-2 focus:ring-0"
                                                aria-label="User menu"
                                            >
                                                <div className="w-8 h-8 rounded-full gradient-bg flex items-center justify-center">
                                                    <User className="w-4 h-4 text-primary-foreground" aria-hidden="true" />
                                                </div>
                                            </Button>
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent align="end" className="w-48 bg-card border-glass-border">
                                            <DropdownMenuItem asChild>
                                                <Link href="/dashboard" className="cursor-pointer">
                                                    Dashboard
                                                </Link>
                                            </DropdownMenuItem>
                                            <DropdownMenuItem asChild>
                                                <Link href="/analytics" className="cursor-pointer">
                                                    Analytics
                                                </Link>
                                            </DropdownMenuItem>
                                            <DropdownMenuItem asChild>
                                                <Link href="/messages" className="cursor-pointer">
                                                    Messages
                                                </Link>
                                            </DropdownMenuItem>
                                            <DropdownMenuItem asChild>
                                                <Link href="/profile/edit" className="cursor-pointer">
                                                    Edit Profile
                                                </Link>
                                            </DropdownMenuItem>
                                            <DropdownMenuItem asChild>
                                                <Link href="/settings" className="cursor-pointer">
                                                    Settings
                                                </Link>
                                            </DropdownMenuItem>
                                            <DropdownMenuSeparator />
                                            <DropdownMenuItem
                                                className="text-destructive cursor-pointer"
                                                onClick={() => signOut()}
                                            >
                                                Sign Out
                                            </DropdownMenuItem>
                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                </>
                            ) : (
                                <>
                                    <Button variant="ghost" size="sm" asChild>
                                        <Link href="/auth/login">Sign In</Link>
                                    </Button>
                                    <Button size="sm" className="gradient-bg border-0 glow-primary" asChild>
                                        <Link href="/auth/signup">Get Started</Link>
                                    </Button>
                                </>
                            )}
                        </div>

                        {/* Mobile Menu Button */}
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="lg:hidden p-2 rounded-lg hover:bg-secondary transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                            aria-expanded={isOpen}
                            aria-controls="mobile-menu"
                            aria-label={isOpen ? "Close menu" : "Open menu"}
                        >
                            {isOpen ? (
                                <X className="w-5 h-5" aria-hidden="true" />
                            ) : (
                                <Menu className="w-5 h-5" aria-hidden="true" />
                            )}
                        </button>
                    </div>

                    {/* Mobile Navigation */}
                    <AnimatePresence>
                        {isOpen && (
                            <motion.div
                                id="mobile-menu"
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: "auto", opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                className="lg:hidden overflow-hidden"
                                role="navigation"
                                aria-label="Mobile navigation"
                            >
                                <div className="pt-4 pb-2 flex flex-col gap-1">
                                    {navLinks.map((link) => (
                                        <Link
                                            key={link.href}
                                            href={link.href}
                                            onClick={() => setIsOpen(false)}
                                            className={cn(
                                                "px-4 py-3 rounded-lg text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary",
                                                pathname === link.href
                                                    ? "bg-primary/20 text-primary"
                                                    : "text-muted-foreground hover:bg-secondary"
                                            )}
                                            aria-current={pathname === link.href ? "page" : undefined}
                                        >
                                            {link.label}
                                        </Link>
                                    ))}

                                    {isLoggedIn ? (
                                        <>
                                            <div className="h-px bg-glass-border my-2" role="separator" />
                                            <Link
                                                href="/messages"
                                                onClick={() => setIsOpen(false)}
                                                className="px-4 py-3 rounded-lg text-sm font-medium text-muted-foreground hover:bg-secondary transition-colors flex items-center justify-between"
                                            >
                                                Messages
                                                <Badge className="bg-accent text-accent-foreground text-[10px]">3</Badge>
                                            </Link>
                                            <Link
                                                href="/notifications"
                                                onClick={() => setIsOpen(false)}
                                                className="px-4 py-3 rounded-lg text-sm font-medium text-muted-foreground hover:bg-secondary transition-colors flex items-center justify-between"
                                            >
                                                Notifications
                                                <Badge className="bg-accent text-accent-foreground text-[10px]">2</Badge>
                                            </Link>
                                            <Link
                                                href="/settings"
                                                onClick={() => setIsOpen(false)}
                                                className="px-4 py-3 rounded-lg text-sm font-medium text-muted-foreground hover:bg-secondary transition-colors"
                                            >
                                                Settings
                                            </Link>
                                            <Link
                                                href="/profile/edit"
                                                onClick={() => setIsOpen(false)}
                                                className="px-4 py-3 rounded-lg text-sm font-medium text-muted-foreground hover:bg-secondary transition-colors"
                                            >
                                                Edit Profile
                                            </Link>
                                            <button
                                                onClick={() => {
                                                    signOut();
                                                    setIsOpen(false);
                                                }}
                                                className="px-4 py-3 rounded-lg text-sm font-medium text-destructive hover:bg-secondary transition-colors text-left w-full"
                                            >
                                                Sign Out
                                            </button>
                                        </>
                                    ) : (
                                        <div className="flex flex-col sm:flex-row gap-2 mt-4">
                                            <Button variant="outline" className="flex-1 border-glass-border" asChild>
                                                <Link href="/auth/login" onClick={() => setIsOpen(false)}>
                                                    Sign In
                                                </Link>
                                            </Button>
                                            <Button className="flex-1 gradient-bg border-0" asChild>
                                                <Link href="/auth/signup" onClick={() => setIsOpen(false)}>
                                                    Get Started
                                                </Link>
                                            </Button>
                                        </div>
                                    )}
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </nav>
        </motion.header>
    );
}
