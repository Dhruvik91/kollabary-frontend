'use client';

import React from 'react';
import { Globe, ExternalLink } from 'lucide-react';
import { Card } from '@/components/ui/card';

interface PublicProfileSidebarProps {
    socialLinks?: Record<string, string>;
    auctionsCount: number;
    collaborationsCount: number;
}

export const PublicProfileSidebar = ({
    socialLinks,
    auctionsCount,
    collaborationsCount,
}: PublicProfileSidebarProps) => {
    return (
        <div className="lg:col-span-1 space-y-8">
            {/* Stats Card */}
            <Card className="rounded-[2.5rem] border-border/50 bg-primary/5 glass-card p-8 space-y-6">
                <h4 className="font-black text-xs uppercase tracking-[0.2em] text-primary/60 text-center">Brand Stats</h4>
                <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1 text-center">
                        <p className="text-3xl font-black tracking-tighter">{auctionsCount}+</p>
                        <p className="text-[10px] font-black text-muted-foreground uppercase tracking-widest">Auctions</p>
                    </div>
                    <div className="space-y-1 text-center border-l border-primary/10">
                        <p className="text-3xl font-black tracking-tighter">{collaborationsCount}+</p>
                        <p className="text-[10px] font-black text-muted-foreground uppercase tracking-widest">Kollabs</p>
                    </div>
                </div>
            </Card>

            <Card className="rounded-[2.5rem] border-border/50 bg-card/30 glass-card p-8">
                <div className="flex items-center gap-4 mb-6">
                    <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center text-primary">
                        <Globe size={20} />
                    </div>
                    <h3 className="font-black text-lg tracking-tight uppercase">Presence</h3>
                </div>
                <div className="space-y-4">
                    {socialLinks && Object.entries(socialLinks).length > 0 ? (
                        Object.entries(socialLinks).map(([platform, url]) => (
                            <a
                                key={platform}
                                href={url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center justify-between p-4 bg-background/50 border border-border/50 rounded-2xl hover:border-primary/50 transition-all group"
                            >
                                <p className="text-sm font-black capitalize">{platform}</p>
                                <ExternalLink size={16} className="text-muted-foreground group-hover:text-primary" />
                            </a>
                        ))
                    ) : (
                        <p className="text-xs text-muted-foreground italic text-center py-4">No social links added</p>
                    )}
                </div>
            </Card>
        </div>
    );
};
