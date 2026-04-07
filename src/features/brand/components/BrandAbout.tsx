'use client';

import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { UserProfile } from '@/services/profile.service';
import { 
    Instagram, 
    Youtube, 
    Twitter, 
    Globe, 
    Info,
    Share2,
    Calendar,
    Target,
    Award
} from 'lucide-react';

interface BrandAboutProps {
    brand: UserProfile;
}

export const BrandAbout = ({ brand }: BrandAboutProps) => {
    const getPlatformIcon = (platform: string) => {
        switch (platform.toLowerCase()) {
            case 'instagram': return <Instagram size={20} />;
            case 'youtube': return <Youtube size={20} />;
            case 'twitter':
            case 'x': return <Twitter size={20} />;
            default: return <Globe size={20} />;
        }
    };

    return (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-10">
            {/* Main Info */}
            <div className="lg:col-span-2 space-y-6 lg:space-y-8">
                <Card className="rounded-[2.5rem] border-border/50 bg-card/40 glass-card p-6 sm:p-8 md:p-10">
                    <div className="space-y-8">
                        <div className="space-y-4">
                            <h3 className="text-2xl lg:text-3xl font-black tracking-tight flex items-center gap-3">
                                <Info className="text-primary" size={28} />
                                About {brand.fullName}
                            </h3>
                            <p className="text-lg lg:text-xl text-muted-foreground leading-relaxed">
                                {brand.bio || `${brand.fullName} is a forward-thinking brand looking to collaborate with creative influencers. They focus on delivering high-quality products and meaningful engagement through authentic partnerships.`}
                            </p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-8 border-t border-border/50">
                            <div className="space-y-4">
                                <div className="flex items-center gap-3 text-primary">
                                    <Target size={22} />
                                    <h4 className="font-bold text-lg">Our Mission</h4>
                                </div>
                                <p className="text-muted-foreground leading-relaxed">
                                    To create lasting impact through strategic influencer partnerships and community-driven storytelling.
                                </p>
                            </div>
                            <div className="space-y-4">
                                <div className="flex items-center gap-3 text-primary">
                                    <Calendar size={22} />
                                    <h4 className="font-bold text-lg">Partner Since</h4>
                                </div>
                                <p className="text-muted-foreground leading-relaxed">
                                    Active since {new Date(brand.createdAt).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}.
                                </p>
                            </div>
                        </div>
                    </div>
                </Card>
            </div>

            {/* Sidebar: Socials */}
            <div className="lg:col-span-1 space-y-6 lg:space-y-8">
                <Card className="rounded-[2.5rem] border-border/50 bg-card/40 glass-card overflow-hidden">
                    <div className="p-6 lg:p-8 border-b border-border/50 glass-section bg-muted/20">
                        <h3 className="font-bold tracking-tight text-lg flex items-center gap-2">
                            <Share2 size={20} className="text-primary" />
                            Connected Platforms
                        </h3>
                    </div>
                    <CardContent className="p-6 lg:p-8 space-y-4">
                        {brand.socialLinks && Object.keys(brand.socialLinks).length > 0 ? (
                            Object.entries(brand.socialLinks).map(([name, url]) => (
                                <a
                                    key={name}
                                    href={url as string}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center justify-between p-4 bg-background/50 glass-section border border-border/50 rounded-2xl hover:border-primary/50 transition-all group"
                                >
                                    <div className="flex items-center gap-4">
                                        <div className="w-10 h-10 bg-muted/50 rounded-xl flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all">
                                            {getPlatformIcon(name)}
                                        </div>
                                        <div>
                                            <p className="text-sm font-bold capitalize">{name}</p>
                                            <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">Official Page</p>
                                        </div>
                                    </div>
                                    <Globe size={16} className="text-muted-foreground group-hover:text-primary transition-colors" />
                                </a>
                            ))
                        ) : (
                            <div className="text-center py-6">
                                <p className="text-sm text-muted-foreground italic">No public social links provided</p>
                            </div>
                        )}
                    </CardContent>
                </Card>

                {/* Additional Quick Stats or Trust Badges can go here */}
                <div className="rounded-[2rem] p-6 bg-linear-to-br from-primary/10 to-primary/5 border border-primary/10">
                    <h4 className="font-bold text-primary mb-2 flex items-center gap-2 text-sm uppercase tracking-widest">
                        <Award size={14} />
                        Kollabary Verified
                    </h4>
                    <p className="text-xs text-muted-foreground leading-relaxed">
                        This brand has been manually verified by our team and has a history of timely payments and professional communication.
                    </p>
                </div>
            </div>
        </div>
    );
};
