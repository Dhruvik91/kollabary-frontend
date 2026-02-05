"use client";

import Link from "next/link";
import { Sparkles, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useState, useEffect } from "react";

export function Navbar() {
    return (
        <nav className="sticky top-0 left-0 right-0 z-50 px-4 md:px-8 py-3 bg-background/60 backdrop-blur-lg border-b border-border/40 shadow-sm transition-all duration-300">
            <div className="max-w-7xl mx-auto flex items-center justify-between">
                {/* Logo */}
                <Link href="/" className="flex items-center gap-2 group">
                    <div className="w-10 h-10 rounded-xl gradient-bg flex items-center justify-center group-hover:glow-primary transition-all shadow-lg shadow-primary/20 group-hover:scale-105">
                        <Sparkles className="w-5 h-5 text-primary-foreground" />
                    </div>
                    <span className="font-display font-bold text-xl tracking-tight group-hover:text-primary transition-colors">Kollabary</span>
                </Link>

                {/* Desktop Nav */}
                <div className="hidden md:flex items-center gap-8">
                    <Link href="/influencers" className="text-sm font-semibold text-foreground/70 hover:text-primary transition-all hover:translate-y-[-1px]">
                        Discover
                    </Link>
                    <Link href="/pricing" className="text-sm font-semibold text-foreground/70 hover:text-primary transition-all hover:translate-y-[-1px]">
                        Pricing
                    </Link>
                    <div className="h-4 w-px bg-border/60 mx-2" />
                    <Link href="/auth/login">
                        <Button variant="ghost" className="font-semibold hover:bg-primary/5 transition-colors">Login</Button>
                    </Link>
                    <Link href="/auth/signup">
                        <Button className="gradient-bg border-0 glow-primary font-bold px-6 shadow-md hover:scale-105 active:scale-95 transition-all">
                            Join as Creator
                        </Button>
                    </Link>
                </div>

                {/* Mobile Menu Button */}
                <div className="md:hidden flex items-center gap-3">
                    <Link href="/auth/login">
                        <Button variant="ghost" size="sm" className="font-semibold">Login</Button>
                    </Link>
                    <Link href="/auth/signup">
                        <Button size="sm" className="gradient-bg border-0 glow-primary font-bold px-4 hover:scale-105 active:scale-95 transition-all">
                            Join
                        </Button>
                    </Link>
                </div>
            </div>
        </nav>
    );
}
