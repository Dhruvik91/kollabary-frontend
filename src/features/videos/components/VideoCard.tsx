'use client';

import React, { useRef, useState } from 'react';
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
  AlertTriangle,
} from 'lucide-react';
import { UserRole } from '@/types/auth.types';
import { motion } from 'framer-motion';
import { AnimatedModal } from '@/components/modal/AnimatedModal';

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
}: VideoCardProps) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

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

              {/* Price Tag Overlay */}
              {video.price !== undefined && (
                <div className="absolute top-3 left-3 z-10 pointer-events-none">
                  <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-xl bg-black/60 text-white border border-white/10 shadow-lg backdrop-blur-md text-[11px] font-black uppercase tracking-wider">
                    ₹{Number(video.price).toLocaleString()}
                  </span>
                </div>
              )}

              {/* Delete Button Overlay */}
              {canDelete && (
                <div className="absolute top-3 right-3 z-10">
                  <Button
                    variant="destructive"
                    size="icon"
                    disabled={isDeleting}
                    onClick={(e) => {
                      e.stopPropagation();
                      setIsDeleteModalOpen(true);
                    }}
                    className="h-8 w-8 rounded-xl bg-black/60 hover:bg-red-500 text-white border border-white/10 shadow-lg backdrop-blur-md active:scale-95 transition-all duration-300"
                  >
                    {isDeleting ? (
                      <Loader2 className="animate-spin" size={14} />
                    ) : (
                      <Trash2 size={14} />
                    )}
                  </Button>
                </div>
              )}
            </div>

            {/* Info Header / Creator details (Only shown if not owner) */}
            {!isOwner && (
              <div className="flex items-center gap-2 pb-1 border-b border-border/5">
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
            )}

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

      {canDelete && (
        <AnimatedModal
          isOpen={isDeleteModalOpen}
          onClose={() => {
            if (!isDeleting) setIsDeleteModalOpen(false);
          }}
          title={
            <div className="flex items-center gap-3 text-red-500">
              <AlertTriangle className="h-6 w-6" />
              <span>Delete Video?</span>
            </div>
          }
          description="Are you sure you want to delete this video? This action cannot be undone."
          size="sm"
          showCloseButton={!isDeleting}
          footer={
            <div className="flex flex-col sm:flex-row justify-end gap-3 w-full">
              <Button
                variant="outline"
                disabled={isDeleting}
                onClick={(e) => {
                  e.stopPropagation();
                  setIsDeleteModalOpen(false);
                }}
                className="rounded-xl font-bold uppercase text-[10px] tracking-widest w-full sm:w-auto"
              >
                Cancel
              </Button>
              <Button
                variant="destructive"
                disabled={isDeleting}
                onClick={(e) => {
                  e.stopPropagation();
                  if (video.id) onDelete(video.id);
                }}
                className="rounded-xl font-black uppercase text-[10px] tracking-widest px-8 bg-red-600 hover:bg-red-700 text-white shadow-lg shadow-red-500/20 w-full sm:w-auto flex items-center justify-center gap-1.5"
              >
                {isDeleting ? (
                  <Loader2 className="animate-spin h-3 w-3" />
                ) : null}
                {isDeleting ? 'Deleting...' : 'Delete Forever'}
              </Button>
            </div>
          }
        >
          <div className="py-4">
            <div className="p-4 bg-red-500/5 border border-red-500/10 rounded-2xl">
              <p className="text-sm text-foreground/80 leading-relaxed text-left">
                You are about to permanently delete <span className="font-bold text-foreground">"{video.title}"</span>.
                This will remove the video from the marketplace and your library forever.
              </p>
            </div>
          </div>
        </AnimatedModal>
      )}
    </motion.div>
  );
};
