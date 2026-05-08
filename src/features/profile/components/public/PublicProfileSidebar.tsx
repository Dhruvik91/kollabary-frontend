'use client';

import React from 'react';
import { Globe, ExternalLink, Mail, Phone, MapPin, Briefcase } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { getSocialPlatformIcon } from '@/lib/utils';

interface PublicProfileSidebarProps {
    socialLinks?: Record<string, string>;
    auctionsCount: number;
    collaborationsCount: number;
    website?: string;
    contactEmail?: string;
    contactPhone?: string;
    industry?: string;
    companySize?: string;
}

export const PublicProfileSidebar = ({
    socialLinks,
    auctionsCount,
    collaborationsCount,
    website,
    contactEmail,
    contactPhone,
    industry,
    companySize,
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
                                <div className="flex items-center gap-3">
                                    {(() => {
                                        const Icon = getSocialPlatformIcon(platform as any);
                                        return <Icon size={16} className="text-primary" />;
                                    })()}
                                    <p className="text-sm font-black capitalize">{platform}</p>
                                </div>
                                <ExternalLink size={16} className="text-muted-foreground group-hover:text-primary" />
                            </a>
                        ))
                    ) : (
                        <p className="text-xs text-muted-foreground italic text-center py-4">No social links added</p>
                    )}
                </div>
            </Card>

            {(website || contactEmail || contactPhone || industry || companySize) && (
                <Card className="rounded-[2.5rem] border-border/50 bg-card/30 glass-card p-8">
                    <div className="flex items-center gap-4 mb-6">
                        <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center text-primary">
                            <Briefcase size={20} />
                        </div>
                        <h3 className="font-black text-lg tracking-tight uppercase">Brand Info</h3>
                    </div>
                    <div className="space-y-6">
                        {industry && (
                            <div className="space-y-1">
                                <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground/60 flex items-center gap-2">
                                    <Briefcase size={10} />
                                    Industry
                                </p>
                                <p className="font-bold text-sm">{industry}</p>
                            </div>
                        )}
                        {companySize && (
                            <div className="space-y-1">
                                <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground/60 flex items-center gap-2">
                                    <MapPin size={10} />
                                    Size
                                </p>
                                <p className="font-bold text-sm">{companySize} Employees</p>
                            </div>
                        )}
                        {website && (
                            <div className="space-y-1">
                                <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground/60 flex items-center gap-2">
                                    <Globe size={10} />
                                    Website
                                </p>
                                <a href={website} target="_blank" rel="noopener noreferrer" className="font-bold text-sm text-primary hover:underline flex items-center gap-2">
                                    {website.replace(/^https?:\/\/(www\.)?/, '')}
                                    <ExternalLink size={14} />
                                </a>
                            </div>
                        )}
                        {contactEmail && (
                            <div className="space-y-1">
                                <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground/60 flex items-center gap-2">
                                    <Mail size={10} />
                                    Business Email
                                </p>
                                <p className="font-bold text-sm break-all">{contactEmail}</p>
                            </div>
                        )}
                        {contactPhone && (
                            <div className="space-y-1">
                                <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground/60 flex items-center gap-2">
                                    <Phone size={10} />
                                    Business Phone
                                </p>
                                <p className="font-bold text-sm">{contactPhone}</p>
                            </div>
                        )}
                    </div>
                </Card>
            )}
        </div>
    );
};
