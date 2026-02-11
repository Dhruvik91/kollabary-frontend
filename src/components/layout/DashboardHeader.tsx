'use client';

import React from 'react';
import {
    Search,
    Bell,
    User as UserIcon,
    ChevronDown,
    Plus,
    Menu
} from 'lucide-react';
import { useAuth } from '@/contexts/auth-context';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface DashboardHeaderProps {
    onMenuClick?: () => void;
}

import { ThemeToggle } from '@/components/ui/theme-toggle';

/**
 * Header component for the authenticated dashboard
 * Enhanced with mobile support
 */
export const DashboardHeader = ({ onMenuClick }: DashboardHeaderProps) => {
    const { user } = useAuth();

    return (
        <header className="sticky top-0 right-0 z-30 flex items-center justify-between h-16 px-4 md:px-8 bg-background/80 backdrop-blur-md border-b border-border">
            <div className="flex items-center gap-4 flex-grow max-w-xl">
                <button
                    onClick={onMenuClick}
                    className="p-2 lg:hidden text-muted-foreground hover:text-primary transition-colors"
                    aria-label="Toggle Menu"
                >
                    <Menu size={20} />
                </button>

                <div className="relative group flex-grow hidden sm:flex items-center">
                    <Search className="absolute left-3 text-muted-foreground group-focus-within:text-primary transition-colors" size={18} />
                    <Input
                        placeholder="Search..."
                        className="pl-10 h-10 bg-muted/50 border-transparent focus-visible:bg-background focus-visible:ring-primary/20 transition-all rounded-xl w-full"
                    />
                </div>

                {/* Mobile Search Button icon instead of full bar */}
                <button className="sm:hidden p-2 text-muted-foreground">
                    <Search size={20} />
                </button>
            </div>

            <div className="flex items-center gap-2 md:gap-4">
                <Button variant="outline" size="sm" className="hidden lg:flex gap-2 rounded-xl border-dashed">
                    <Plus size={16} />
                    New Campaign
                </Button>

                <ThemeToggle />

                <button className="relative p-2 text-muted-foreground hover:text-foreground transition-colors group">
                    <Bell size={20} />
                    <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-background group-hover:scale-110 transition-transform" />
                </button>

                <div className="w-[1px] h-6 bg-border mx-1 md:mx-2" />

                <div className="flex items-center gap-2 md:gap-3 pl-1 md:pl-2 cursor-pointer group">
                    <div className="flex flex-col items-end hidden md:flex">
                        <span className="text-sm font-bold leading-tight group-hover:text-primary transition-colors line-clamp-1">{user?.email.split('@')[0]}</span>
                        <span className="text-[11px] font-medium text-muted-foreground uppercase tracking-wide">{user?.role}</span>
                    </div>

                    <div className="relative">
                        <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center text-primary group-hover:scale-105 transition-transform duration-200">
                            <UserIcon size={16} className="md:size-[20px]" />
                        </div>
                        <div className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 md:w-3 md:h-3 bg-emerald-500 border-2 border-background rounded-full" />
                    </div>

                    <ChevronDown size={14} className="text-muted-foreground group-hover:translate-y-0.5 transition-transform hidden sm:block" />
                </div>
            </div>
        </header>
    );
};
