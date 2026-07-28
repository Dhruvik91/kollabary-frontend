'use client';

import React, { useState } from 'react';
import { useAuth } from '@/contexts/auth-context';
import { UserRole } from '@/types/auth.types';
import {
  useInfiniteVideos,
  useInfiniteMyVideos,
  useDeleteVideo,
} from '@/hooks/use-video.hooks';
import { PageHeader } from '@/components/shared/PageHeader';
import { Film, Plus } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { VideoFilters } from '../components/VideoFilters';
import { VideoList } from '../components/VideoList';
import { VideoDetailModal } from '../components/VideoDetailModal';
import { VideoForSale, SearchVideosForSaleDto } from '@/types/video.types';
import { toast } from 'sonner';
import { FRONTEND_ROUTES } from '@/constants';

export const VideosContainer = () => {
  const { user, isLoading: isAuthLoading } = useAuth();
  const isInfluencer = user?.role === UserRole.INFLUENCER;

  // State Management
  const [activeTab, setActiveTab] = useState<'marketplace' | 'my-videos'>('marketplace');
  const [selectedVideo, setSelectedVideo] = useState<VideoForSale | null>(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [filters, setFilters] = useState<SearchVideosForSaleDto>({
    page: 1,
    limit: 12,
    search: undefined,
    minPrice: undefined,
    maxPrice: undefined,
    categories: undefined,
  });

  // Queries
  const marketplaceQuery = useInfiniteVideos(filters, {
    enabled: activeTab === 'marketplace',
  });

  const myVideosQuery = useInfiniteMyVideos(12, {
    enabled: activeTab === 'my-videos' && isInfluencer,
  });

  // Delete Mutation
  const { mutateAsync: deleteVideo } = useDeleteVideo();

  const handleDelete = async (id: string) => {
    try {
      setDeletingId(id);
      await deleteVideo(id);
      // If deleted video is open, close modal
      if (selectedVideo?.id === id) {
        setIsDetailOpen(false);
        setSelectedVideo(null);
      }
    } catch (error) {
      // Error handled by hook
    } finally {
      setDeletingId(null);
    }
  };

  const handlePreview = (video: VideoForSale) => {
    setSelectedVideo(video);
    setIsDetailOpen(true);
  };

  const handleResetFilters = () => {
    setFilters({
      page: 1,
      limit: filters.limit,
      search: undefined,
      minPrice: undefined,
      maxPrice: undefined,
      categories: undefined,
    });
  };

  if (isAuthLoading) {
    return (
      <div className="container mx-auto py-8">
        <div className="animate-pulse space-y-8">
          <div className="h-40 bg-muted/20 rounded-[40px]" />
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-60 bg-muted/20 rounded-3xl" />
            ))}
          </div>
        </div>
      </div>
    );
  }

  // Data mapping
  const marketplaceVideos = marketplaceQuery.data?.pages.flatMap((page) => page.items) || [];
  const myVideos = myVideosQuery.data?.pages.flatMap((page) => page.items) || [];

  const currentVideos = activeTab === 'marketplace' ? marketplaceVideos : myVideos;
  const currentQuery = activeTab === 'marketplace' ? marketplaceQuery : myVideosQuery;

  const hasActiveFilters =
    !!filters.search ||
    filters.minPrice !== undefined ||
    filters.maxPrice !== undefined ||
    (filters.categories && filters.categories.length > 0);

  return (
    <div className="container mx-auto py-8 space-y-12">

      {/* Page Header */}
      <PageHeader
        label="Video Library"
        title="Discover & Buy"
        highlightedTitle="Videos for Sale"
        subtitle="Browse high-quality UGC videos and brand content posted by influencers, or upload your own work."
        icon={Film}
        action={
          isInfluencer && (
            <Link href={FRONTEND_ROUTES.DASHBOARD.VIDEO_POST}>
              <Button className="rounded-2xl h-12 px-6 font-bold bg-primary hover:bg-primary/90 text-primary-foreground shadow-xl shadow-primary/20 flex items-center gap-2 active:scale-95 transition-all">
                <Plus size={16} />
                Post Video
              </Button>
            </Link>
          )
        }
      />

      <div className="space-y-8">

        {/* Filters and Tabs */}
        <VideoFilters
          filters={filters}
          onFilterChange={setFilters}
          activeTab={activeTab}
          onTabChange={(tab) => {
            setActiveTab(tab);
            handleResetFilters();
          }}
          isInfluencer={isInfluencer}
          userRole={user?.role}
        />

        {/* Listings Grid */}
        <VideoList
          videos={currentVideos}
          isLoading={currentQuery.isLoading}
          error={currentQuery.error}
          onRetry={() => currentQuery.refetch()}
          hasNextPage={!!currentQuery.hasNextPage}
          isFetchingNextPage={currentQuery.isFetchingNextPage}
          fetchNextPage={currentQuery.fetchNextPage}
          onPreview={handlePreview}
          onDelete={activeTab === 'my-videos' ? handleDelete : undefined}
          deletingId={deletingId}
          currentUserId={user?.id}
          currentUserRole={user?.role}
          hasActiveFilters={hasActiveFilters}
          onResetFilters={handleResetFilters}
          emptyMessage={
            activeTab === 'my-videos'
              ? "You haven't posted any videos for sale yet."
              : 'No videos are available in the marketplace.'
          }
        />

      </div>

      {/* Video Lightbox Player Modal */}
      <VideoDetailModal
        video={selectedVideo}
        isOpen={isDetailOpen}
        onClose={() => {
          setIsDetailOpen(false);
          setSelectedVideo(null);
        }}
      />

    </div>
  );
};
