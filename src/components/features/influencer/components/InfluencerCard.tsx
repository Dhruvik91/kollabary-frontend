'use client';

import { motion } from 'framer-motion';
import { Instagram, Youtube, Twitter, MapPin, Star, ArrowUpRight } from 'lucide-react';
import { InfluencerProfile } from '@/constants/interface';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';
import { FRONTEND_ROUTES } from '@/constants/constants';

interface InfluencerCardProps {
    influencer: InfluencerProfile;
}

export function InfluencerCard({ influencer }: InfluencerCardProps) {
    const { user, bio, followerCount, categories, location, socialMediaLinks } = influencer;

    return (
        <motion.div
            whileHover={{ y: -5 }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="group relative overflow-hidden rounded-2xl glass-enhanced p-6 hover:shadow-2xl transition-all duration-300"
        >
            <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-4">
                    <Avatar className="h-16 w-16 border-2 border-primary/20 group-hover:border-primary/50 transition-colors">
                        <AvatarImage src={user?.profileImage} />
                        <AvatarFallback className="bg-primary/10 text-primary">
                            {user?.name?.charAt(0) || 'I'}
                        </AvatarFallback>
                    </Avatar>
                    <div>
                        <h3 className="font-bold text-lg">{user?.name}</h3>
                        <div className="flex items-center text-sm text-muted-foreground gap-1">
                            <MapPin className="h-3 w-3" />
                            {location || 'Global'}
                        </div>
                    </div>
                </div>
                <Link
                    href={FRONTEND_ROUTES.INFLUENCERS.DETAIL(influencer.id)}
                    className="p-2 rounded-full bg-primary/10 text-primary opacity-0 group-hover:opacity-100 transition-opacity"
                >
                    <ArrowUpRight className="h-5 w-5" />
                </Link>
            </div>

            <p className="text-sm text-muted-foreground line-clamp-2 mb-4">
                {bio || 'Premium influencer ready for collaboration.'}
            </p>

            <div className="flex flex-wrap gap-2 mb-6">
                {categories?.map((cat) => (
                    <Badge key={cat} variant="secondary" className="bg-primary/5 text-primary-foreground/80 hover:bg-primary/10 border-none px-3 py-1 text-[10px] uppercase tracking-wider">
                        {cat}
                    </Badge>
                ))}
            </div>

            <div className="grid grid-cols-2 gap-4 pt-4 border-t border-white/10 mt-auto">
                <div className="text-center">
                    <div className="text-xl font-bold text-primary">
                        {followerCount ? (followerCount / 1000).toFixed(1) + 'K' : 'N/A'}
                    </div>
                    <div className="text-[10px] text-muted-foreground uppercase tracking-widest">Followers</div>
                </div>
                <div className="flex items-center justify-center gap-2">
                    {socialMediaLinks?.instagram && <Instagram className="h-4 w-4 text-pink-500" />}
                    {socialMediaLinks?.youtube && <Youtube className="h-4 w-4 text-red-500" />}
                    {socialMediaLinks?.twitter && <Twitter className="h-4 w-4 text-blue-400" />}
                </div>
            </div>
        </motion.div>
    );
}
