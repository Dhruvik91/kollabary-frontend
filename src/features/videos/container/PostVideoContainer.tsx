'use client';

import React, { useEffect } from 'react';
import { useAuth } from '@/contexts/auth-context';
import { UserRole } from '@/types/auth.types';
import { useRouter } from 'next/navigation';
import { useCreateVideo } from '@/hooks/use-video.hooks';
import { PageHeader } from '@/components/shared/PageHeader';
import { BackButton } from '@/components/shared/BackButton';
import { Film } from 'lucide-react';
import { VideoForm } from '../components/VideoForm';
import { VideoFormValues } from '@/lib/validations/video.validation';
import { EmptyState } from '@/components/shared/EmptyState';
import { ShieldAlert } from 'lucide-react';
import { FRONTEND_ROUTES } from '@/constants';

export const PostVideoContainer = () => {
  const { user, isLoading: isAuthLoading } = useAuth();
  const router = useRouter();
  const isInfluencer = user?.role === UserRole.INFLUENCER;

  const { mutateAsync: createVideo, isPending } = useCreateVideo();

  // Redirect if not authorized once auth loading completes
  useEffect(() => {
    if (!isAuthLoading && !user) {
      router.push(FRONTEND_ROUTES.AUTH.LOGIN);
    }
  }, [user, isAuthLoading, router]);

  const handleSubmit = async (values: VideoFormValues) => {
    try {
      await createVideo({
        title: values.title,
        description: values.description,
        videoUrl: values.videoUrl,
        price: values.price,
        categories: values.categories,
      });
      router.push(FRONTEND_ROUTES.DASHBOARD.VIDEOS);
    } catch (error) {
      // Error handled by hook toast
    }
  };

  if (isAuthLoading) {
    return (
      <div className="container mx-auto py-8">
        <div className="animate-pulse space-y-8 max-w-2xl mx-auto">
          <div className="h-10 bg-muted/20 w-32 rounded-xl" />
          <div className="h-40 bg-muted/20 rounded-[40px]" />
          <div className="h-96 bg-muted/20 rounded-[40px]" />
        </div>
      </div>
    );
  }

  if (!isInfluencer) {
    return (
      <div className="container mx-auto py-16">
        <EmptyState
          title="Access Denied"
          description="Only registered influencers are permitted to list UGC videos for sale. Brands can browse and purchase videos from the marketplace."
          icon={ShieldAlert}
          action={{
            label: 'Go to Marketplace',
            onClick: () => router.push('/videos'),
          }}
        />
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8 space-y-6 sm:space-y-8 pb-20">
      <div className="flex items-center justify-start">
        <BackButton />
      </div>

      <PageHeader
        label="Influencer Portal"
        title="Post Video"
        highlightedTitle="For Sale"
        subtitle="List your creative high-quality UGC videos for brands to purchase licenses and use in their campaigns."
        icon={Film}
      />

      <div className="bg-card border border-border rounded-2xl p-6 sm:p-10 backdrop-blur-xl relative overflow-hidden group transition-all duration-300 shadow-sm">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
        <div className="relative z-10">
          <VideoForm onSubmit={handleSubmit} isLoading={isPending} />
        </div>
      </div>
    </div>
  );
};
