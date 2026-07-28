'use client';

import React from 'react';
import { VideoForSale } from '@/types/video.types';
import { VideoCard } from './VideoCard';
import { InfiniteScrollContainer } from '@/components/shared/InfiniteScrollContainer';
import { motion } from 'framer-motion';
import { EmptyState } from '@/components/shared/EmptyState';
import { ErrorState } from '@/components/shared/ErrorState';
import { Video, SearchX } from 'lucide-react';

interface VideoListProps {
  videos: VideoForSale[];
  isLoading: boolean;
  error?: any;
  onRetry?: () => void;
  hasNextPage?: boolean;
  isFetchingNextPage?: boolean;
  fetchNextPage?: () => void;
  onPreview: (video: VideoForSale) => void;
  onDelete?: (id: string) => void;
  deletingId?: string | null;
  currentUserId?: string;
  currentUserRole?: string;
  hasActiveFilters?: boolean;
  onResetFilters?: () => void;
  emptyMessage?: string;
}

export const VideoList = ({
  videos,
  isLoading,
  error,
  onRetry,
  hasNextPage,
  isFetchingNextPage = false,
  fetchNextPage = () => {},
  onPreview,
  onDelete,
  deletingId = null,
  currentUserId,
  currentUserRole,
  hasActiveFilters = false,
  onResetFilters,
  emptyMessage = 'No videos for sale found.',
}: VideoListProps) => {
  if (error) {
    return <ErrorState onRetry={onRetry} />;
  }

  return (
    <InfiniteScrollContainer
      items={videos}
      renderItem={(video, index) => (
        <VideoCard
          key={video.id}
          video={video}
          onPreview={onPreview}
          onDelete={onDelete}
          isDeleting={deletingId === video.id}
          currentUserId={currentUserId}
          currentUserRole={currentUserRole}
          index={index}
        />
      )}
      hasNextPage={hasNextPage}
      isFetchingNextPage={isFetchingNextPage}
      fetchNextPage={fetchNextPage}
      isLoading={isLoading}
      gridClassName="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 xl:grid-cols-3 gap-6 lg:gap-8 w-full"
      loader={
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 xl:grid-cols-3 gap-6 lg:gap-8 w-full">
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className="h-[380px] rounded-[2rem] bg-muted/20 animate-pulse border border-border/40"
            />
          ))}
        </div>
      }
      emptyState={
        <EmptyState
          title={hasActiveFilters ? 'No matches found' : 'No videos available'}
          description={
            hasActiveFilters
              ? 'Try adjusting your search query, price ranges, or categories to find what you are looking for.'
              : emptyMessage
          }
          icon={hasActiveFilters ? SearchX : Video}
          action={
            hasActiveFilters && onResetFilters
              ? {
                  label: 'Clear Filters',
                  onClick: onResetFilters,
                }
              : undefined
          }
        />
      }
      endMessage={
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="py-12 text-center border-t border-border/20 mt-8 w-full"
        >
          <p className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground/40">
            You've reached the end of the collection
          </p>
        </motion.div>
      }
    />
  );
};
