'use client';

import React, { useRef } from 'react';
import { VideoForSale } from '@/types/video.types';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Play,
  Trash2,
  User,
  CircleDollarSign,
  Tag,
  Loader2,
} from 'lucide-react';
import { UserRole } from '@/types/auth.types';
import { motion } from 'framer-motion';

interface VideoCardProps {
  video: VideoForSale;
  onPreview: (video: VideoForSale) => void;
  onDelete?: (id: string) => void;
  isDeleting?: boolean;
  currentUserId?: string;
  currentUserRole?: string;
  index?: number;
}

export const VideoCard = ({
  video,
  onPreview,
  onDelete,
  isDeleting = false,
  currentUserId,
  currentUserRole,
  index = 0,
}: VideoCardProps) => {
  const videoRef = useRef<HTMLVideoElement>(null);

  const publisherName =
    video.influencer?.profile?.fullName ||
    video.influencer?.influencerProfile?.fullName ||
    'Influencer';
  const publisherUsername =
    video.influencer?.profile?.username ||
    video.influencer?.username ||
    'creator';
  const avatarUrl =
    video.influencer?.profile?.avatarUrl ||
    video.influencer?.profile?.profileImage ||
    video.influencer?.influencerProfile?.avatarUrl;

  const isOwner = currentUserId === video.influencerId;
  const isAdmin = currentUserRole === UserRole.ADMIN;
  const canDelete = onDelete && (isOwner || isAdmin);

  // Mouse hover event handlers to play/pause video preview
  const handleMouseEnter = () => {
    if (videoRef.current) {
      videoRef.current.play().catch(() => {
        // Autoplay policy blocker (safe to ignore)
      });
    }
  };

  const handleMouseLeave = () => {
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -4 }}
      transition={{ duration: 0.3 }}
      className="h-full"
    >
      <Card className="border-border bg-card shadow-sm hover:border-primary/20 transition-all duration-500 ease-out rounded-[2rem] h-full flex flex-col border p-0 overflow-hidden group">
        <CardContent className="p-5 flex flex-col justify-between h-full gap-4">
          <div className="space-y-4">
            {/* Hover Autoplay Video Preview */}
            <div
              className="relative w-full h-48 rounded-2xl overflow-hidden bg-black/60 border border-border/10 cursor-pointer"
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
              onClick={() => onPreview(video)}
            >
              <video
                ref={videoRef}
                src={video.videoUrl}
                muted
                playsInline
                loop
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              {/* Static Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none" />

              {/* Hover Play Button Overlay */}
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/40 pointer-events-none">
                <div className="w-12 h-12 bg-white/95 dark:bg-zinc-900/95 rounded-full flex items-center justify-center shadow-lg transform scale-90 group-hover:scale-100 transition-transform duration-300">
                  <Play className="text-primary fill-primary ml-1" size={20} />
                </div>
              </div>

              {/* Floating Price Tag */}
              <div className="absolute bottom-3 left-3 bg-zinc-950/80 backdrop-blur-md border border-border/20 px-3 py-1 rounded-full text-xs font-black text-white flex items-center gap-1">
                <CircleDollarSign size={12} className="text-primary" />
                <span>
                  {video.price !== undefined ? `$${Number(video.price).toLocaleString()}` : 'Contact'}
                </span>
              </div>
            </div>

            {/* Info Header / Creator details */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Avatar className="h-8 w-8 border border-border/30">
                  <AvatarImage src={avatarUrl} alt={publisherName} />
                  <AvatarFallback className="bg-muted text-muted-foreground text-xs">
                    <User size={12} />
                  </AvatarFallback>
                </Avatar>
                <div className="flex flex-col text-left">
                  <span className="text-xs font-bold text-foreground line-clamp-1 leading-tight">
                    {publisherName}
                  </span>
                  <span className="text-[10px] text-muted-foreground">
                    @{publisherUsername}
                  </span>
                </div>
              </div>

              {canDelete && (
                <Button
                  variant="ghost"
                  size="icon"
                  disabled={isDeleting}
                  onClick={(e) => {
                    e.stopPropagation();
                    if (video.id) onDelete(video.id);
                  }}
                  className="h-8 w-8 text-zinc-500 hover:text-red-500 hover:bg-red-500/10 active:scale-95 transition-all rounded-lg"
                >
                  {isDeleting ? (
                    <Loader2 className="animate-spin" size={14} />
                  ) : (
                    <Trash2 size={14} />
                  )}
                </Button>
              )}
            </div>

            {/* Video Meta Info */}
            <div className="space-y-1.5 text-left">
              <h3 className="text-base font-bold text-foreground tracking-tight line-clamp-1 group-hover:text-primary transition-colors duration-300 cursor-pointer" onClick={() => onPreview(video)}>
                {video.title}
              </h3>
              {video.description && (
                <p className="text-xs text-muted-foreground line-clamp-2 leading-relaxed">
                  {video.description}
                </p>
              )}
            </div>
          </div>

          {/* Categories / Tags & View Button */}
          <div className="mt-auto space-y-3">
            {video.categories && video.categories.length > 0 && (
              <div className="flex flex-wrap gap-1.5 justify-start">
                {video.categories.slice(0, 3).map((category) => (
                  <Badge
                    key={category}
                    variant="default"
                    className="rounded-md px-2 py-0.5 text-[9px] font-bold"
                  >
                    <Tag size={8} className="mr-1 inline-block" />
                    {category}
                  </Badge>
                ))}
                {video.categories.length > 3 && (
                  <span className="text-[9px] text-muted-foreground font-black px-1">
                    +{video.categories.length - 3}
                  </span>
                )}
              </div>
            )}

            <Button
              onClick={() => onPreview(video)}
              className="w-full h-11 rounded-xl font-black text-xs uppercase tracking-widest gap-2 bg-primary hover:bg-primary/90 shadow-lg shadow-primary/20 active:scale-95 transition-all text-primary-foreground flex items-center justify-center"
            >
              <Play size={14} className="fill-primary-foreground" />
              Preview Video
            </Button>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};
