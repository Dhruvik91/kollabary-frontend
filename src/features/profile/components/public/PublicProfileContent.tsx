'use client';

import React from 'react';
import { AlignLeft } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Image from 'next/image';

interface PublicProfileContentProps {
    bio?: string;
    auctionsDone: any[];
    collaborationsDone: any[];
}

export const PublicProfileContent = ({
    bio,
    auctionsDone,
    collaborationsDone,
}: PublicProfileContentProps) => {
    return (
        <div className="lg:col-span-2 space-y-10">
            <Card className="rounded-[3rem] border-border/50 bg-card/30 glass-card p-8 md:p-12 relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-[100px] -mr-32 -mt-32" />
                <div className="space-y-6 relative z-10">
                    <div className="flex items-center gap-4 text-primary">
                        <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center">
                            <AlignLeft size={24} />
                        </div>
                        <h3 className="text-2xl font-black tracking-tighter uppercase italic">About the Brand</h3>
                    </div>
                    <p className="text-xl text-muted-foreground/90 leading-relaxed font-bold italic">
                        {bio || "This visionary brand is currently focused on crafting their profile."}
                    </p>
                </div>
            </Card>

            {/* Past Auctions */}
            {auctionsDone.length > 0 && (
                <div className="space-y-6">
                    <div className="flex items-center gap-3 px-2">
                        <div className="h-8 w-1.5 bg-primary rounded-full" />
                        <h3 className="text-2xl font-black tracking-tight uppercase">Past Impact (Auctions)</h3>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {auctionsDone.map((auction: any) => (
                            <Card key={auction.id} className="rounded-3xl border-border/40 glass-card p-6 border-l-4 border-l-primary group hover:bg-primary/5 transition-colors">
                                <h4 className="font-black text-lg mb-2 group-hover:text-primary transition-colors">{auction.title}</h4>
                                <p className="text-xs text-muted-foreground line-clamp-2 mb-4 font-medium">{auction.description}</p>
                                <div className="flex justify-between items-center">
                                    <Badge variant="secondary" className="rounded-lg text-[10px] font-black uppercase tracking-widest bg-primary/10 text-primary">COMPLETED</Badge>
                                    <span className="text-[10px] font-black text-muted-foreground/60">{new Date(auction.createdAt).toLocaleDateString()}</span>
                                </div>
                            </Card>
                        ))}
                    </div>
                </div>
            )}

            {/* Trusted by Creators */}
            {collaborationsDone.length > 0 && (
                <div className="space-y-6">
                    <div className="flex items-center gap-3 px-2">
                        <div className="h-8 w-1.5 bg-primary rounded-full" />
                        <h3 className="text-2xl font-black tracking-tight uppercase">Trusted by Creators</h3>
                    </div>
                    <div className="flex flex-wrap gap-4">
                        {collaborationsDone.map((collab: any) => (
                            <div key={collab.id} className="flex items-center gap-3 p-3 bg-muted/20 border border-border/50 rounded-2xl glass-card">
                                <div className="w-10 h-10 rounded-xl bg-zinc-100 overflow-hidden relative border border-border/50">
                                    {collab.influencer?.avatarUrl ? (
                                        <Image src={collab.influencer.avatarUrl} alt="" fill className="object-cover" />
                                    ) : (
                                        <div className="w-full h-full flex items-center justify-center text-primary/30 font-black">
                                            {collab.influencer?.fullName?.charAt(0)}
                                        </div>
                                    )}
                                </div>
                                <div>
                                    <p className="text-xs font-black tracking-tight">{collab.influencer?.fullName}</p>
                                    <p className="text-[9px] text-muted-foreground font-black uppercase">Collaborated</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};
