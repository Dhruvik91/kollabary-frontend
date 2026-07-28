'use client';

import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogClose,
} from '@/components/ui/dialog';
import { VideoForSale } from '@/types/video.types';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Calendar, CircleDollarSign, Tag, Film, User, X } from 'lucide-react';
import { format } from 'date-fns';

interface VideoDetailModalProps {
  video: VideoForSale | null;
  isOpen: boolean;
  onClose: () => void;
}

export const VideoDetailModal = ({ video, isOpen, onClose }: VideoDetailModalProps) => {
  if (!video) return null;

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

  const formattedDate = video.createdAt
    ? format(new Date(video.createdAt), 'MMM dd, yyyy')
    : '';

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent
        showCloseButton={false}
        className="max-w-2xl w-[95vw] rounded-[2rem] p-0 overflow-hidden border border-border bg-background shadow-2xl backdrop-blur-xl"
      >
        <div className="flex flex-col h-full max-h-[90vh]">

          {/* Video Player Section - Stacked at Top */}
          <div className="relative w-full aspect-video bg-black flex items-center justify-center overflow-hidden border-b border-border/30">
            <video
              key={video.videoUrl}
              src={video.videoUrl}
              controls
              autoPlay
              playsInline
              className="w-full h-full object-contain"
              poster=""
            />
            {/* Circular Custom Close Button overlaying the video player */}
            <DialogClose className="absolute top-4 right-4 z-50 rounded-full w-9 h-9 flex items-center justify-center bg-black/50 hover:bg-black/75 backdrop-blur-md border border-white/10 text-white/90 hover:text-white transition-all active:scale-95 cursor-pointer">
              <X size={16} />
              <span className="sr-only">Close</span>
            </DialogClose>
          </div>

          {/* Details Section - Stacked at Bottom */}
          <div className="p-6 sm:p-8 space-y-6 overflow-y-auto">
            <div className="space-y-6">
              {/* Header Info */}
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div className="space-y-1.5 text-left">
                  <DialogHeader className="text-left">
                    <DialogTitle className="text-xl sm:text-2xl font-black tracking-tight text-foreground line-clamp-2">
                      {video.title}
                    </DialogTitle>
                    <DialogDescription className="hidden">
                      Details of the video for sale: {video.title}
                    </DialogDescription>
                  </DialogHeader>

                  {/* Price Tag */}
                  <div className="flex items-center gap-2 text-primary font-black text-lg sm:text-xl">
                    <CircleDollarSign size={20} className="text-primary" />
                    <span>{video.price !== undefined ? `$${Number(video.price).toLocaleString()}` : 'Contact for Price'}</span>
                  </div>
                </div>
              </div>

              {/* Creator Card */}
              <div className="flex items-center gap-3 p-3.5 rounded-2xl bg-muted/40 border border-border/50">
                <Avatar className="h-10 w-10 border border-border/30">
                  <AvatarImage src={avatarUrl} alt={publisherName} />
                  <AvatarFallback className="bg-muted text-muted-foreground">
                    <User size={16} />
                  </AvatarFallback>
                </Avatar>
                <div className="flex flex-col text-left">
                  <span className="text-sm font-bold text-foreground leading-tight">{publisherName}</span>
                  <span className="text-xs text-muted-foreground">@{publisherUsername}</span>
                </div>
              </div>

              {/* Description */}
              {video.description && (
                <div className="space-y-2 text-left">
                  <h4 className="text-[10px] font-black uppercase tracking-widest text-muted-foreground flex items-center gap-1.5">
                    <Film size={12} />
                    Description
                  </h4>
                  <p className="text-xs sm:text-sm text-foreground/80 leading-relaxed font-medium whitespace-pre-line">
                    {video.description}
                  </p>
                </div>
              )}

              {/* Categories */}
              {video.categories && video.categories.length > 0 && (
                <div className="space-y-2 text-left">
                  <h4 className="text-[10px] font-black uppercase tracking-widest text-muted-foreground flex items-center gap-1.5">
                    <Tag size={12} />
                    Categories
                  </h4>
                  <div className="flex flex-wrap gap-1.5 justify-start">
                    {video.categories.map((category) => (
                      <Badge
                        key={category}
                        variant="default"
                        className="rounded-lg px-2.5 py-0.5 text-[10px] font-bold"
                      >
                        {category}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Footer / Meta Details */}
            <div className="pt-4 border-t border-border/30 flex items-center justify-between text-muted-foreground text-xs font-semibold">
              <div className="flex items-center gap-1.5">
                <Calendar size={13} />
                <span>Uploaded {formattedDate}</span>
              </div>
            </div>

          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
