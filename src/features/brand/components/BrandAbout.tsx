'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { UserProfile } from '@/services/profile.service';
import { 
    Instagram, 
    Youtube, 
    Twitter, 
    Linkedin,
    Globe, 
    Search,
    Info,
    Share2,
    Calendar,
    Target,
    Award,
    Sparkles
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';

interface BrandAboutProps {
    brand: UserProfile;
}

export const BrandAbout = ({ brand }: BrandAboutProps) => {
    const getPlatformIcon = (platform: string) => {
        const p = platform.toLowerCase();
        if (p.includes('instagram')) return <Instagram size={20} />;
        if (p.includes('twitter') || p === 'x') return <Twitter size={20} />;
        if (p.includes('linkedin')) return <Linkedin size={20} />;
        if (p.includes('youtube')) return <Youtube size={20} />;
        return <Globe size={20} />;
    };

    const hasSocialLinks = brand.socialLinks && Object.keys(brand.socialLinks).length > 0;

    return (
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 sm:gap-8">
            {/* Main Info Section */}
            <div className="xl:col-span-2 space-y-6 sm:space-y-8">
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    className="glass-card rounded-[2rem] p-6 sm:p-10 relative overflow-hidden flex flex-col justify-between"
                >
                    <div className="space-y-6">
                        <div className="flex items-center gap-3">
                            <div className="p-2.5 rounded-xl bg-primary/10 text-primary">
                                <Search size={20} />
                            </div>
                            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-primary/70">Our Story</span>
                        </div>
                        
                        <div className="space-y-4">
                            <h2 className="text-xl sm:text-2xl lg:text-3xl font-black tracking-tight text-foreground leading-tight italic">
                                About {brand.fullName}
                            </h2>
                            <p className="text-sm sm:text-base text-muted-foreground leading-relaxed font-medium">
                                {brand.bio || `${brand.fullName} is a forward-thinking brand looking to collaborate with creative influencers. They focus on delivering high-quality products and meaningful engagement through authentic partnerships.`}
                            </p>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-10">
                        <div className="glass-section rounded-2xl p-4 sm:p-5 border border-border/50">
                            <div className="flex items-center gap-3 mb-3">
                                <div className="p-2 rounded-xl bg-secondary/10 text-secondary">
                                    <Target size={18} />
                                </div>
                                <span className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Our Mission</span>
                            </div>
                            <p className="text-[11px] font-bold text-foreground/80 leading-relaxed uppercase tracking-wider">
                                Strategic Excellence & Brand Innovation
                            </p>
                        </div>
                        <div className="glass-section rounded-2xl p-4 sm:p-5 border border-border/50">
                            <div className="flex items-center gap-3 mb-3">
                                <div className="p-2 rounded-xl bg-primary/10 text-primary">
                                    <Calendar size={18} />
                                </div>
                                <span className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Partner Since</span>
                            </div>
                            <p className="text-[11px] font-bold text-foreground/80 leading-relaxed uppercase tracking-wider">
                                {new Date(brand.createdAt).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
                            </p>
                        </div>
                    </div>
                </motion.div>
            </div>

            {/* Sidebar Section */}
            <div className="space-y-6 sm:space-y-8">
                {/* Preferred Status */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="glass-card rounded-[2rem] p-6 sm:p-8 border border-primary/20 relative overflow-hidden group/preferred"
                >
                    <div className="absolute top-0 right-0 p-4 opacity-10">
                        <Award size={64} className="text-primary" />
                    </div>
                    
                    <div className="flex flex-col justify-between gap-6 relative z-10">
                        <div className="space-y-3">
                            <Badge className="bg-primary/20 text-primary hover:bg-primary/30 font-black text-[9px] uppercase tracking-widest px-3 py-1 rounded-lg border-none">
                                Preferred Brand
                            </Badge>
                            <h3 className="text-base font-black tracking-tight text-foreground uppercase">Kollabary Trusted</h3>
                            <p className="text-xs text-muted-foreground font-medium leading-relaxed">
                                Recognized for exceptional collaboration history and verified reliability.
                            </p>
                        </div>
                        
                        <div className="flex items-center gap-2 text-primary pt-2">
                            <Sparkles size={14} />
                            <span className="text-[10px] font-black uppercase tracking-widest italic opacity-80">Tier 1 Partner</span>
                        </div>
                    </div>
                </motion.div>

                {/* Digital Footprint / Social Links */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.1 }}
                    className="glass-card rounded-[2rem] p-6 sm:p-8 space-y-6 relative"
                >
                    <div className="flex items-center gap-2">
                        <Share2 size={16} className="text-secondary" />
                        <h3 className="text-xs font-black uppercase tracking-[0.2em] text-foreground/80">Digital Footprint</h3>
                    </div>

                    {hasSocialLinks ? (
                        <div className="flex flex-wrap items-center justify-center gap-3">
                            {Object.entries(brand.socialLinks!).map(([name, url]) => (
                                <SocialLink 
                                    key={name}
                                    icon={getPlatformIcon(name)} 
                                    label={name} 
                                    href={url as string} 
                                />
                            ))}
                        </div>
                    ) : (
                        <div className="py-4 text-center glass-section rounded-xl border border-dashed border-border/50">
                            <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest italic">Presence Private</p>
                        </div>
                    )}
                    
                    <div className="pt-4 border-t border-border/30">
                        <div className="glass-section rounded-xl p-3 flex items-center justify-between group/link cursor-pointer">
                            <span className="text-[10px] font-black uppercase tracking-widest text-muted-foreground group-hover/link:text-foreground transition-colors uppercase">Media Kit</span>
                            <div className="p-1.5 rounded-lg bg-muted/60 text-muted-foreground group-hover/link:bg-primary group-hover/link:text-primary-foreground transition-all">
                                <Share2 size={12} />
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

const SocialLink = ({ icon, label, href }: { icon: React.ReactNode, label: string, href: string }) => (
    <motion.a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        whileHover={{ y: -3, scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        className="flex items-center justify-center w-12 h-12 rounded-2xl bg-muted/40 border border-border/50 text-muted-foreground hover:text-primary hover:bg-card hover:border-primary/30 transition-all"
        title={label}
    >
        {icon}
    </motion.a>
);
